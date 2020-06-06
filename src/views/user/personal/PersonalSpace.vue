<template>
  <div id="personal-space" v-if="uuid !== ''">
    <div class="head">
      <span class="back" @click="close()">
        <img src="~assets/img/fans_follows/go_back_dark.svg" alt />
      </span>
      <span class="title">个人空间</span>
    </div>
    <div class="main">
      <iframe class="frame" :src="`https://space.bilibili.com/${uuid}/`">
        <a :href="`https://space.bilibili.com/${uuid}/`">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a>
      </iframe>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "PersonalSpace",
  data() {
    return {
      uuid: ""
    };
  },
  created() {
    this.uuid = this.$store.state.uuid;
  },
  methods: {
    close() {
      let l = plus.webview.all().length;
      if (l > 1) {
        let ws = plus.webview.currentWebview();
        plus.webview.close(ws);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#personal-space {
  background-color: rgb(255, 255, 255);
  width: 10rem;
  height: 100vh;
  z-index: 9999;
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
  .main {
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
</style>