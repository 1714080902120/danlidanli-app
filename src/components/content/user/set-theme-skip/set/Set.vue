<template>
  <div id="set">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">设置</span>
    </div>
    <div class="content">
      <span class="outer" v-for="(listItem, index) in list" :key="listItem.col">
        <li class="inner" v-for="(item, indey) in listItem.items" :key="item" @click="detail(index, indey)" v-waves>
          <span>{{ item }}</span>
          <span>〉</span>
        </li>
      </span>
    </div>
    <div class="footer" @click="logout()" v-waves>退出登录</div>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="right">
        <component :is="app.default"></component>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "Set",
  data() {
    return {
      cmps: [
        ["AccountInformation", "SecurityPrivacy", "ReceivingInformation"],
        ["HomeRecommendSet", "PlaySettings", "OfflineSettings", "PursuitSettings"],
        ["DynamicSettings", "PushSettings", "MessageSettings", "ClearStorage", "OtherSettings"],
        ["MyService", "Help", "UserAgreement", "PrivacyPolicy", "PrivacySettings"]
      ],
      app: '',
      popupVisible: false,
      list: [
        {
          col: "0",
          items: ["账号资料", "安全隐私", "收货信息"]
        },
        {
          col: "1",
          items: ["首页推荐设置", "播放设置", "离线设置", "追番设置"]
        },
        {
          col: "2",
          items: [
            "动态设置",
            "推送设置",
            "消息设置",
            "清理存储空间",
            "其他设置"
          ]
        },
        {
          col: "3",
          items: ["我的客服", "帮助", "用户协议", "隐私政策", "隐私权限设置"]
        }
      ]
    };
  },
  created() {
    this.Bus()
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
    detail(x, y) {
      this.app = require(`./${this.cmps[x][y]}.vue`);
      this.popupVisible = true
    },
    logout() {
      window.localStorage.removeItem("haveToken");
      window.localStorage.removeItem("token");
      this.$store.commit("logout");
      this.$router.replace({
        name: "HomeRecommend",
        params: {
          type: "logout"
        }
      });
      Toast({
        message: "退出成功",
        position: "middle",
        duration: 3000
      });
    },
    Bus () {
      this.$Bus.$on('closeSetPopup', () => {
        this.popupVisible = false
      })
    }
  }
};
</script>

<style lang="less" scoped>
#set {
  background-color: var(--base-bg-color-sec) !important;
  width: 10rem;
  height: 17.7rem;
  font-size: 0.4rem;
  overflow-x: hidden;
  .head {
    position: sticky;
    top: 0;
    height: 1.6rem;
    background-color: rgb(54, 54, 54);
    display: flex;
    align-items: center;
    .back {
      padding-bottom: 0.1rem;
      margin: 0 0.5rem;
      display: flex;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.5rem;
      img {
        width: 0.35rem;
        height: 0.35rem;
        margin-right: 0.2rem;
        padding-bottom: 0.05rem;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .outer {
      flex: auto;
      display: flex;
      flex-direction: column;
      margin-top: 0.4rem;
      background-color: rgb(50, 50, 50);
      &:last-child {
        margin-bottom: 0.4rem;
      }
      .inner {
        margin: 0 0.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        list-style: none;
        border-bottom: 0.01rem solid rgba(104, 104, 104, 0.1);
        display: flex;
        justify-content: space-between;
        span {
          &:last-child {
            opacity: 0.2;
          }
        }
      }
    }
  }
  .footer {
    position: relative;
    width: 10rem;
    height: 1.3rem;
    line-height: 1.3rem;
    bottom: 0rem;
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgb(50, 50, 50);
    margin-bottom: 0.5rem;
  }
  .popup {
    .pop {
      width: 10rem;
      height: 100vh;
    }
  }
}
#B-card::-webkit-scrollbar {
  display: none;
}
</style>