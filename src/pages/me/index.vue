<template>
  <view>
    <nav-bar bgColor="myNavBar"
             bgImage="/static/images/me.jpeg"
             :isBack="false"
             :isWave="true">
      <block slot="content">关于</block>
    </nav-bar>
    <view class="cu-list menu card-menu margin-top">
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-github text-black"></text>
          <text class="text-grey"
                @click="CopyUrl">Github</text>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-writefill text-blue"></text>
          <button class="cu-btn my-btn bg-white"
                  role="button"
                  open-type="feedback">
            <text class="text-grey">意见反馈</text>
          </button>
        </view>
      </view>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-peoplefill text-grey"></text>
          <text class="text-grey">关于我</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/components/nav-bar'

export default {
  name: 'Me',
  components: {
    NavBar
  },
  data () {
    return {
      GithubUrl: 'https://github.com/MoonCheung'
    }
  },
  methods: {
    CopyUrl: function () {
      wx.setClipboardData({
        data: this.GithubUrl,
        success: function (res) {
          wx.showToast({
            title: '已复制',
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">
.cu-custom {
  min-height: 240px;
  .myNavBar {
    min-height: 240px;
  }
}
.cu-btn.my-btn {
  padding-left: 0;
}
</style>
