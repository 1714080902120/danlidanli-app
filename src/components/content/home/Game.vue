<template>
  <div id="game">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">游戏中心</span>
    </div>
    <div class="main">
      <iframe class="frame" src="https://game.bilibili.com/?spm_id_from=333.851.b_696e7465726e6174696f6e616c486561646572.3">
        <a href="https://game.bilibili.com/?spm_id_from=333.851.b_696e7465726e6174696f6e616c486561646572.3">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "Game",
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$router.replace({ path: '/' })
    }
  }
};
</script>

<style lang="less" scoped>
#game {
  background-color: rgb(255, 255, 255);
  width: 10rem;
  height: 100vh;
  z-index: 9999;
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
  .main {
    .frame {
      overflow: hidden;
      width: 10rem;
      height: calc(100vh - 1.6rem);
    }
    .frame::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>