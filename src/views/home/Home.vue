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
        <span class="download">
          <img src="~assets/img/base/download_dark.svg" alt />
        </span>
        <span class="mail">
          <img src="~assets/img/home/mail_dark.svg" alt />
        </span>
      </div>
      <div class="bottom" slot="bottom">
        <Navbar class="bottom" :isActive="sendActive">
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

  </div>
</template>

<script>
import { BaseOuter, Navbar, NavbarItem, BS, Popup } from "./index";

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
      sendActive: 1,
      bounce: {
        top: false,
        bottom: true,
        left: false,
        right: false
      },
      extendBS: false
    };
  },
  created() {
    this.$nextTick(() => {
    })
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
      this.navBarTransform()
    });
  },
  activated() {
    if (
      this.$route.params.type === "register" ||
      this.$route.params.type === "login"
    ) {
      this.$router.go(0);
    }
    this.$nextTick(() => {
      let timer = setTimeout(() => {
        this.whenStart();
        clearTimeout(timer);
        timer = null;
      }, 100);
    });
  },
  methods: {
    goTo(index, path) {
      // goActive navbar-bottom
      this.sendActive = index;
      this.$store.commit("offSetItemByClick", this.sendActive);
      this.$router.replace({ path });
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
      this.$nextTick(() => {
        this.$refs.scroll.scrollEnd();
      });
    },
    navBarTransform() {
      this.$Bus.$on("NavbarTransform", ({ offsetY, BSoffsetY }) => {
        this.$nextTick(() => {
          if (BSoffsetY < 0 && offsetY < -10) {
            this.extendBS = true
          } else if (BSoffsetY >= 0) {
            this.extendBS = false
          }
          this.$refs.outer.style.transform = `translateY(${offsetY * 2}px)`
        });
      });
    }
  },
  computed: {
    toActive() {
      return index => {
        return this.sendActive === index;
      };
    },
    height () {
      return () => {
        return `${window.innerHeight * (1 - 130 / 667)}px`
      }
    }
  },
  components: {
    BaseOuter,
    Navbar,
    NavbarItem,
    BS,
    Popup
  },
  watch: {
    "$store.state.offSetItem"(newVal) {
      this.sendActive = newVal;
    },
    'extendBS' (newVal) {
      this.$nextTick(() => {
        if (newVal) {
          this.$refs.scroll.$el.style.height = `${window.innerHeight * (1 - 130 / 667) + 30}px`
        } else {
          this.$refs.scroll.$el.style.height = `${window.innerHeight * (1 - 130 / 667)}px`
        }
      })
    },
    immediate: true
  }
};
</script>

<style lang="less" scoped>
#home {
  overflow: hidden;

}
#home::-webkit-scrollbar {
  display: none;
}
</style>