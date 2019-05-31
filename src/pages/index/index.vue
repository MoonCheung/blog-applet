<template>
  <view>
    <van-tabs custom-class="tab-header"
              swipeable
              animated
              color="blue"
              swipeable="true">
      <van-tab title="全部">
        <view class="cu-card dynamic">
          <view class="cu-item">
            <view class="cu-list menu-avatar comment solids-top">
              <view class="cu-item cardList radius shadow shadow-lg bg-white"
                    @click="goTitleDetail"
                    v-for="(item, index) in artListdata"
                    :key="index">
                <view class="cu-avatar round">
                  <image class="cu-avatar round"
                         :src="item.myAuthor.avatar" />
                </view>
                <view class="content">
                  <view class="content-header">
                    <text class="text-grey text-sm">{{item.myAuthor.name}}</text>
                  </view>
                  <view class="text-content text-black text-bold text-df title">{{item.title}}</view>
                  <view class="text-gray text-content bg-white text-mycut">{{item.desc}}</view>
                  <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">
                      <text class="text-sm">发布于{{item.cdate}}</text>
                    </view>
                    <view class="text-myicon">
                      <text class="cuIcon-tagfill text-gray text-sm">&nbsp;{{item.catg}}</text>
                      <text class="cuIcon-attentionfill text-gray margin-left-sm text-sm">&nbsp;1次围观</text>
                    </view>
                  </view>
                </view>
              </view>

            </view>
          </view>
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
import { getAllArts } from '@/api/index'

export default {
  data () {
    return {
      artListdata: []
    }
  },
  onLoad () {
    getAllArts().then(res => {
      let self = this;
      self.artListdata = res.artList
    })
  },
  methods: {
    goTitleDetail (event) {
      console.log(event)
    }
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
.content {
  .text-mycut {
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.solids-top {
  background-color: #f1f1f1;
  top: -0.5px;

  .cardList {
    &:first-of-type {
      margin-top: 0;
    }
    margin-top: 10px;
  }
  .radius {
    border-radius: 6px;
  }
}
</style>
