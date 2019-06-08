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
              <text class="cuIcon-attention">&nbsp;60次浏览</text>
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
                :class="{'liked': !isShow}">
            <view class="cu-avatar svg like"
                  @click="showLike">
              <view style="width: 80px;height: 40px;font-size: 30px;right: -40px;"
                    class="cu-tag badge">1</view>
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
import { getArtDetls } from '@/api/index'
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
      isShow: false,
      shareId: ''
    }
  },
  onShareAppMessage: (res) => {
    if (res.from !== "button") return false;
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: this.title,
      path: `/pages/detail/main?id=${this.shareId}`,
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
    getArtDetl () {
      let id = this.$route.query.id
      getArtDetls({ id }).then(res => {
        if (res.code === 1) {
          this.shareId = res.ArtDeilData.id
          this.title = res.ArtDeilData.title
          this.catg = res.ArtDeilData.catg
          this.content = res.ArtDeilData.content
          this.tag = res.ArtDeilData.tag;
          let myDate = new Date(res.ArtDeilData.cdate)
          let formatDate = formatTime(myDate).split(' ')[0];
          this.cdate = formatDate;
        }
      })
    },
    // 单击添加删除class名
    showLike () {
      this.isShow = !this.isShow;
    }
  }
}
</script>

