<template>
  <div id="help">
    <div class="head">
      <span class="back" @click="closeService()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">帮助</span>
    </div>
    <div class="content">
      <ul class="outer">
        <li class="inner" v-for="(item, index) in list" :key="index" @click="detail(index)" v-waves>
          <div class="name-sub">
            <span>{{ item.name }}</span>
            <span>{{ item.sub }}</span>
          </div>
          <div class="more" v-if="judge(index)">〉</div>
        </li>
      </ul>
    </div>
    <div class="popup" ref="pop">
      <mt-popup
        class="pop"
        :style="{ width: popWid, height: popHei }"
        v-model="popupVisible"
        :position="position"
        :modal="false"
        popup-transition="popup-fade"
      >
        <div class="pop-head" v-if="activeIndex !== 0">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ activeItem }}</span>
        </div>
        <div class="pop-content">
          <div class="network-cute" v-if="activeIndex === 2">
            <div class="network-test">
              <span :class="{ select: isSelected === 0 }" @click="testNetwork()" v-waves>开始测试</span>
              <span
                class="copy"
                :class="{ select: isSelected === 1 }"
                :data-clipboard-text="JSON.stringify(showTestData)"
                @click="copyTestResult"
                v-waves
              >复制测试结果</span>
            </div>
            <div class="ip-city">
              <span class="ip">{{ ipCity.ip }}</span>;
              <span class="city">{{ ipCity.city }}</span>
            </div>
            <div class="test-data" v-if="showTestData.length > 0">
              <ul>
                <li v-for="(item, index) in showTestData" :key="index">
                  <p v-if="item[0].link !== ''">{{ item[0].link }}</p>
                  <p v-if="item[0].time !== ''">{{ item[0].time }}</p>
                  <p v-if="item[0].ping !== ''">{{ item[0].ping }}</p>
                  <p v-if="item[0].connectTimeHttp !== ''">{{ item[0].connectTimeHttp }}</p>
                  <p v-if="item[0].connectTimeHttps !== ''">{{ item[0].connectTimeHttps }}</p>
                  <p v-if="item[0].speed !== ''">{{ item[0].speed }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="update-test" v-if="activeIndex === 0">
            <div class="update-test-title">升级提醒</div>
            <div class="update-test-content">
              <div class="update-test-content-first">
                <p v-for="(item, index) in updateMessage[0]" :key="index">{{ item }}</p>
              </div>
              <div class="update-test-content-second">
                <p v-for="(item, index) in updateMessage[1]" :key="index">{{ item }}</p>
              </div>
            </div>
            <div class="update-test-footer">
              <span class="update-test-cancel" @click="updateCancel()" v-waves>以后再说</span>
              <span class="update-test-submit" @click="updateSubmit()" v-waves>增量更新（42.7MB）</span>
            </div>
          </div>
          <div class="join-us" v-if="activeIndex === 5">
            <iframe class="frame" src="https://www.bilibili.com/html/join.html">
              <a href="https://www.bilibili.com/html/join.html">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
            </iframe>
          </div>
        </div>
      </mt-popup>
    </div>
    <div class="loading">
      <Loading v-show="startTestNetwork" ref="loading" />
    </div>
    <div class="modal" v-if="popupVisible === true"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { City } from "network/user";
import * as sysTool from "common/systemTool";
import Loading from "components/common/loading/Loading2";
import Clipboard from "clipboard";

export default {
  name: "Help",
  data() {
    return {
      // pop基础配置
      position: "middle",
      popWid: "7rem",
      popHei: "50vh",
      startTestNetwork: false,
      popupVisible: false,
      isSelected: 0,
      activeItem: "网络诊断",
      ipCity: {},
      activeIndex: 0,
      list: [
        {
          name: "版本更新",
          sub: "当前版本： 5.57.3 （release-b3513885）"
        },
        {
          name: "CPU信息"
        },
        {
          name: "网络诊断"
        },
        {
          name: "恢复初始设置"
        },
        {
          name: "开放源代码许可"
        },
        {
          name: "加入我们",
          sub: "遵从中二力量的召唤，和我签订契约吧！少年"
        }
      ],
      showTestData: [],
      testData: [
        {
          link: "account.bilibili.com/110.43.34.66",
          time: "lookupTime=21",
          ping: "ping=success(2065ms)",
          connectTimeHttp: "connectTimeHttp=19",
          connectTimeHttps: "connectTimeHttps=14",
          speed: "speed=2941kB/s"
        },
        {
          link: "i0.hdslb.com/113.96.142.1",
          time: "lookupTime=5",
          ping: "ping=success(2066ms)",
          connectTimeHttp: "connectTimeHttp=17",
          connectTimeHttps: "connectTimeHttps=11",
          speed: "speed=2kB/s"
        },
        {
          link: "s1.hdslb.com/183.2.200.244",
          time: "lookupTime=16",
          ping: "ping=success(2093ms)",
          connectTimeHttp: "connectTimeHttp=11",
          connectTimeHttps: "connectTimeHttps=13",
          speed: "speed=1kB/s"
        },
        {
          link: "www.qq.com/14.18.175.154",
          time: "lookupTime=28",
          ping: "",
          connectTimeHttp: "connectTime=15",
          connectTimeHttps: "",
          speed: "speed=10373kB/s"
        },
        {
          link: "www.baidu.com/14.215.177.38",
          time: "lookupTime=12",
          ping: "",
          connectTimeHttp: "connectTime=8",
          connectTimeHttps: "",
          speed: "speed=1193kB/s"
        },
        {
          link: "cn.aliyun.com/106.11.253.86",
          time: "lookupTime=15",
          ping: "",
          connectTimeHttp: "connectTime=18",
          connectTimeHttps: "",
          speed: "speed=1048kB/s"
        },
        {
          link: "www.bilibili.com/110.43.34.184",
          time: "lookupTime=6",
          ping: "",
          connectTimeHttp: "connectTime=10",
          connectTimeHttps: "",
          speed: ""
        },
        {
          link: "interface.bilibili.com/110.43.34.184",
          time: "lookupTime=20",
          ping: "",
          connectTimeHttp: "connectTime=11",
          connectTimeHttps: "",
          speed: ""
        },
        {
          link: "comment.bilibili.com/139.159.252.156",
          time: "lookupTime=15",
          ping: "",
          connectTimeHttp: "connectTime=23",
          connectTimeHttps: "",
          speed: ""
        },
        {
          link: "api.bilibili.com/139.159.252.156",
          time: "lookupTime=4",
          ping: "",
          connectTimeHttp: "connectTime=14",
          connectTimeHttps: "",
          speed: ""
        },
        {
          link: "passport.bilibili.com/110.43.34.184:",
          time: "lookupTime=11",
          ping: "",
          connectTimeHttp: "connectTime=22",
          connectTimeHttps: "",
          speed: ""
        }
      ],
      updateMessage: [
        ["版本：6.1.0", "更新包体积：89.3MB", "增量包包体积：42.7MB"],
        [
          "更新内容：",
          "-视频稿件支持UP主添加关注按钮",
          "-UP主空间一键联播支持播放记忆，再续前缘不断档",
          "-UP主空间支持视频稿件排序，快速找到你想看的作品"
        ]
      ]
    };
  },
  created() {},
  methods: {
    closeService() {
      this.$Bus.$emit("closeSetPopup");
    },
    closePop() {
      this.popupVisible = false;
    },
    async detail(i) {
      this.activeIndex = i;
      this.activeItem = this.list[i].name;
      switch (i) {
        case 0:
          this.position = "middle";
          this.popWid = "7rem";
          this.popHei = "50vh";
          this.popupVisible = true;
          break;
        case 1:
          Toast({
            message: `浏览器：${sysTool.GetCurrentBrowser()}，手机：${sysTool.GetOs()}`,
            position: "middle",
            duration: 3000
          });
          break;
        case 2:
          await City().then(res => {
            this.ipCity = {
              ip: res.cip,
              city: res.cname
            };
            this.position = "right";
            this.popWid = "10rem";
            this.popHei = "100vh";
            this.popupVisible = true;
          });
          break;
        case 3:
          Toast({
            message: "想重置？没门",
            position: "middle",
            duration: 3000
          });
          break;
        case 4:
          Toast({
            message: "不开源，想得美~略略略~",
            position: "middle",
            duration: 3000
          });
          break;
        case 5:
          this.position = "right";
          this.popWid = "10rem";
          this.popHei = "100vh";
          this.popupVisible = true;
          break;
      }
    },
    testNetwork() {
      this.isSelected = 0;
      this.startTestNetwork = true;
      let timer = setInterval(() => {
        this.showTestData.push(this.testData.splice(0, 1));
        if (this.testData.length <= 0) {
          this.startTestNetwork = false;
          this.isSelected = 1;
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    },
    copyTestResult() {
      this.isSelected = 1;
      let clipboard = new Clipboard(".copy");
      clipboard.on("success", () => {
        Toast({
          message: "复制成功",
          position: "middle",
          duration: 3000
        });
        this.testData = [].concat(this.testData, this.showTestData).flat(1);
        this.showTestData = [];
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        Toast({
          message: "复制失败",
          position: "middle",
          duration: 3000
        });
        clipboard.destroy();
      });
    },
    updateCancel() {
      this.popupVisible = false;
    },
    updateSubmit() {
      Toast({
        message: "不好意思，没完成~~",
        position: "middle",
        duration: 3000
      });
    }
  },
  computed: {
    judge() {
      let reg = /0|3|4/;
      return i => {
        return !reg.test(i);
      };
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang="less" scoped>
#help {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  overflow-y: scroll;
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
      .inner {
        margin: 0 0.2rem;
        height: 1.4rem;
        list-style: none;
        border-bottom: 0.01rem solid rgba(104, 104, 104, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .more {
          opacity: 0.2;
        }
        .name-sub {
          display: flex;
          flex-direction: column;
          span {
            &:last-child {
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
  .popup {
    .pop {
      background-color: var(--base-set-bg-color);
      .pop-content {
        margin: 0.2rem;
        .network-cute {
          display: flex;
          flex-direction: column;
          .network-test {
            display: flex;
            font-size: 0.4rem;
            height: 1rem;
            line-height: 1rem;
            span {
              margin: 0 0.1rem;
              text-align: center;
              color: rgba(104, 104, 104, 0.6);
              border: 0.02rem solid rgba(104, 104, 104, 0.6);
              border-radius: 0.1rem;
              &:first-child {
                width: 2rem;
              }
              &:last-child {
                width: 3rem;
              }
            }
            .select {
              transition: 0.3s;
              color: var(--color-tint);
              border-color: var(--color-tint);
            }
          }
          .ip-city {
            display: flex;
            align-items: center;
            margin: 0.3rem 0 0.2rem 0.1rem;
            font-size: 0.35rem;
            display: flex;
            span {
              margin-right: 0.1rem;
            }
          }
          .test-data {
            position: relative;
            overflow: hidden;
            overflow-y: scroll;
            margin-left: 0.1rem;
            height: 14rem;
            ul {
              display: flex;
              overflow-y: scroll;
              flex-direction: column;
              li {
                list-style: none;
                display: flex;
                flex-direction: column;
                margin: 0.2rem 0;
                p {
                  margin: 0.1rem 0;
                }
              }
            }
            ul::-webkit-scrollbar {
              display: none;
            }
          }
          .test-data::-webkit-scrollbar {
            display: none;
          }
        }
        .update-test {
          display: flex;
          flex-direction: column;
          .update-test-title {
            font-size: 0.6rem;
            color: var(--color-tint);
            text-align: center;
            margin: 0.3rem auto;
            height: 1.2rem;
            line-height: 1.2rem;
            width: 4.5rem;
            border-bottom: 0.06rem solid var(--color-tint);
          }
          .update-test-content {
            display: flex;
            font-size: 0.4rem;
            flex-direction: column;
            margin: 0 0.5rem;
            .update-test-content-first {
              margin-bottom: 0.4rem;
            }
            .update-test-content-second {
              margin-bottom: 0.3rem;
            }
          }
          .update-test-footer {
            display: flex;
            align-items: center;
            justify-content: space-around;
            .update-test-cancel,
            .update-test-submit {
              width: 3.15rem;
              height: 1rem;
              line-height: 1rem;
              border-radius: 0.1rem;
              text-align: center;
              background-color: rgba(92, 92, 92, 0.2);
            }
            .update-test-submit {
              background-color: var(--color-tint);
              font-size: 0.3rem;
              color: #fff;
            }
          }
        }
        .join-us {
          margin: -0.2rem;
          .frame {
            width: 10rem;
            height: calc(100vh - 1.6rem);
          }
        }
      }
    }
  }
  .loading {
    position: relative;
    top: -8.3rem;
    left: 6.5rem;
  }
  .modal {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 100vh;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>