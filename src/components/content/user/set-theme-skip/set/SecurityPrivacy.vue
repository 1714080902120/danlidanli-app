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
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
        </div>
        <div class="pop-content">
          <div v-if="activeItem === '黑名单管理'" class="black-name">
            <img src="~assets/img/wallet/B_discount/B_discount_inner.png" alt />
            <div class="black-msg">ヽ(￣▽￣)ﾉ再怎么找也没有啦</div>
          </div>
          <div class="privacy" v-if="activeItem === '空间隐私设置'">
            <ul v-for="(outer, index) in privacyList" :key="index">
              <div class="outer-title">{{ outer.title }}</div>
              <li v-for="(item, indey) in outer.content" :key="indey" v-waves>
                <div class="left">
                  <span>{{ item.title }}</span>
                  <span>{{ item.sub }}</span>
                </div>

                <mt-switch class="content-switch" v-model="item.more"></mt-switch>
              </li>
            </ul>
          </div>
          <div class="verify" v-if="activeItem === '实名认证'">
            <img src="~assets/img/user/set/verify.png" alt />
            <div class="title">认证实名，开启直播间等服务</div>
            <div class="btn">
              <span class="btn-1" @click="goTo()" v-waves>支付宝快捷认证</span>
              <span class="btn-sub">支持身份证，3分钟完成，无需等待审核</span>
            </div>
            <div class="footer">
              <div class="footer-1">
                无法提交认证？
                <span @click="goTo()">提交人工认证申请</span>
              </div>
              <div class="footer-2">支持身份证，护照等证件，提交后需等待人工审核</div>
            </div>
          </div>
          <div class="teen" v-if="activeItem === '青少年保护计划'">
            <img src="~assets/img/user/set/verify.png" alt />
            <div class="title">哔哩哔哩已启动青少年身份认证，未来对于身份认证为少年儿童的用户，我们将使用更优化的内容展示策略。建议您进行身份认证，感谢您的支持和理解。</div>
            <div class="btn">
              <span class="btn-1" @click="goTo()" v-waves>支付宝快捷认证</span>
              <span class="btn-2" @click="routeTo()" v-waves>查看青少年保护措施详细说明</span>
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
          <iframe class="frame" :src="innerHtml">
            <a :href="innerHtml">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
          </iframe>
        </div>
      </mt-popup>
    </div>
    <div class="pop-3">
      <mt-popup class="pop" v-model="popupVisible3" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop3()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
          <div class="head-right" @click="openSheet2()">
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

