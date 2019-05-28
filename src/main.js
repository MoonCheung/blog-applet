import Vue from 'vue'
import App from './App'

// 全局style样式表
import './colorui/animation.wxss'
import './colorui/icon.wxss'
import './colorui/main.wxss'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
