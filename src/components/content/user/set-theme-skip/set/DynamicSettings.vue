<template>
  <div id="dynamic-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">动态设置</span>
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
          <div v-if="(index === 0 && indey !== 0) || index !== 0" class="right">{{ item.more }}</div>
          <mt-switch class="content-switch" v-if="index === 0 && indey === 0" v-model="item.more"></mt-switch>
        </li>
      </ul>
    </div>
    <div class="pop">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ popTitle }}</span>
          <div class="head-right" @click="openSheet()" v-if="selected[1] === true">
            <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
          </div>
        </div>
        <div class="pop-content">
          <div class="radio-list" v-if="selected[0]">
            <div class="radio-title">开启后，将为动态发布的图片添加水印</div>
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
          <div class="inner-frame" v-if="selected[1]">
            <iframe class="frame" src="https://t.bilibili.com/h5/dynamic/specification">
              <a
                href="https://t.bilibili.com/h5/dynamic/specification"
              >你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
            </iframe>
          </div>
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
  name: "DynamicSettings",
  data() {
    return {
      popupVisible: false,
      selected: [true, false],
      sheetVisible: false,
      list: [
        {
          title: "",
          content: [
            {
              title: "视频自动播放",
              sub: "开启后。在wifi/免流环境下动态视频会进行自动播放",
              more: true
            },
            {
              title: "图片水印设置",
              sub: "图片中部",
              more: ""
            }
          ]
        },
        {
          title: "",
          content: [
            {
              title: "动态使用规范",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      radioList: {
        content: ["不启用", "图片中部", "图片右下角"],
        selected: 0
      },
      popTitle: "图片水印设置",
      actions: [{ name: "浏览器打开", method: this.goToNavigator }]
    };
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(x, y) {
      if (x === 0 && y === 0) return false;
      if (x === 0 && y === 1) {
        this.selected = [true, false];
        this.popTitle = "图片水印设置";
      } else if (x === 1 && y === 0) {
        this.selected = [false, true];
        this.popTitle = "动态使用规范说明";
      }
      this.popupVisible = true;
    },
    closePop() {
      this.popupVisible = false;
    },
    select(i) {
      this.radioList.selected = i;
    },
    openSheet() {
      this.sheetVisible = true;
    },
    goToNavigator() {
      this.sheetVisible = false;
      window.location.href = "https://t.bilibili.com/h5/dynamic/specification";
    }
  }
};
</script>

<style lang="less" scoped>
#dynamic-settings {
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
      .radio-list {
        display: flex;
        flex-direction: column;

        .radio-title {
          font-size: 0.3rem;
          margin: 0.3rem 0.2rem;
        }
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
      .inner-frame {
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