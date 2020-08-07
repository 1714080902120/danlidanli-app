<template>
  <v-touch
    id="home-animate"
    ref="homeAnimate"
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
  >
    <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
      <HomeAnimateSwipe @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeAnimateNav />
      <HomeAnimateFollows @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeAnimateList />
      <div class="bottom">o(ﾟДﾟ)っ已经没内容了唉？！</div>
    </BS>
  </v-touch>
</template>

<script>
import BS from "components/common/better_scroll/BetterScroll";
import HomeAnimateSwipe from "components/content/home/home_animate/HomeAnimateSwipe";
import HomeAnimateNav from "components/content/home/home_animate/HomeAnimateNav";
import HomeAnimateFollows from "components/content/home/home_animate/HomeAnimateFollows";
import HomeAnimateList from "components/content/home/home_animate/HomeAnimateList";

export default {
  name: "HomeAnimate",
  data() {
    return {
      isLock: false
    };
  },
  methods: {
    closePan() {
      this.isLock = true;
    },
    // 开启滑动
    openPan() {
      this.isLock = false;
    },
    // 往左快滑
    swipeLeft() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeMovie" });
    },
    // 往右快滑
    swipeRight() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeHot" });
    },
    // 左滑
    panleft() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeMovie" });
    },
    // 右滑
    panright() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeHot" });
    },
    bus() {}
  },
  components: {
    BS,
    HomeAnimateSwipe,
    HomeAnimateNav,
    HomeAnimateFollows,
    HomeAnimateList
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
#home-animate {
  overflow: hidden;
  .bottom {
    height: 2rem;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: .4rem;
    margin-top: -.3rem;
  }
}
</style>