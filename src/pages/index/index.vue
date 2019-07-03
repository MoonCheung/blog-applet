<template>
  <view>
    <nav-bar bgColor="bg-happyfisher"
             :isBack="false"
             :isWave="false">
      <template slot="content">MoonBlogs</template>
    </nav-bar>
    <van-tabs ref="change"
              custom-class="tab-header"
              swipeable
              animated
              color="#1976D2"
              swipeable="true"
              @change.prevent="chgApptCatg($event)">
      <van-tab :title="allTab">
        <scroll-view class="my-scroll"
                     scroll-y="true"
                     lower-threshold="50"
                     @scroll="onAllScroll"
                     :scroll-top="allScrollTop"
                     @scrolltolower="onAllToLower"
                     scroll-with-animation="true">
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
                      <text class="text-grey text-sm margin-right-xs">{{item.myAuthor.name}}</text>
                      <view class="text-gray text-df">
                        <text class="text-sm">发布于{{item.cdate}}</text>
                      </view>
                    </view>
                    <view class="text-content text-black text-bold text-df title">{{item.title}}</view>
                    <view class="text-gray text-content bg-white text-mycut">{{item.desc}}</view>
                    <view class="margin-top-sm flex justify-end">
                      <view class="text-myicon">
                        <text class="cuIcon-file text-gray text-sm">&nbsp;{{item.catg}}</text>
                        <text class="cuIcon-attention text-gray margin-left-sm text-sm">&nbsp;{{item.pv}}次围观</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="cu-load bg-gray"
                :class="allLoadMore"></view>
        </scroll-view>
        <!-- 固定滚动位置 -->
        <view class="my-widget"
              @click="goAllTop"
              v-show="allfloor">
          <view class="my-goTop">
            <text class="text-lg text-gray cuIcon-fold"></text>
          </view>
        </view>
      </van-tab>
      <van-tab v-for="(item,index) in tabbar"
               :title="item.categoryname"
               :key="index">
        <scroll-view class="my-scroll"
                     scroll-y="true"
                     lower-threshold="50"
                     @scroll="onApptScroll"
                     :scroll-top="apptScrollTop"
                     @scrolltolower="onApptToLower"
                     scroll-with-animation="true">
          <view class="cu-card dynamic">
            <view class="cu-item">
              <view class="cu-list menu-avatar comment solids-top">
                <view class="cu-item cardList radius shadow shadow-lg bg-white"
                      v-for="(apptItem, apptItemIndex) in apptartdata"
                      :key="apptItemIndex"
                      @click="goApptTitleDetail(apptItem.id)">
                  <view class="cu-avatar round">
                    <image class="cu-avatar round"
                           :src="apptItem.apptAuthor.avatar" />
                  </view>
                  <view class="content">
                    <view class="content-header">
                      <text class="text-grey text-sm margin-right-xs">{{apptItem.apptAuthor.name}}</text>
                      <view class="text-gray text-df">
                        <text class="text-sm">发布于{{apptItem.cdate}}</text>
                      </view>
                    </view>
                    <view class="text-content text-black text-bold text-df title">{{apptItem.title}}</view>
                    <view class="text-gray text-content bg-white text-mycut">{{apptItem.desc}}</view>
                    <view class="margin-top-sm flex justify-end">
                      <view class="text-myicon">
                        <text class="cuIcon-file text-gray text-sm">&nbsp;{{apptItem.catg}}</text>
                        <text class="cuIcon-attention text-gray margin-left-sm text-sm">&nbsp;{{apptItem.pv}}次围观</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="cu-load bg-gray"
                :class="apptLoadMore"></view>
        </scroll-view>
        <!-- 固定滚动位置 -->
        <view class="my-widget"
              @click="goApptTop"
              v-show="apptfloor">
          <view class="my-goTop">
            <text class="text-lg text-gray cuIcon-fold"></text>
          </view>
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import NavBar from '@/components/nav-bar'

