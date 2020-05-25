<template>
  <v-touch id="home-hot" ref="homeHot">
    <video src="http://39.106.222.159:4000/bilibili_data/home/recommend_2/BV1NZ4y1j7nw/BV1NZ4y1j7nw.mp4" controls :style="{ width: '100%', height: '100px' }"/>
  </v-touch>
</template>

<script>
export default {
  name: 'HomeHot',
  data() {
    return {
      
    }
  },
  watch: {
    immediate: true
  },
}
</script>

<style lang="less" scoped>
  #home-hot {
    overflow: hidden;
  }
</style>