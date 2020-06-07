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
          <div class="head-right" @click="openSheet()">
            <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
          </div>
        </div>
        <div class="pop-content">
          <div v-if="selected.x === 3 && selected.y === 0" class="black-name">
            <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt="">
            <div class="black-msg">ヽ(￣▽￣)ﾉ再怎么找也没有啦</div>
          </div>
        </div>
      </mt-popup>
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
              title: "消息提醒",
              sub: "关闭后，消息将不再进行提醒",
              more: "所有人"
            },
            {
              title: "消息提醒",
              sub: "关闭后，消息将不再进行提醒",
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
              title: "消息提醒",
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
      popupVisible: true,
      sheetVisible: false,
      selected: {
        x: 0,
        y: 0
      }
    };
  },
  created() {
    this.selected = {
      x: 3,
      y: 0
    };
    this.activeItem = '黑名单管理'
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      this.selected = {
        x,
        y
      };
      this.activeItem = this.list[x].content[y].title;
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href = this.innerhtml;
    },
    closePop () {
      this.popupVisible = false
    }
  }
};
</script>

<style lang="less" scoped>
#message-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
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
  }
  .pop {
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
          margin-top: .2rem;
        }
      }
    }
  }
  .action-sheet {
    /deep/ .sheet {
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
}
</style>