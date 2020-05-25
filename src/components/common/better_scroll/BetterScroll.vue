<template>
  <div class="wrapper" ref="wrapper" :style="{ width: screenWidth, height: screenHeight }">
    <div class="content">
      <slot></slot>
    </div>
    <div class="loading" ref="loading">
      <img src="~assets/img/recommend_list/loading_pink.svg" ref="img" alt />
      <Loading v-if="toShowLoading" class="inner" ref="innerLoading" />
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
      originPosition: 0,
      ifOpenSideBar: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getBetterScroll();
      this.scrollTo(0, -10, 100);
    });
  },
  activated() {
    this.$nextTick(() => {
      if (!this.ifOpenSideBar) {
        this.whenScroll();
        this.loadingFinish();
        this.pullUp();
      }
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
        pullUpLoad: {
          threshold: 50
        }
      });
    },
    refresh() {
      this.BS.refresh();
    },
    // 完成加载后组件消失
    loadingFinish() {
      let loading = this.$refs.loading;
      let img = this.$refs.img;
      this.$Bus.$on("finishPullDown", () => {
        this.originPosition = 0;
        let opc = 1;
        let timer = setInterval(() => {
          opc -= 0.2;
          if (opc <= 0) {
            img.style.opacity = 0;
            this.toShowLoading = false;
            img.style.transform = `rotateZ(0deg)`;
            loading.style.transform = `translateY(0px)`;
            clearInterval(timer);
            timer = null;
          }
          loading.style.opacity = `${opc}`;
        }, 80);
      });
      this.$Bus.$on("finishPullUp", () => {
        this.BS.finishPullUp();
      });
    },
    // 开启loading和顶部消失特效
    whenScroll() {
      let lastY = 0;
      let nowY = 0;
      let speed = 5;
      let NavbarTransform = 0;
      let loading = this.$refs.loading;
      let img = this.$refs.img;
      let sendPullDown = this.$debounce(this.pullDownData, 250);
      this.BS.on("scroll", position => {
        lastY = nowY;
        nowY = position.y;
        loading.style.opacity = 1;
        img.style.opacity = 1;
        // loading加载
        if (!this.$store.state.loadingLock) {
          if (nowY >= 0 && nowY - lastY >= 0) {
            if (this.originPosition <= 115) {
              this.originPosition += speed;
              this.BS.on("touchEnd", () => {
                this.$Bus.$emit("finishPullDown");
              });
            } else if (this.originPosition === 120) {
              img.style.opacity = 0;
              this.toShowLoading = true;
              sendPullDown();
              this.originPosition = 120;
            }
          } else {
            img.style.opacity = 1;
            this.toShowLoading = false;
            this.originPosition -= speed;
            if (this.originPosition <= 0) {
              this.originPosition = 0;
            }
          }
        }

        img.style.transform = `rotateZ(-${this.originPosition * 2}deg)`;
        loading.style.transform = `translateY(${this.originPosition}px)`;
        // home页面顶部随滑动消失出现
        if (nowY - lastY > 0) {
          if (NavbarTransform < 0) {
            NavbarTransform += 1;
          }
          this.$Bus.$emit("NavbarTransform", {
            offsetY: NavbarTransform,
            BSoffsetY: 1
          });
        } else if (nowY - lastY < 0) {
          if (NavbarTransform > -20) {
            NavbarTransform -= 1;
          }
          this.$Bus.$emit("NavbarTransform", {
            offsetY: NavbarTransform,
            BSoffsetY: -1
          });
        }
      });
    },
    scrollTo(x = 0, y, time) {
      this.BS.scrollTo(x, y, time);
    },
    // 下拉请求加载数据
    pullDownData() {
      this.$Bus.$emit("pullDownData");
    },
    // 上拉请求加载数据
    pullUp() {
      let send = this.$debounce(this.pullUpData, 250);
      this.BS.on("pullingUp", () => {
        send();
      });
    },
    pullUpData() {
      this.$Bus.$emit("pullUpData");
    },
    // 停止滑动时
    scrollEnd() {
      this.BS.on("scrollEnd", ({ y }) => {
        this.$Bus.$emit("whereYouAreNow", y);
      });
    },
    Bus() {}
  },
  watch: {
    // 监测是否打开侧边栏，若打开则静止下拉组件
    "$store.state.openSideBar"(newVal) {
      this.ifOpenSideBar = newVal;
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
  .loading {
    position: absolute;
    top: 1.34rem;
    opacity: 0;
    transition: 0.2s;
    img {
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      background-color: #fff;
      border-radius: 100%;
      left: 4.5rem;
      z-index: 99;
    }
    .inner {
      width: .1rem;
      height: .1rem;
    }
  }
}
.wrapper::-webkit-scrollbar {
  display: none;
}
</style>