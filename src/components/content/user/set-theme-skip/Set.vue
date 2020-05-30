<template>
  <div id="B-card">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">设置</span>
    </div>
    <div class="content">
      <span class="outer" v-for="listItem in list" :key="listItem.col">
        <li class="inner" v-for="item in listItem.items" :key="item" @click="detail()" v-waves>
          <span>{{ item }}</span>
          <span>〉</span>
        </li>
      </span>
    </div>
    <div class="footer" @click="logout()" v-waves>退出登录</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "BScore",
  data() {
    return {
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
  methods: {
    close() {
      this.$router.go(-1);
    },
    detail() {},
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
    }
  }
};
</script>

<style lang="less" scoped>
#B-card {
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
        margin-bottom: .4rem;
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
    margin-bottom: .5rem;
  }
}
#B-card::-webkit-scrollbar {
  display: none;
}
</style>