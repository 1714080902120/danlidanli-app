<template>
  <div id="home-content">
    <Swipe :swipeData="swipeData" />
    <RecommendList :data="homeData" />
  </div>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";
import { getHomeSwipe, getHomeData } from "network/home";
import RecommendList from "components/common/recommend_list/RecommendList";
export default {
  name: "HomeContent",
  data() {
    return {
      swipeData: [],
      homeData: [],
      page: 0
    };
  },
  created() {
    this.toGetHomeSwipeData(), this.toGetHomeData(this.page);
    this.pullDownApplyData();
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
        console.log(res);
        if (type === "pullDown") {
          this.homeData.unshift(...res);
        } else {
          this.homeData.push(...res);
        }
      });
    },
    async pullDownApplyData() {
      this.$nextTick(() => {
        this.$Bus.$on("pullDownData", async () => {
          this.page += 1;
          await this.toGetHomeData(this.page, "pullDown");
          this.$debounce(this.finishPullDown, 20)();
        });
      });
    },
    finishPullDown() {
      this.$Bus.$emit("finishPullDown");
    },
    async pullUpApplyData() {
      this.$Bus.$on("pullUpData", async () => {
        this.page += 1;
        await this.toGetHomeData(this.page, "pullUp");
        this.$debounce(this.finishPullUp, 20)();
      });
    },
    finishPullUp() {
      this.$Bus.$emit("finishPullUp");
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