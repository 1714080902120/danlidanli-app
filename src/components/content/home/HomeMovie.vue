<template>
  <v-touch
    id="home-movie"
    ref="homeMovie"
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
  >
    <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
      <HomeMovieSwipe @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeMovieNav />
      <HomeMovieFollows @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeMovieList />
      <div class="bottom">o(ﾟДﾟ)っ已经没内容了唉？！</div>
    </BS>
  </v-touch>
</template>

<script>
import BS from "components/common/better_scroll/BetterScroll";
import HomeMovieSwipe from "components/content/home/home_movie/HomeMovieSwipe";
import HomeMovieNav from "components/content/home/home_movie/HomeMovieNav";
import HomeMovieFollows from "components/content/home/home_movie/HomeMovieFollows";
import HomeMovieList from "components/content/home/home_movie/HomeMovieList";

export default {
  name: "HomeMovie",
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
      this.$router.push({ name: "HomeNewDate" });
    },
    // 往右快滑
    swipeRight() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeAnimate" });
    },
    // 左滑
    panleft() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeNewDate" });
    },
    // 右滑
    panright() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeAnimate" });
    },
    bus() {}
  },
  components: {
    BS,
    HomeMovieSwipe,
    HomeMovieNav,
    HomeMovieFollows,
    HomeMovieList
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