<template>
  <div id="message-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">消息设置</span>
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
          <div v-if="index !== 0" class="right">{{ item.more }}</div>
          <mt-switch class="content-switch" v-if="index === 0" v-model="item.more"></mt-switch>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
        </div>
        <div class="pop-content">
          <div v-if="selected.x === 3 && selected.y === 0" class="black-name">
            <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
            <div class="black-msg">ヽ(￣▽￣)ﾉ再怎么找也没有啦</div>
          </div>
          <ul class="unfollows-messages" v-if="selected.x === 2 && selected.y === 1">
            <div class="outer-title">未关注人信息提醒</div>
            <li v-waves>
              <div class="left">
                <span>收起未关注人信息</span>
                <span>开启后，未关注人信息将被折叠在未关注人消息内</span>
              </div>
              <mt-switch class="content-switch" v-model="unfollowsMessage"></mt-switch>
            </li>
          </ul>
          <div class="endan-messages" v-if="selected.x === 2 && selected.y === 0">
            <ul>
              <li v-waves>
                <div class="left">
                  <span>接收应援团消息</span>
                </div>
                <mt-switch class="content-switch" v-model="endan[0]"></mt-switch>
              </li>
            </ul>
            <ul>
              <div class="outer-title">应援团信息提醒</div>
              <li v-waves>
                <div class="left">
                  <span>收起应援团信息</span>
                  <span>开启后，应援团消息将被折叠在我都应援团内</span>
                </div>
                <mt-switch class="content-switch" v-model="endan[1]"></mt-switch>
              </li>
            </ul>
            <ul>
              <div class="outer-title">应援团攻略</div>
              <li @click="showPop2()" v-waves>
                <div class="left">
                  <span>加入应援团攻略</span>
                </div>
                <div class="right"></div>
              </li>
            </ul>
          </div>
          <div class="fans-messages">
            <div class="radio-list" v-if="selected.x === 1">
              <div
                class="radio-list-item"
                v-for="(item, indez) in radioList.content"
                :key="indez"
                @click="select(indez)"
              >
                <div class="radio-left">
                  <span>{{ item }}</span>
                </div>
                <div class="radio-right">
                  <span class="fir" :class="{ active: indez === radioList.selected }"></span>
                  <span class="sec"></span>
                  <span class="thr" :class="{ active: indez === radioList.selected }"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mt-popup>
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
          <iframe class="frame" src="https://link.bilibili.com/h5/im/im-pink?bili_only=1">
            <a
              href="https://link.bilibili.com/h5/im/im-pink?bili_only=1"
            >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
    <div class="action-sheet">
      <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
    </div>
    <div class="modal" v-if="sheetVisible === true"></div>
  </div>
</template>

<script>
export default {
  name: "MessageSettings",
  data() {
    return {
      list: [
        {
          title: "",
          content: [
            { title: "消息提醒", sub: "关闭后，消息将不再进行提醒", more: true }
          ]
        },
        {
          title: "互动通知",
          content: [
            {
              title: "收到的赞提醒",
              sub: "是否接受点赞通知提醒",
              more: "始终提醒"
            },
            {
              title: "回复我的消息提醒",
              sub: "接收谁的评论消息提醒",
              more: "所有人"
            },
            {
              title: "@我的消息提醒",
              sub: "接收谁的消息提醒",
              more: "所有人"
            }
          ]
        },
        {
          title: "应援团和未关注人",
          content: [
            {
              title: "消息提醒",
              sub: "",
              more: "接收消息"
            },
            {
              title: "未关注人消息",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "联系人",
          content: [
            {
              title: "黑名单",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      activeItem: "",
      popupVisible: false,
      popupVisible2: false,
      sheetVisible: false,
      selected: {
        x: 0,
        y: 0
      },
      unfollowsMessage: false,
      endan: [true, false],
      ifShowOnHtml: false,
      actions: [{ name: "浏览器打开", method: this.goToNavigator }],
      radioList: {},
      reactRadioList: [
        {
          content: ["始终提醒", "永不提醒"],
          selected: 0
        },
        {
          content: ["所有人", "关注的人", "不接受任何消息提醒"],
          selected: 0
        },
        {
          content: ["所有人", "关注的人", "不接受任何消息提醒"],
          selected: 0
        }
      ]
    };
  },
  created() {},
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      this.selected = {
        x,
        y
      };
      switch (x) {
        case 0:
          break;
        case 1:
          this.radioList = this.reactRadioList[y];
          this.activeItem = "哔哩哔哩";
          this.popupVisible = true;
          break;
        case 2:
          switch (y) {
            case 0:
              this.activeItem = "应援团信息";
              this.popupVisible = true;
              break;
            case 1:
              this.activeItem = "未关注人信息";
              this.popupVisible = true;
              break;
          }
          break;
        case 3:
          this.activeItem = "黑名单管理";
          this.popupVisible = true;
          break;
      }
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href =
        "https://link.bilibili.com/h5/im/im-pink?bili_only=1";
    },
    closePop() {
      this.popupVisible = false;
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    showPop2() {
      this.popupVisible2 = true;
    },
    select(i) {
      this.radioList.selected = i;
      this.list[1].content[this.selected.y].more = this.radioList.content[i]
    }
  }
};
</script>

<style lang="less" scoped>
#message-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    &:first-child {
      margin-top: 0;
      margin-bottom: 0;
      .outer-title {
        margin-bottom: 0;
      }
    }
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
  .head,
  .pop-head {
    position: relative;
    border-bottom: 0.01rem solid var(--base-set-bg-color);
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
  .content {
    display: flex;
    flex-direction: column;
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