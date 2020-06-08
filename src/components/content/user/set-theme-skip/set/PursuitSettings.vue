<template>
  <div id="pursuit-settings">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">追番设置</span>
    </div>
    <div class="content">
      <li v-waves>
        <div class="left">
          <span>修仙模式</span>
          <span>开启后深夜0点-6点的动画将在前一天展示</span>
        </div>
        <mt-switch class="content-switch" v-model="value"></mt-switch>
      </li>
      <img src="~assets/img/user/set/sleep-mode.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "PursuitSettings",
  data() {
    return {
      value: false
    };
  },
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    }
  }
};
</script>

<style lang="less" scoped>
#pursuit-settings {
  background-color: rgb(27, 27, 27);
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
  .content {
    li {
      padding: 0 0.3rem;
      height: 1.4rem;
      list-style: none;
      background-color: var(--base-set-item-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.1);
      .left {
        display: flex;
        flex-direction: column;
        span {
          &:last-child {
            font-size: 0.3rem;
            opacity: 0.9;
            margin-top: 0.1rem;
          }
        }
      }
      .right {
        font-size: 0.3rem;
        opacity: 0.5;
        &::after {
          content: "〉";
          margin-left: 0.2rem;
          opacity: 0.5;
        }
      }
      .content-switch {
        margin-right: 0.3rem;
        /deep/ .mint-switch-core {
          height: 0.4rem;
          width: 0.8rem;
          background-color: var(--color-tint);
          border-color: var(--color-tint);
          opacity: 0.7;
          &::before {
            width: 0.8rem;
            height: 0.4rem;
            background-color: #fff !important;
            border-color: #fff !important;
            top: -0.02rem;
          }
          &::after {
            width: 0.55rem;
            height: 0.55rem;
            background-color: var(--color-tint);
            left: -0.2rem;
            top: -0.1rem;
          }
        }
      }
    }
    img {
      width: 10rem;
    }
  }
}
</style>