<template>
  <view>
    <van-tabs custom-class="tab-header"
              swipeable
              animated
              color="blue"
              swipeable="true">
      <van-tab title="标签1">
        <view class="cu-item shadow">

        </view>
      </van-tab>
      <van-tab title="标签2">内容 2</van-tab>
      <van-tab title="标签3">内容 3</van-tab>
      <van-tab title="标签5">内容 5</van-tab>
      <van-tab title="标签6">内容 6</van-tab>
      <van-tab title="标签7">内容 7</van-tab>
    </van-tabs>
  </view>
</template>

<script>
import { getAllArts } from '@/api/article'

export default {
  data () {
    return {
    }
  },
  onLoad () {
    getAllArts().then(res => {
      console.log(res)
    })
  },
  methods: {
    // bindViewTap () {
    //   const url = '../logs/main'
    //   if (mpvuePlatform === 'wx') {
    //     mpvue.switchTab({ url })
    //   } else {
    //     mpvue.navigateTo({ url })
    //   }
    // },
    // clickHandle (ev) {
    //   console.log('clickHandle:', ev)
    //   // throw {message: 'custom test'}
    // },
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss">
.tab-header {
  top: -1px;
}
</style>
