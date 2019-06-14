<template>
  <view>
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
            <button open-type="share"
                    class="cu-btn bg-blue shadow-blur round">分享</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { formatTime } from '@/utils/index'
import wxParse from 'mpvue-wxparse'
import 'mpvue-wxparse/src/wxParse.css'
import './index.scss'

export default {
  name: "ArtDetl",
  components: {
    wxParse
  },
  data () {
    return {
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
  onShareAppMessage: (res) => {
    if (res.from !== "button") return false;
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: this.title,
      path: `/pages/detail/main?id=${this.apptId}`,
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  computed: {
    isLike () {
      return this.isLiked ? 'liked' : '';
    },
  },
  beforeMount () {
    console.log('hello beforeMount')
    this.aldyLikeArt();
  },
  mounted () {
    this.getArtDetl();
  },
  methods: {
    //指定ID文章详情接口
    getArtDetl () {
      let self = this;
      let id = self.$route.query.id
      self.isLiked = false;
      self.$store.dispatch('article/getArtDetls', { id }).then(res => {
        let uid;
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
          // if (self.isLiked == 'true') {
          //   likeSts.push(res.ArtDeilData.id)
          //   wx.setStorageSync('like', likeSts);
          // }
        }
      })
    },
    aldyLikeArt () {
      // let self = this;
      let id = this.$route.query.id;
      let isShow = this.isLiked  //false
      let cookie_id = wx.getStorageSync('like') || [];
      // if (cookie_id.includes(id)) {
      for (let j in cookie_id) {
        console.log(`for遍历:`, cookie_id[j]);
        if (cookie_id[j] === id) {
          isShow = true;
          this.isLiked = isShow;
          console.log(`aldyLikeArt:`, this.isLiked) //从控制台没有打印出来
        }
      }
      // }
    },
    // 改变点赞文章状态接口
    showLike (event) {
      //第二次改变点赞文章状态
      let self = this;
      let item_id = event.mp.currentTarget.dataset.id
      let cookie_id = wx.getStorageSync('like') || []
      if (self.apptId == item_id) {
        let num = self.like
        let isShow = self.isLiked
        // 用来判断一个数组是否包含一个指定的值;
        if (cookie_id.includes(item_id)) {   //已经点赞过，取消点赞
          for (let j in cookie_id) {
            console.log(`来自cookie_id的遍历`, cookie_id[j])
            if (cookie_id[j] == item_id) {
              cookie_id.splice(j, 1) //删除取消点赞的ID
            }
          }
          num -= 1; //点赞数减一
          isShow = false;
          self.isLiked = isShow;
          // self.like = num;
          let param = {
            id: item_id,
            like: num
          }
          console.log(`-1`, param)
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
          // self.like = num;
          let param = {
            id: item_id,
            like: num
          }
          console.log(`+1`, param)
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
    }
  }
}
</script>

