<template>
  <div id="loading-animate">
    <div class="loading">
      <img src="~assets/img/video/bbb.gif" alt />
      正在加载中
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingAnimate",
  props: {
    height: {
      type: String,
      default: "100vh"
    },
    position: {
      type: Object,
      default: () => {
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        };
      }
    },
    wAndH: {
      type: Object,
      default: () => {
        return {
          width: "4rem"
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#loading-animate {
  width: 10rem;
  height: 100vh;
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  .loading {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 5rem;
    }
  }
}
</style>