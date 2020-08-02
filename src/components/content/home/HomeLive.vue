<template>
  <v-touch
    id="home-live"
    ref="homeLive"
    @swipeleft="swipeLeft()"
  >
    <div class="content">
      <BS ref="scroll" screenWidth="10rem" :screenHeight="height">
        <Swipe @touchstart.native="closePan()" @touchend.native="openPan()"  />
        <Category :list="homeLiveCategoryData" />
        <List :list="homeLiveListData" />
        <div class="footer" v-if="homeLiveFooter.length > 0">
          <span v-waves>{{ homeLiveFooter[0].type }}</span>
          <span v-waves>{{ homeLiveFooter[1].type }}</span>
        </div>
      </BS>
    </div>
    <div class="i-live">我要直播</div>
  </v-touch>
</template>

<script>
import BS from "components/common/better_scroll/BetterScroll";
import Swipe from "components/content/home/home_live/HomeLiveSwipe";
import List from "components/content/home/home_live/HomeLiveList";
import Category from 'components/content/home/home_live/HomeLiveCategory'
import { getHomeLiveFooter, getHomeLiveData } from "network/home.js";
export default {
  name: "HomeLive",
  data() {
    return {
      homeLiveFooter: [],
      isLock: false,
      homeLiveListData: [],
      homeLiveCategoryData: []
    };
  },
  created() {
    this.toGetHomeLiveData()
    this.toGetHomeLiveFooter();
  },
  activated() {},
  methods: {
    toGetHomeLiveFooter() {
      getHomeLiveFooter().then(res => {
        this.homeLiveFooter.push(...res);
      });
    },
    toGetHomeLiveData() {
      getHomeLiveData().then(res => {
        
        this.homeLiveListData.push(...res.module_list.filter((n, i) => {
          return i > 2 && n.list.length > 0
        }));
        this.homeLiveCategoryData = [...res.module_list[2].list]
      });
    },
    closePan() {
      this.isLock = true;
    },
    // 开启滑动
    openPan() {
      this.isLock = false;
    },
    // 往左快滑
    swipeLeft() {
      if (this.isLock) return false
      this.$router.push({ name: "HomeRecommend" });
    },
    // 刷新
    refresh() {
      this.$Bus.$on("BSNeedToRefresh", () => {
        this.$refs.scroll.refresh();
      });
    }
  },
  components: {
    BS,
    Swipe,
    List,
    Category
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
#home-live {
  background-color: var(--base-bg-color-sec);
  .content {
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 3rem;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 1rem;
        font-size: 0.3rem;
        border-radius: 0.1rem;
        border: 0.02rem solid rgba(100, 100, 100, 0.3);
      }
    }
  }
  .i-live {
    color: #fff;
    overflow: hidden;
    bottom: 2rem;
    font-size: .52rem;
    position: fixed;
    right: .5rem;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    background-color: var(--color-tint);
  }
}
</style>