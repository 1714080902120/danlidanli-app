<template>
  <div id="registerOrLogin">
    <mt-header class="header" title>
      <mt-button slot="left" icon="back" @click="goBack()">返回</mt-button>
      <mt-button slot="right" @click="go()">{{ type() }}</mt-button>
    </mt-header>
    <div class="bg">
      <img v-if="!isFocus" src="~assets/img/r_or_l/r_or_l_bg_default.png" alt />
      <img v-if="isFocus" src="~assets/img/r_or_l/r_or_l_bg_active.png" alt />
    </div>
    <div class="content">
      <div class="username">
        <span>用户名</span>
        <span>
          <input type="text" id="username" placeholder="请输入手机号" :v-model="username" />
        </span>
      </div>
      <div class="password">
        <span>密码</span>
        <span>
          <input
            @focus="whenFocus()"
            @blur="whenBlur()"
            type="password"
            name
            id="password"
            :v-model="password"
            placeholder="6-15, 可以用密码或数字"
          />
        </span>
      </div>
      <div class="repassword">
        <span>确认密码</span>
        <span>
          <input
            @focus="whenFocus()"
            @blur="whenBlur()"
            type="password"
            name
            id="repassword"
            :v-model="repassword"
            placeholder="确认密码"
          />
        </span>
      </div>
      <div class="mail">
        <span>邮箱</span>
        <span>
          <input type="email" name id="mail" :v-model="mail" placeholder="请输入邮箱地址" />
        </span>
      </div>
      <div class="mail-check">
        <span class="check">
          <input type="text" name id="check" v-model="check" placeholder="请输入验证码" />
        </span>
        <span class="check-btn" @click="sendMail()">获取验证码</span>
      </div>
      <div class="btn" v-waves>{{ type() }}</div>
      <div class="footer">
        <p>未注册或未绑定哔哩哔哩的手机号，将帮你注册新账号</p>
        <p>
          登录即代表你同意
          <span>用户协议</span>和
          <span>隐私政策</span>
        </p>
        <p>
          遇到问题？
          <span>查看帮助</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  name: "RegisterOrLogin",
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      mail: "",
      check: "",
      isFocus: false
    };
  },
  created() {},
  methods: {
    goBack() {
      this.$router.replace({ path: this.$route.params.beforePath });
    },
    go() {},
    whenFocus() {
      this.isFocus = true;
    },
    whenBlur() {
      this.isFocus = false;
    },
    sendMail() {
      // let reg = new RegExp("@", "gi");
      if (!this.mail) {
        Toast({
          message: "发送成功！",
          position: "top",
          duration: 3000
        });
        console.log('123')
      }
    }
  },
  computed: {
    type() {
      return () => {
        return this.$route.params.type === "register" ? "登录" : "注册";
      };
    }
  }
};
</script>

<style lang="less" scoped>
#registerOrLogin {
  height: 100vh;
  background-color: var(--base-bg-color-sec);
  .header {
    height: 8vh;
    background-color: rgb(72, 72, 72);
    display: flex;
    font-size: 32px;
    box-shadow: 0 1px 1px #000;
  }
  .bg {
    margin-top: 20px;
    border-top: 1px solid rgb(238, 237, 237, 0.8);
    img {
      width: 100%;
    }
    margin-bottom: 30px;
  }
  .content {
    font-size: 40px;
    padding-bottom: 40px;
    .username,
    .password,
    .repassword,
    .mail,
    .mail-check {
      height: 100px;
      line-height: 100px;
      padding-left: 20px;
      padding-right: 30px;
      border-bottom: 1px solid rgb(100, 100, 100);
      display: flex;
      align-content: center;
      justify-content: space-between;
      span {
        ::before {
          content: "︱";
          color: #fff;
        }
      }
      input {
        background-color: transparent;
        border: none;
        color: var(--color-text);
        outline: none;
        border-left: 1px solid rgba(255, 255, 255, 0.8);
        text-align: center;
        font-size: 38px;
      }
    }

    .username {
      border-top: 1px solid rgb(100, 100, 100);
    }
    .mail-check {
      input {
        border: none;
        border-right: 1px solid rgba(238, 237, 237, 0.8);
      }
    }
    .btn {
      font-size: 50px;
      height: 100px;
      width: 70%;
      margin: 30px auto;
      margin-bottom: 0;
      border-radius: 12px;
      line-height: 100px;
      text-align: center;
      background-color: rgb(41, 73, 82);
    }
    .footer {
      margin-top: 30px;
      color: rgb(200, 200, 200);
      p {
        margin: 10px;
        font-size: 30px;
        text-align: center;
        span {
          color: rgb(221, 31, 79);
        }
      }
    }
  }
}
</style>