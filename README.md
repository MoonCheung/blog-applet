# mpvue-applet

[![GitHub stars](https://img.shields.io/github/stars/MoonCheung/vue-applet.svg?style=flat-square)](https://github.com/MoonCheung/vue-applet/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MoonCheung/vue-applet.svg?style=flat-square)](https://github.com/MoonCheung/vue-applet/issues)
[![GitHub forks](https://img.shields.io/github/forks/MoonCheung/vue-applet.svg?style=flat-square)](https://github.com/MoonCheung/vue-applet/network)
[![GitHub license](https://img.shields.io/github/license/MoonCheung/vue-applet.svg?style=flat-square)](https://github.com/MoonCheung/vue-applet/blob/master/LICENSE)

这是 `mpvue` 博客小程序由 `vue`,`vant-weapp`,`ColorUI` 构建应用程序开发的 <br/>
该博客小程序的 API 接口需要搭配 node 服务器才能运行,想运行时,需要来安装 node 服务器 <br/>

博客管理: [vue-backstage](https://github.com/MoonCheung/vue-backstage) <br/>
博客后台: [node-server](https://github.com/MoonCheung/node-server)

## 程序结构

### 引入 Fly.js 的 HTTP 网络库使用

* 放弃使用官方微信小程序自带发送请求 wx.request
* 某文件添加 request 拦截器,response 拦截器属性
* 为了单一文件里面放置 API 接口，以便调用

### 将 RESTful API 接口放入 Vuex 状态管理使用

* 因为小程序内部不支持手动刷新，为 Vuex 将 API 接口存储提供的
* 小程序本身没有像浏览器的 vue Devtools 插件可调试，Vuex 内置有日志插件，需手动添加的
* 通过 main.js 引入 store.js 实例化，同时 Vue 的原型上需手动添加$store 属性指向 store 对象

## 应用功能

* [x] 文章列表
* [x] 文章详情
* [x] 点赞功能
* [x] 页面滚动

## 执行命令

### installing

```bash
# 提前下载项目之后，然后进入目录
cd vue-applet

# 然后安装node_modules
npm install
```

### Run the application

```bash
# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建微信小程序
npm dev:wx

# 指定平台的打包构建
npm build:wx

# 生成 bundle 分析报告
npm run build --report
```
