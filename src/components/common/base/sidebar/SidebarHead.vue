<template>
  <div id="sidebar-head">
    <div v-if="$store.state.haveToken && Object.keys(info).length > 0" class="have-token">
      <div class="header">
        <div class="logo-wallet-scan">
          <div class="logo"></div>
          <div class="wallet-scan">
            <span class="wallet"></span>
            <span class="scan"></span>
          </div>
        </div>
        <div class="name-level-label"></div>
        <div class="Bcoins-coins"></div>
      </div>
      <div class="footer">
        <div class="item" v-for="item in items" :key="item.name">
          <span>{{ item.num }}</span>
          <span>{{ item.name }}</span>
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
          <input class="scan" type="file" name="" id="" @click="toScan()">
          <img src="~assets/img/base/scan_dark.svg" alt />
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
    }
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getUserInfo();
    console.log()
  },
  methods: {
    getUserInfo() {
      if (Object.keys(this.info).length > 0) {
        let data = this.info;
        this.items = [
          { name: "动态", num: data.cardList.length },
          { name: "关注", num: data.baseInfo.fans_follows_likes.follows },
          { name: "粉丝", num: data.baseInfo.fans_follows_likes.fans }
        ];
      }
    },
    toScan() {
      
    },
    register() {
      this.$Bus.$emit('sidebarDisappear')
      this.$router.replace({ name: 'RegisterOrLogin', params: { beforePath: this.$route.path, type: 'register' } })
    },
    login() {
      this.$Bus.$emit('sidebarDisappear')
      this.$router.replace({ name: 'RegisterOrLogin', params: { beforePath: this.$route.path, type: 'login' } })
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar-head {
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(95, 95, 95);
  background-image: url('~assets/img/base/bilibili_user_logo_bg.svg');
  background-size: 70%;
  background-position-x: 140px;
  background-repeat: no-repeat;
  .have-token {

    .header {

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
          width: 40px;
          height: 40px;
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
      .register, .login {
        height: 60px;
        width: 46%;
        text-align: center;
        line-height: 60px;
        background-color: rgb(98,98,98);
        color: rgb(160, 160, 160);
        border-radius: 8px;
      }
      .login {
        color: var(--color-text);
        background-color: rgb(182,98,121);
        color: #eee;
      }
    }
  }
}
</style>