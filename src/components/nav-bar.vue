<template>
  <view>
    <view class="cu-custom"
          :style="[{height:CustomBar + 'px'}]">
      <view class="cu-bar fixed"
            :style="style"
            :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
        <view class="action"
              :data-share="isshare"
              @click="BackPage"
              v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="content nav-header"
              :style="[{top:StatusBar + 'px'}]">
          <slot name="content"></slot>
        </view>
        <slot name="right"></slot>
      </view>
      <view v-show="isWave">
        <image class="gif-black response git-wave"
               src="/static/images/wave.gif"
               mode="scaleToFill"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "NavBar",
  data () {
    return {
      StatusBar: '',
      CustomBar: '',
      Custom: '',
      isshare: 0,
      preRouter: '../index/main' // TODO: 相对路径，注意文件的层级关系
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: '',
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    isWave: {
      type: [Boolean],
      default: false
    }
  },
  //监听页面加载
  onLoad () {
    let self = this;
    let query = self.$root.$mp.query
    self.isshare = query.isshare
  },
  //计算属性，用来数据结果被缓存
  computed: {
    style () {
      let StatusBar = this.StatusBar;
      let CustomBar = this.CustomBar;
      let bgImage = this.bgImage;
      let style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style
    }
  },
  beforeMount () {
    let self = this;
    wx.getSystemInfo({
      success (system) {
        // console.log(`system:`, system);
        self.StatusBar = system.statusBarHeight; //20
        if (system.platform == 'android') {
          self.CustomBar = system.statusBarHeight + 50;
        } else {
          self.CustomBar = system.statusBarHeight + 45;
        };
        // 获取菜单按钮（右上角胶囊按钮）的布局位置信息
        let custom = wx.getMenuButtonBoundingClientRect();
        self.Custom = custom
        self.CustomBar = custom.bottom + custom.top - system.statusBarHeight;
      }
    });
  },
  methods: {
    // 返回路由
    BackPage (event) {
      let self = this;
      let share = event.mp.currentTarget.dataset.share
      // 判断是否有分享页面，有则返回首页
      if (Object.is(share, self.isshare)) {
        self.$emit('onNavBar', self.preRouter)
      } else {
        // 关闭当前页面，返回上一页面
        self.$router.back(1);
      }
    }
  },
}
</script>

<style lang="scss">
.cu-custom {
  position: relative;

  .git-wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 9999;
    mix-blend-mode: screen;
    height: 50px;
  }
}
</style>
