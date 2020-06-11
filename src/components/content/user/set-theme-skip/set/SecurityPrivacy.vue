<template>
  <div id="security-privacy">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">安全隐私</span>
    </div>
    <div class="content">
      <ul v-for="(outer, index) in list" :key="index">
        <div class="outer-title">{{ outer.title }}</div>
        <li
          v-for="(item, indey) in outer.content"
          :key="indey"
          @click="detail(index, indey)"
          v-waves
        >
          <div class="left">
            <span>{{ item.title }}</span>
            <span>{{ item.sub }}</span>
          </div>
          <div class="right">{{ item.more }}</div>
        </li>
      </ul>
    </div>
    <div class="pop-2">
      <mt-popup class="pop" v-model="popupVisible2" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop2()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <div class="head-right" @click="openSheet()">
            <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
          </div>
        </div>
        <div class="pop-content-2">
          <iframe class="frame" :src="innerHtml">
            <a :href="innerHtml">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
    <div class="action-sheet">
      <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
    </div>
    <div class="modal" v-if="sheetVisible"></div>
  </div>
</template>

<script>
export default {
  name: "SecurityPrivacy",
  data() {
    return {
      popupVisible: false,
      popupVisible2: false,
      sheetVisible: false,
      actions: [{ name: "浏览器打开", method: this.goToNavigator }],
      activeItem: "",
      list: [
        {
          title: "",
          content: [
            {
              title: "账号安全中心",
              sub: "",
              more: ""
            },
            {
              title: "实名认证",
              sub: "",
              more: ""
            },
            {
              title: "空间隐私设置",
              sub: "",
              more: ""
            },
            {
              title: "黑名单管理",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "登陆设备管理",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "青少年保护计划",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      innerHtml: ""
    };
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      this.activeItem = this.list[x].content[y].title;
      switch (x) {
        case 0:
          break;
        case 1:
          this.innerHtml = "https://www.bilibili.com/h5/validate/device";
          this.popupVisible2 = true;
          break;
        case 2:
          this.innerHtml =
            "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fpassport.bilibili.com%2Faccount%2Fmobile%2Fsecurity";
          this.popupVisible2 = true;
          break;
      }
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    closePop() {
      this.popupVisible = false;
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      window.location.href = this.innerHtml;
      this.sheetVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#security-privacy {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head,
  .pop-head {
    position: relative;

    height: 1.6rem;
    background-color: var(--base-bg-color-thr);
    display: flex;
    align-items: center;
    .back {
      margin: 0 0.5rem;
      img {
        width: 0.5rem;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 0.45rem;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    .outer-title {
      font-size: 0.27rem;
      margin-bottom: 0.2rem;
      padding: 0 0.3rem;
      opacity: 0.9;
    }
    li {
      padding: 0 0.3rem;
      height: 1.4rem;
      list-style: none;
      background-color: var(--base-set-item-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
      .left {
        display: flex;
        flex-direction: column;
        span {
          &:last-child {
            font-size: 0.3rem;
            opacity: 0.9;
            margin-top: 0.1rem;
          }
        }
      }
      .right {
        font-size: 0.3rem;
        opacity: 0.5;
        &::after {
          content: "〉";
          margin-left: 0.2rem;
          opacity: 0.5;
        }
      }
      .content-switch {
        margin-right: 0.3rem;
        /deep/ .mint-switch-core {
          height: 0.4rem;
          width: 0.8rem;
          background-color: var(--color-tint);
          border-color: var(--color-tint);
          opacity: 0.7;
          &::before {
            width: 0.8rem;
            height: 0.4rem;
            background-color: #fff !important;
            border-color: #fff !important;
            top: -0.02rem;
          }
          &::after {
            width: 0.55rem;
            height: 0.55rem;
            background-color: var(--color-tint);
            left: -0.2rem;
            top: -0.1rem;
          }
        }
      }
    }
  }
  .content {
  }
  .pop,
  .pop-2 {
    width: 10rem;
    height: 100vh;
    background-color: var(--base-set-bg-color);
    .pop-head {
      .title {
        font-size: 0.4rem;
        width: 7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .head-right {
        img {
          width: 0.9rem;
          height: 0.9rem;
        }
      }
    }
    .pop-content {
      margin: 0.2rem;
      .black-name {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 5rem;
        }
        .black-msg {
          margin-top: 0.2rem;
        }
      }
      .unfollows-messages {
        .outer-title {
          margin-top: 0.3rem;
          margin-bottom: 0.2rem;
        }
      }
      .endan-messages {
        margin: 0 -0.2rem;
        ul {
          li {
            .left {
              span {
                &:first-child {
                  font-size: 0.4rem;
                  opacity: 1;
                }
              }
            }
          }
          &:first-child {
            margin-top: -0.2rem;
          }
        }
      }
      .fans-messages {
        .radio-list {
          display: flex;
          flex-direction: column;
          margin: 0 -0.2rem;
          .radio-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--base-set-item-color);
            height: 1.4rem;
            border-bottom: 0.01rem solid rgba(100, 100, 100, 0.2);
            padding: 0 0.3rem;
            .radio-left {
              display: flex;
              flex-direction: column;
              font-size: 0.4rem;
              span {
                &:last-child {
                  font-size: 0.3rem;
                  opacity: 0.8;
                  margin-top: 0.05rem;
                }
                &:first-child {
                  font-size: 0.4rem;
                }
              }
            }
            .radio-right {
              position: relative;
              top: 0.2rem;
              left: 0.2rem;
              .thr,
              .sec,
              .fir {
                transition: 0.3s;
                position: absolute;
                width: 0.6rem;
                height: 0.6rem;
                background-color: var(--color-text);
                left: -1rem;
                top: -0.5rem;
                border-radius: 100%;
              }
              .sec {
                width: 0.5rem;
                height: 0.5rem;
                background-color: var(--base-set-item-color);
                left: -0.95rem;
                top: -0.45rem;
              }
              .thr {
                width: 0.3rem;
                height: 0.3rem;
                left: -0.85rem;
                top: -0.35rem;
                background-color: transparent;
              }
              .active {
                transition: 0.3s;
                background-color: var(--color-tint);
              }
            }
          }
        }
      }
    }
    .pop-content-2 {
      .frame {
        overflow: hidden;
        width: 10rem;
        height: 16.3rem;
      }
      .frame::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
  .action-sheet {
    /deep/ .sheet {
      z-index: 9999 !important;
      background-color: var(--base-set-bg-color);
      /deep/ .mint-actionsheet-list {
        .mint-actionsheet-listitem {
          border-color: var(--base-set-bg-color);
          background-color: var(--base-set-item-color);
          &:last-child {
            height: 2.4rem;
            background-repeat: no-repeat;
            background-image: url("~assets/img/user/set/navigator_dark.svg");
            background-size: 1.2rem 1.2rem;
            background-position: 0.7rem 0.2rem;
            color: var(--color-text);
            font-size: 0.4rem;
            font-weight: lighter;
            text-align: left;
            padding-top: 1.2rem;
            padding-left: 0.4rem;
          }
        }
      }
      /deep/ .mint-actionsheet-button {
        border-color: var(--base-set-bg-color);
        font-weight: lighter;
        color: var(--color-text);
        background-color: var(--base-set-item-color);
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
}
</style>