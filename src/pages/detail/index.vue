<template>
  <view>
    <nav-bar bgColor="bg-rivercity"
             :isBack="true"
             :isWave="false"
             @onNavBar="goNavBack">
      <template slot="content">详情</template>
    </nav-bar>
    <scroll-view class="my-detlScroll"
                 scroll-y="true"
                 @scroll="onDetlScroll"
                 :scroll-top="detlScrollTop"
                 scroll-with-animation="true">
      <view class="cu-card article">
        <view class="cu-item shadow">
          <view class="cu-item">
            <view class="flex-sub text-center padding">
              <view class="text-lg">
                <text class="text-black">{{title}}</text>
              </view>
              <view class="text-sm text-grey">
                <text class="cuIcon-countdown margin-right-xs">&nbsp;{{cdate}}</text>
                <text class="cuIcon-file margin-right-xs">&nbsp;{{catg}}</text>
                <text class="cuIcon-attention">&nbsp;{{pv}}次浏览</text>
              </view>
            </view>
          </view>
          <view class="cu-item">
            <view class="content">
              <wx-parse className="my-wxParse"
                        :content="content"></wx-parse>
            </view>
          </view>
          <view class="cu-item my-item">
            <view class="content align-center">
              <text class="cuIcon-tagfill text-red margin-right-xs"></text>
              <text class="action"
                    v-for="(item, index) in tag"
                    :key="index">
                <text class="cu-tag radius margin-right-xs">{{item}}</text>
              </text>
            </view>
          </view>
          <view class="cu-item">
            <view class="my-liked"
                  :class="isLike">
              <view class="cu-avatar svg like"
                    @click="showLike"
                    :data-id="apptId">
                <view style="width: 80px;height: 40px;font-size: 30px;right: -40px;"
                      class="cu-tag badge">{{like}}</view>
              </view>
              <view class="svg h h-1"></view>
              <view class="svg h h-2"></view>
              <view class="svg h h-3"></view>
              <view class="svg h h-4"></view>
              <view class="svg h h-5"></view>
              <view class="svg h h-6"></view>
              <view class="svg h h-7"></view>
              <view class="svg h h-8"></view>
            </view>
          </view>
          <view class="cu-item">
            <view class="cu-bar btn-group">
              <!-- 暂时开发复制网址功能 -->
              <!-- <button class="cu-btn bg-blue shadow-blur round">复制网址</button> -->
              <button class="cu-btn bg-blue shadow-blur round">
                <navigator class="my-admire"
                           open-type="navigate"
                           target="miniProgram"
                           @fail="admireFail"
                           @success="admireSuc"
                           version="develop"
                           app-id="wx18a2ac992306a5a4"
                           path="pages/apps/largess/detail?id=DwzS6ATbps0%3D">赞赏</navigator>
              </button>
              <button open-type="share"
                      :data-id="shareId"
                      :data-title="shareTitle"
                      class="cu-btn bg-blue shadow-blur round">分享</button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 固定home以及scroll位置 -->
    <view class="my-homeWidget"
          @click="goTabBack">
      <view class="my-goHome">
        <text class="text-lg text-gray cuIcon-homefill"></text>
      </view>
    </view>
    <view class="my-detlWidget"
          @click="goDetlTop"
          v-show="detlfloor">
      <view class="my-goTop">
        <text class="text-lg text-gray cuIcon-fold"></text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/components/nav-bar'
import { formatTime } from '@/utils/index'
import wxParse from 'mpvue-wxparse'
import 'mpvue-wxparse/src/wxParse.css'
import './index.scss'

