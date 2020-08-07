<template>
  <div id="home-studyswipe">
    <Swipe :swipeData="list" />
  </div>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";

export default {
  name: "HomeStudySwipe",
  data() {
    return {
      list: [
        {
          url:
            "https://i0.hdslb.com/bfs/archive/43bbf53cffde5b6dcaa166f29808dfb95708af8d.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1KC4y187B7",
          text: "不是吧？看LPL忍界大战也能 学 英 语？！",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/a255fec98ad855d6ff768af2fcc928fe81383cb3.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1Ht4y1D7Hy",
          text: "所以是睡了多久……",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/17302f3735ad8eca1d0e22a59bc81cbc3bbddecd.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV16t4y1X7wY",
          text: "深 受 其 害",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/7d3af9cfdb517084459a74121d3e1578313f6e37.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV15f4y1d715",
          text: "活 久 见",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/6cd5cfc0871141de3607488f134c0a3332285353.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1xt4y1D7uH",
          text: '大佬来B站带你看星星啦~',
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
#home-studyswipe {
}
</style>