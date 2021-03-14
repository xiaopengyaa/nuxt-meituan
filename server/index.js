const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')

const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json')
const logger = require('koa-logger')
const dbConfig = require('./dbs/config')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')
const geo = require('./interface/geo')
const search = require('./interface/search')
const categroy = require('./interface/categroy')
const cart = require('./interface/cart')
const order = require('./interface/order')

async function start() {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // 配置session
  app.keys = ['mt', 'keyskeys']
  app.proxy = true
  app.use(
    session({
      key: 'mt',
      prefix: 'mt:uid',
      store: new Redis(),
    })
  )
  // 配置post数据格式
  app.use(
    bodyParser({
      extendTypes: ['json', 'form', 'text'],
    })
  )
  app.use(logger())
  app.use(json())
  await nuxt.ready()

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 连接数据库
  mongoose.set('useCreateIndex', true)
  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // 这个即是报的警告
  })
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功')
  })
  // 处理登录相关的passport
  app.use(passport.initialize())
  app.use(passport.session())

  // 启动路由
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(categroy.routes()).use(categroy.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use(order.routes()).use(order.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Mark request as handled for Koa
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
