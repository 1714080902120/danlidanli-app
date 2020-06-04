<template>
  <div id="camera">
    <div id="scan"></div>
    <div class="tips">"加载中...</div>
    <v-touch @press="press()" v-if="Object.keys($store.state.userInfo).length > 0" class="qrcode">
      <div class="uuid">uuid: {{ uuid }}</div>
      <vueQr
        :bgSrc="imgSrc"
        :logoSrc="imgSrc"
        :text="uuid"
        :size="200"
        :margin="10"
        colorDark="#000"
        colorLight="#fff"
        :callback="getDataUrl"
      />
    </v-touch>
    <div class="action">
      <div class="items">
        <div class="item" @click="openLight">
          <img src="~assets/img/user/scan/light_dark.svg" />
        </div>
        <div class="item" @click="getPicture()">
          <img src="~assets/img/user/scan/photo_dark.svg" />
        </div>
        <div class="item" @click="cancelScan()">
          <img src="~assets/img/user/scan/close_dark.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import vueQr from "vue-qr";
import { Toast } from "mint-ui";

export default {
  name: "Scan",
  data() {
    return {
      codeUrl: "",
      isLight: false,
      showEnter: false,
      extra: null,
      scan: null,
      type: "",
      storage: "",
      imgSrc: "",
      uuid: "",
      dataUrl: ''
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // 设置500毫秒等资源加载
      if (window.plus) {
        this.startScan(); //`进入页面就调取扫一扫
      }
    }, 500);
  },
  beforeDestroy() {
    if (!window.plus) return;
    this.scan.cancel();
    this.scan.close();
  },
  methods: {
    // 打开闪光灯
    openLight() {
      this.isLight = !this.isLight;
      this.scan.setFlash(this.isLight);
    },
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;

      this.scan = null;
      this.scan = new plus.barcode.Barcode(
        "scan",
        [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
        {
          frameColor: "#1294cb",
          scanbarColor: "#1294cb",
          top: "1rem",
          left: "0",
          width: "10rem",
          height: "10rem",
          position: "fixed"
        }
      );
      this.scan.onmarked = onmarked;
      /* eslint-disable no-unused-vars */
      function onmarked(type, result, file) {
        result = result.replace(/\n/g, "");
        that.storage = result;
        if (plus.webview.all().length > 1) {
          // 扫码成功后关闭当前的webview
          let ws = plus.webview.currentWebview();
          plus.webview.close(ws);
        }
      }
    },
    // //开始扫描
    startScan() {
      if (!window.plus) return;
      this.startRecognize(); //创建控件
      setTimeout(() => {
        this.scan.start();
      }, 200);
    },
    // 取消扫描
    cancelScan() {
      let l = plus.webview.all().length;
      if (l > 1) {
        let ws = plus.webview.currentWebview();
        plus.webview.close(ws);
      } else {
        this.$router.go(-1);
      }

      if (!window.plus) return;
      plus.navigator.setStatusBarStyle("dark");
      if (this.scan) {
        this.scan.cancel(); //关闭扫描
        this.scan.close(); //关闭条码识别控件
        this.$router.go(-1);
      }
    },
    // 从相册选择图片扫码
    getPicture() {
      plus.gallery.pick(
        path => {
          plus.barcode.scan(
            path,
            (type, result) => {
              this.scan.cancel();
              this.scan.close();
              this.storage = result;
              if (plus.webview.all().length > 1) {
                // 扫码成功后关闭当前的webview
                let ws = plus.webview.currentWebview();
                plus.webview.close(ws);
              }
            },
            error => {
              plus.nativeUI.alert("无法识别图片");
            }
          );
        },
        err => {
          plus.nativeUI.alert("Failed:" + err.message);
        }
      );
    },
    getDataUrl(dataUrl) {
      this.dataUrl = dataUrl

    },
    press () {
      plus.gallery.save( this.dataUrl, () => {
        Toast({
          message: '保存成功~',
          duration: 3000,
          position: 'bottom'
        })
      }, err => {
        Toast({
          message: err,
          duration: 10000,
          position: 'bottom'
        })
      })
    }
  },
  components: {
    vueQr
  },
  watch: {
    "$store.state.userInfo"(newVal) {
      this.imgSrc = newVal.baseInfo.logo.src + newVal.baseInfo.logo.name;
      this.uuid = newVal.identy.uuid;
    },
    deep: true,
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#camera {
  height: 100vh;
  width: 10rem;
  #scan {
    width: 10rem;
    height: 10rem;
    z-index: 2;
    position: fixed;
    top: 1rem;
    background: rgba(0, 0, 0, 1);
  }
  .tips {
    text-align: center;
    position: absolute;
    width: 10rem;
    top: 3rem;
    color: #fff;
    z-index: 3;
  }
  .qrcode {
    position: fixed;
    top: 11.05rem;
    margin: 0 auto;
    left: 2.5rem;
    z-index: 777;
    .uuid {
      font-size: 0.35rem;
      margin: 0.1rem 0;
      text-align: center;
    }
  }
  .action {
    position: fixed;
    z-index: 777;
    width: 10rem;
    bottom: 0.3rem;
    .items {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 2rem;
      .item {
        text-align: center;
        img {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
}
</style>