<template>
  <div id="home-movie-swipe">
    <Swipe :swipeData="list" />
  </div>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";

export default {
  name: "HomeMovieSwipe",
  data() {
    return {
      list: [
        {
          url:
            "https://i0.hdslb.com/bfs/archive/bff2e4a254e615b42904080d2f46bf7497002c20.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/read/cv6981105?from=search",
          text: "花式追剧《穿越火线》，夺取属于你的金枪王！",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/c8f99e0e374dd5e59c92e3d325a033b559d41632.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1sA411v7kh",
          text: "【吸奇侠】《西游记》真假美猴王之——假亦真时真亦假",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/2e2e0bec63fc287337dd5c68dfc63c3b82d94086.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1fZ4y1T7Mt",
          text: "70多部电影功夫向混剪",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/ed2fea48c95965bad5d7f64c9b750226b9174aae.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/blackboard/activity-FjUfS9T0A.html",
          text: "甭正面 | 迷人的反派角色征集！",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/5aac591b282caafbf49fef369789c59933291dd7.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1op4y1i7Jp",
          text: '"微戏剧"《如花·非花》选段',
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
#home-movie-swipe {
}
</style>