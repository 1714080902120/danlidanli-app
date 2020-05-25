<template>
  <div id="B-coin">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">B币钱包</span>
        <span class="detail" @click="goTo()">明细</span>
      </div>
      <div class="content">
        <div class="title">总余额</div>
        <img src="~assets/img/wallet/B_coin/B_coin_inner.png" alt />
        <div class="num">0.3</div>
        <div class="item">
          <div class="now">
            <span>可用余额</span>
            <span>0.3 B币</span>
          </div>
          <div class="froze">
            <span>
              不可用余额
              <img src="~assets/img/wallet/B_bell/question.svg" alt @click="ask()" />
            </span>
            <span>0.0 B币</span>
          </div>
        </div>
      </div>
      <div class="footer" @click="take()">立即充值</div>
    </div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="middle">
        <img src="~assets/img/wallet/B_coin/B_coin_alert.png" @click="close()" alt />
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BCoin",
  data() {
    return {
      isActive: false,
      popupVisible: false,
    };
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
    ask() {
      this.popupVisible = true;
    },
    close() {
      this.popupVisible = false;
    },
    goTo() {
      this.$router.push({ path: "/wallet/b-coin-detail" });
    },
    take() {
      this.$router.push({ path: "/wallet/b-coin-recharge" });
    }
  }
};
</script>

<style lang="less" scoped>
#B-coin {
  position: relative;
  .inner {
    color: rgb(155, 153, 153);
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
    background-color: var(--base-bg-color-sec);
    height: 100vh;
    .head {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      background-color: var(--base-bg-color-thr);
      margin-bottom: 0.2rem;
      z-index: 99;
      border-bottom: 0.01rem solid rgb(36, 35, 35);
      .back {
        padding-left: 0.5rem;
      }
      .title {
        font-size: 0.45rem;
        display: flex;
        text-align: center;
        align-items: center;
        img {
          margin-left: 0.1rem;
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .detail {
        font-size: 0.4rem;
        color: rgb(128, 126, 126);
        padding-right: 0.2rem;
      }
    }
    .content {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.4rem;
      .title {
        font-size: 0.4rem;
      }
      img {
        width: 5rem;
        height: 5rem;
      }
      .num {
        margin-top: 0.5rem;
        font-size: 1.3rem;
        color: var(--color-tint);
      }
      .item {
        margin-top: 1rem;
        font-size: 0.4rem;
        display: flex;
        height: 2rem;
        width: 9rem;
        border: 0.05rem solid rgba(24, 23, 23, 0.2);
        background-color: var(--base-bg-color-thr);
        border-radius: 0.3rem;
        .now,
        .froze {
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            margin: 0.1rem 0;
            &:first-child {
              font-size: 0.4rem;
              color: rgba(255, 255, 255, 0.2);
            }
            &:last-child {
              font-size: 0.5rem;
            }
          }
        }
        .now {
          margin-left: 0.3rem;
        }
        .froze {
          margin-right: 0.3rem;
          span {
            display: flex;
            align-items: center;
          }
          img {
            margin-left: 0.05rem;
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
    .footer {
      margin-top: 3rem;
      margin-left: 0.5rem;
      font-size: 0.5rem;
      border-radius: 0.2rem;
      width: 9rem;
      height: 1.2rem;
      line-height: 1.2rem;
      background-color: var(--color-tint);
      text-align: center;
      color: rgb(223, 219, 219);
    }
  }
  .active {
    transition: .3s ease-in-out;
    transform: translateX(0rem);
  }
  .popup {
    .pop {
      background-color: transparent !important;
      border-radius: 0.2rem 0.2rem 0 0 !important;
      img {
        position: relative;
        width: 8rem;
      }
    }
  }
}
</style>