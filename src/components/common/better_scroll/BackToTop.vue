<template>
  <div id="back-to-top" v-if="show">
    <img src="~assets/img/scroll/img-to-top.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    show: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  #back-to-top {
    position: fixed;
    right: 4px;
    top: 78%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
</style>