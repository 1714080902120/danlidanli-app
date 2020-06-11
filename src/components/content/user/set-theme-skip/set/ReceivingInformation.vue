<template>
  <div id="receiving-settings">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">收货设置</span>
    </div>
    <div class="content">
      <ul v-for="(outer, index) in list" :key="index">
        <div class="outer-title">{{ outer.title }}</div>
        <li
          v-for="(item, indey) in outer.content"
          :key="indey"
          @click="detail(indey)"
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
        <component :is="app.default"></component>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReceivingSettings",
  data() {
    return {
      popupVisible: false,
      list: [
        {
          title: "",
          content: [
            {
              title: "收货地址管理",
              sub: "",
              more: ""
            },
            {
              title: "购买人信息",
              sub: "",
              more: ""
            }
          ]
        }
      ],
      app: "",
      cmps: ["ReceivingPlace", "ReceivingPerson"]
    };
  },
  created () {
    this.bus()
  },
  methods: {
    close() {
      this.$Bus.$emit("closeSetPopup");
    },
    detail(y) {
      this.app = require(`components/content/user/receiving/${this.cmps[y]}.vue`);
      this.popupVisible = true;
    },
    bus () {
      this.$Bus.$on('closePop', () => {
        this.popupVisible = false
      })
    }
  }
};
</script>

<style lang="less" scoped>
#receiving-settings {
  background-color: var(--base-set-bg-color);
  width: 10rem;
  height: 100vh;
  .head {
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
    }
  }
}
</style>