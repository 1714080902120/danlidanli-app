<template>
  <div id="registerOrLogin" :class="{ 'to-active': isActive, 'to-default': !isActive }">
    <mt-header class="header" title>
      <mt-button slot="left" icon="back" @click="goBack()">返回</mt-button>
      <mt-button slot="right" @click="go()">{{ type() }}</mt-button>
    </mt-header>
    <div class="bg">
      <img v-if="!isFocus" v-lazy="img.default" alt />
      <img v-if="isFocus" v-lazy="img.active" alt />
    </div>
    <div class="content">
      <div class="username">
        <span>用户名</span>
        <span :class="{ isWrong: ifUserNameMoreThanThirteen() }">
          <input type="text" id="username" placeholder="请输入手机号" v-model="username" />
        </span>
      </div>
      <div class="password">
        <span>密码</span>
        <span :class="{ isWrong: ifPasswordMoreThanSix() }">
          <input
            @focus="whenFocus()"
            @blur="whenBlur()"
            type="password"
            name
            id="password"
            v-model="password"
            placeholder="6-15, 可以用密码或数字"
          />
        </span>
      </div>
      <div class="repassword" v-if="enterType === 'register'">
        <span>确认密码</span>
        <span :class="{ isWrong: ifEqualToPassword() }">
          <input
            @focus="whenFocus()"
            @blur="whenBlur()"
            type="password"
            name
            id="repassword"
            v-model="repassword"
            placeholder="确认密码"
          />
        </span>
      </div>
      <div class="mail" v-if="enterType === 'register'">
        <span>邮箱</span>
        <span :class="{ isWrong: ifItsMail() }">
          <input type="email" name id="mail" v-model="mail" placeholder="请输入邮箱地址" />
        </span>
      </div>
      <div class="mail-check" v-if="enterType === 'register'">
        <span class="check">
          <input type="text" name id="check" v-model="check" placeholder="请输入验证码" />
        </span>
        <span class="check-btn" v-if="hadSend === false" @click="sendMail($event)">获取验证码</span>
        <span v-else-if="hadSend === true" class="time">等待{{ time }}秒</span>
      </div>
      <div
        class="btn"
        v-if="!ifUserNameMoreThanThirteen() && !ifPasswordMoreThanSix() && !ifEqualToPassword() && !ifItsMail() && !ifEqualToCheckCode() && !ifCheck()"
        @click="toRegister()"
        v-waves
      >{{ ReType() }}</div>
      <div
        class="btn-error"
        v-if="ifUserNameMoreThanThirteen() || ifPasswordMoreThanSix() || ifEqualToPassword() || ifItsMail() || ifEqualToCheckCode() || ifCheck()"
      >{{ ReType() }}</div>
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
import { sendMail, Register, getToken } from "network/user";
import Utils from "common/utils";

