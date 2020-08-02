<template>
  <v-touch
    id="home-content"
    ref="homeRecommend"
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
    @panend="panend()"
  >
    <BS
      ref="scroll"
      :pullDownRefresh="{ threshold: 0, stop: 0 }"
      :bounce="bounce"
      screenWidth="10rem"
      :screenHeight="height"
      :probeType="3"
    >
      <Swipe :swipeData="swipeData" @touchstart.native="closePan()" @touchend.native="openPan()" />
      <RecommendList :data="homeData" />
    </BS>
  </v-touch>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";
import { getHomeSwipe, getHomeData } from "network/home";
import RecommendList from "components/common/recommend_list/RecommendList";
import BS from "components/common/better_scroll/BetterScroll";

export default {
  name: "HomeRecommend",
  data() {
    return {
      swipeData: [],
      homeData: [],
      page: 0,
      offsetX: 0,
      isLock: false,
      pullDown: null,
      pullUp: null,
      getData: null,
      bounce: {
        top: false,
        bottom: true,
        left: false,
        right: false
      }
    };
  },
  created() {
    this.toGetHomeSwipeData(), this.toGetHomeData(this.page);
    this.pullDownApplyData();
    
    
    this.pullDown = this.$debounce(this.finishPullDown, 200);
    this.pullUp = this.$debounce(this.finishPullUp, 200);
    this.getData = this.$debounce(this.toGetHomeData, 1000, true);
    this.backToTop()
    this.refresh()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroll.BS.on('pullingUp', () => {
        this.pullUpApplyData()
      })
    })
  },
  activated () {
  },
  methods: {
    async toGetHomeSwipeData() {
      await getHomeSwipe().then(res => {
        this.swipeData = res.map((n) => {
          n["text"] = n.name;
          n.name = ''
          n['href'] = n.url
          n.url = n.pic
          return n;
        });
      });
    },
    // 获取列表数据
    async toGetHomeData(page, type) {
      await getHomeData({ skip: page }).then(res => {
        if (res.length === 0) {
          return false;
        }
        if (type === "pullDown") {
          this.homeData.unshift(...res);
        } else {
          this.homeData.push(...res);
        }
      });
      this.$store.commit("addHomeRecommend", this.homeData);
    },
    // 下拉获取数据
    async pullDownApplyData() {
      this.$nextTick(() => {
        this.$Bus.$on("pullDownData", async () => {
          this.page += 1;
          await this.getData(this.page, "pullDown");
          // await this.toGetHomeData(this.page, "pullDown");
          this.pullDown();
        });
      });
    },
    // 完成下拉
    finishPullDown() {
      
      this.$Bus.$emit("finishPullDown");
      this.$Bus.$emit("BSNeedToRefresh");
    },
    // 上拉获取数据
    async pullUpApplyData() {
        this.page += 1;
        await this.getData(this.page, "pullUp");
        this.pullUp();
    },
    finishPullUp() {
      
      this.$Bus.$emit("finishPullUp");
      this.$Bus.$emit("BSNeedToRefresh");
    },
    closePan() {
      this.isLock = true;
      this.$store.commit("changeLoadingLockState", true);
    },
    // 开启滑动
    openPan() {
      this.isLock = false;
      this.$store.commit("changeLoadingLockState", false);
    },
    // 往左快滑
    swipeLeft() {
      if (this.isLock) return false;
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      this.$router.push({ name: "HomeHot" });
      this.$store.commit("changeLoadingLockState", false);
    },
    // 往右快滑
    swipeRight() {
      if (this.isLock) return false;
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      this.$router.push({ name: "HomeLive" });
      this.$store.commit("changeLoadingLockState", false);
    },
    // 左滑
    panleft() {
      if (this.isLock) return false;
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.offsetX !== -1) {
        this.offsetX = -1;
      }
    },
    // 右滑
    panright() {
      if (this.isLock) return false;
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.offsetX !== 1) {
        this.offsetX = 1;
      }
    },
    // 停止滑动
    panend() {
      if (this.offsetX === 1) {
        this.$router.push({ name: "HomeLive" });
      } else if (this.offsetX === -1) {
        this.$router.push({ name: "HomeHot" });
      }
      this.offsetX = 0;
      this.$store.commit("changeLoadingLockState", false);
    },
    // 刷新
    refresh() {
      this.$Bus.$on("BSNeedToRefresh", () => {
        this.$refs.scroll.refresh();
      });
    },
    // 返回顶部
    backToTop() {
      this.$Bus.$on("backToTop", () => {
        this.$refs.scroll.scrollTo(0, 0, 500);
        this.$refs.scroll.refresh();
      });
    },
  },
  components: {
    Swipe,
    RecommendList,
    BS
  },
  computed: {
    height() {
      let one = window.innerWidth / 10;
      let height = window.innerHeight;
      return `${(height - 2.2 * one) / one}rem`;
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
#home-content {
  background-color: var(--base-bg-color-sec);
  .left,
  .right {
    position: absolute;
    top: 0;
    opacity: 0;
    overflow: hidden;
  }
}
</style>