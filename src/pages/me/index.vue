<template>
  <view>
    <nav-bar bgColor="myNavBar"
             bgImage="https://img.ikmoons.com/bg.jpeg"
             :isBack="false"
             :isWave="true">
      <template slot="content">
        <view class="cu-avatar round xl"
              style="margin-left: 0;">
          <open-data class='myAvatar'
                     type='userAvatarUrl'></open-data>
        </view>
        <!-- <button class="cu-btn my-header"
                open-type="getUserInfo"
                @getuserinfo="toLogin"
                lang="zh_CN"
                role="button">
          <text class="cuIcon-people text-sl"></text>
        </button> -->
      </template>
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
          <text class="text-grey"
                @click="toSelfIntro">关于我</text>
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
    // 复制github方法
    CopyUrl: function () {
      wx.setClipboardData({
        data: this.GithubUrl,
        success: function (res) {
          wx.showToast({
            title: '已复制',
          });
        }
      })
    },
    // 跳转到关于我页面的
    toSelfIntro () {
      this.$router.push({
        path: '/pages/intro/main'
      })
    },
    //登录头像
    toLogin () { },
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
.content.nav-header {
  height: 80px;
  .cu-avatar:first-child {
    margin-left: 0;
  }

  .cu-avatar {
    .myAvatar {
      height: 64px;
      width: 64px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .my-header {
    background-color: #ccc;
    border-radius: 500px;
    height: 64px;
    width: 64px;
    color: #fff;
  }
}
</style>
