<template>
  <div id="B-package">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">漫画卡券包</span>
      </div>
      <div class="content-head">
        <img src="~assets/img/wallet/B_com/B_com_1.png" alt />
        <div>
          已有漫读券：
          <span>0</span>
        </div>
      </div>
      <div class="content-main">
        <img src="~assets/img/wallet/B_com/B_com_2.png" alt />
        暂无卡卷
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BPacket",
  data() {
    return {
      isActive: false
    };
  },
  created() {
    this.isActive = true;
  },
  activated() {
    this.isActive = true
  },
  methods: {
    goBack() {
      this.isActive = false;
      this.$router.replace({ path: "/wallet/" });
    }
  }
};
</script>

<style lang="less" scoped>
#B-package {
  .inner {
    font-size: 0.45rem;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-item-color-white);
    height: 100vh;
    .head {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-bg-color-thr);
      justify-content: space-between;
      z-index: 99;
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
        font-size: 0.45rem;
        display: flex;
        text-align: center;
        align-items: center;
        margin-right: 4rem;
      }
    }
    .content-head {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-left: 0.5rem;
      img {
        margin: 0.5rem 0;
        width: 9rem;
        height: 2rem;
      }
      span {
        color: #000;
      }
    }
    .content-main {
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 3rem;
      img {
        margin: auto;
        width: 7rem;
        margin-bottom: 0.5rem;
      }
    }
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
}
</style>