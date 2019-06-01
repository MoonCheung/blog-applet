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
              <text class="cuIcon-countdown">{{cdate}}</text>
              <text class="cuIcon-file">{{catg}}</text>
              <text class="cuIcon-attention">60次浏览</text>
            </view>
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <wx-parse :content="content"
                      @preview="preview"
                      @navigate="navigate"></wx-parse>
          </view>
        </view>
        <view class="cu-item">
          <text class="cu-tag radius">{{tag}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getArtDetls } from '@/api/index'
import { formatTime } from '@/utils/index'
import wxParse from 'mpvue-wxparse'
import 'mpvue-wxparse/src/wxParse.css';

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
          this.title = res.ArtDeilData.title
          this.catg = res.ArtDeilData.catg
          this.content = res.ArtDeilData.content
          this.tag = res.ArtDeilData.tag
          let myDate = formatTime(res.ArtDeilData.cdate)
          console.log(myDate);

        }
      })
    }
  }
}
</script>

<style>
</style>
