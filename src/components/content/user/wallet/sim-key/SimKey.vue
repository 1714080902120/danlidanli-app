<template>
  <div id="b-card">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title" @click="goBack()">
          <img src="~assets/img/fans_follows/close_dark.svg" alt /> 免流量服务
        </span>
      </div>
      <div class="content">
        <div class="content-swipe" @click="goTo()">
          <mt-swipe :show-indicators="false">
            <mt-swipe-item v-for="item in img" :key="item">
              <img :src="item" alt />
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="free-card">
          <div class="free-card-head">
            <span>免流卡</span>
            <span>客户端专属免流，超低资费，流量任性花</span>
          </div>
          <div class="free-card-content" @click="goTo()">
            <img src="~assets/img/wallet/B_card/B_card_mobile_1.png" alt />
            <img src="~assets/img/wallet/B_card/B_card_mobile_2.png" alt />
            <img src="~assets/img/wallet/B_card/B_card_mobile_3.png" alt />
          </div>
        </div>
        <div class="free-package">
          <div class="free-package-head">
            <span>免流包</span>
            <span>视频畅享，无需换号，即开即用</span>
          </div>
          <div class="free-package-content" @click="goTo()">
            <img src="~assets/img/wallet/B_card/B_card_mobile_4.png" alt />
            <img src="~assets/img/wallet/B_card/B_card_mobile_5.png" alt />
          </div>
        </div>
        <div class="free-service">
          <div class="free-service-head">
            <span>激活免流服务</span>
            <span>激活免流服务</span>
          </div>
          <div class="free-service-content" @click="goTo()">
            <img src="~assets/img/wallet/B_card/B_card_mobile_6.png" alt />
            <img src="~assets/img/wallet/B_card/B_card_mobile_7.png" alt />
            <img src="~assets/img/wallet/B_card/B_card_mobile_9.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="pop">
      <mt-popup class="pop-content" v-model="popupVisible" position="right">
        <div class="pop-content-head">
          <span class="back" @click="close()">‹</span>
          <span class="title" @click="close()">
            <img src="~assets/img/fans_follows/close_dark.svg" alt /> 免流量服务
          </span>
        </div>
        <div class="pop-content-main">
          <iframe class="frame" src="https://www.bilibili.com/blackboard/activity-unicomopen.html">
            <a
              href="https://www.bilibili.com/blackboard/activity-unicomopen.html"
            >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BCard",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      img: [
        require("assets/img/wallet/B_card/B_card_swipe_1.png"),
        require("assets/img/wallet/B_card/B_card_swipe_2.png"),
        require("assets/img/wallet/B_card/B_card_swipe_3.png"),
        require("assets/img/wallet/B_card/B_card_swipe_4.png"),
        require("assets/img/wallet/B_card/B_card_swipe_5.png")
      ]
    };
  },
  created() {
    this.isActive = true;
  },
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      let timer = setTimeout(() => {
        this.$router.replace({ path: "/wallet/" });
        clearTimeout(timer);
        timer = null;
      }, 300);
    },
    goTo() {
      this.popupVisible = true;
    },
    close () {
      this.popupVisible = false
    }
  }
};
</script>

<style lang="less" scoped>
#b-card {
  overflow: hidden;
  .inner {
    font-size: 0.45rem;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
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
      z-index: 99;
      .back {
        padding-left: 0.5rem;
        margin-right: 1rem;
      }
      .title {
        font-size: 0.45rem;
        display: flex;
        align-items: center;
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.3rem;
        }
      }
    }
    .content {
      overflow-y: scroll;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      .content-swipe {
        position: relative;
        height: 5rem;
        width: 10rem;
        margin: 0.2rem auto;
        img {
          margin: auto 0.5rem;
          width: 9rem;
        }
      }
      .free-card,
      .free-package,
      .free-service {
        display: flex;
        flex-direction: column;
        margin: 0 0.25rem;
        .free-card-head,
        .free-package-head,
        .free-service-head {
          margin: 0.2rem 0;
          span {
            font-size: 0.38rem;
            color: rgb(155, 155, 155);
            &:first-child {
              color: #000;
              font-size: 0.55rem;
              margin-right: 0.3rem;
            }
          }
        }
        .free-service-content {
          flex-direction: row;
          justify-content: space-around;
          margin: 0;
          img {
            width: 3rem;
            margin-right: 0.2rem;
            &:last-child {
              margin-right: 0rem;
            }
          }
        }
        img {
          margin: 0.1rem 0;
          width: 9.5rem;
          border: 0.02rem solid rgba(100, 100, 100, 0.1);
          border-radius: 0.3rem;
        }
      }
    }
  }
  .inner::-webkit-scrollbar {
    display: none;
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
  .pop {
    background-color: var(--base-item-color-white) !important;
    .pop-content {
      width: 10rem;
      height: 100vh;
      .pop-content-head {
        position: sticky;
        top: 0;
        height: 1.6rem;
        background-color: var(--base-bg-color-thr);
        display: flex;
        align-items: center;
        .back {
          padding-bottom: .1rem;
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
            padding-bottom: .05rem;
          }
        }
      }
      .pop-content-main {
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
  }
}
</style>