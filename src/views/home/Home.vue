<template>
  <div class="home" ref="home">
    <div ref="outer">
      <BaseOuter ref="base">
        <div slot="center">
          <div class="outer">
            <img src="~assets/img/home/search_dark.svg" alt />
            <input type="text" name id />
          </div>
        </div>
        <div class="home-right" slot="right">
          <span class="game" @click="goToGame()">
            <img src="~assets/img/home/game_dark.svg" alt />
          </span>
          <span class="download">
            <img src="~assets/img/base/download_dark.svg" alt />
          </span>
          <span class="mail">
            <img src="~assets/img/home/mail_dark.svg" alt />
          </span>
        </div>
        <div class="bottom" slot="bottom">
          <Navbar class="bottom">
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
      <transition name="slide-fade">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import {
  BaseOuter,
  Navbar,
  NavbarItem
  // BS
} from "./index";

export default {
  name: "Home",
  data() {
    return {
      items: [
        { title: "直播", path: "/home/live" },
        { title: "推荐", path: "/home/" },
        { title: "热门", path: "/home/hot" },
        { title: "追番", path: "/home/animate" },
        { title: "影视", path: "/home/movie" },
        { title: "新时代", path: "/home/new-date" },
        { title: "学习区", path: "/home/study" }
      ],
      sendActive: 1
    };
  },
  created() {
    // plus.storage.setItem('isInHome', 'true')
    this.bus();
  },
  mounted() {
    this.navBarTransform();
  },
  activated() {
    if (
      this.$route.params.type === "register" ||
      this.$route.params.type === "login" ||
      this.$route.params.type === "logout"
    ) {
      this.$router.go(0);
    }
    this.bus();
    // plus.storage.setItem('isInHome', 'true')
  },
  deactivated() {
    // plus.storage.setItem('isInHome', 'false')
  },
  destroyed() {
    // plus.storage.setItem('isInHome', 'false')
  },
  methods: {
    // 路由跳转
    goTo(index, path) {
      // goActive navbar-bottom
      this.sendActive = index;
      this.$store.commit("offSetItemByClick", this.sendActive);
      this.$router.replace({ path });
    },
    goToGame() {
      this.$router.replace({ path: "/game" });
    },
    // 上滑navbar消失特效
    navBarTransform() {
      this.$Bus.$on("NavbarTransform", ({ offsetY }) => {
        this.$refs.outer.style.transform = `translateY(${offsetY * 0.12}rem)`;
      });
    },
    bus() {
      this.$Bus.$emit("isInActive", 0);
    }
  },
  computed: {
    toActive() {
      return index => {
        return this.sendActive === index;
      };
    }
  },
  components: {
    BaseOuter,
    Navbar,
    NavbarItem
    // BS
  },
  watch: {
    "$route.path"(newVal) {
      if (newVal.indexOf("/home/") !== -1) {
        let path = newVal.split("/home")[1];
        let arr = [
          "/live",
          "/",
          "/hot",
          "/animate",
          "/movie",
          "/new-date",
          "/study"
        ];
        arr.forEach((e, i) => {
          if (e === path) {
            this.sendActive = i;
          }
        });
      }
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#home {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
}
#home::-webkit-scrollbar {
  display: none;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-leave-active {
  transition: all 0.01s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>