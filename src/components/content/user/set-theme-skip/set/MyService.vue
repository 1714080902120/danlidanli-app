<template>
  <div id="my-service">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">我的客服</span>
    </div>
    <div class="main">
      <iframe class="frame" src="https://www.bilibili.com/v/customer-service">
        <a href="https://www.bilibili.com/v/customer-service">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyService",
  data() {
    return {};
  },
  methods: {
    closeService () {
      this.$Bus.$emit('closeSetPopup')
    }
  },
};
</script>

<style lang="less" scoped>
#my-service {
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
  .main {
    .frame {
      overflow: hidden;
      width: 10rem;
      height: 16.3rem;
    }
    .frame::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>