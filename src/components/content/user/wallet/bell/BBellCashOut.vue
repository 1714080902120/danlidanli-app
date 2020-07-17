<template>
  <div id="B-bell-cash-out">
    <div class="inner">
      <div class="head">
        <span class="back" @click="goBack()"></span>
        <span class="title">贝壳提现</span>
        <span class="detail" @click="popup()">规则说明</span>
      </div>
      <div class="content">
        <div class="content-head">
          <div class="content-head-1">可提现余额</div>
          <div class="content-head-2">
            <span class="num">4.30</span>贝壳
            <span class="calc">1贝壳=1RMB</span>
          </div>
          <div class="content-head-3">提现方式</div>
        </div>
        <div class="content-main">
          <div class="content-select">
            <span @click="toSelect(0)" :class="{ 'is-selected': isSelected === 0 }">
              <img src="~assets/img/wallet/B_bell/Alipay.svg" alt /> 支付宝
            </span>
            <span @click="toSelect(1)" :class="{ 'is-selected': isSelected === 1 }">
              <img src="~assets/img/wallet/card.svg" alt /> 银行卡
            </span>
          </div>
          <div class="show">
            <img src="~assets/img/wallet/B_bell/B_bell_cash_out.png" alt />
            <span class="words">完成实名认证，才可以提现哦</span>
            <span class="btn" @click="goTo()">去认证</span>
          </div>
        </div>
      </div>
    </div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="bottom">
        <div class="title">
          <span class="word">{{ popupTitle }}</span>
          <img src="~assets/img/fans_follows/close_dark.svg" @click="close()" alt />
        </div>
        <div class="popup-content">
          <div class="popup-content-item" v-for="item in contentList" :key="item.title">
            <h4>{{ item.title }}</h4>
            <p v-for="(c, index) in item.content" :key="index">{{ c }}</p>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BBellCashOut",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      popupTitle: "规则说明",
      isSelected: 0,
      contentList: [
        {
          title: '1.提现到账时间',
          content: [
            '支付宝提现在提交申请后，一般会在24小时内到账。',
            '银行卡每月6日到10日提交提现申请后，当月20日左右到账。'
          ]
        },
        {
          title: '2.提现金额限制',
          content: [
            '支付宝提现每天最多一次，每次最少不少于100贝壳，最多不大于2000贝壳。现阶段，由于每日转出总金额有所限制，当所有用户每日累计转出总金额到达一定额度后，当日将无法通过支付宝提现。',
            '银行卡提现每月最多一次，每次最少不少于100贝壳，无上限。'
          ]
        },
        {
          title: '3.税费说明',
          content: [
            '每次发起提现时， 系统会自动结算税费并展示给用户。税费会根据用户一个自然月的贝壳体现总金额结算。如果用户一个自然月内发生多次体现行为，系统会根据当月累计提现总金额计算总税费金额，每次提现时展示的税费为总税费扣减当月此前提现已扣减税费之差额'
          ]
        }
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
      this.$router.replace({ path: "/wallet/b-bell" });
    },
    close() {
      this.popupVisible = false;
    },
    goTo() {
      this.$router.push({ path: "/wallet/b-bell-verify" });
    },
    toSelect(i) {
      this.isSelected = i;
    },
    popup() {
      this.popupVisible = true
    }
  }
};
</script>

<style lang="less" scoped>
#B-bell-cash-out {
  .inner {
    font-size: 0.45rem;
    color: #000;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    background-color: var(--base-bg-color-white);
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
        margin-right: -1rem;
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
      .content-head {
        font-size: 0.4rem;
        color: var(--color-text);
        margin-left: 0.4rem;
        margin-top: 0.7rem;
        .content-head-1 {
          margin: 0.4rem 0 0.3rem 0;
        }
        .content-head-2 {
          color: #000;
          margin: 0.3rem 0 0.4rem 0;
          .num {
            font-size: 1.2rem;
          }
          .calc {
            color: rgb(233, 127, 14);
            margin-left: 0.3rem;
          }
        }
        .content-head-3 {
          margin: -0.2rem 0 0.3rem 0;
        }
      }
      .content-main {
        .content-select {
          display: flex;
          align-items: center;
          span {
            background-color: var(--base-item-color-white);
            font-size: 0.4rem;
            width: 3.3rem;
            height: 1.4rem;
            line-height: 1.4rem;
            display: flex;
            align-items: center;
            margin: 0 0.4rem;
            border-radius: 0.1rem;
            border: 0.01rem solid rgba(255, 255, 255, 0.1);
            &:last-child {
              margin-left: -0.15rem;
            }
            img {
              margin-right: 0.5rem;
              margin-left: 0.2rem;
              width: 0.9rem;
              height: 0.9rem;
            }
          }
          .is-selected {
            border: 0.04rem solid var(--color-tint);
          }
        }
        .show {
          height: 11rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          border-radius: 0.3rem 0.3rem 0 0;
          background-color: var(--base-item-color-white);
          img {
            margin-top: 0.5rem;
            width: 4.2rem;
            height: 3.5rem;
          }
          .words {
            margin-top: -2rem;
          }
          .btn {
            width: 4.2rem;
            text-align: center;
            height: 1.2rem;
            line-height: 1.2rem;
            border: 0.02rem solid var(--color-tint);
            color: var(--color-tint);
            border-radius: 0.2rem;
            margin-top: -2rem;
          }
        }
      }
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
      height: 14rem;
      font-size: 0.5rem;
      background-color: var(--base-item-color-white) !important;
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
      .popup-content {
        margin: 0.5rem 0.5rem;
        .popup-content-item {
          color: #000;
          margin: .5rem 0;
          font-size: .42rem;
          h4 {
            margin-bottom: .2rem;
          }
        }
      }
    }
  }
}
</style>