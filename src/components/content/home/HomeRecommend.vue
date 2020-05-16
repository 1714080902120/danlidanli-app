<template>
  <v-touch
    @panleft="panleft()"
    @panright="panright()"
    @panend="panend()"
    id="home-content"
    ref="homeRecommend"
  >
    <Swipe :swipeData="swipeData" @touchstart.native="closePan()" @touchend.native="openPan()"/>
    <RecommendList :data="homeData" />
    <div class="left" ref="left">
      <HomeLive/>
    </div>
    <div class="right" ref="right">
      <HomeHot/>
    </div>
  </v-touch>
</template>

<script>
import HomeLive from './HomeLive'
import HomeHot from './HomeHot'
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
      isLock: false
    };
  },
  created() {
    this.toGetHomeSwipeData(), this.toGetHomeData(this.page);
    // this.pullDownApplyData();
    // this.pullUpApplyData();
    this.bus()
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
    finishPullDown() {
      this.$Bus.$emit("finishPullDown");
    },
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
    closePan () {
      this.isLock = true
    },
    openPan () {
      this.isLock = false
    },
    panleft() {
      if (this.isLock) return false
      this.offsetX -= 1;
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(${this
          .offsetX * 2}px)`;
        this.$store.commit("offSetX", this.offsetX);
      });
    },
    panright() {
      if (this.isLock) return false
      this.offsetX += 1;
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(${this
          .offsetX * 2}px)`;
        this.$store.commit("offSetX", this.offsetX);
      });
    },
    panend() {
      this.$nextTick(() => {
        if (this.offsetX > 80) {
          if (this.$store.state.offSetItem > 0) {
            this.$store.commit("offSetItem", -1);
          }
          this.$router.push({ name: "Live" });
        } else if (this.offsetX < -80) {
          if (this.$store.state.offSetItem < 6) {
            this.$store.commit("offSetItem", 1);
          }
          this.$router.push({ name: "Hot" });
        }
        this.offsetX = 0;
        this.$store.commit("offSetX", 0);
        this.$refs.homeRecommend.$el.style.transform = `translateX(${0}px)`;
      });
    },
    bus () {
      this.$Bus.$on('whereYouAreNow', (y) => {
        this.$refs.left.style.opacity = 1;
        this.$refs.right.style.opacity = 1;
        this.$refs.left.style.transform = `translate(${-window.innerWidth}px, ${-y}px)`
        this.$refs.right.style.transform = `translate(${window.innerWidth}px, ${-y}px)`
      })
    }
  },
  components: {
    Swipe,
    RecommendList,
    HomeLive,
    HomeHot
  }
};
</script>

<style lang="less" scoped>
#home-content {
  background-color: var(--base-bg-color-sec);
  .left, .right {
    position: absolute;
    top: 0;
    opacity: 0;
    overflow: hidden;
  }
}
</style>