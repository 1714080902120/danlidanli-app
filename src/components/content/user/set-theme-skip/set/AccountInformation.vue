<template>
  <div id="account-information">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">账号资料</span>
    </div>
    <div class="content" v-if="Object.keys($store.state.userInfo).length > 0">
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

          <div class="right">
            <img
              v-if="index === 0 && indey === 0"
              :src="`${$store.state.userInfo.baseInfo.logo.src}${$store.state.userInfo.baseInfo.logo.name}`"
              alt
            />
            <img
              v-if="index === 2 && indey === 1"
              src="~assets/img/user/set/qrcode_dark.svg"
              :class="{ 'square': true }"
              alt
            />
            {{ item.more }}
          </div>
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
          <span class="share-downlaod" v-if="activeItem === '二维码'">
            <img @click="share()" src="~assets/img/user/set/share_dark.svg" alt />
            <img @click="download()" src="~assets/img/user/set/download_dark.svg" alt />
          </span>
          <!-- <span>♂?♀</span> -->
        </div>
        <div class="pop-content">
          <div class="qrcode" v-if="activeItem === '二维码'">
            <img @click="look()" src="~assets/img/user/set/qrcode_dan.png" alt />
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
/* eslint-disable no-undef */
import { Toast } from "mint-ui";

export default {
  name: "AccountInformation",
  data() {
    return {
      popupVisible: false,
      popupVisible2: false,
      sheetVisible: false,
      popupVisible3: false,
      innerHtml: "",
      actions: [{ name: "浏览器打开", method: this.goToNavigator }],
      activeItem: "",
      list: [
        {
          title: "",
          content: [
            {
              title: "头像",
              sub: "",
              more: ""
            },
            {
              title: "昵称",
              sub: "",
              more: `${this.$store.state.userInfo.baseInfo.name}`
            },
            {
              title: "性别",
              sub: "",
              more: "男"
            },
            {
              title: "出生年月",
              sub: "",
              more: "1911-11-11"
            },
            {
              title: "个性签名",
              sub: "",
              more: `${this.$store.state.userInfo.baseInfo.desc}`
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "头像挂件",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "UID",
              sub: "",
              more: `${this.$store.state.userInfo.identy.uuid}`
            },
            {
              title: "二维码名片",
              sub: "",
              more: ""
            },
            {
              title: "购买邀请码",
              sub: "",
              more: "本月剩余1个"
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "哔哩哔哩认证",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      qrcode: {},
      imgSrc: ""
    };
  },
  created() {
    // console.log(this.$store.state.userInfo);
    this.activeItem = "二维码";
    this.popupVisible = true;
    this.getQrCode();
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      this.activeItem = this.list[x].content[y].title;
      switch (x) {
        case 0:
          switch (y) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              break;
            case 3:
              break;
          }
          break;
        case 1:
          break;
        case 2:
          switch (y) {
            case 0:
              break;
            case 1:
              this.activeItem = "二维码";
              this.popupVisible = true;
              break;
            case 2:
              this.innerHtml =
                "https://passport.bilibili.com/login?gourl=https%3A%2F%2Faccount.bilibili.com%2Fmobile%2Faccount%2Finvitation";
              this.popupVisible2 = true;
              break;
          }
          break;
        case 3:
          this.innerHtml =
            "https://passport.bilibili.com/login?gourl=https%3A%2F%2Faccount.bilibili.com%2Fofficial%2Fmobile%2Fhome";
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
    },
    getQrCode() {
      let reg = /qrcode_dan/gi;
      plus.io.requestFileSystem(
        plus.io.PRIVATE_WWW,
        fs => {
          let directoryReader = fs.root.createReader();
          directoryReader.readEntries(
            entries => {
              let directoryReader = entries[1].createReader();
              directoryReader.readEntries(
                entriess => {
                  for (let i = 0; i < entriess.length; i++) {
                    if (reg.test(entriess[i].name)) {
                      let obj = {};
                      for (const key in entriess[i]) {
                        const element = entriess[i][key];
                        obj[key] = element;
                      }
                      this.qrcode = obj;
                    }
                  }
                },
                e => {
                  alert("Read entries failed: " + e.message);
                }
              );
            },
            () => {
              alert("读取文件失败");
            }
          );
        },
        () => {
          alert("读取失败");
        }
      );
    },
    share() {
      let msg = {
        type: "image",
        pictures: ["file://" + this.qrcode.fullPath]
      };
      plus.share.sendWithSystem(
        msg,
        () => {
          plus.nativeUI.toast("请选择分享对象！", {
            duration: 3000
          });
        },
        () => {
          plus.nativeUI.alert("使用系统分享失败", () => {}, "错误", "确定");
        }
      );
    },
    look() {
      plus.nativeUI.previewImage([
        require("assets/img/user/set/qrcode_dan.png")
      ]);
    },
    copyTo(en) {
      this.qrcode.copyTo(
        en,
        new Date().getTime().toString() + this.qrcode.name.toString(),
        entry => {
          let name = "_downloads/" + entry.name.toString();
          plus.gallery.save(
            name,
            () => {
              Toast({
                message: "下载成功",
                duration: 3000,
                position: "middle"
              });
            },
            () => {
              Toast({
                message: "下载失败1",
                duration: 3000,
                position: "middle"
              });
            }
          );
        },
        e => {
          alert(`${e.message}`);
        }
      );
    },
    async download() {
      if (window.localStorage.getItem("DOWNLOAD_PATH")) {
        let path = window.localStorage.getItem("DOWNLOAD_PATH");
        await this.qrcode.getParent(
          entry => {
            alert(entry.fullPath);
            entry.getDirectory(
              path.toString(),
              { create: false, exclusive: false },
              entrys => {
                alert(entrys.fullPath);
                this.copyTo(entrys);
              },
              () => {
                alert("获取目录对象失败");
              }
            );
          },
          e => {
            alert(e);
          }
        );
      } else {
        await plus.io.requestFileSystem(
          plus.io.PUBLIC_DOWNLOADS,
          async fs => {
            this.copyTo(fs.root);
          },
          () => {
            alert("获取下载路径失败");
          }
        );
      }
    }
  },
  watch: {
    "$store.state.userInfo"(newVal) {
      this.imgSrc = newVal.baseInfo.logo.src + newVal.baseInfo.logo.name;
    },
    deep: true,
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#account-information {
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
      height: 1.2rem;
      list-style: none;
      background-color: var(--base-set-item-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.01rem solid rgba(100, 100, 100, 0.1);
      .left {
        display: flex;
        flex-direction: column;
        width: 4rem;
        span {
          &:last-child {
            font-size: 0.3rem;
            opacity: 0.9;
            margin-top: 0.1rem;
          }
        }
      }
      .right {
        font-size: 0.4rem;
        opacity: 1;
        display: flex;
        align-items: center;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 100%;
        }
        &::after {
          content: "〉";
          margin-left: 0.2rem;
          opacity: 0.3;
        }
        .square {
          border-radius: 0;
          width: 0.7rem;
          height: 0.7rem;
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
  .pop,
  .pop-2,
  .pop-3 {
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
      .share-downlaod {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 0.7rem;
          height: 0.7rem;
          opacity: 0.5;
          &:last-child {
            margin: 0 0.3rem 0 0.5rem;
          }
        }
      }
    }
    .pop-content {
      .qrcode {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 8rem;
        }
      }
    }
    .pop-content-2 {
      .frame {
        overflow: hidden;
        width: 10rem;
        height: 16.5rem;
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