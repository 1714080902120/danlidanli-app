<template>
  <div class="home">
    <BaseOuter ref="nav">
      <div slot="center">
        <div class="outer">
          <img src="~assets/img/home/search_dark.svg" alt />
          <input type="text" name id />
        </div>
      </div>
      <div class="home-right" slot="right">
        <span class="download">
          <img src="~assets/img/base/download_dark.svg" alt />
        </span>
        <span class="mail">
          <img src="~assets/img/home/mail_dark.svg" alt />
        </span>
      </div>
      <div slot="bottom">
        <Navbar :isActive="sendActive">
          <NavbarItem
            slot="navbar"
            :isActive="toActive(index)"
            v-for="(item, index) in items"
            :key="item.title"
          >
            <div
              class="navbar-item"
              @click="goTo(index, item.path)"
              slot="navbar-item"
            >{{ item.title }}</div>
          </NavbarItem>
        </Navbar>
      </div>
    </BaseOuter>
    <BS
      ref="scroll"
      :pullDownRefresh="{ threshold: 0, stop: 0 }"
      :bounce="bounce"
      screenWidth="100%"
      :screenHeight="height()"
      :probeType="3"
    >
      <keep-alive>
        <router-view />
      </keep-alive>
    </BS>
    <Popup />
  </div>
</template>

<script>
import { BaseOuter, Navbar, NavbarItem, BS, Popup } from "./index";

export default {
  name: "Home",
  data() {
    return {
      items: [
        { title: "直播", path: "/live" },
        { title: "推荐", path: "/recommend" },
        { title: "热门", path: "/hot" },
        { title: "追番", path: "/animate" },
        { title: "影视", path: "/movie" },
        { title: "新时代", path: "/new-date" },
        { title: "学习区", path: "/study" }
      ],
      sendActive: 1,
      bounce: {
        top: false,
        bottom: true,
        left: false,
        right: false
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        this.whenStart();
        clearTimeout(timer);
        timer = null;
      }, 100);
      this.refresh();
      this.backToTop();
    });
  },
  activated() {
    if (
      this.$route.params.type === "register" ||
      this.$route.params.type === "login"
    ) {
      this.$router.go(0);
    }
  },
  methods: {
    goTo(index) {
      this.sendActive = index;
    },
    refresh() {
      this.$Bus.$on("BSNeedToRefresh", () => {
        this.$refs.scroll.refresh();
      });
    },
    backToTop() {
      this.$Bus.$on("backToTop", () => {
        this.$refs.scroll.scrollTo(0, -10, 500);
        this.$refs.scroll.refresh();
      });
    },
    whenStart() {
      this.$refs.scroll.scrollTo(0, -10, 100);
      this.$refs.scroll.refresh();
    }
  },
  computed: {
    toActive() {
      return index => {
        return this.sendActive === index;
      };
    },
    height() {
      return () => {
        return `${window.innerHeight * (1 - 130 / 667)}px`;
      };
    }
  },
  components: {
    BaseOuter,
    Navbar,
    NavbarItem,
    BS,
    Popup
  }
};
</script>

<style lang="less" scoped>
#home {
  overflow: hidden;
}
</style>