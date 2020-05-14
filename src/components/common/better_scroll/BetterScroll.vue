<template>
  <div class="wrapper" ref="wrapper" :style="{ width: screenWidth, height: screenHeight }">
    <div class="content">
      <slot></slot>
    </div>
    <div class="loading" ref="loading">
      <img src="~assets/img/recommend_list/loading_pink.svg" v-if="toShowImg" alt ref="img" />
      <Loading v-if="toShowLoading" class="test" />
    </div>
  </div>
</template>

<script>
import Loading from "components/common/loading/Loading";
import BS from "better-scroll";
export default {
  name: "BetterScroll",
  props: {
    bounce: {
      type: Object,
      default: () => {
        return {
          top: false,
          bottom: false,
          left: false,
          right: false
        };
      }
    },
    screenWidth: {
      type: String,
      default: "100%"
    },
    screenHeight: {
      type: String,
      default: "100vh"
    },
    probeType: {
      type: Number,
      default: 0
    },
    pullDownRefresh: {
      type: Object,
      default: () => {
        return {
          threshold: 0,
          stop: 0
        };
      }
    }
  },
  data() {
    return {
      BS: null,
      toShowImg: true,
      toShowLoading: false,
      originPosition: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getBetterScroll();
      this.Loading();
      this.loadingFinish();
      this.pullUp();
    });
  },
  components: {
    Loading
  },
  methods: {
    getBetterScroll() {
      this.BS = new BS(this.$refs.wrapper, {
        click: true,
        bounce: this.bounce,
        probeType: this.probeType,
        pullUpload: {
          threshold: 0
        }
      });
    },
    refresh() {
      this.BS.refresh();
    },
    loadingFinish() {
      let loading = this.$refs.loading;
      let img = this.$refs.img
      this.$Bus.$on("finishPullDown", () => {
        let opc = 1
        let timer = setInterval(() => {
          opc -= .2
          if (opc <= 0) {
            this.toShowImg = true;
            this.toShowLoading = false;
            this.originPosition = 0
            img.style.transform = ``;
            loading.style.transform = `translateY(0px)`;
            clearInterval(timer);
            timer = null;
          }
          loading.style.opacity = `${opc}`
        }, 50);
      });
      this.$Bus.$on("finishPullUp", () => {
        this.BS.finishPullUp();
      });
    },
    BSscroll () {
      
    },
    Loading() {
      let last = 0,
        now = 0,
        speed = 5;
      let loading = this.$refs.loading;
      let img = this.$refs.img;
      this.BS.on("scroll", ({ y }) => {
        last = now;
        now = y;
        loading.style.opacity = 1;
        if (now >= 0 && now - last >= 0) {
          if (this.originPosition <= 155) {
            this.originPosition += speed;
            this.BS.on('touchEnd', () => {
            this.$Bus.$emit('finishPullDown')
            })
          } else if (this.originPosition === 160) {
            this.toShowImg = false;
            this.toShowLoading = true;
            this.BS.on('touchEnd', () => {
              this.$debounce(this.pullDownData, 250)();
            })
            this.originPosition = 159.999999;
          }
        } else {
          this.toShowImg = true;
          this.toShowLoading = false;
          this.originPosition -= speed;
          if (this.originPosition <= 0) {
            this.originPosition = 0;
          }
        }
        img.style.transform = `rotateZ(-${this.originPosition * 2}deg)`;
        loading.style.transform = `translateY(${this.originPosition}px)`;
      });
    },
    scrollTo(x = 0, y) {
      return this.BS.scrollTo(x, y);
    },
    pullDownData() {
      this.$Bus.$emit("pullDownData");
    },
    pullUp() {
      this.BS.on("pullingUp", () => {
        this.$Bus.$emit("pullUpData");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
  .loading {
    position: absolute;
    top: 90px;
    opacity: 0;
    transition: 0.2s;
    img {
      position: absolute;
      width: 1.5em;
      height: 1.5em;
      background-color: #fff;
      border-radius: 100%;
      left: 340px;
      z-index: 99;
    }
  }
}
</style>