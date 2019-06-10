<template>
  <view>
    <van-tabs ref="change"
              custom-class="tab-header"
              swipeable
              animated
              color="#1976D2"
              swipeable="true"
              :active="active"
              @change.prevent="chgApptCatg($event)">
      <van-tab :title="allTab">
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
                      <text class="cuIcon-attention text-gray margin-left-sm text-sm">&nbsp;{{item.pv}}次围观</text>
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
      <van-tab v-for="(item,index) in tabbar"
               :title="item.categoryname"
               :key="index"
               :ref="tab">
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
                    <text class="text-grey text-sm">{{apptItem.apptAuthor.name}}</text>
                  </view>
                  <view class="text-content text-black text-bold text-df title">{{apptItem.title}}</view>
                  <view class="text-gray text-content bg-white text-mycut">{{apptItem.desc}}</view>
                  <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">
                      <text class="text-sm">发布于{{apptItem.cdate}}</text>
                    </view>
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
              :class="moreLoading"></view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
export default {
  name: "ArtList",
  data () {
    return {
      artListdata: [],
      apptartdata: [],
      page: 0,
      allTab: "全部",
      more: false,
      tabbar: [],
      catgname: '',
      active: 0,
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let self = this;
    if (!self.more) {
      return true;
    }
    switch (self.catgname) {
      case '前端':
        self.page += 1;
        self.getApptCatg();
        break;
      case '诗与远方':
        self.page += 1
        self.getApptCatg();
        break;
      case '技术心得':
        self.page += 1
        self.getApptCatg();
        break;
      case '后端':
        self.page += 1
        self.getApptCatg();
        break;
      default:
        self.page += 1;
        self.getArtsList();
        break;
    }
  },
  // TODO: 除特殊情况之外，不建议使用小程序生命周期钩子
  computed: {
    moreLoading () {
      return this.more ? 'loading' : 'over'
    },
  },
  mounted () {
    this.getAllCatg();
    this.getArtsList(this.allTab, true);
  },
  methods: {
    //获取文章列表API
    getArtsList (chgcatg, init) {
      let self = this;
      if (init === true || chgcatg === '全部') {
        self.page = 0;
        self.more = true
      }
      wx.showNavigationBarLoading()
      // console.log(self.page); //打印页数
      let param = {
        allPage: self.page
      }
      self.$store.dispatch('article/getAllArts', param).then(res => {
        if (res.artList.length <= 1) {
          self.more = false
        }
        if (init === true && chgcatg !== '全部') {
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

    //获取指定tab标签页文章列表API
    getApptCatg (chgcatg, init) {
      let self = this;
      if (init === true) {
        self.page = 0
        self.more = true
      }
      let param = {
        catg: chgcatg,
        curPage: self.page
      }
      wx.showNavigationBarLoading()
      // console.log(param);//打印页数及指定标签栏
      self.$store.dispatch('article/getApptCatgLists', param).then(res => {
        if (res.apptArtList.length <= 1) {
          self.more = false
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
    // //切换指定tab标签页
    chgApptCatg (event) {
      let self = this;
      let catg = event.mp.detail.title
      self.catgname = catg
      self.getArtsList(catg, true);
      self.getApptCatg(catg, true);
    },
    // //获取每个Title详情
    goTitleDetail (val) {
      this.$router.push({
        path: '/pages/detail/main',
        query: { id: val }
      })
    },
    //获取指定标签栏每个Title详情
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
