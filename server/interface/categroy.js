const Router = require('koa-router')
const Categroy = require('../dbs/models/categroy')
// const axios = require('./utils/axios')

const router = new Router({ prefix: '/categroy' })

// const sign = 'a3c9fe0782107295ee9f1709edd15218'

// 获取分类：类型和地区
router.get('/crumbs', async (ctx) => {
  const result = await Categroy.findOne({
    city: ctx.query.city.replace('市', '') || '北京',
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types,
    }
  } else {
    ctx.body = {
      areas: [],
      types: [],
    }
  }

  // const {
  //   status,
  //   data: { areas, types },
  // } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
  //   params: {
  //     city: ctx.query.city.replace('市', '') || '北京',
  //     sign,
  //   },
  // })
  // ctx.body = {
  //   areas: status === 200 ? areas : [],
  //   types: status === 200 ? types : [],
  // }
})

module.exports = router
