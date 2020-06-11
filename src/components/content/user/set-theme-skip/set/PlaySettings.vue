<template>
  <div id="play-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">播放设置</span>
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
          <div
            v-if="index === 0 || index === 1 || (index === 2 && indey === 0) || (index === 3 && indey === 0)"
            class="right"
          >{{ item.more }}</div>
          <mt-switch
            class="content-switch"
            v-else-if="!(index === 0 || index === 1 || (index === 2 && indey === 0) || (index === 3 && indey === 0))"
            v-model="item.more"
          ></mt-switch>
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
          <div class="decode" v-if="activeItem === '解码模式选择' || activeItem === '定时停止播放'">
            <ul class="radio-list">
              <li
                class="radio-list-item"
                v-for="(item, index) in popSelectedData.content"
                :key="index"
                @click="selected(index)"
              >
                <div class="radio-left">
                  <span>{{ item.title }}</span>
                  <span>{{ item.sub }}</span>
                </div>
                <div class="radio-right">
                  <span class="fir" :class="{ active: index === popSelectedData.selected }"></span>
                  <span class="sec"></span>
                  <span class="thr" :class="{ active: index === popSelectedData.selected }"></span>
                </div>
              </li>
            </ul>
          </div>
          <div class="danmaku-set" v-if="activeItem === '弹幕设置'">
            <ul v-for="(outer, index) in danmakuList" :key="index">
              <div class="outer-title">{{ outer.title }}</div>
              <li
                v-for="(item, indey) in outer.content"
                :key="indey"
                @click="borderStyle(index, indey)"
                v-waves
              >
                <div class="left">
                  <span>{{ item.title }}</span>
                  <span>{{ item.sub }}</span>
                </div>
                <div v-if="index === 1 && indey === 0" class="right">{{ item.more }}</div>
                <mt-switch
                  class="content-switch"
                  v-else-if="!(index === 1 && indey === 0)"
                  v-model="item.more"
                ></mt-switch>
              </li>
            </ul>
          </div>
          <div class="select-size" v-if="activeItem === '选择小窗播放尺寸'">
            <div class="select-size-line">
              <div class="select-size-line-title">拖动下方的滑块调整小窗的大小</div>
              <div class="select-size-line-main">
                <div
                  v-for="(item, index) in selectSizeList"
                  :key="index"
                  @click="selectSize(index)"
                  class="select-size-line-main-item"
                  :class="{ 'select-size-active': selectedSize === index }"
                >
                  <span>{{ item.size }}</span>
                  <span>•</span>
                </div>
              </div>
            </div>
            <hr class="middle" />
            <div class="select-size-content">
              <div class="select-size-content-title">预览</div>
              <div class="select-size-content-main">
                <div class="img">
                  <img v-for="index in 6" :key="index" src="~assets/img/user/set/line_item.png" alt />
                </div>
              </div>
            </div>
            <div class="select-size-footer">
              <img
                :style="{'width': `${5 + selectedSize}rem`}"
                src="~assets/img/user/set/test_item.png"
                alt
              />
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
          <span class="title">弹幕边框样式</span>
        </div>
        <div class="pop-content">
          <div class="decode">
            <ul class="radio-list">
              <li
                class="radio-list-item"
                v-for="(item, index) in popSelectedData.content"
                :key="index"
                @click="selected(index)"
                v-waves
              >
                <div class="radio-left">
                  <span>{{ item.title }}</span>
                  <span>{{ item.sub }}</span>
                </div>
                <div class="radio-right">
                  <span class="fir" :class="{ active: index === popSelectedData.selected }"></span>
                  <span class="sec"></span>
                  <span class="thr" :class="{ active: index === popSelectedData.selected }"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaySettings",
  data() {
    return {
      popupVisible: false,
      popupVisible2: false,
      selectedSize: 1,
      list: [
        {
          title: "",
          content: [
            {
              title: "解码模式选择",
              sub: "自动选择（推荐）",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "弹幕设置",
              sub: "",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "定时停止播放",
              sub: "不开启",
              more: ""
            },
            {
              title: "详情页自动播放",
              sub: "进入视频详情页后自动播放视频",
              more: true
            },
            {
              title: "详情页自动全屏",
              sub: "进入视频详情页后自动全屏播放视频",
              more: true
            },
            {
              title: "启用https播放",
              sub: "启用更安全",
              more: true
            },
            {
              title: "启用截图/GIF录制功能",
              sub: "显示播放界面的截图/GIF录制按钮",
              more: true
            },
            {
              title: "启用相关推荐窗口",
              sub: "显示播放界面的相关推荐窗口",
              more: true
            },
            {
              title: "启用锁屏功能",
              sub: "显示播放界面的锁屏按钮",
              more: true
            },
            {
              title: "启用重力感应旋屏",
              sub: "可通过重力感应切换半屏/全屏播放器",
              more: true
            },
            {
              title: "启用双指旋屏手势",
              sub: "Android表面渲染模式和部分机型暂不支持",
              more: true
            },
            {
              title: "展示UP主头像",
              sub: "全屏播放开始展示UP主头像",
              more: true
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "选择小窗播放尺寸",
              sub: "默认",
              more: ""
            },
            {
              title: "退出直播时自动小窗播放",
              sub: "退出直播间后自动打开小窗继续收看直播",
              more: true
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "WIFI网络下自动播放动态视频",
              sub: "WIFI网络下进入动态页将自动播放动态视频",
              more: true
            },
            {
              title: "小视频播放结束后自动续播",
              sub: "小视频播放结束后将自动播放下一个视频",
              more: false
            },
            {
              title: "WIFI网络下自动播放首页推荐视频",
              sub: "WIFI网络下进入首页推荐页将自动播放大卡内容",
              more: true
            },
            {
              title: "WIFI网络下自动播放活动页单列视频",
              sub: "WIFI网络下进入活动页将自动播放活动页单列视频",
              more: true
            }
          ]
        }
      ],
      danmakuList: [
        {
          title: "",
          content: [
            {
              title: "默认记忆弹幕开关状态",
              sub: "",
              more: false
            },
            {
              title: "弹幕便捷操作功能",
              sub: "",
              more: true
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "弹幕边框样式",
              sub: "自动选择",
              more: ""
            },
            {
              title: "使用等宽字体",
              sub: "针对英文字体优化效果",
              more: true
            },
            {
              title: "开启粗体",
              sub: "部分字体可能不支持",
              more: true
            }
          ]
        }
      ],
      activeItem: "",
      popSelectedData: {},
      popData: [
        {
          head: "",
          content: [
            { title: "自动选择（推荐）", sub: "根据机型和视频智能适配" },
            {
              title: "V3硬解优先（ijkplayer）",
              sub: "硬件播放，性能好，兼容性强"
            },
            {
              title: "软解优先",
              sub: "冬天暖手必备，偏重兼容性，适用所有手机系统"
            }
          ],
          selected: 0
        },
        {
          head: "",
          content: [
            { title: "自动选择", sub: "" },
            { title: "普通（最快）", sub: "" },
            { title: "阴影（推荐）", sub: "" },
            { title: "描边（最好）", sub: "" },
            { title: "45°投影（实验性）", sub: "" }
          ],
          selected: 0
        },
        {
          head: "计时结束将暂停播放",
          content: [
            { title: "不开启", sub: "" },
            { title: "15分钟", sub: "" },
            { title: "30分钟", sub: "" },
            { title: "60分钟", sub: "" },
            { title: "自定义", sub: "" }
          ],
          selected: 0
        }
      ],
      selectSizeList: [{ size: "较小" }, { size: "默认" }, { size: "较大" }]
    };
  },
  created() {
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    closePop() {
      this.popupVisible = false;
    },
    closePop2() {
      this.popupVisible2 = false;
    },
    detail(x, y) {
      this.activeItem = this.list[x].content[y].title;
      switch (x) {
        case 0:
          this.popSelectedData = this.popData[0];
          this.popupVisible = true;
          break;
        case 1:
          this.popupVisible = true;
          break;
        case 2:
          switch (y) {
            case 0:
              this.popSelectedData = this.popData[2];
              this.popupVisible = true;
              break;
          }

          break;
        case 3:
          switch (y) {
            case 0:
              this.popupVisible = true;
              break;
          }
          break;
      }
    },
    selected(i) {
      if (this.activeItem === "解码模式选择") {
        this.list[0].content[0].sub = this.popSelectedData.content[i].title;
      } else if (this.activeItem === "定时停止播放") {
        this.list[2].content[0].sub = this.popSelectedData.content[i].title;
      } else {
        this.danmakuList[1].content[0].sub = this.popSelectedData.content[
          i
        ].title;
      }
      this.popSelectedData.selected = i;
    },
    borderStyle(x, y) {
      if (x === 1 && y === 0) {
        this.popSelectedData = this.popData[1];
        this.popupVisible2 = true;
      }
    },
    selectSize(i) {
      this.selectedSize = i;
      this.list[3].content[0].sub = this.selectSizeList[i].size;
    }
  }
};
</script>

