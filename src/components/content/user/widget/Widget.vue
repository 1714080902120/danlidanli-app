<template>
  <div id="widget">
    <div class="head">
      <span class="back" @click="goBack()">‹</span>
      <span class="title">头像挂件</span>
      <span class="detail" @click="goTo()">
        <img src="~assets/img/user/widget/profile_black.svg" alt />
      </span>
    </div>
    <div class="content">
      <div class="content-navbar">
        <img class="widget-style" v-if="selectedStyle !== ''" :src="selectedStyle" alt />
        <img v-if="imgSrc !== ''" :src="imgSrc" alt />
        <img v-else-if="imgSrc === ''" src="~assets/img/base/bilibili_user_logo_bg.svg" alt />
        <div class="navbar">
          <div class="navbar-content">
            <div class="type" @click="toActive(0)" :class="{ 'active': isActive === 0 }" v-waves>
              <span>梗系列</span>
            </div>
            <div class="type" @click="toActive(1)" :class="{ 'active': isActive === 1 }" v-waves>
              <span>答题挂件</span>
            </div>
            <div class="type" @click="toActive(2)" :class="{ 'active': isActive === 2 }" v-waves>
              <span>大会员</span>
            </div>
          </div>
          <span class="navbar-active-footer" :style="{ 'left': `${.45 + 2.5 * isActive}rem` }"></span>
        </div>
      </div>
      <div class="content-main">
        <div class="table">
          <div
            class="tr"
            v-for="(item, index) in valuesList"
            :key="index"
            @click="select(index, item)"
          >
            <div
              class="img"
              :class="{ 'is-select': index === isSelected, 'fat': Object.keys(item) }"
              v-waves
            >
              <img :src="item" alt />
              <img class="default-img" v-if="defaultImg" :src="defaultImg" alt />
            </div>
            <div class="msg">
              <span>{{ index }}</span>
              <span v-if="isActive !== 2">
                <span>5</span>
                B币
              </span>
              <span class="big-member" v-if="isActive === 2">大会员</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">‹</span>
          <span class="title">我的挂件</span>
          <span class="detail" @click="detail()">激活记录</span>
        </div>
        <div class="pop-content">
          <div class="content-navbar">
            <img class="widget-style" v-if="selectedStyle !== ''" :src="selectedStyle" alt />
            <img v-if="imgSrc !== ''" :src="imgSrc" alt />
            <img v-else-if="imgSrc === ''" src="~assets/img/base/bilibili_user_logo_bg.svg" alt />
            <div class="navbar">
              <div class="navbar-content">
                <div
                  class="type"
                  @click="personalToActive(0)"
                  :class="{ 'active': personal.isActive === 0 }"
                  v-waves
                >
                  <span>可使用</span>
                </div>
                <div
                  class="type"
                  @click="personalToActive(1)"
                  :class="{ 'active': personal.isActive === 1 }"
                  v-waves
                >
                  <span>已过期</span>
                </div>
              </div>
              <span
                class="navbar-active-footer"
                :style="{ 'left': `${.45 + 2.5 * personal.isActive}rem` }"
              ></span>
            </div>
          </div>
          <div class="content-main">
            <div class="table" v-if="Object.keys(personal.AvailableValuesList).length > 0">
              <div
                class="tr"
                v-for="(item, index) in personal.AvailableValuesList"
                :key="index"
                @click="select(index, item)"
              >
                <div
                  class="img"
                  :class="{ 'is-select': index === isSelected, 'fat': Object.keys(item) }"
                  v-waves
                >
                  <img :src="item" alt />
                  <img class="default-img" v-if="defaultImg" :src="defaultImg" alt />
                </div>
                <div class="msg">
                  <span>{{ index }}</span>
                  <span>
                    <span></span>
                    已下架
                  </span>
                </div>
              </div>
            </div>
            <div
              class="no-available"
              v-else-if="Object.keys(personal.AvailableValuesList).length <= 0"
            >
              <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />这里还什么都没有呢
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="pop-2">
      <mt-popup class="pop" v-model="popupVisible2" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop2()">‹</span>
          <span class="title">我的挂件</span>
        </div>
        <div class="pop-content-2">
          <ul v-if="personal.check.length > 0">
            <li v-for="(item, index) in personal.check" :key="index">
              <div class="check">
                <span>单号:</span>
                <span>{{ item.消费订单号 }}</span>
              </div>
              <div class="time">
                <span>{{ item.时间.split(' ')[0] }}</span>
                <span>{{ item.时间.split(' ')[1] }}</span>
              </div>
            </li>
          </ul>
          <div class="no-available" v-else-if="personal.check.length <= 0">
            <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />这里还什么都没有呢
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="pop-3">
      <mt-popup class="popup" v-model="popupVisible3" position="bottom" :modal="false">
        <div class="pop-type" v-if="type.typeIsSelected === 0">
          <span @click="exchange()" v-waves>积分兑换</span>
          <span @click="buy()" v-waves>购买挂件</span>
        </div>
        <div class="exchange-buy" v-if="type.typeIsSelected !== 0">
          <div class="type-head">
            <div class="type-head-title">{{ type.title }}</div>
            <img @click="closeType()" src="~assets/img/wallet/B_coin/close_dark.svg" alt />
          </div>
          <div class="type-content">
            <div class="left">
              <span>{{ type.name }}</span>
              <span>{{ type.sub }}</span>
            </div>
            <div class="right">
              <span @click="sub()">-</span>
              <span>{{ type.num }}</span>
              <span @click="inc()">+</span>
            </div>
          </div>
          <div class="type-footer">
            <div class="left">
              <span v-if="type.typeIsSelected === 1">所需积分：{{ type.count }}</span>
              <span v-else-if="type.typeIsSelected === 2">所需： {{ type.need }}B币</span>
              <span v-if="type.typeIsSelected === 1">现有积分：0</span>
              <span v-if="type.typeIsSelected === 2">现有：{{ type.had }}B币</span>
            </div>
            <div
              class="right"
              :class="{ 'buy': type.typeIsSelected === 2 }"
              @click="sure()"
              v-waves
            >{{ type.button }}</div>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="pop-4">
      <mt-popup class="popup-4" v-model="popupVisible4" position="middle" :modal="false">
        <img src="~assets/img/wallet/B_bell/B_bell_cash_out.png" alt />
        <div class="pop-4-content">你的B币余额不足，需充值才可继续购买，现在就充值并购买吗？</div>
        <div class="pop-4-footer">
          <span @click="reset()" v-waves>取消</span>
          <span @click="goRecharge()" v-waves>充值并购买</span>
        </div>
      </mt-popup>
    </div>
    <div class="modal" v-if="popupVisible3"></div>
    <div class="modal-2" v-if="popupVisible4"></div>
  </div>
