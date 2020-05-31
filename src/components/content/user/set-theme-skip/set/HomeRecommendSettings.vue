<template>
  <div id="home-recommend-settings">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">哔哩哔哩用户协议</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendSettings",
  data() {
    return {};
  },
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    }
  }
};
</script>

<style lang="less" scoped>
#home-recommend-settings {
  background-color: rgb(255, 255, 255);
  width: 10rem;
  height: 100vh;
  .head {
    position: relative;

    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      margin: 0 0.5rem;
      img {
        width: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
    }
  }
}
</style>