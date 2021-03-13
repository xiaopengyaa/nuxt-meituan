export const actions = {
  // ssr渲染，不需要二次登录
  // async nuxtServerInit({ commit }, { res, app }) {
  //   // 城市服务
  //   const {
  //     status,
  //     data: { province, city },
  //   } = await app.$axios.get('/geo/getPosition')
  //   // 存入vuex中
  //   commit(
  //     'geo/setPosition',
  //     status === 200
  //       ? {
  //           city,
  //           province,
  //         }
  //       : {
  //           city: '',
  //           province: '',
  //         }
  //   )
  //   // 菜单服务
  //   const {
  //     status: status2,
  //     data: { menu },
  //   } = await app.$axios.get('geo/menu')
  //   commit('home/setMenu', status2 === 200 ? menu : [])
  //   // 热门景点服务
  //   const {
  //     status: status3,
  //     data: { result },
  //   } = await app.$axios.get('/search/hotPlace', {
  //     params: {
  //       city: app.store.state.geo.position.city.replace('市', ''),
  //     },
  //   })
  //   commit('home/setHotPlace', status3 === 200 ? result : [])
  // },
}