</template>

<script>
import widget from "./widget.json";
import { Toast } from "mint-ui";

export default {
  name: "Widget",
  data() {
    return {
      imgSrc: "",
      isActive: 0,
      valuesList: Object.values(widget["挂件商城"])[0],
      keysList: [],
      isSelected: "",
      defaultImg: Object.values(widget)[4],
      selectedStyle: "",
      popupVisible: false,
      popupVisible2: false,
      popupVisible3: true,
      popupVisible4: true,
      type: {
        typeIsSelected: 0,
        title: "兑换挂件",
        num: 1,
        count: 250,
        need: 5,
        button: "确认兑换",
        name: "哔哩王",
        had: 0,
        // had: this.$store.state.userInfo.coin.Bcoins,
        sub: "兑换月份"
      },
      personal: {
        isActive: 0,
        AvailableValuesList: [],
        keysList: [],
        check: Object.values(Object.values(widget)[3])
      }
    };
  },
  created() {
    this.keysList = Object.keys(this.valuesList);
    this.imgSrc =
      this.$store.state.userInfo.baseInfo.logo.src +
      this.$store.state.userInfo.baseInfo.logo.name;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toActive(i) {
      if (i === this.isActive) {
        return false;
      }
      this.isActive = i;
      switch (i) {
        case 0:
          this.valuesList = Object.values(widget["挂件商城"])[0];
          this.keysList = Object.keys(this.valuesList);
          break;
        case 1:
          this.valuesList = Object.values(widget["挂件商城"])[1];
          this.keysList = Object.keys(this.valuesList);
          break;
        case 2:
          this.valuesList = Object.values(widget)[1];
          this.keysList = Object.keys(this.valuesList);
          break;
      }
    },
    select(i, item) {
      if (this.isSelected === i) {
        return false;
      }
      this.popupVisible3 = true;
      this.isSelected = i;
      this.selectedStyle = item;
    },
    goTo() {
      this.popupVisible = true;
    },
    closePop() {
      this.popupVisible = false;
    },
    detail() {
      this.popupVisible2 = true;
    },
    personalToActive(i) {
      if (i === this.personal.isActive) {
        return false;
      }
      this.personal.isActive = i;
      switch (i) {
        case 0:
          this.personal.AvailableValuesList = [];
          this.personal.keysList = [];
          break;
        case 1:
          this.personal.AvailableValuesList = Object.values(
            widget["挂件商城"]
          )[0];
          this.personal.keysList = Object.keys(
            this.personal.AvailableValuesList
          );
          break;
      }
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    exchange() {
      this.popupVisible3 = false;
      this.type = {
        typeIsSelected: 1,
        title: "兑换挂件",
        num: 1,
        count: 250,
        need: 5,
        button: "确认兑换",
        name: this.isSelected,
        had: 0,
        sub: "兑换月份"
      };
      setTimeout(() => {
        this.popupVisible3 = true;
      }, 300);
    },
    buy() {
      this.popupVisible3 = false;
      this.type = {
        typeIsSelected: 2,
        title: "购买挂件",
        num: 1,
        count: 250,
        need: 5,
        button: "确认购买",
        name: this.isSelected,
        had: this.$store.state.userInfo.coin.Bcoins,
        sub: "购买月份"
      };
      setTimeout(() => {
        this.popupVisible3 = true;
      }, 300);
    },
    sub() {
      if (this.type.num <= 1) return false;
      this.type.num -= 1;
      this.type.count = this.type.num * 250;
      this.type.need = this.type.num * 5;
    },
    inc() {
      this.type.num += 1;
      this.type.count = this.type.num * 250;
      this.type.need = this.type.num * 5;
    },
    closeType() {
      this.type.typeIsSelected = 0;
      this.popupVisible3 = false;
    },
    sure() {
      switch (this.type.typeIsSelected) {
        case 1:
          Toast({
            message: "您的积分不够哦~~",
            duration: 3000,
            position: "middle"
          });
          break;
        case 2:
          if (
            this.type.need > parseInt(this.$store.state.userInfo.coin.Bcoins)
          ) {
            this.popupVisible4 = true;
          }

          break;
      }
    },
    reset () {
      this.popupVisible4 = false
    },
    goRecharge() {
      this.popupVisible4 = false
      this.$router.replace({ path: '/wallet/b-coin-recharge' })
    }
  },
  watch: {
    "$store.state.userInfo"(newVal) {
      this.imgSrc = newVal.baseInfo.logo.src + newVal.baseInfo.logo.name;
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#widget {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
  background-color: var(--base-set-item-color);
  .head,
  .pop-head {
    color: #000;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background-color: var(--base-item-color-white);
    margin-bottom: 0.2rem;
    z-index: 99;
    border-bottom: 0.01rem solid rgb(228, 228, 228);
    .back {
      padding-left: 0.5rem;
    }
    .title {
      font-size: 0.45rem;
      display: flex;
      text-align: center;
      align-items: center;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
    .detail {
      font-size: 0.4rem;
      color: rgb(128, 126, 126);
      padding-top: 0.3rem;
      padding-right: 0.2rem;
    }
  }
  .content,
  .pop-content {
    background-color: var(--base-set-item-color);
    .content-navbar {
      height: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 100%;
        z-index: 3;
        &:last-child {
          z-index: 2;
        }
      }
      .widget-style {
        position: absolute;
        z-index: 4;
        width: 2.8rem;
        height: 2.8rem;
        top: 1.185rem;
        // margin-left: .1rem;
      }
      .navbar {
        font-size: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 1rem;
        margin-bottom: -0.4rem;
        .navbar-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          .type {
            text-align: center;
            width: 2.5rem;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span {
            }
          }
          .active {
            color: var(--color-tint);
          }
        }
        .navbar-active-footer {
          transition: 0.3s;
          position: relative;
          width: 1.6rem;
          height: 0.05rem;
          background-color: var(--color-tint);
          border-radius: 0.2rem;
        }
      }
    }
    .content-main {
      overflow-y: scroll;
      overflow-x: hidden;
      .table {
        display: flex;
        height: 12.4rem;
        flex-wrap: wrap;
        .tr {
          display: flex;
          flex-direction: column;
          .img {
            width: 3.26rem;
            height: 3.26rem;
            display: flex;
            background-color: var(--base-set-bg-color);
            align-items: center;
            justify-content: center;
            position: relative;
            img {
              width: 2rem;
              height: 2rem;
              z-index: 4;
            }
            .default-img {
              position: absolute;
              border-radius: 100%;
              z-index: 3;
              width: 1rem;
              height: 1rem;
            }
          }
          .is-select {
            transition: 0.3s;
            background-color: rgb(91, 68, 76);
          }
          .msg {
            display: flex;
            flex-direction: column;
            font-size: 0.32rem;
            height: 1.6rem;
            padding: 0.2rem;
            span {
              &:last-child {
                color: var(--color-tint);
                margin-top: 0.1rem;
                font-size: 0.35rem;
                span {
                  font-size: 0.4rem;
                  margin-right: -0.1rem;
                }
              }
            }
            .big-member {
              width: 1.1rem;
              background-color: rgb(242, 226, 230);
              border-radius: 0.1rem;
            }
          }
        }
        .fat {
          margin: 0 0.02rem;
        }
      }
    }
    .content-main::-webkit-scrollbar {
      display: none;
    }
  }
  .pop,
  .pop-2 {
    width: 10rem;
    height: 100vh;
    background-color: var(--base-set-item-color);
    .pop-head {
      .title {
        margin-right: -0.8rem;
        &:last-child {
          margin-right: 4rem;
        }
      }
    }
    .pop-content {
      .content-main {
        .no-available {
          height: 10rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.4rem;
          img {
            margin-top: 2rem;
            width: 5rem;
            margin-bottom: 0.1rem;
          }
        }
      }
    }
    .pop-content-2 {
      ul {
        display: flex;
        flex-direction: column;
        font-size: 0.35rem;
        li {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0.3rem;
          margin-top: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 0.01rem solid var(--color-text);
          .check,
          .time {
            display: flex;
            flex-direction: column;
            span {
              &:last-child {
                margin-top: 0.1rem;
              }
            }
          }
          .time {
            margin-right: 1rem;
          }
        }
      }
    }
  }
  .pop-3 {
    .popup {
      z-index: 9999 !important;
      width: 10rem;
      .pop-type {
        height: 1.6rem;
        line-height: 1.6rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.2rem;
        span {
          text-align: center;
          width: 4.5rem;
          height: 1.2rem;
          font-size: 0.5rem;
          line-height: 1.2rem;
          border-radius: 0.1rem;
          color: var(--color-tint);
          border: 0.02rem solid var(--color-tint);
          &:last-child {
            background-color: rgb(179, 135, 74);
            color: #fff;
            border: 0;
          }
        }
      }
      .exchange-buy {
        display: flex;
        flex-direction: column;
        padding: 0 0.3rem;
        font-size: 0.4rem;
        .type-head {
          display: flex;
          justify-content: space-between;
          height: 1.2rem;
          line-height: 1.2rem;
          border-bottom: 0.01rem solid rgba(102, 102, 102, 0.5);
          align-items: center;
          img {
            width: 0.9rem;
            height: 0.9rem;
          }
          .type-head-title {
          }
        }
        .type-content {
          height: 3rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 0.01rem solid rgba(102, 102, 102, 0.5);
          .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            span {
              &:last-child {
                color: #000;
                margin: 0.4rem 0;
              }
            }
          }
          .right {
            display: flex;
            width: 4rem;
            align-items: center;
            margin-top: 0.2rem;
            span {
              color: #000;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              width: 1rem;
              height: 0.9rem;
              font-size: 0.8rem;

              font-weight: lighter;
              background-color: var(--base-item-color-white);
              &:nth-child(1) {
                border-radius: 0.15rem 0 0 0.15rem;
              }
              &:nth-child(2) {
                font-size: 0.5rem;
                width: 2rem;
                border-left: 0.05rem solid #000;
                border-right: 0.05rem solid #000;
              }
              &:nth-child(3) {
                border-radius: 0 0.15rem 0.15rem 0;
              }
            }
          }
        }
        .type-footer {
          font-size: 0.37rem;
          height: 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            flex-direction: column;
            span {
              &:last-child {
                margin-top: 0.1rem;
              }
            }
          }
          .right {
            font-size: 0.5rem;
            width: 5rem;
            height: 1.2rem;
            line-height: 1.2rem;
            color: var(--color-tint);
            border: 0.02rem solid var(--color-tint);
            border-radius: 0.1rem;
            text-align: center;
          }
          .buy {
            transition: 0.3s;
            color: #000;
            border: 0;
            background-color: rgb(241, 176, 20);
          }
        }
      }
    }
  }
  .pop-4 {
    .popup-4 {
      z-index: 10001 !important;
      width: 8rem;
      height: 6rem;
      background-color: var(--base-set-bg-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0.2rem;
      img {
        position: relative;
        top: -1rem;
        width: 4rem;
      }
      .pop-4-content {
        text-align: center;
        margin-top: -0.5rem;
        padding: 0 1rem;
        font-size: 0.45rem;
      }
      .pop-4-footer {
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 0.4rem;
        span {
          color: var(--color-tint);
          opacity: 0.8;
          width: 3.2rem;
          height: 1rem;
          line-height: 1rem;
          border: 0.02rem solid var(--color-tint);
          border-radius: 0.15rem;
          &:first-child {
            border-color: var(--color-text);
            margin-right: 0.2rem;
            color: var(--color-text);
          }
        }
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
  .modal-2 {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>