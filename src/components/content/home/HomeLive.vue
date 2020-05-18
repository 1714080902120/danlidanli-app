<template>
  <v-touch id="home-live" ref="homeLive">
    <img src="https://i1.hdslb.com/bfs/face/97d3584ccde1a139f35b5d5c98d821d4a060484b.jpg@96w_96h_100Q_1c.webp" alt="">
  </v-touch>
</template>

<script>
export default {
  name: 'HomeLive',
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
  #home-live {
    overflow: hidden;
  }
</style>