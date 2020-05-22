<template>
  <div id="B-coin-recharge">
    <div class="inner" :class="{ 'active': isActive === true }">
      <div class="head">
        <span class="back" @click="goBack()">‹</span>
        <span class="title">B币充值</span>
        <span class="detail" @click="instruction()">使用说明</span>
      </div>
      <div class="content">
        <div class="content-head">
          <span>可用余额</span>
          <span>
            <span>0.3</span>B币
          </span>
        </div>
        <div class="content-main">
          <div
            class="item"
            v-for="(item, index) in list"
            :key="item.B"
            :class="{ 'is-selected': isSelect === index }"
            @click="select(index)"
            v-waves
          >
            <div class="B">
              <span>{{ item.B }}</span> B币
            </div>
            <div class="RMB">￥{{ item.RMB }}</div>
          </div>
        </div>
        <div class="content-footer">
          <input type="text" id="customize" v-model="charge" placeholder="自定义B币数量（1-5000）" />
        </div>
      </div>
      <div class="footer">
        <div class="footer-agreement">
          支付即同意
          <span>B币用户协议</span>
        </div>
        <div class="footer-btn" @click="take()">立即充值</div>
      </div>
    </div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="right">
        <div class="pop-head">
          <span @click="goToLastRouter()">‹</span>
          <span>使用说明</span>
        </div>
        <div class="pop-content">
          <div class="pop-content-item" v-for="item in instructionList" :key="item.title">
            <h4 class="title">{{ item.title }}</h4>
            <p class="desc">{{item.desc}}</p>
            <p v-for="sentence in item.sentences" :key="sentence">{{ sentence }}</p>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "BCoinRecharge",
  data() {
    return {
      isActive: false,
      popupVisible: false,
      isSelect: 0,
      charge: "",
      list: [
        { B: "6", RMB: "6.00" },
        { B: "18", RMB: "18.00" },
        { B: "68", RMB: "68.00" },
        { B: "233", RMB: "233.00" },
        { B: "648", RMB: "648.00" },
        { B: "998", RMB: "998.00" }
      ],
      instructionList: [
        {
          title: "B币使用说明",
          desc:
            "B币是购买哔哩哔哩平台上虚拟商品的预付费凭证，只可用于购买哔哩哔哩平台上的虚拟商品/服务",
          sentences: [
            "1、B币和人民币的兑换比例为：1B币=1.00元人民币；",
            "2、充值B币采用哔哩哔哩指定的充值方式进行；",
            "3、IOS设备与安卓设别充值的B币不能互通。"
          ]
        },
        {
          title: "B币券使用说明",
          desc:
            "B币券是哔哩哔哩平台上用于营销活动发放的虚拟抵扣券，只可用于购买哔哩哔哩平台上指定的虚拟商品/服务",
          sentences: [
            "1、购买部分虚拟商品/服务时不可使用B币券，如大会员等；",
            "2、允许使用B币券购买的虚拟商品/服务，消费时优先扣除B币券；",
            "3、B币券消费，遵循先到期先消费原则；",
            '4、B币券不可充值，可以通过哔哩哔哩特定活动获取，如年费大会员每月赠送5个B币券；',
            '5、B币券具有有效期限，过期后不可使用。'
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
      let timer = setTimeout(() => {
        this.$router.replace({ path: "/wallet/b-coin" });
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
    take() {
      this.$router.push({ path: "/wallet/b-coin-recharge" });
    },
    select(i) {
      this.isSelect = i;
    },
    goToLastRouter() {
      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#B-coin-recharge {
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
      z-index: 99;
      border-bottom: 0.01rem solid rgb(36, 35, 35);
      .back {
        padding-left: 0.5rem;
      }
      .title {
        color: rgb(187, 186, 186);
        margin-left: 0.5rem;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.4rem;
        height: 3rem;
        width: 10rem;
        background-color: rgba(68, 68, 68, 0.1);
        background-image: url("~assets/img/wallet/B_coin/B_coin_recharge.png");
        background-repeat: no-repeat;
        background-size: 4rem 3rem;
        background-position-x: 6rem;
        border-bottom: 0.01rem solid rgba(0, 0, 0, 0.1);
        span {
          margin-top: 0.7rem;
          &:last-child {
            color: var(--color-tint);
            margin-top: 0.2rem;
            span {
              font-size: 1rem;
            }
          }
        }
      }
      .content-main {
        margin: 0.3rem 0.2rem 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          position: relative;
          text-align: center;
          transition: 0.4s ease-in-out;
          width: 3.05rem;
          height: 2rem;
          margin-top: 0.175rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          background-color: rgba(56, 56, 56, 0.7);
          border-radius: 0.2rem;
          font-size: 0.35rem;
          .B,
          .RMB {
            margin: auto;
            width: 3rem;
          }
          .B {
            span {
              font-size: 0.6rem;
            }
          }
          .RMB {
            margin-top: -0.3rem;
          }
        }
        .is-selected {
          color: #fff;
          background-color: var(--color-tint);
        }
      }
      .content-footer {
        margin: 0.3rem;
        margin-top: 0.7rem;
        border-bottom: 0.03rem solid rgba(250, 25, 149, 0.4);
        input {
          color: var(--color-tint);
          font-size: 0.4rem;
          outline: none;
          border: 0;
          margin-bottom: 0.2rem;
          background-color: transparent;
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0.5rem;
      margin-left: 0.5rem;
      .footer-agreement {
        text-align: center;
        font-size: 0.38rem;
        margin-bottom: 0.3rem;
        span {
          color: var(--color-tint);
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
      height: 18rem;
      background-color: var(--base-item-color-white) !important;
      .pop-head {
        height: 1.6rem;
        line-height: 1.6rem;
        background-color: var(--base-bg-color-thr);
        span {
          &:first-child {
            margin: 0 0.5rem;
          }
          &:last-child {
            font-size: 0.5rem;
          }
        }
      }
      .pop-content {
        position: relative;
        color: #000;
        font-weight: 400;
        font-family: 'Black';
        font-size: .4rem;
        margin: .4rem;
        .pop-content-item {
          margin-bottom: .8rem;
        .title {
          font-size: .42rem;
          margin: .4rem auto;
        }
        p {
          margin: .2rem auto;
        }
        }
      }
    }
  }
}
</style>