<style lang="less" scoped>
#play-settings {
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
  .content {
    position: relative;
    overflow: hidden;
    height: 15.6rem;
    overflow-y: scroll;
  }
  .content::-webkit-scrollbar {
    display: none;
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
            font-size: 0.25rem;
            opacity: 0.7;
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
      .decode {
        .radio-list {
          display: flex;
          flex-direction: column;
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
                  font-size: 0.25rem;
                  opacity: 0.7;
                  margin-top: 0.05rem;
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
      .select-size {
        .select-size-line {
          .select-size-line-title {
            padding: 0 0.4rem;
            margin: 0.5rem 0 0.2rem 0;
            opacity: 0.6;
            font-weight: lighter;
          }
          .select-size-line-main {
            padding: 0 0.4rem;
            background-color: var(--base-bg-color-thr);
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.6rem;
            .select-size-line-main-item {
              transition: 0.3s;
              display: flex;
              flex-direction: column;
              text-align: center;
              span {
                &:last-child {
                  margin-top: 0.2rem;
                  font-size: 0.3rem;
                  font-weight: bold;
                  opacity: 0.6;
                }
              }
            }
            .select-size-active {
              transition: 0.3s;
              span {
                &:first-child {
                  color: var(--color-tint);
                }
                &:last-child {
                  position: relative;
                  font-size: .6rem;
                  color: var(--color-tint);
                  border-radius: 100%;
                  opacity: 1;
                  &::before {
                    content: "";
                    position: absolute;
                    width: 0.3rem;
                    height: 0.3rem;
                    top: 0.16rem;
                    left: 0.25rem;
                    background-color: var(--color-tint);
                    border-radius: 50%;
                    opacity: 0.6;
                  }
                }
              }
            }
          }
        }
        .middle {
          position: relative;
          top: -0.55rem;
          width: 8.4rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          opacity: 0.1;
        }
        .select-size-content {
          display: flex;
          flex-direction: column;
          .select-size-content-title {
            padding: 0 0.4rem;
            opacity: 0.6;
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
          }
          .select-size-content-main {
            background-color: rgb(45, 45, 45);
            padding: 0 0.2rem;
            border-top: 0.01rem solid rgba(100, 100, 100, 0.7);
            .img {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              margin-top: 0.3rem;
              img {
                border-radius: 0.2rem;
                margin-top: 0.4rem;
                width: 4.5rem;
                height: 5rem;
              }
            }
          }
        }
        .select-size-footer {
          position: absolute;
          bottom: 0.4rem;
          right: 0.4rem;
          img {
            transition: 0.3s;
            width: 6rem;
            border-radius: 0.2rem;
          }
        }
      }
    }
  }
}
</style>