<template>
  <div id="other-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">其他设置</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in list" :key="index" @click="detail(index)" v-waves>
        <div class="left">
          <span class="content-title">{{ item.title }}</span>
          <span class="content-sub">{{ item.sub }}</span>
        </div>
        <div v-if="index <= 1" class="right">〉</div>
        <mt-switch class="content-switch" v-if="index > 1" v-model="value[index - 2]"></mt-switch>
      </li>
    </ul>
    <div class="popup">
      <mt-popup class="pop" v-model="popupVisible" position="right" :modal="false">
        <div class="pop-head">
          <span class="back" @click="closePop()">
            <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
          </span>
          <span class="title">{{ popSelectedData.head }}</span>
        </div>
        <div class="pop-content">
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
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherSettings",
  data() {
    return {
      popupVisible: true,
      value: [true, false],
      setType: 0,
      list: [
        { title: "默认图片质量", sub: "清晰（质量高，图片更清晰）" },
        { title: "音乐通知栏", sub: "自动选择：根据系统版本智能适配" },
        {
          title: "WIFI下自动准备安装包",
          sub: "在WIFI下自动帮你下载好最新安装包"
        },
        { title: "剪贴板自动跳转", sub: "自动帮你跳转到已复制的内容" }
      ],
      radioValue: {},
      popSelectedData: {},
      popData: [
        {
          head: "默认图片质量",
          content: [
            { title: "清晰", sub: "清晰（质量高，图片更清晰）" },
            { title: "普通", sub: "普通（流量少，数度加载快）" },
            { title: "自动", sub: "自动（wifi下使用清晰，流量下使用普通）" }
          ],
          selected: 0
        },
        {
          head: "音乐通知栏",
          content: [
            { title: "自动选择", sub: "根据系统版本智能适配" },
            { title: "系统样式", sub: "MUI之类的非原生系统建议选中" },
            { title: "哔哩哔哩样式", sub: "Android5.0以上系统建议选中" }
          ],
          selected: 0
        }
      ]
    };
  },
  created() {
    this.popSelectedData = this.popData[0];
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(i) {
      if (i >= 2) return false;
      if (this.popSelectedData === this.popData[i]) return false;
      this.setType = i;
      this.popSelectedData = this.popData[i];
      this.popupVisible = true
    },
    closePop() {
      this.popupVisible = false;
    },
    selected (i) {
      this.popSelectedData.selected = i
    }
  }
};
</script>

<style lang="less" scoped>
#other-settings {
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
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      font-size: 0.4rem;
      background-color: var(--base-set-item-color);
      height: 1.4rem;
      border-bottom: 0.01rem solid rgba(100, 100, 100, 0.2);
      .left {
        display: flex;
        flex-direction: column;
        .content-sub {
          font-size: 0.3rem;
          opacity: 0.8;
          margin-top: 0.05rem;
        }
      }
      .right {
        opacity: 0.4;
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
  .popup {
    .pop {
      width: 10rem;
      height: 100vh;
      background-color: var(--base-set-bg-color);
      .pop-content {
        margin-top: 0.4rem;
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
                  font-size: 0.3rem;
                  opacity: 0.8;
                  margin-top: 0.05rem;
                }
              }
            }
            .radio-right {
              position: relative;
              top: .2rem;
              left: .2rem;
              .thr,
              .sec,
              .fir {
                transition: .3s;
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
                width: .3rem;
                height: .3rem;
                left: -0.85rem;
                top: -0.35rem;
                background-color: transparent;
              }
              .active {
                transition: .3s;
                background-color: var(--color-tint);
              }
            }
          }
        }
      }
    }
  }
}
</style>