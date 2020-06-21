<template>
  <div id="privacy-settings">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">隐私权限设置</span>
    </div>
    <div class="content">
      <div class="outer" v-for="(item, index) in setList" :key="index">
        <div class="inner-title" @click="open(index)" v-waves>
          <span>{{ item.title }}</span>
          <span v-if="index !== 6" class="content-set">{{ item.state }}</span>
          <mt-switch class="content-switch" v-if="index === 6" v-model="value"></mt-switch>
        </div>
        <div class="inner-sub" @click="showPop(index)">{{ item.sub }}</div>
      </div>
    </div>
    <div class="footer" @click="destroy()" v-waves>账号注销</div>
    <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
      <div class="pop-head">
        <span class="back" @click="closePop()">
          <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
        </span>
        <span class="title">{{ activeItem }}说明</span>
        <div class="head-right" @click="openSheet()">
          <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
        </div>
      </div>
      <div class="pop-content">
        <div class="join-us">
          <iframe class="frame" :src="innerhtml">
            <a :href="innerhtml">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </div>
    </mt-popup>
    <div class="action-sheet">
      <mt-actionsheet class="sheet" :actions="actions" v-model="sheetVisible" :modal="false"></mt-actionsheet>
    </div>
    <div class="modal" v-if="sheetVisible === true"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { Toast } from "mint-ui";

export default {
  name: "PrivacySettings",
  data() {
    return {
      innerhtml: "",
      activeItem: "",
      value: true,
      actions: [
        {
          name: "浏览器打开",
          method: this.goToNavigator
        }
      ],
      sheetVisible: false,
      popupVisible: false,
      setList: [
        {
          title: "允许哔哩哔哩查看电话信息",
          sub: "查看详细：电话权限使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩访问位置信息",
          sub: "查看详细：位置信息使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩访问日历信息",
          sub: "查看详细：日历信息使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩使用相机功能",
          sub: "查看详细：相机权限使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩使用麦克风功能",
          sub: "查看详细：麦克风权限使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩使用文件存储和访问功能",
          sub: "查看详细：文件存储和访问权限使用规则",
          state: "去设置"
        },
        {
          title: "允许哔哩哔哩个性化展现广告推荐",
          sub: "详细了解：个性化推荐相关度更高却更有帮助的优质广告",
          state: "去设置"
        }
      ],
      stateList: [
        "CONTACTS",
        "LOCATION",
        "NOTIFITION",
        "CAMERA",
        "RECORD",
        "GALLERY",
        "SHORTCUT"
      ],
      innerhtmlList: [
        "https://www.bilibili.com/blackboard/protocal/privacy_phone.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-location.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-calendar.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-camera.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-mic.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-storage.html",
        "https://www.bilibili.com/blackboard/protocal/privacy-ad.html"
      ]
    };
  },
  created() {
    this.judgeState();
  },
  activated() {
    this.judgeState();
  },
  methods: {
    showPop(i) {
      this.activeItem = this.setList[i].title;
      this.innerhtml = this.innerhtmlList[i];
      this.popupVisible = true;
    },
    closePop() {
      this.popupVisible = false;
    },
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    },
    destroy() {
      Toast({
        message: "毁号有风险！(其实是后台没有写删除的代码~~)",
        position: "middle",
        duration: 3000
      });
    },
    judgeState() {
      this.stateList.forEach((e, i) => {
        switch (plus.navigator.checkPermission(e)) {
          case "authorized":
            this.setList[i].state = "已开启";
            break;
          case "denied":
            this.setList[i].state = "已关闭定位权限";
            break;
          case "undetermined":
            this.setList[i].state = "去设置";
            break;
          case "unknown":
            this.setList[i].state = "无法查询定位权限";
            break;
          default:
            this.setList[i].state = "不支持定位权限";
            break;
        }
      });
    },
    open(i) {
      let main = plus.android.runtimeMainActivity();
      let Intent = plus.android.importClass("android.content.Intent");
      // let Settings = plus.android.importClass("android.provider.Settings")
      let Uri = plus.android.importClass("android.net.Uri");
      let uri = Uri.fromParts("package", main.getPackageName(), null);
      let state = this.setList[i].state;
      if (state === "去设置") {
        let mIntent = new Intent(
          "android.settings.APPLICATION_DETAILS_SETTINGS",
          uri
        ); //里面内容根据下面的代码进行更换，获得不同的权限
        main.startActivity(mIntent);
      }
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href = this.innerhtml;
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        Toast({
          message: "将为你推荐优质的广告",
          position: "middle",
          duration: 3000
        });
      } else {
        Toast({
          message: "将减少推荐优质的广告",
          position: "middle",
          duration: 3000
        });
      }
    },
    deep: true,
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#privacy-settings {
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
    .head-right {
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0 0 0;
    .outer {
      display: flex;
      flex-direction: column;
      .inner-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        background-color: var(--base-set-item-color);
        height: 1.2rem;
        line-height: 1.2rem;
        .content-set {
          font-size: 0.35rem;
          opacity: 0.6;
          &::after {
            margin-left: 0.2rem;
            content: "〉";
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
      .inner-sub {
        font-size: 0.3rem;
        color: rgba(33, 179, 241, 0.9);
        padding: 0 0.3rem;
        margin: 0.15rem 0 0.3rem 0;
      }
    }
  }
  .footer {
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: var(--base-set-item-color);
    padding-left: 0.3rem;
  }
  .pop {
    width: 10rem;
    height: 100vh;
    background-color: var(--base-bg-color-white);
    .pop-head {
      .title {
        font-size: 0.4rem;
        width: 7rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .pop-content {
      margin: 0.2rem;
      .join-us {
        margin: -0.2rem;
        .frame {
          width: 10rem;
          height: 16.6rem;
        }
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