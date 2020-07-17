<template>
  <div id="big-member">
    <div class="head">
      <span class="back" @click="close()"></span>
      <span class="title" @click="close()">
        我的大会员
      </span>
    </div>
    <div class="main">
      <iframe class="frame" src="https://account.bilibili.com/account/big">
        <a
          href="https://account.bilibili.com/account/big"
        >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "BigMember",
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
#big-member {
  background-color: var(--base-item-color-white) !important;
  width: 10rem;
  height: 100vh;
  .head {
    position: sticky;
    top: 0;
    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      width: 1rem;
      height: 1rem;
      opacity: .6;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url('~assets/img/video/back_white.svg');
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
      margin-right: 4rem;
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
#big-member::-webkit-scrollbar {
  display: none;
}
</style>