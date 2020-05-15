<template>
  <v-touch
    @panleft="panleft()"
    @panright="panright()"
    @panend="panend()"
    id="home-content"
    ref="homeRecommend"
  >
    <Swipe :swipeData="swipeData" />
    <RecommendList :data="homeData" />
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
      offsetX: 0
    };
  },
  created() {
    this.toGetHomeSwipeData(), this.toGetHomeData(this.page);
    this.pullDownApplyData();
    this.pullUpApplyData();
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
    panleft() {
      this.offsetX -= 1;
      this.$nextTick(() => {
        this.$refs.homeRecommend.$el.style.transform = `translateX(${this
          .offsetX * 2}px)`;
        this.$store.commit("offSetX", this.offsetX);
      });
    },
    panright() {
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
    }
  },
  components: {
    Swipe,
    RecommendList
  }
};
</script>

<style lang="less" scoped>
#home-content {
  background-color: var(--base-bg-color-sec);
}
</style>