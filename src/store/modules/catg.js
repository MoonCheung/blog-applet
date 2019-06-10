import api from '@/api'

const state = {
  // 分类列表
  tabbar: {}
}

const mutations = {
  GET_CATG_LIST (state, data) {
    state.tabbar = data
  }
}

const actions = {
  // 获取所有tab标签页
  getCatgLists ({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getCatgLists()
        .then(res => {
          commit('GET_CATG_LIST', res.result)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
