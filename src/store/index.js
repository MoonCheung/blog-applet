import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import article from './modules/article'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    article
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
