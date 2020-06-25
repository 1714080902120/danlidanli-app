<template>
  <div id="red-packet">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">提现</span>
        <span class="detail" @click="detail()">流水明细</span>
      </div>
      <div class="content">
        <div class="content-head">
          <div class="content-head-item" v-for="item in contentHead" :key="item.title">
            <span>{{ item.title }}</span>
            <span>{{ item.num }}</span>
          </div>
        </div>
        <div class="content-main">
          <div class="content-main-head">
            <span>提现金额</span>
            <span>单笔提现金额范围1元至30元</span>
          </div>
          <div class="content-main-main">
            <div
              class="item"
              v-for="(item, index) in list"
              :key="item.B"
              :class="{ 'is-selected': isSelect === index }"
              @click="select(index)"
              v-waves
            >{{ item.RMB }}</div>
            <input
              type="text"
              id="content-main"
              placeholder="自定义"
              :class="{ 'is-selected': isSelect === 3 }"
              @click="customize(3)"
              v-model="custo"
            />
          </div>
        </div>
        <div class="content-footer">
          <div class="content-footer-head">提现渠道</div>
          <div class="content-footer-main">
            <div
              class="ali"
              :class="{ 'pay-ali-active': payActive === 0 }"
              @click="payMethod(0)"
              v-waves
            >
              <img src="~assets/img/wallet/Alipay.svg" alt />支付宝
            </div>
            <div
              class="wec"
              :class="{ 'pay-wec-active': payActive === 1 }"
              @click="payMethod(1)"
              v-waves
            >
              <img src="~assets/img/wallet/Wepay.svg" alt />微信
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-btn" @click="sure()">确认提现{{charge}}</div>
        <div class="footer-agreement">
          <span @click="instruction()">提现规则</span>
          <span>|</span>
          <span @click="callService()">联系客服</span>
        </div>
      </div>
    </div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="bottom">
        <div class="pop-content">
          <div>
            <img src="~assets/img/fans_follows/close_dark.svg" alt @click="close()" />
          </div>
          <div>1. 提现额度：单日最低提现额度为1元、单日最高提现额度为30元，每次提现时您可以选择所需的提现额度，剩余金额可在下次满足最低提现额度时申请提现。</div>
          <div>2. 提现要求：，每次获取的奖励需在48小时后方可提现。</div>
          <div>
            3. 提现到账时间：通常情况下提交提现后的24小时内到账，
            <span>具体以第三方支付渠道为准</span>，请耐心等待。
          </div>
          <div>
            <span>4. 请您理解并同意发现您在参与本活动中有造假等违规操作，bilibili有权单方面阻止您参与活动、获得提现奖励的资格。</span>
          </div>
          <div>
            5. 为保证顺利提现你须按照提现页面规范操作，
            <span>若因未按提现要求操作或不符合第三方支付平台的要求等原因导致您的账户不能收款（如未作实名认证或提现钱与平台账号解绑等），所获得的红包将无法提现，bilibili无需承担任何责任。</span>
          </div>
          <div>
            <span>6. 如果您连续30日未登录本APP，您红包账户中未提现的奖励将会过期并被清零。</span>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="popup-2">
      <mt-popup class="pop" v-model="popupVisible2" position="right">
        <div class="pop-content-head">
          <span class="back" @click="closeService()">‹</span>
          <span class="title" @click="closeService()">
            <img src="~assets/img/fans_follows/close_dark.svg" alt /> 客服
          </span>
        </div>
        <div class="pop-content-main">
          <iframe class="frame" src="https://www.bilibili.com/v/customer-service">
            <a href="https://www.bilibili.com/v/customer-service">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "RedPacket",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      popupVisible2: false,
      isSelect: 0,
      charge: "1元",
      payActive: 0,
      custo: "",
      contentHead: [
        { title: "可提现", num: "0.00元" },
        { title: "总金额", num: "0.00元" },
        { title: "审核中", num: "0.00元" }
      ],
      list: [{ RMB: "1元" }, { RMB: "5元" }, { RMB: "30元" }]
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
        this.$router.replace({ path: "/wallet/" });
        clearTimeout(timer);
        timer = null;
      }, 300);
    },
    close() {
      this.popupVisible = false;
    },
    instruction() {
      this.popupVisible = true;
    },
    select(i) {
      this.isSelect = i;
      this.charge = this.list[i].RMB;
    },
    goToLastRouter() {
      this.popupVisible = false;
    },
    customize(i) {
      this.isSelect = i;
    },
    payMethod(i) {
      this.payActive = i;
    },
    callService() {
      this.popupVisible2 = true;
    },
    sure() {
      if (parseInt(this.charge) > parseInt(this.contentHead[0].num)) {
        Toast({
          message: "提现金额大于可提现金额",
          position: "middle",
          duration: 3000
        });
      } else {
        console.log(111);
      }
    },
    detail() {
      this.$router.push({ path: "/wallet/red-packet-detail" });
    },
    closeService() {
      this.popupVisible2 = false;
    }
  },
  watch: {
    custo(newVal) {
      this.charge = newVal + "元";
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#red-packet {
  position: relative;
  .inner {
    color: #000;
    overflow-x: hidden;
    transition: 0.3s ease-in-out;
    transform: translateX(10rem);
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
      z-index: 99;
      border-bottom: 0.01rem solid rgba(36, 35, 35, 0.1);
      .back {
        padding-left: 0.5rem;
      }
      .title {
        margin-left: 1rem;
        font-size: 0.45rem;
      }
      .detail {
        font-size: 0.4rem;
        color: rgb(128, 126, 126);
        padding-right: 0.2rem;
      }
    }
    .content {
      .content-head {
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: var(--base-item-color-white);
        .content-head-item {
          height: 2.4rem;
          font-size: 0.45rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            line-height: 1.1rem;
            &:last-child {
              font-size: 0.7rem;
              color: var(--color-text);
            }
          }
          &:first-child {
            span {
              color: var(--color-tint);
            }
          }
        }
      }
      .content-main {
        margin-top: 0.3rem;
        background-color: var(--base-item-color-white);
        .content-main-head {
          margin: 0 0.2rem;
          display: flex;
          height: 1.4rem;
          font-size: 0.45rem;
          justify-content: space-between;
          align-items: center;
          span {
            &:last-child {
              font-size: 0.4rem;
              color: var(--color-text);
            }
          }
          border-bottom: 0.02rem solid var(--color-text);
        }
        .content-main-main {
          margin: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
                    font-weight: bold;
          .item,
          input {
            
            transition: 0.4s ease-in-out;
            width: 3.05rem;
            height: 1.3rem;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            border-radius: 0.2rem;
            font-size: 0.5rem;
            font-weight: lighter;
            border: 0.04rem solid var(--color-text);
            margin: 0.2rem 0;
          }
          input {
            background-color: transparent;
            outline: none;
          }
          .is-selected {
            color: var(--color-tint);
            border: 0.04rem solid var(--color-tint);
          }
        }
      }

      .content-footer {
        margin-top: 0.3rem;
        font-size: 0.45rem;
        background-color: var(--base-item-color-white);
        display: flex;
        flex-direction: column;
        .content-footer-head {
          margin: 0 0.2rem;
          height: 1.5rem;
          line-height: 1.5rem;
          border-bottom: 0.02rem solid rgba(138, 138, 138, 0.4);
        }
        .content-footer-main {
          margin: 0.5rem 0.2rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          img {
            width: 0.7rem;
            height: 0.7rem;
            margin-right: 0.1rem;
          }
          .ali,
          .wec {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4.5rem;
            border-radius: 0.2rem;
            height: 1.3rem;
            line-height: 1.3rem;
            border: 0.04rem solid var(--color-text);
          }
          .pay-ali-active {
            color: rgba(68, 134, 255, 0.8);
            border-color: rgba(68, 134, 255, 0.8);
          }
          .pay-wec-active {
            color: rgba(91, 172, 66, 0.8);
            border-color: rgba(91, 172, 66, 0.8);
          }
        }
      }
    }
    .footer {
      position: relative;
      bottom: -1.3rem;
      margin-left: 0.5rem;
      .footer-agreement {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 0.38rem;
        margin-top: 0.5rem;
        span {
          color: rgba(68, 134, 255, 0.8);
          &:nth-child(2) {
            color: var(--color-text);
            font-size: 0.7rem;
            margin: 0 0.3rem;
          }
        }
      }
      .footer-btn {
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
  }
  .active {
    transition: 0.3s ease-in-out;
    transform: translateX(0rem);
  }
  .popup {
    .pop {
      width: 10rem;
      height: 12rem;
      border-radius: 0.3rem 0.3rem 0 0 !important;
      background-color: var(--base-item-color-white) !important;
      .pop-content {
        position: relative;
        color: rgba(14, 14, 14, 0.5);
        font-weight: 400;
        font-family: "Black";
        font-size: 0.4rem;
        margin: 0.4rem;
        display: flex;
        flex-direction: column;
        div {
          margin: 0.15rem 0;
          font-size: 0.4rem;
          span {
            color: rgb(85, 85, 85);
          }
          &:first-child {
            margin: 0;
          }
          img {
            position: relative;
            left: 8.5rem;
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
    .pop::-webkit-scrollbar {
      display: none;
    }
  }
  .popup-2 {
    background-color: var(--base-item-color-white) !important;
    .pop {
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
          height: calc(100vh - 1.6rem);
        }
        .frame::-webkit-scrollbar {
          width: 0 !important;
        }
      }
    }
  }
}
</style>