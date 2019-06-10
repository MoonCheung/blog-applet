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
                :class="{'liked': isLike}">
            <view class="cu-avatar svg like"
                  @click="showLike">
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
      isLike: false,
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
  mounted () {
    this.getArtDetl();
  },
  methods: {
    //指定ID文章详情接口
    getArtDetl () {
      let self = this;
      let id = self.$route.query.id
      self.$store.dispatch('article/getArtDetls', { id }).then(res => {
        if (res.code === 1) {
          self.apptId = res.ArtDeilData.id
          self.title = res.ArtDeilData.title
          self.catg = res.ArtDeilData.catg
          self.pv = res.ArtDeilData.pv + 1
          self.like = res.ArtDeilData.like
          self.content = res.ArtDeilData.content
          self.tag = res.ArtDeilData.tag;
          let myDate = new Date(res.ArtDeilData.cdate)
          let formatDate = formatTime(myDate).split(' ')[0];
          self.cdate = formatDate;
        }
      })
    },
    // 单击增加或者删除点赞文章接口
    showLike (event) {
      let self = this;
      let isShow = self.isLike
      if (isShow) {
        let param = {
          id: self.apptId,
          like: self.like
        }
        console.log(`del`, param)
        self.$store.dispatch('article/delLikeArt', param).then(res => {
          console.log(res);
          if (res.code === 1) {
            isShow = false;
            self.isLike = isShow;
            self.like -= 1;
          }
        })
      } else {
        let param = {
          id: self.apptId,
          like: self.like
        }
        console.log(`add`, param)
        self.$store.dispatch('article/addLikeArt', param).then(res => {
          console.log(res);
          if (res.code === 1) {
            isShow = true;
            self.isLike = isShow;
            self.like += 1;
          }
        })
      }
    }
  }
}
</script>

