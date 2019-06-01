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
                    v-for="(item,index) in artListdata"
                    :key="index"
                    @click="goTitleDetail(item.id)">
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
                      <text class="cuIcon-file text-gray text-sm">&nbsp;{{item.catg}}</text>
                      <text class="cuIcon-attention text-gray margin-left-sm text-sm">&nbsp;1次围观</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="cu-load bg-gray"
              :class="moreLoading"></view>
      </van-tab>
      <van-tab title="标签2">内容 2</van-tab>
    </van-tabs>
  </view>
</template>

<script>
import { getAllArts } from '@/api/index'

export default {
  name: "ArtList",
  data () {
    return {
      artListdata: [],
      page: 0,
      more: true
    }
  },
  onReachBottom () {
    let self = this;
    if (!self.more) {
      return false
    }
    self.page = self.page + 1;
    self.getArtsList();
  },
  // TODO: 除特殊情况之外，不建议使用小程序生命周期钩子
  computed: {
    moreLoading () {
      return this.more ? 'loading' : 'over'
    }
  },
  mounted () {
    this.getArtsList(true);
  },
  methods: {
    //获取文章列表API
    getArtsList (init) {
      if (init === true) {
        this.page = 0;
        this.more = true
      }
      wx.showNavigationBarLoading()
      getAllArts({ curPage: this.page }).then(res => {
        if (res.artList.length <= 0) {
          this.more = false
        }
        if (init) {
          this.artListdata = res.artList;
        } else {
          // 下拉刷新，不能直接覆盖books,而是累加
          this.artListdata = this.artListdata.concat(res.artList);
        }
        wx.hideNavigationBarLoading();
      })
    },
    //获取每个Title详情
    goTitleDetail (val) {
      this.$router.push({
        path: '/pages/detail/main',
        query: { id: val }
      })
    },
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