export default {
  name: "RegisterOrLogin",
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
      mail: "",
      check: "",
      isFocus: false,
      img: {
        default: require("assets/img/r_or_l/r_or_l_bg_default.png"),
        active: require("assets/img/r_or_l/r_or_l_bg_active.png")
      },
      // 当前的路由path
      enterType: "",
      hadSend: false,
      time: 60,
      isActive: false
    };
  },
  created() {
    if (!this.$route.params.type) {
      this.$route.params.type = "register";
    }
  },
  activated() {
    this.enterType = this.$route.params.type;
    this.refresh();
    this.isActive = true;
  },
  methods: {
    // 返回
    goBack() {
      this.isActive = false;
      let timer = setTimeout(() => {
        this.$router.replace({ path: this.$route.params.beforePath });
        clearTimeout(timer);
        timer = null;
      }, 150);
    },
    refresh() {
      // 清零
      (this.username = ""),
        (this.password = ""),
        (this.check = ""),
        (this.mail = ""),
        (this.repassword = "");
    },
    // 改变当前路由
    go() {
      if (this.enterType === "register") {
        this.enterType = "login";
      } else if (this.enterType === "login") {
        this.enterType = "register";
      }
      // 清零
      (this.username = ""),
        (this.password = ""),
        (this.check = ""),
        (this.mail = ""),
        (this.repassword = "");
    },
    // 聚焦
    whenFocus() {
      this.isFocus = true;
    },
    // 失焦
    whenBlur() {
      this.isFocus = false;
    },
    // 发送邮件，获取验证码
    async sendMail() {
      const reg = /@/gi;
      const reg2 = /\.com/i;
      if (this.mail && reg.test(this.mail) && reg2.test(this.mail)) {
        this.hadSend = true;
        this.verification();
        await sendMail({ mail: this.mail }).then(res => {
          window.localStorage.setItem("mailCode", Utils.Encrypt(res.data));
        });
        Toast({
          message: "发送成功！",
          position: "middle",
          duration: 3000
        });
      } else {
        Toast({
          message: "请输入邮箱的正确格式！",
          position: "middle",
          duration: 3000
        });
        return false;
      }
    },
    // 注册
    async toRegister() {
      const username = this.username;
      const password = this.password;
      if (this.enterType === "register") {
        await Register({ username, password })
          .then(res => {
            Toast({
              message: `${res}`,
              position: "middle",
              duration: 3000
            });
            this.isActive = false;
            let timer = setTimeout(() => {
              this.$router.replace({
                name: "HomeRecommend",
                params: { type: "register" }
              });
              clearTimeout(timer);
              timer = null;
            }, 150);
          })
          .catch(err => {
            Toast({
              message: `${err}`,
              position: "middle",
              duration: 3000
            });
            return false
          });
      } else if (this.enterType === "login") {
        getToken({ username, password })
          .then(res => {
            Toast({
              message: `${res}`,
              position: "middle",
              duration: 3000
            });
            this.isActive = false;
            let timer = setTimeout(() => {
              this.$router.replace({
                name: "HomeRecommend",
                params: { type: "login" }
              });
              clearTimeout(timer);
              timer = null;
            }, 150);
          })
          .catch(err => {
            Toast({
              message: `${err}`,
              position: "middle",
              duration: 3000
            });
          });
      }
    }
  },
  computed: {
    type() {
      return () => {
        return this.enterType === "register" ? "登录" : "注册";
      };
    },
    ReType() {
      return () => {
        return this.enterType !== "register" ? "登录" : "注册";
      };
    },
    ifUserNameMoreThanThirteen() {
      return () => {
        const array = this.username.split("");
        return array.length > 0 && array.length < 11 ? true : false;
      };
    },
    ifPasswordMoreThanSix() {
      return () => {
        const array = this.password.split("");
        return array.length > 0 && array.length < 5 ? true : false;
      };
    },
    ifEqualToPassword() {
      return () => {
        return this.repassword > 0 && this.repassword !== this.password
          ? true
          : false;
      };
    },
    ifItsMail() {
      return () => {
        const reg = /@/gi;
        const reg2 = /\.com/i;
        return this.mail !== "" &&
          (!reg.test(this.mail) || !reg2.test(this.mail))
          ? true
          : false;
      };
    },
    verification() {
      return () => {
        let timer = setInterval(() => {
          this.time -= 1;
          if (this.time === 0) {
            this.time = 60;
            this.hadSend = false;
            clearInterval(timer);
            timer = null;
          }
        }, 1000);
        return this.time;
      };
    },
    ifEqualToCheckCode() {
      return () => {
        if (window.localStorage.getItem("mailCode")) {
          if (
            this.check !==
            Utils.Decrypt(window.localStorage.getItem("mailCode"))
          ) {
            return true;
          } else if (
            this.check ===
            Utils.Decrypt(window.localStorage.getItem("mailCode"))
          ) {
            return false;
          }
        } else {
          return false;
        }
      };
    },
    ifCheck() {
      return () => {
        if (this.enterType === "register") {
          return this.check.split("") <= 0;
        } else if (this.enterType === "login") {
          return false;
        }
      };
    }
  },
  watch: {
    deep: true,
    immediate: true
  },
  destroyed() {
    this.isActive = false;
  }
};
</script>

<style lang="less" scoped>
#registerOrLogin {
  height: 100vh;
  background-color: var(--base-bg-color-sec);
  transform: translateX(100%);
  overflow: hidden;
  opacity: 0;
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
    .isWrong {
      border: 1px solid rgb(255, 0, 0);
      input {
        color: rgb(255, 0, 0);
      }
    }
    .mail-check {
      input {
        border: none;
        border-right: 1px solid rgba(238, 237, 237, 0.8);
      }
      .time {
        color: rgb(92, 91, 91);
        text-align: center;
      }
      .check-btn {
        font-size: 30px;
      }
    }
    .btn,
    .btn-error {
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
    .btn-error {
      background-color: rgb(68, 67, 67);
      color: rgb(110, 105, 105);
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
img[lazy="loading"] {
  width: 375px;
  height: 200px;
  margin: auto;
  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
}
</style>