import Vue from 'vue'
import App from './App'
import store from './store'
import MpvueRouterPatch from 'mpvue-router-patch'

// 全局style样式表
// import './colorui/animation.wxss'
import './colorui/icon.wxss'
import './colorui/main.wxss'

Vue.use(MpvueRouterPatch)
Vue.prototype.$store = store

Vue.config._mpTrace = true
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