export default {
  name: "ArtDetl",
  components: {
    wxParse,
    NavBar
  },
  data () {
    return {
      detlScrollTop: '',
      detlfloor: false,
      title: '',
      content: '',
      catg: '',
      tag: '',
      cdate: '',
      pv: '',
      like: '',
      isLiked: false,
      apptId: ''
    }
  },
  //监听页面显示
  onShow () {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
  },
  // 转发分享功能
  onShareAppMessage: (res) => {
    let self = this;
    let id = res.target.dataset.id
    let title = res.target.dataset.title
    if (res.from !== "button") return false;
    return {
      title: title,
      path: `/pages/detail/main?id=${id}&isshare=1`,
    }
  },
  computed: {
    isLike () {
      return this.isLiked ? 'liked' : '';
    },
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      shareId: 'apptId',
      shareTitle: 'apptTitle'
    })
  },
  mounted () {
    this.getArtDetl();
    this.aldyLikeArt();
  },
  methods: {
    admireFail (err) {
      console.log(err);
    },
    admireSuc (res) {
      console.log(res);
    },
    // 返回index tabber页面
    goNavBack (data) {
      // 切换至 tabBar 页面
      this.$router.push({
        path: data,
        isTab: true
      })
    },
    // 指定ID文章详情接口
    getArtDetl () {
      let self = this;
      let id = self.$route.query.id;
      self.isLiked = false;
      self.$store.dispatch('article/getArtDetls', { id }).then(res => {
        if (res.code === 1) {
          self.apptId = res.ArtDeilData.id
          self.title = res.ArtDeilData.title
          self.catg = res.ArtDeilData.catg
          self.pv = res.ArtDeilData.pv
          self.like = res.ArtDeilData.like
          self.content = res.ArtDeilData.content
          self.tag = res.ArtDeilData.tag;
          let myDate = new Date(res.ArtDeilData.cdate)
          let formatDate = formatTime(myDate).split(' ')[0];
          self.cdate = formatDate;
        }
      })
    },
    // 已点赞状态的详情文章，aldy 缩写英文:already
    aldyLikeArt () {
      let self = this;
      let id = self.$route.query.id;
      let isShow = self.isLiked  //默认false
      let cookie_id = wx.getStorageSync('like') || [];
      for (let j in cookie_id) {
        if (cookie_id[j] == id) {
          isShow = true;
          self.isLiked = isShow;
        }
      }
    },
    // 改变点赞状态的详情文章
    showLike (event) {
      //第二次改变点赞文章状态
      let self = this;
      let item_id = event.mp.currentTarget.dataset.id
      let cookie_id = wx.getStorageSync('like') || []
      if (self.apptId == item_id) {
        let num = self.like
        let isShow = self.isLiked
        // 用来判断一个数组是否包含一个指定的值;
        // 已经点赞过，取消点赞
        if (cookie_id.includes(item_id)) {
          for (let j in cookie_id) {
            if (cookie_id[j] == item_id) {
              cookie_id.splice(j, 1) //删除取消点赞的ID
            }
          }
          num -= 1; //点赞数减一
          isShow = false;
          self.isLiked = isShow;
          let param = {
            id: item_id,
            like: num
          }
          // console.log(`-1`, param)
          wx.setStorageSync('like', cookie_id);
          //后台交互，后台数据同步
          self.$store.dispatch('article/chgLikeArt', param).then((res) => {
            if (res.code === 1) {
              self.like = res.result.like;
            }
          })
        } else {
          num += 1; //点赞数加一
          isShow = true;
          self.isLiked = isShow;
          let param = {
            id: item_id,
            like: num
          }
          // console.log(`+1`, param)
          //来自微信小程序的Storage
          cookie_id.unshift(item_id);   //新增赞的开头的id
          wx.setStorageSync('like', cookie_id);
          //后台交互，后台数据同步
          self.$store.dispatch('article/chgLikeArt', param).then((res) => {
            if (res.code === 1) {
              self.like = res.result.like;
            }
          })
        }
      }
    },
    // 跳转到tabbar页面
    goTabBack () {
      this.$router.push({
        path: '../index/main',
        isTab: true
      });
    },
    // 触发详情文章scroll事件
    onDetlScroll (e) {
      let self = this;
      if (e.mp.detail.scrollTop >= 400) {
        self.detlfloor = true;
      } else {
        self.detlfloor = false;
      }
    },
    // 触发scroll返回到顶部
    goDetlTop () {
      let self = this;
      self.detlScrollTop = 0;
      wx.pageScrollTo({
        scrollTop: self.detlScrollTop,
        duration: 300
      })
      self.detlScrollTop = ''
    }
  }
}
</script>

