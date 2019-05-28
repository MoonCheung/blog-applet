<template>
  <view>
    <view class="margin-tb-sm text-center">
      <button class="cu-btn round bg-red button-hover"
              role="button"
              aria-label=""
              aria-disabled="false">{{motto}}</button>
    </view>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-red margin-tb-sm lg"
              role="button"
              aria-label=""
              aria-disabled="false">{{motto1}}</button>

    </view>
    <van-button type="primary">按钮</van-button>
    <van-cell-group>
      <van-field :value="value"
                 placeholder="请输入用户名"
                 :border="false"
                 @change="onChange" />
    </van-cell-group>
  </view>
</template>

<script>
export default {
  data () {
    return {
      motto: 'ColorUI',
      motto1: '块级ColorUI',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      value: ''
    }
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    onChange (e) {
      // event.detail 为当前输入的值
      console.log(e.target);
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
</style>
