<template>
  <div id="home-animate-swipe">
    <Swipe :swipeData="list" />
  </div>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";

export default {
  name: "HomeAnimateSwipe",
  data() {
    return {
      list: [
        {
          url:
            "https://i0.hdslb.com/bfs/bangumi/image/9d3afc21cbe535714c287361d768f623a0ae5243.jpg@2320w_664h.jpg",
          href: "https://www.bilibili.com/bangumi/play/ep330481",
          text: "煽动",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/bangumi/image/3e59986465e72e73dc74d192bfebce0de0745d69.jpg@2320w_664h.jpg",
          href: "https://www.bilibili.com/video/BV1Ht4y1X7Hk",
          text: "梦 幻 联 动",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/bangumi/image/507c064fd18c21820f5f965cd43862558f150ffc.jpg@2320w_664h.jpg",
          href: "https://www.bilibili.com/video/BV1JT4y1j7ef/",
          text: "千叶县旅游观光指南",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/bangumi/image/9a86790400efff8d97de81057ea2eead05a999c3.jpg@2320w_664h.jpg",
          href: "https://www.bilibili.com/bangumi/play/ep307262",
          text: "天赋梦路",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/bangumi/image/ca55a257bb8a7d26b7e822cd79a5d665869c1c2c.png@2320w_664h.png",
          href: "https://www.bilibili.com/bangumi/play/ep330408",
          text: "炎炎一点就燃",
          name: ""
        }
      ]
    };
  },
  methods: {},
  components: {
    Swipe
  }
};
</script>

<style lang="less" scoped>
#home-animate-swipe {
}
</style>