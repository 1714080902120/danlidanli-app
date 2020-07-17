<template>
  <div id="B-bell">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">
          贝壳账户
          <img src="~assets/img/wallet/B_bell/question.svg" alt @click="ask(0)" />
        </span>
        <span class="detail" @click="goTo()">明细</span>
      </div>
      <div class="content">
        <div class="title">账户余额</div>
        <img src="~assets/img/wallet/B_bell/B_bell_inner.png" alt />
        <div class="num">4.30</div>
        <div class="item">
          <div class="now">
            <span>可提现余额</span>
            <span>4.30贝壳</span>
          </div>
          <div class="froze">
            <span>
              冻结账户余额
              <img src="~assets/img/wallet/B_bell/question.svg" alt @click="ask(1)" />
            </span>
            <span>0.00贝壳</span>
          </div>
        </div>
      </div>
      <div class="footer" @click="take()">提现</div>
    </div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="bottom">
        <div class="title">
          <span class="word">{{ popupTitle }}</span>
          <img src="~assets/img/fans_follows/close_dark.svg" @click="close()" alt />
        </div>
        <div class="content">{{ popupContent }}</div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BBell",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      popupContent: "",
      popupTitle: ""
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
      this.$router.replace({ path: "/wallet/" });
    },
    ask(i) {
      if (i === 0) {
        this.popupTitle = "什么是贝壳账户";
        this.popupContent =
          "用户在站内获得的收益（包括直播打赏、充电、参加活动获得的奖励等）可转化为贝壳，贝壳可以转出提现";
      } else {
        this.popupTitle = "什么是冻结账户";
        this.popupContent =
          "部分业务转化成贝壳时可能会有部分贝壳被冻结一段时间，被冻结的贝壳无法提现，具体解冻时间参考贝壳冻结列表的预计冻结时间";
      }
      this.popupVisible = true;
    },
    close () {
      this.popupVisible = false
    },
    goTo () {
      this.$router.push({ path: '/wallet/b-bell-detail' })
    },
    take () {
      this.$router.push({ path: '/wallet/b-bell-cash-out' })
    }
  }
};
</script>

<style lang="less" scoped>
#B-bell {
  .inner {
    color: #000;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-item-color-white);
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
      background-color: var(--base-item-color-white);
      margin-bottom: 0.2rem;
      z-index: 99;
      border-bottom: 0.01rem solid rgb(228, 228, 228);
      .back {
        width: 1rem;
        height: 1rem;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('~assets/img/video/back_black.svg');
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
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.4rem;
      .title {
        font-size: 0.4rem;
        color: var(--color-text);
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
        font-size: 0.4rem;
        display: flex;
        height: 2rem;
        width: 9rem;
        margin-top: 2.7rem;
        border: 0.05rem solid rgba(200, 200, 200, 0.2);
        background-color: rgb(246, 246, 246);
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
              color: var(--color-text);
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
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
  .popup {
    .pop {
      color: #000;
      border-radius: 0.2rem 0.2rem 0 0 !important;
      width: 10rem;
      height: 6rem;
      font-size: 0.4rem;
      background-color: #fff !important;
      .title {
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
        margin: 0 0.5rem;
        border-bottom: 0.02rem solid rgba(90, 90, 90, 0.4);
        span {
          flex: auto;
        }
        img {
          position: relative;
          width: 0.5rem;
          height: 0.5rem;
        }
      }
      .content {
        margin: 0.5rem 0.5rem;
      }
    }
  }
}
</style>