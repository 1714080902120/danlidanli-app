<template>
  <div id="B-card">
    <div class="head">
      <span class="back" @click="close()">‹</span>
      <span class="title" @click="close()">
        <img src="~assets/img/fans_follows/close_dark.svg" alt /> 大会员挂件
      </span>
    </div>
    <div class="main">
      <iframe class="frame" src="https://www.bilibili.com/blackboard/activity-jhccmob.html">
        <a
          href="https://www.bilibili.com/blackboard/activity-jhccmob.html"
        >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "BScore",
  data() {
    return {};
  },
  methods: {
    close() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
#B-card {
  background-color: var(--base-item-color-white) !important;
  width: 10rem;
  height: 17.7rem;
  .head {
    position: sticky;
    top: 0;
    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      padding-bottom: 0.1rem;
      margin: 0 0.5rem;
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
      img {
        width: 0.35rem;
        height: 0.35rem;
        margin-right: 0.2rem;
        padding-bottom: 0.05rem;
      }
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
#B-card::-webkit-scrollbar {
  display: none;
}
</style>