<template>
  <div id="wallet-main">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">我的钱包</span>
      </div>
      <div class="middle">
        <div class="first">
          <div
            class="item"
            v-for="(item, index) in middleItems"
            :key="item.name"
            @click="goTo(index)"
          >
            <span>
              <img :src="item.img" alt />
            </span>
            <span>{{ item.num }}</span>
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="doc" @click="goToThird()">
          <img src="~assets/img/wallet/doc.svg" alt />账单记录
          <span>›</span>
        </div>
      </div>
      <div class="swipe">
        <mt-swipe class="mt-swipe" :show-indicators="false">
          <mt-swipe-item v-for="item in swipe" :key="item">
            <a href="https://big.bilibili.com/mobile/cardBag?from=purse">
              <img :src="item" alt />
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="footer">
        <div class="first">钱包服务</div>
        <div class="sec">
          <div
            class="item"
            v-for="(item, index) in footerItems"
            :key="item.name"
            @click="goToTwo(index)"
          >
            <span>
              <img :src="item.img" alt />
            </span>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "WalletMain",
  data() {
    return {
      middleItems: [
        {
          img: require("assets/img/wallet/B_coin.png"),
          num: "0.3",
          name: "B币"
        },
        {
          img: require("assets/img/wallet/B_bell.png"),
          num: "4.3",
          name: "贝壳"
        },
        {
          img: require("assets/img/wallet/B_score.png"),
          num: "0",
          name: "积分"
        },
        {
          img: require("assets/img/wallet/B_discount.png"),
          num: "-",
          name: "优惠券"
        }
      ],
      swipe: [
        require("assets/img/wallet/B_swipe_1.png"),
        require("assets/img/wallet/B_swipe_2.png"),
        require("assets/img/wallet/B_swipe_3.png")
      ],
      footerItems: [
        {
          img: require("assets/img/wallet/red-packet.svg"),
          name: "邀新红包"
        },
        {
          img: require("assets/img/wallet/simkey.svg"),
          name: "免流卡"
        },
        {
          img: require("assets/img/wallet/card.svg"),
          name: "信用卡申请"
        },
        {
          img: require("assets/img/wallet/package.svg"),
          name: "漫画卡券包"
        }
      ],
      isActive: false
    };
  },
  created() {},
  activated() {
    this.isActive = true;
  },
  methods: {
    goBack() {
      this.isActive = false;
      let timer = setTimeout(() => {
        this.$router.replace({ path: this.$route.params.beforePath });
        clearTimeout(timer);
        timer = null;
      }, 300);
    },
    goTo(i) {
      const beforePath = this.$route.path;
      switch (i) {
        case 0:
          this.$router.replace({
            path: "/wallet/b-coin",
            query: {
              beforePath
            }
          });
          break;
        case 1:
          this.$router.push({
            path: "/wallet/b-bell",
            query: {
              beforePath
            }
          });
          break;
        case 2:
          this.$router.push({
            path: "/wallet/b-score"
          });
          break;
        case 3:
          this.$router.push({
            path: "/wallet/b-discount",
            query: {
              beforePath
            }
          });
          break;
      }
    },
    goToTwo(i) {
      const beforePath = this.$route.path;
      switch (i) {
        case 0:
          this.$router.push({
            path: "/wallet/red-packet",
            query: {
              beforePath
            }
          });
          break;
        case 1:
          this.$router.push({
            path: "/wallet/sim-key",
            query: {
              beforePath
            }
          });
          break;
        case 2:
          this.$router.push({ path: "/wallet/b-card" });
          break;
        case 3:
          this.$router.push({
            path: "/wallet/b-package",
            query: {
              beforePath
            }
          });
          break;
      }
    },
    goToThird() {
      const beforePath = this.$route.path;
      this.$router.push({
        path: "/wallet/b-consumer",
        query: {
          beforePath
        }
      });
    }
  },
  destroyed() {
    this.isActive = false;
  }
};
</script>

<style lang="less" scoped>
#wallet-main {
  position: relative;
  .inner {
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
    overflow: hidden;
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .head {
      display: flex;
      align-items: center;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-bg-color-thr);
      margin-bottom: 0.2rem;
      .back {
        padding-left: 0.5rem;
      }
      .title {
        flex: auto;
        font-size: 0.55rem;
        padding-right: 1rem;
      }
    }
    .middle {
      margin: 0 0.1rem;
      font-size: 0.33rem;
      display: flex;
      flex-direction: column;
      border-radius: 0.3rem;
      background-color: var(--base-bg-color-thr);
      .first {
        display: flex;
        flex: auto;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 0.2rem;
        .item {
          span {
            font-weight: lighter;
            margin: 0.3rem 0;
            img {
              width: 1.2rem;
              height: 1.2rem;
              box-shadow: 0 0.1rem 0.4rem rgba(228, 228, 121, 0.2);
              border-radius: 100%;
            }
            &:nth-child(2) {
              font-weight: bold;
              font-size: 0.5rem;
              margin-top: -0.1rem;
            }
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }
      .doc {
        display: flex;
        align-items: center;
        font-size: 0.4rem;
        font-weight: lighter;
        margin-left: 0.5rem;
        height: 1.3rem;
        line-height: 1.3rem;
        border-top: 0.01rem solid rgb(83, 83, 83);
        img {
          width: 0.7rem;
          height: 0.7rem;
          margin-right: 0.3rem;
        }
        span {
          font-size: 0.6rem;
          flex: auto;
          text-align: right;
          padding-right: 1rem;
        }
      }
    }
    .swipe {
      margin: 0.22rem 0.1rem;
      .mt-swipe {
        height: 3rem;
        img {
          border-radius: 0.2rem;
          width: 10rem;
        }
      }
    }
    .footer {
      margin: -0.4rem 0.1rem 0 0.1rem;
      font-size: 0.33rem;
      background-color: var(--base-bg-color-thr);
      border-radius: 0.3rem;
      .first {
        font-size: 0.5rem;
        margin-left: 0.5rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: 0.01rem solid rgb(83, 83, 83);
      }
      .sec {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 0.5rem;
          span {
            margin: 0.2rem 0;
            img {
              margin-top: 0.3rem;
              width: 1rem;
              height: 1rem;
            }
          }
        }
      }
    }
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
}
</style>