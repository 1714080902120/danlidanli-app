<template>
  <v-touch id="home-live" ref="homeLive">
    testatastastastastas
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
    '$store.state.offSetX' (newVal) {     
      this.$refs.homeLive.$el.style.transform = `translateX(${newVal}px)`
    },
    immediate: true
  },
}
</script>

<style lang="less" scoped>
  #home-live {
  }
</style>