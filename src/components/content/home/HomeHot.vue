<template>
  <v-touch
    id="home-hot"
    ref="homeHot"
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
  >
    <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
      <HomeHotTop />
      <HomeHotList />
    </BS>
  </v-touch>
</template>

<script>
import HomeHotTop from "components/content/home/home_hot/HomeHotTop";
import HomeHotList from "components/content/home/home_hot/HomeHotList";
import BS from "components/common/better_scroll/BetterScroll";

export default {
  name: "HomeHot",
  data() {
    return {
    };
  },
  mounted() {
    this.bus();
  },
  components: {
    HomeHotTop,
    BS,
    HomeHotList
  },
  methods: {
    // 往左快滑
    swipeLeft() {
      this.$router.push({ name: "HomeAnimate" });
    },
    // 往右快滑
    swipeRight() {
      this.$router.push({ name: "HomeRecommend" });
    },
    // 左滑
    panleft() {
      this.$router.push({ name: "HomeAnimate" });
    },
    // 右滑
    panright() {
      this.$router.push({ name: "HomeRecommend" });
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
    bus() {
      this.$nextTick(() => {
        this.$refs.scroll.BS.on("pullingUp", () => {
          this.$Bus.$emit("homeHotListPullUpData");
        });
        this.$Bus.$on('needToRefresh', () => {
          this.$refs.scroll.refresh();
          this.$refs.scroll.BS.finishPullUp()
        })
      });
    }
  },
  computed: {
    height() {
      let one = window.innerWidth / 10;
      let height = window.innerHeight;
      return `${(height - 2.2 * one) / one}rem`;
    }
  }
};
</script>

<style lang="less" scoped>
#home-hot {
  overflow: hidden;
}
</style>