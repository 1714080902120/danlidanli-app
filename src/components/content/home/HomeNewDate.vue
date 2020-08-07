<template>
  <v-touch
    id="home-movie"
    ref="homeNewDate"
    @swipeleft="swipeLeft()"
    @swiperight="swipeRight()"
    @panleft="panleft()"
    @panright="panright()"
  >
    <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
      <HomeNewDateSwipe @touchstart.native="closePan()" @touchend.native="openPan()" />
      <HomeNewDateList />
      <div class="bottom">o(ﾟДﾟ)っ已经没内容了唉？！</div>
    </BS>
  </v-touch>
</template>

<script>
import BS from "components/common/better_scroll/BetterScroll";
import HomeNewDateSwipe from "components/content/home/home_new_date/HomeNewDateSwipe";
import HomeNewDateList from "components/content/home/home_new_date/HomeNewDateList";

export default {
  name: "HomeNewDate",
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
      this.$router.push({ name: "HomeStudy" });
    },
    // 往右快滑
    swipeRight() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeMovie" });
    },
    // 左滑
    panleft() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeStudy" });
    },
    // 右滑
    panright() {
      if (this.isLock) return false;
      this.$router.push({ name: "HomeMovie" });
    },
    bus() {}
  },
  components: {
    BS,
    HomeNewDateSwipe,
    HomeNewDateList
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