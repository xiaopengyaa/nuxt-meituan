const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../../dbs/models/users')

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const where = {
      username,
    }
    const result = await UserModel.findOne(where)
    if (result !== null) {
      if (result.password === password) {
        return done(null, result)
      } else {
        return done(null, false, '密码错误')
      }
    } else {
      return done(null, false, '用户不存在')
    }
  })
)
/* 
  什么是序列化？
  序列化(Serialization)是将对象的状态信息转换为可以存储或传输的形式的过程。
  在序列化期间，对象将其当前状态写入到临时或持久性存储区。以后，可以通过从存储区中读取或反序列化对象的状态，重新创建该对象。 
*/

// 序列化
passport.serializeUser(function (user, done) {
  done(null, user)
})
// 反序列化
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport
