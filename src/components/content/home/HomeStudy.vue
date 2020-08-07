<template>
  <v-touch
    id="home-movie"
    ref="homeStudy"
    @swiperight="swipeRight()"
    @panright="panright()"
  >
    <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
      <HomeStudySwipe @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeStudyList />
      <div class="bottom">o(ﾟДﾟ)っ已经没内容了唉？！</div>
    </BS>
  </v-touch>
</template>

<script>
import BS from "components/common/better_scroll/BetterScroll";
import HomeStudySwipe from "components/content/home/home_study/HomeStudySwipe";
import HomeStudyList from "components/content/home/home_study/HomeStudyList";

export default {
  name: "HomeStudy",
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
    // 往右快滑
    swipeRight() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeNewDate" });
    },
    // 右滑
    panright() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeNewDate" });
    },
    bus() {}
  },
  // https://passport.bilibili.com/login
  components: {
    BS,
    HomeStudySwipe,
    HomeStudyList
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
#home-movie {
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