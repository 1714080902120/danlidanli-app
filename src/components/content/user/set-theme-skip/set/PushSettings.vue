<template>
  <div id="push-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">推送设置</span>
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
            <span>
              {{ item.title }}
              <span v-if="index === 0 && indey === 0">{{ state }}</span>
            </span>
            <span>{{ item.sub }}</span>
          </div>
          <div v-if="index === 0" class="right">{{ item.more }}</div>
          <mt-switch class="content-switch" v-if="index !== 0" v-model="item.more"></mt-switch>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">消息免打扰</span>
        </div>
        <div class="pop-content">
          <ul>
            <li v-waves>
              <div class="left">
                <span>消息免打扰</span>
              </div>
              <mt-switch class="content-switch" v-model="noDistrube"></mt-switch>
            </li>
          </ul>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "PushSettings",
  data() {
    return {
      list: [
        {
          title: "",
          content: [
            {
              title: "接收消息通知总开关",
              sub: "请在您设备的“设置-通知”中，选择“哔哩哔哩”进行修改",
              more: ""
            },
            {
              title: "消息免打扰",
              sub: "开启后，免打扰时间内将不会收到推送消息",
              more: ""
            }
          ]
        },
        {
          title: "关注消息",
          content: [
            {
              title: "普通关注UP主更新推送",
              sub: "",
              more: false
            },
            {
              title: "主播开播提醒",
              sub: "",
              more: false
            }
          ]
        },
        {
          title: "UP主小助手",
          content: [
            {
              title: "投稿服务",
              sub: "",
              more: true
            }
          ]
        },
        {
          title: "推荐内容",
          content: [
            {
              title: "推送我可能感兴趣的内容",
              sub: "向您推送更合适您的优质视频内容",
              more: true
            }
          ]
        }
      ],
      popupVisible: false,
      noDistrube: false,
      state: "[未开启]"
    };
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      if (x === 0 && y === 1) {
        this.popupVisible = true;
      } else if (x === 0 && y === 0) {
        let main = plus.android.runtimeMainActivity();
        let pkName = main.getPackageName();
        let NotificationManagerCompat = plus.android.importClass(
          "android.support.v4.app.NotificationManagerCompat"
        );
        let packageNames = NotificationManagerCompat.from(main);
        if (packageNames.areNotificationsEnabled()) {
          this.state = "[已开启]";
        } else {
          this.state = "[未开启]";
        }
        let Intent = plus.android.importClass("android.content.Intent");
        let intent = new Intent("android.settings.APP_NOTIFICATION_SETTINGS");
        //可设置表中所有Action字段
        intent.putExtra("android.provider.extra.APP_PACKAGE", pkName);
        main.startActivity(intent);
      }
    },
    closePop() {
      this.popupVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
#push-settings {
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
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.1);
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
      ul {
        li {
          .left {
            font-size: 0.4rem;
            span {
              font-size: 0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>