export default {
  name: "SecurityPrivacy",
  data() {
    return {
      popupVisible: false,
      popupVisible2: false,
      sheetVisible: false,
      popupVisible3: false,
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
      privacyList: [
        {
          title: "",
          content: [
            {
              title: "公开显示投过硬币的视频",
              sub: "",
              more: true
            },
            {
              title: "公开显示订阅番剧",
              sub: "",
              more: true
            },
            {
              title: "公开显示我的收藏",
              sub: "",
              more: true
            },
            {
              title: "公开显示玩过的游戏",
              sub: "",
              more: true
            },
            {
              title: "公开显示推荐的视频",
              sub: "",
              more: true
            },
            {
              title: "公开显示订阅漫画",
              sub: "",
              more: true
            },
            {
              title: "公开显示轻视频主页",
              sub: "",
              more: true
            },
            {
              title: "公开显示装扮粉丝编号",
              sub: "",
              more: true
            }
          ]
        }
      ],
      innerHtml: ""
    };
  },
  created() {
    this.activeItem = "";
    this.innerHtml = "https://www.bilibili.com/read/cv293059";
    this.popupVisible3 = true;
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
              this.innerHtml =
                "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fpassport.bilibili.com%2Faccount%2Fmobile%2Fsecurity";
              this.popupVisible2 = true;
              break;
            case 1:
              this.popupVisible = true;
              break;
            case 2:
              this.popupVisible = true;
              break;
            case 3:
              this.popupVisible = true;
              break;
          }
          break;
        case 1:
          this.activeItem = "";
          this.innerHtml = "https://www.bilibili.com/h5/validate/device";
          this.popupVisible2 = true;
          break;
        case 2:
          this.popupVisible = true;
          break;
      }
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    closePop() {
      this.popupVisible = false;
    },
    openSheet() {},
    goToNavigator() {
      window.location.href = this.innerHtml;
      this.sheetVisible = false;
    },
    goTo() {
      this.$router.push({ path: "/wallet/b-bell-verify" });
    },
    routeTo() {
      // plus.navigator.setFullscreen(true);
      this.innerHtml = "https://www.bilibili.com/read/cv293059";
      this.popupVisible3 = true;
    },
    closePop3() {
      this.popupVisible3 = false;
    },
    openSheet2() {
      (function(window) {
        var Share = {};
        Share.info = {
          id: "",
          name: "",
          head_image: "_www/images/icon/A/144.png",
          introduce: ""
        };
        /**
         * 更新分享服务
         */
        var shares = null;

        function getSerivces() {
          plus.share.getServices(
            function(s) {
              shares = {};
              for (var i in s) {
                var t = s[i];
                shares[t.id] = t;
              }
            },
            function(e) {
              console.log("获取分享服务列表失败：" + e.message);
            }
          );
        }

        function shareAction(id, ex) {
          var s = null;

          if (!id || !(s = shares[id])) {
            console.log("无效的分享服务！");
            return;
          }
          if (s.authenticated) {
            console.log("---已授权---");
            shareMessage(s, ex);
          } else {
            console.log("---未授权---");
            //TODO 授权无法回调，有bug
            s.authorize(
              function() {
                console.log("授权成功...");
                shareMessage(s, ex);
              },
              function(e) {
                console.log("认证授权失败：" + e.code + " - " + e.message);
              }
            );
          }
        }
        var sharecount = 0;
        /**
         * 发送分享消息
         * @param
         */
        function shareMessage(s, ex) {
          plus.nativeUI.showWaiting();
          setTimeout(plus.nativeUI.closeWaiting, 5000); //TODO 5秒后自动关闭等待，否则如果用户分享出去后选择‘留在微信’，再手动回到app的时候，waiting无法关闭
          var msg = {
            extra: {
              scene: ex
            }
          };
          msg.href = "分享的网址" + "share?hid=" + Share.info.id;
          msg.title = "我在xxxx等你——" + Share.info._name;
          msg.content = Share.info.introduce;
          //取本地图片
          var img = plus.io.convertAbsoluteFileSystem(
            Share.info.head_image.replace("file://", "")
          );
          console.log(img);
          msg.thumbs = [img];
          if (sharecount > 0) {
            //如果本地图片过大，导致分享失败，递归时重新分享获取默认图片
            msg.thumbs = ["_www/images/icon/A/144.png"];
          }
          console.log(JSON.stringify(msg));
          s.send(
            msg,
            function() {
              plus.nativeUI.closeWaiting();
              var strtmp = '分享到"' + s.description + '"成功！ ';
              console.log(strtmp);
              plus.nativeUI.toast(strtmp, {
                verticalAlign: "center"
              });
              sharecount = 0;
            },
            function(e) {
              plus.nativeUI.closeWaiting();
              if (e.code == -2) {
                plus.nativeUI.toast("已取消分享", {
                  verticalAlign: "center"
                });
                sharecount = 0;
              } else if (e.code == -3 || e.code == -8) {
                console.log(e.code);
                if (++sharecount < 2) {
                  //TODO 分享失败可能是图片过大的问题，递归取默认图片重新分享
                  shareMessage(s, ex);
                } else {
                  sharecount = 0;
                  plus.nativeUI.toast("分享失败", {
                    verticalAlign: "center"
                  });
                }
              } else {
                console.error("分享失败:" + JSON.stringify(e));
              }
              console.log(
                '分享到"' +
                  s.description +
                  '"失败: ' +
                  e.code +
                  " - " +
                  e.message
              );
            }
          );
        }

        function share() {
          bhref = true;
          var ids = [
              {
                id: "weixin",
                ex: "WXSceneSession"
              },
              {
                id: "weixin",
                ex: "WXSceneTimeline"
              }
            ],
            bts = [
              {
                title: "发送给微信好友"
              },
              {
                title: "分享到微信朋友圈"
              }
            ];
          plus.nativeUI.actionSheet(
            {
              cancel: "取消",
              buttons: bts
            },
            function(e) {
              var i = e.index;
              if (i > 0) {
                shareAction(ids[i - 1].id, ids[i - 1].ex);
              }
            }
          );
        }
        Share.share = share;
        window.Share = Share;
        window.addEventListener("plusready", function() {
          getSerivces();
        });
      })(window);
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
    }
    .pop-content {
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
      .verify,
      .teen {
        display: flex;
        margin-top: 2rem;
        flex-direction: column;
        align-items: center;
        img {
          width: 6rem;
          margin-right: 0.3rem;
        }
        .title {
          opacity: 0.9;
          margin: 0.5rem 0;
        }
        .btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0.5rem 0 1.4rem 0;
          .btn-1,
          .btn-2 {
            width: 8rem;
            text-align: center;
            font-size: 0.5rem;
            color: #fff;
            background-color: rgb(24, 167, 227);
            height: 1.2rem;
            line-height: 1.2rem;
            border-radius: 0.1rem;
          }
          .btn-2 {
            margin-top: 0.4rem;
            background-color: transparent;
            color: var(--color-tint);
            border: 0.02rem solid var(--color-tint);
          }
          .btn-sub {
            margin-top: 0.5rem;
            opacity: 0.6;
            font-size: 0.35rem;
          }
        }
        .footer {
          display: flex;
          flex-direction: column;
          text-align: center;
          font-size: 0.35rem;
          opacity: 0.6;
          .footer-1 {
            margin: 0.2rem 0;
            span {
              color: var(--color-tint);
            }
          }
        }
      }
      .teen {
        .title {
          margin: 0.5rem 0.4rem;
        }
        .btn {
          .btn-1 {
            background-color: var(--color-tint);
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
  .pop-3 {
    .pop {
      .pop-head {
        position: absolute;
        background-color: transparent;
      }
      .pop-content-2 {
        .frame {
          overflow: hidden;
          width: 10rem;
          height: 18rem;
        }
        .frame::-webkit-scrollbar {
          width: 0 !important;
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