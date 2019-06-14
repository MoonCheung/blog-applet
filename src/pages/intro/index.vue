<template>
  <view>
    <nav-bar bgColor="bg-gradual-blue"
             :isBack="true"
             :isWave="false">
      <template slot="backText">返回</template>
      <template slot="content">关于</template>
    </nav-bar>

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
