<template>
  <view>
    <nav-bar bgColor="bg-seashore"
             :isBack="true"
             :isWave="false">
      <template slot="backText">返回</template>
      <template slot="content">关于</template>
    </nav-bar>
    <view class="cu-card article">
      <view class="cu-item shadow">
        <view class="title flex-sub text-center">
          <text class="text-grey text-lg">关于我</text>
        </view>
        <view class="content">
          <text class="text-black text-df">
            嘿！该小程序属于个人博客,随时关注技术文章,个人生活,不懂欢迎过来看看可分享文章!
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/components/nav-bar'

export default {
  name: 'Intro',
  components: {
    NavBar
  },
}
</script>

<style lang="scss">
.bg-seashore {
  background-image: linear-gradient(to top, #209cff 0%, #68e0cf 100%);
  color: #fff;
}
</style>
