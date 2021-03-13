const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')
const User = require('../dbs/models/users')
const Email = require('../dbs/config')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

const router = new Router({
  prefix: '/users',
})

const Store = new Redis().client
// 注册的接口
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  // 验证码校验
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已经过期，请重新尝试',
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码',
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码',
    }
  }

  // 判断用户名是否被注册
  const user = await User.find({
    username,
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册',
    }
    return
  }
  // 存入用户数据
  const nuser = await User.create({
    username,
    password,
    email,
  })
  if (nuser) {
    const res = await axios.post('/users/signin', {
      username,
      password,
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user,
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error',
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败',
    }
  }
})

// 登陆的接口
router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err,
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user,
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: 1,
        msg: info,
      }
    }
  })(ctx, next)
})

// 验证码验证接口
router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟1次',
    }
    return false
  }
  // 发送对象
  const transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass,
    },
  })
  //   要接受的信息
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    // 用哪个用户名给哪个邮箱发邮件
    email: ctx.request.body.email,
    user: ctx.request.body.username,
  }
  // 发送邮件的内容
  const mailOptions = {
    from: `认证邮件<${Email.smtp.user}>`,
    to: ko.email,
    subject: '《高仿美团网》注册码',
    html: `您在《高仿美团网》中注册,您的昵称是"${ko.user}",邀请码是${ko.code}`,
  }
  // 发送
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      // 在redis中做存储
      Store.hmset(
        `nodemail:${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已经发送,可能会有延迟,有效期1分钟',
  }
})

// 退出的接口
router.get('/exit', async (ctx, next) => {
  // 注销的动作
  await ctx.logout()
  // 判断是否成功注销
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
    }
  } else {
    ctx.body = {
      code: -1,
    }
  }
})

// 获取用户名接口
router.get('/getUser', (ctx) => {
  // 判断是否认证
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email,
    }
  } else {
    ctx.body = {
      user: '',
      email: '',
    }
  }
})

module.exports = router
