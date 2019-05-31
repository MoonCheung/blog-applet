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

## 应用功能

* [x] 某某某功能

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

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
# npm dev:swan
# npm dev:tt
# npm dev:my

# 指定平台的打包构建
npm build:wx
# npm build:swan
# npm build:tt
# npm build:my

# 生成 bundle 分析报告
npm run build --report
```
