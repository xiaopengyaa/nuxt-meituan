const Router = require('koa-router')
const md5 = require('crypto-js/md5')
const Order = require('../dbs/models/order.js')
const Cart = require('../dbs/models/cart.js')

const router = new Router({
  prefix: '/order',
})

router.post('/createOrder', async (ctx) => {
  const { id, price, count } = ctx.request.body
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login',
    }
  } else {
    const findCart = await Cart.findOne({
      cartNo: id,
    })
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0,
    })
    try {
      const result = await order.save()
      if (result) {
        // 删除购物车，因为购物车是临时的
        await findCart.remove()
        ctx.body = {
          code: 0,
          id: orderID,
        }
      } else {
        ctx.body = {
          code: -1,
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
      }
    }
  }
})

router.post('/getOrders', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login',
    }
  } else {
    try {
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result,
        }
      } else {
        ctx.body = {
          code: -1,
          list: [],
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: [],
      }
    }
  }
})

module.exports = router
