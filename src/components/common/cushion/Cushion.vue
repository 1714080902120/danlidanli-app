<template>
  <div id="cushion">
    <div class="content">
      <img src="~assets/img/video/bbb.gif" alt />
      <div class="text">正在缓冲...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cushion",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#cushion {
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    img {
      width: 2rem;
    }
    .text {
      font-size: 0.25rem;
      margin-top: 0.2rem;
      color: #fff;
      @media screen and (orientation:landscape) {
        font-size: .2rem;
        }
    }
  }
}
</style>