export default {
  name: "ArtList",
  components: {
    NavBar
  },
  data () {
    return {
      artListdata: [],
      apptartdata: [],
      allfloor: false,
      apptfloor: false,
      page: 0,
      allpage: 0,
      allScrollTop: '',
      apptScrollTop: '',
      allTab: "全部",
      allmore: false,
      apptmore: false,
      tabbar: [],
      catgname: '',
    }
  },
  created () {
    // `this` 指向 vm 实例
    console.log(process.env.NODE_ENV)
  },
  // TODO: 除特殊情况之外，不建议使用小程序生命周期钩子
  computed: {
    allLoadMore () {
      return this.allmore ? 'loading' : 'over'
    },
    apptLoadMore () {
      return this.apptmore ? 'loading' : 'over'
    },
  },
  mounted () {
    this.getAllCatg();
    this.getArtsList(true);
  },
  methods: {
    //获取文章列表API
    getArtsList (init) {
      let self = this;
      if (init === true) {
        self.allpage = 0;
        self.allmore = true
      }
      let param = {
        allPage: self.allpage
      }
      wx.showNavigationBarLoading()
      // console.log(`getArtsList:`, param); //打印页数
      self.$store.dispatch('article/getAllArts', param).then(res => {
        if (res.artList.length <= 4) {
          self.allmore = false
        }
        if (init) {
          self.artListdata = res.artList;
        } else {
          // 下拉刷新，不能直接覆盖books,而是累加
          self.artListdata = self.artListdata.concat(res.artList);
        }
        wx.hideNavigationBarLoading();
      })
    },

    // 获取所有tab标签页API
    getAllCatg () {
      this.$store.dispatch('catg/getCatgLists').then(res => {
        if (res.code === 1) {
          this.tabbar = res.result
        }
      })
    },

    // 获取指定tab标签页文章列表API
    getApptCatg (chgcatg, init) {
      let self = this;
      if (init === true) {
        self.page = 0;
        self.apptmore = true;
      }
      let param = {
        catg: chgcatg,
        curPage: self.page
      }
      wx.showNavigationBarLoading()
      // console.log(`getApptCatg:`, param);//打印页数及指定标签栏
      self.$store.dispatch('article/getApptCatgLists', param).then(res => {
        if (res.apptArtList.length <= 4) {
          self.apptmore = false
        }
        if (init) {
          self.apptartdata = res.apptArtList
        }
        else {
          // 下拉刷新，不能直接覆盖books,而是累加
          self.apptartdata = self.apptartdata.concat(res.apptArtList);
        }
        wx.hideNavigationBarLoading();
      })
    },
    // 切换指定tab标签页
    chgApptCatg (event) {
      let self = this;
      let catg = event.mp.detail.title;
      self.catgname = catg;
      self.getApptCatg(catg, true);
    },
    // 触发全部文章scroll事件
    onAllScroll (e) {
      let self = this;
      if (e.mp.detail.scrollTop >= 500) {
        self.allfloor = true;
      } else {
        self.allfloor = false;
      }
    },
    //触发全部文章：scroll返回到顶部
    goAllTop () {
      let self = this;
      self.allScrollTop = 0;
      wx.pageScrollTo({
        scrollTop: self.allScrollTop,
        duration: 300
      })
      self.allScrollTop = ''
    },

    // 触发指定文章scroll事件
    onApptScroll (e) {
      let self = this;
      if (e.mp.detail.scrollTop >= 500) {
        self.apptfloor = true;
      } else {
        self.apptfloor = false;
      }
    },
    //触发指定文章：scroll返回到顶部
    goApptTop () {
      let self = this;
      self.apptScrollTop = 0;
      wx.pageScrollTo({
        scrollTop: self.apptScrollTop,
        duration: 300
      })
      self.apptScrollTop = ''
    },

    // 上滑全部文章加载更多
    onAllToLower () {
      let self = this;
      let allLoadMore = self.allmore;
      if (!allLoadMore) {
        return true;
      }
      self.allpage += 1
      setTimeout(() => {
        self.getArtsList()
      }, 500)
    },
    // 上滑指定标签文章加载更多
    onApptToLower () {
      let self = this;
      let apptLoadMore = self.apptmore;
      if (!apptLoadMore) {
        return true;
      }
      self.page += 1
      setTimeout(() => {
        self.getApptCatg()
      }, 500)
    },

    // 获取每个Title详情
    goTitleDetail (val) {
      this.$router.push({
        path: '/pages/detail/main',
        query: { id: val }
      })
    },
    // 获取指定标签栏每个Title详情
    goApptTitleDetail (val) {
      this.$router.push({
        path: '/pages/detail/main',
        query: { id: val }
      })
    }

    // 这是mpvue官方DEMO例子
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
.bg-happyfisher {
  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  color: #fff;
}
.tab-header {
  top: -1px;
}
// scroll-view滚动样式
.my-scroll {
  height: 100vh;
}
// 返回顶部
.my {
  &-widget {
    position: fixed;
    bottom: 62.5px;
    right: 15px;
    overflow: hidden;
    z-index: 500;

    .my-goTop {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
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
