const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Cart = require('../dbs/models/cart.js')

const router = new Router({
  prefix: '/cart',
})

router.post('/create', async (ctx) => {
  // 验证登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login',
    }
  } else {
    const time = Date()
    // 需要对购物车的编号进行加密
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const {
      params: { id, detail },
    } = ctx.request.body // 注意是post获取参数
    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail,
    })
    // 存入数据库操作
    const result = await cart.save()
    // 要响应的信息
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo,
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail',
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  const { id } = ctx.request.body
  try {
    // 查询数据库第一条信息，是因为买一个就创建一个购物车
    const result = await Cart.findOne({
      cartNo: id,
    })
    // 响应额数据
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {},
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      code: -1,
      data: {},
    }
  }
})

module.exports = router
