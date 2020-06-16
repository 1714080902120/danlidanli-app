<template>
  <div id="sidebar-head">
    <div v-if="$store.state.haveToken && Object.keys(info).length > 0" class="have-token">
      <div class="header">
        <div class="logo-wallet-scan">
          <div class="logo" @click="goToUserSpace()">
            <img :src="`${info.baseInfo.logo.src}${info.baseInfo.logo.name}`" alt />
          </div>
          <div class="wallet-scan">
            <span class="wallet" @click="toWallet()">
              <img src="~assets/img/base/wallet_dark.svg" alt />
            </span>
            <span class="scan">
              <img @click="toScan()" src="~assets/img/base/scan_dark.svg" alt />
            </span>
          </div>
        </div>
        <div class="name-level-label">
          <span class="name">{{info.baseInfo.name}}</span>
          <span class="level">LV{{info.baseInfo.level}}</span>
          <span class="label">{{info.baseInfo.vip}}</span>
        </div>
        <div class="Bcoins-coins">
          <span class="Bcoins">B币：{{info.coin.Bcoins}}</span>
          <span class="coins">硬币：{{info.coin.coins}}</span>
        </div>
      </div>
      <div class="vip-time" @click="bigMember()">
        <span>我的大会员</span>
        <span>2020–05–07过期</span>
        <span>〉</span>
      </div>
      <div class="footer" v-if="items.length > 0">
        <div class="item" v-for="item in items" :key="item.name" @click="goTo(item.name)" v-waves>
          <span class="num">{{ item.num }}</span>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="!$store.state.haveToken" class="no-token">
      <div class="header">
        <div class="left">
          <span class="title">登录后有新天地</span>
          <span class="sub">让你体验到私人定制</span>
        </div>
        <div class="right">
          <img @click="toScan()" src="~assets/img/base/scan_dark.svg" alt />
        </div>
      </div>
      <div class="footer">
        <span class="register" @click="register()" v-waves>注册</span>
        <span class="login" @click="login()" v-waves>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarHead",
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      }
    },
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  activated() {},
  methods: {
    toScan() {
      /* eslint-disable no-undef */
      this.$Bus.$emit("sidebarDisappear");
      let h = location.href;
      let n = h.indexOf("#");
      let r = h.substr(n);
      h = h.replace(r, "#/scan");
      let ws = plus.webview.create(h);
      ws.show();
    },
    register() {
      this.$Bus.$emit("sidebarDisappear");
      this.$router.replace({
        name: "RegisterOrLogin",
        params: { beforePath: this.$route.path, type: "register" }
      });
    },
    login() {
      this.$Bus.$emit("sidebarDisappear");
      this.$router.replace({
        name: "RegisterOrLogin",
        params: { beforePath: this.$route.path, type: "login" }
      });
    },
    goTo(name) {
      if (name !== "动态") {
        this.$router.push({
          name: "FansFollows",
          params: {
            beforePath: this.$route.path,
            name
          }
        });
      } else {
        console.log(name);
      }
      this.$Bus.$emit("sidebarDisappear");
    },
    toWallet() {
      this.$Bus.$emit("sidebarDisappear");
      this.$router.push({
        name: "Wallet",
        params: {
          beforePath: this.$route.path
        }
      });
    },
    bigMember() {
      this.$router.push({ path: "/big-member" });
      this.$Bus.$emit("sidebarDisappear");
    },
    goToUserSpace() {
      this.$Bus.$emit("sidebarDisappear");
      this.$router.replace({ path: '/user-space' })
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar-head {
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(95, 95, 95);
  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
  background-size: 70%;
  background-position: 2.6rem 0.2rem;
  background-repeat: no-repeat;
  .have-token {
    padding-top: .5rem;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 0 20px;
      .logo-wallet-scan {
        display: flex;
        text-align: center;
        justify-content: space-between;
        .logo {
          width: 132px;
          height: 132px;
          background-color: #fff;
          border-radius: 50%;
          display: flex;
          img {
            margin: auto;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            top: 50%;
          }
        }
        .wallet-scan {
          display: flex;
          justify-content: space-between;
          margin-left: 170px;
          .wallet {
            margin: 0 10px;
            img {
              margin: .1rem 0;
              width: .8rem;
              height: .8rem;
            }
          }
          .scan {
            img {
              width: 1rem;
              height: 1rem;
            }
            input {
              position: absolute;
              width: 1rem;
              height: 1rem;
              border-radius: 100%;
              opacity: 0;
            }
          }
        }
      }
      .name-level-label {
        display: flex;
        align-items: center;
        margin-top: 40px;
        font-size: 10px;
        .name {
          height: 40px;
          line-height: 40px;
          font-size: .4rem;
        }
        .level {
          font-size: 0.18rem;
          height: 0.3rem;
          line-height: 0.3rem;
          margin: 0 10px;
          border: 2px solid #fff;
          color: rgb(252, 252, 252);
          border-radius: 6px;
          padding: 0 8px;
        }
        .label {
          font-size: .3rem;
          height: .32rem;
          background-color: var(--color-tint);
          color: rgb(243, 237, 237);
          border-radius: 6px;
        }
      }
      .Bcoins-coins {
        margin: 16px 0;
        font-size: 25px;
        display: flex;
        align-items: center;
        .Bcoins {
          margin: 0 10px;
        }
        .coins {
          margin: 0 10px;
        }
      }
    }
    .vip-time {
      font-size: .35rem;
      display: flex;
      align-items: center;
      height: 100px;
      line-height: 100px;
      border-top: 1px solid rgb(95, 95, 95, 0.8);
      background-color: rgba(61, 60, 60, 0.6);
      margin-bottom: -20px;
      padding-left: 20px;
      margin-top: 10px;
      span {
        &:first-child {
          font-weight: bold;
          color: var(--color-tint);
          margin-right: 20px;
        }
        &:last-child {
          flex: auto;
          text-align: right;
        }
      }
    }
    .footer {
      display: flex;
      align-items: center;
      font-size: .35rem;
      margin-top: 30px;
      background-color: rgba(61, 60, 60, 0.6);
      padding: 20px 0;
      .item {
        flex: auto;
        display: flex;
        flex-direction: column;
        text-align: center;
        span {
          margin: 5px 0;
        }
      }
    }
  }
  .no-token {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      .left {
        padding-left: 10px;
        span {
          display: flex;
          flex-direction: column;
        }
        .title {
          color: #eee;
          font-size: 40px;
          padding-top: 80px;
          margin: 10px 0;
        }
        .sub {
          font-size: 20px;
          color: rgb(180, 180, 180);
        }
      }
      .right {
        padding-right: 10px;
        .scan {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0;
        }
        img {
          width: .1rem;
          height: .1rem;
        }
      }
    }
    .footer {
      margin: 30px 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-weight: 10;
      font-size: 30px;
      .register,
      .login {
        height: 60px;
        width: 46%;
        text-align: center;
        line-height: 60px;
        background-color: rgb(98, 98, 98);
        color: rgb(160, 160, 160);
        border-radius: 8px;
      }
      .login {
        color: var(--color-text);
        background-color: rgb(182, 98, 121);
        color: #eee;
      }
    }
  }
}
</style>