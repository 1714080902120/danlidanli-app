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
        <Navbar>
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
    <BS ref="scroll" :bounce="false" screenWidth="100%" :screenHeight="height()">
      <HomeContent/>
    </BS>
  </div>
</template>

<script>
import { BaseOuter, Navbar, NavbarItem, BS, HomeContent } from "./index";

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
      sendActive: 1
    };
  },
  created() {},
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
        return `${(window.innerHeight - 135)}px`;
      };
    }
  },
  components: {
    BaseOuter,
    Navbar,
    NavbarItem,
    BS,
    HomeContent
  }
};
</script>

<style lang="less" scoped>
#home {
  overflow: hidden;
}
</style>