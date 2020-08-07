<template>
  <div id="home-new-date-swipe">
    <Swipe :swipeData="list" />
  </div>
</template>

<script>
import Swipe from "components/common/swipe/Swipe";

export default {
  name: "HomeNewDateSwipe",
  data() {
    return {
      list: [
        {
          url:
            "https://i0.hdslb.com/bfs/archive/2c5ba739ec12e98de61e6f9f3e08b12969e5fc55.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1UT4y1j7y7",
          text: "魔鬼辣椒面大挑战！",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/229f42bf36e89040da009c952d15dda4b823bbf8.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/blackboard/activity-24TyVjPpu.html",
          text: "将搞笑进行到底吧！",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/cb5879d8c22256348dc3e03141a5e7480f4043db.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1ZZ4y1T7va",
          text: "解锁新技能！猫：我方了",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/bc8334ec410584927f0dc2b5b11bbb91edb44678.png@620w_220h.webp",
          href: "https://www.bilibili.com/read/cv6969486",
          text: "谁是B站最会演戏的UP主？",
          name: ""
        },
        {
          url:
            "https://i0.hdslb.com/bfs/archive/93a51aefe7c254b50926eed4b236b5daf92d7229.jpg@620w_220h.webp",
          href: "https://www.bilibili.com/video/BV1jD4y1D7v9",
          text: '教练，我想开赛车',
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
#home-new-date-swipe {
}
</style>