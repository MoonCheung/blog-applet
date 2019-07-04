<template>
  <view>
    <nav-bar bgColor="bg-seashore"
             :isBack="true"
             :isWave="false">
      <template slot="backText">返回</template>
      <template slot="content">关于</template>
    </nav-bar>
    <view class="cu-list menu card-menu margin-top">
      <view class="cu-item">
        <view class="content text-center">
          <text class="text-grey text-lg">关于我</text>
        </view>
      </view>
      <view class="cu-item my-item">
        <view class="content">
          <text class="text-black text-df">
            90后开发者,该小程序属于博客小程序,同时也在Github开源这个代码,随时关注技术文章,个人生活
          </text>
        </view>
      </view>
      <view class="cu-item my-item">
        <view class="content">
          <text class="text-black text-df">
            喜欢日本动漫,技术书籍,登山,旅行,下厨
          </text>
        </view>
      </view>
      <view class="cu-item my-item">
        <view class="content">
          <text class="text-black text-df">
            了解Vue,React技术栈等这些前端领域,对代码有一些洁癖
          </text>
        </view>
      </view>
      <view class="cu-item my-item">
        <view class="content">
          <text class="text-black text-df">
            博客风格:简约至上
          </text>
        </view>
      </view>
      <view class="cu-item my-item">
        <view class="content margin-bottom-sm">
          <text class="text-black text-df">
            博客愿景:和更多朋友们一起学习进步,分享内容
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
.cu {
  &-list.menu > &-item:after {
    border-bottom: none;
  }
  &-list.menu > &-item {
    .content {
      overflow: hidden;
      line-height: 1.4em;
    }
  }
  &-list.menu > &-item.my-item {
    max-height: 60px;
    min-height: 35px;
  }
}
</style>
