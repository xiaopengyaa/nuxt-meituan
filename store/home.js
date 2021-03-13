const state = () => ({
  menu: {},
  hotPlace: {},
  point: [],
})

const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  setHotPlace(state, val) {
    state.hotPlace = val
  },
  setPoint(state, val) {
    state.point = val
  },
}

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  },
  setPoint: ({ commit }, point) => {
    commit('setPoint', point)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
