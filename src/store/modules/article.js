import api from '@/api'

const state = {
  // 文章列表
  allList: {},
  apptList: {},
  apptDeil: {}
}

const mutations = {
  POST_ALL_ARTICLE (state, data) {
    state.allList = data
  },
  POST_APPT_CATG_LIST (state, data) {
    state.apptList = data
  },
  GET_ART_DETL (state, data) {
    state.apptDeil = data
  }
}

const actions = {
  // 获取文章列表API
  getAllArts ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api
        .getAllArts(param)
        .then(res => {
          commit('POST_ALL_ARTICLE', res.artList)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取指定tab标签页文章列表API
  getApptCatgLists ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api
        .getApptCatgLists(param)
        .then(res => {
          commit('POST_APPT_CATG_LIST', res.apptArtList)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 指定ID文章详情接口
  getArtDetls ({ commit }, param) {
    return new Promise((resolve, reject) => {
      api
        .getArtDetls(param)
        .then(res => {
          commit('GET_ART_DETL', res.ArtDeilData)
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
