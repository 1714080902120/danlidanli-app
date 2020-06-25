<template>
  <div id="privacy-policy">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">哔哩哔哩隐私政策</span>
      <div class="head-right" @click="openSheet()">
        <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
      </div>
    </div>
    <div class="main">
      <iframe class="frame" src="https://www.bilibili.com/blackboard/privacy-h5.html">
        <a
          href="https://www.bilibili.com/blackboard/privacy-h5.html"
        >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
    <div class="action-sheet">
      <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
    </div>
    <div class="modal" v-if="sheetVisible === true"></div>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      sheetVisible: false,
      actions: [{ name: "浏览器打开", method: this.goToNavigator }]
    };
  },
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href = "https://www.bilibili.com/blackboard/privacy-h5.html";
    }
  }
};
</script>

<style lang="less" scoped>
#privacy-policy {
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
    .head-right {
      position: relative;
      left: 3.6rem;
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
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
  .action-sheet {
    /deep/ .sheet {
      z-index: 9999 !important;
      background-color: var(--base-set-bg-color);
      /deep/ .mint-actionsheet-list {
        .mint-actionsheet-listitem {
          border-color: var(--base-set-bg-color);
          background-color: var(--base-set-item-color);
          &:last-child {
            height: 2.4rem;
            background-repeat: no-repeat;
            background-image: url("~assets/img/user/set/navigator_dark.svg");
            background-size: 1.2rem 1.2rem;
            background-position: 0.7rem 0.2rem;
            color: var(--color-text);
            font-size: 0.4rem;
            font-weight: lighter;
            text-align: left;
            padding-top: 1.2rem;
            padding-left: 0.4rem;
          }
        }
      }
      /deep/ .mint-actionsheet-button {
        border-color: var(--base-set-bg-color);
        font-weight: lighter;
        color: var(--color-text);
        background-color: var(--base-set-item-color);
      }
    }
  }
  .modal {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>