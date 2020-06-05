<template>
  <v-touch
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
    @panend="panend()"
    id="home-content"
    ref="homeRecommend"
  >
    <Swipe :swipeData="swipeData" @touchstart.native="closePan()" @touchend.native="openPan()" />
    <RecommendList :data="homeData" />
    <div class="left" ref="left">
      <component v-if="$route.path === '/home/'" :is="apps[0].app.default"></component>
    </div>
    <div class="right" ref="right">
      <component v-if="$route.path === '/home/'" :is="apps[1].app.default"></component>
    </div>
  </v-touch>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";
import { getHomeSwipe, getHomeData } from "network/home";
import RecommendList from "components/common/recommend_list/RecommendList";
export default {
  name: "HomeRecommend",
  data() {
    return {
      swipeData: [],
      homeData: [],
      page: 0,
      offsetX: 0,
      isLock: false,
      cmps: ["HomeLive", "HomeHot"],
      apps: []
    };
  },
  created() {
    this.toGetHomeSwipeData(), this.toGetHomeData(this.page);
    this.pullDownApplyData();
    this.pullUpApplyData();
    this.cmps.forEach(app => {
      this.apps.push({ app: require(`./${app}.vue`) });
    });
  },
  activated() {
    if (this.$route.path === "/home/") {
      this.bus();
    }
  },
  methods: {
    async toGetHomeSwipeData() {
      const text = [
        "从前没得选，现在我想做个好人~",
        "华为：最贵的终端~",
        "快进来rua！"
      ];
      await getHomeSwipe().then(res => {
        this.swipeData = res.map((n, i) => {
          n["text"] = text[i];
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
    },
    // 下拉获取数据
    async pullDownApplyData() {
      let send = this.$debounce(this.finishPullDown, 20);
      this.$nextTick(() => {
        this.$Bus.$on("pullDownData", async () => {
          this.page += 1;
          await this.toGetHomeData(this.page, "pullDown");
          send();
        });
      });
    },
    // 完成下拉
    finishPullDown() {
      this.$Bus.$emit("finishPullDown");
    },
    // 上拉获取数据
    async pullUpApplyData() {
      let send = this.$debounce(this.finishPullUp, 20);
      this.$Bus.$on("pullUpData", async () => {
        this.page += 1;
        await this.toGetHomeData(this.page, "pullUp");
        send();
      });
    },
    finishPullUp() {
      this.$Bus.$emit("BSNeedToRefresh");
      this.$Bus.$emit("finishPullUp");
    },
    // 关闭滑动
    closePan() {
      this.isLock = true;
    },
    // 开启滑动
    openPan() {
      this.isLock = false;
    },
    // 往左快滑
    swipeLeft() {
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.isLock) return false;
      this.$store.commit("offSetItem", 1);
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(-10rem)`;
        this.$router.push({ name: "HomeHot" });
        this.offsetX = 0;
        this.$store.commit("offSetX", 0);
        this.$refs.homeRecommend.$el.style.transform = `translateX(${0}px)`;
        this.$store.commit("changeLoadingLockState", false);
      });
    },
    // 往右快滑
    swipeRight() {
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.isLock) return false;
      this.$store.commit("offSetItem", -1);
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(10rem)`;
        this.$router.push({ name: "HomeLive" });
        this.offsetX = 0;
        this.$store.commit("offSetX", 0);
        this.$refs.homeRecommend.$el.style.transform = `translateX(${0}px)`;
        this.$store.commit("changeLoadingLockState", false);
      });
    },
    // 左滑
    panleft() {
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.isLock) return false;
      this.offsetX -= 1;
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(${this
          .offsetX / 5}rem)`;
        this.$store.commit("offSetX", this.offsetX);
      });
    },
    // 右滑
    panright() {
      if (!this.$store.state.loadingLock) {
        this.$store.commit("changeLoadingLockState", true);
      }
      if (this.isLock) return false;
      this.offsetX += 1;
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(${this
          .offsetX / 5}rem)`;
        this.$store.commit("offSetX", this.offsetX);
      });
    },
    // 停止滑动
    panend() {
      this.$nextTick(() => {
        if (this.offsetX > 30) {
          if (this.$store.state.offSetItem > 0) {
            this.$store.commit("offSetItem", -1);
          }
          this.$router.push({ name: "HomeLive" });
        } else if (this.offsetX < -30) {
          if (this.$store.state.offSetItem < 6) {
            this.$store.commit("offSetItem", 1);
          }
          this.$router.push({ name: "HomeHot" });
        }
        this.offsetX = 0;
        this.$store.commit("offSetX", 0);
        this.$refs.homeRecommend.$el.style.transform = `translateX(${0}px)`;
        this.$store.commit("changeLoadingLockState", false);
      });
    },
    // 中央事务总线
    bus() {
      this.$Bus.$on("whereYouAreNow", y => {
        this.$nextTick(() => {
          this.$refs.left.style.opacity = 1;
          this.$refs.right.style.opacity = 1;
          this.$refs.left.style.transform = `translate(${-window.innerWidth}px, ${-y}px)`;
          this.$refs.right.style.transform = `translate(${
            window.innerWidth
          }px, ${-y}px)`;
        });
      });
    }
  },
  components: {
    Swipe,
    RecommendList
  },
  watch: {
  }
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