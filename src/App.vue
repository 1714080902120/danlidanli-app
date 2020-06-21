<template>
  <div id="app">
    <Sidebar />
    <!-- <transition :name="transitionName"> -->
      <keep-alive>
        <router-view class="Router" />
      </keep-alive>
    <!-- </transition> -->
    <div v-if="active()">
      <Tabbar />
    </div>
  </div>
</template>

<script>
import Sidebar from "components/common/base/sidebar/Sidebar";
import Tabbar from "components/common/base/tabbar/Tabbar";
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  created() {},
  components: {
    Sidebar,
    Tabbar
  },
  methods: {},
  computed: {
    active() {
      let path = this.$route.path;
      let reg = /home|category|trends|member-shop/gi;
      return () => {
        return reg.test(path);
      };
    }
  },
  watch: {
    "$store.state.uuid"() {
      this.$router.push({ path: "/personal-space" });
    },
    watch: {
      // $route(to, from) {
      //   console.log(to, from);

      //   let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      //   if (isBack) {
      //     this.transitionName = "slide-right";
      //   } else {
      //     this.transitionName = "slide-left";
      //   }
      //   this.$router.isBack = false;
      // }
    },
    immediate: true
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
@import "assets/css/mint-ui-reset/base.less";
#app {
  overflow: hidden;
  background-color: var(--base-bg-color);
}
#app::-webkit-scrollbar {
  display: none;
}
  /* // .Router {
  //   position: absolute;
  //   width: 10rem;
  //   top: 0;
  //   background-color: var(--base-bg-color);
  //   transition: all 0.3s ease;
  // }

  // .slide-left-enter,
  // .slide-right-leave-active {
  //   opacity: 0;
  //   -webkit-transform: translate(10rem, 0);
  //   transform: translate(10rem, 0);
  // }

  // .slide-left-leave-active,
  // .slide-right-enter {
  //   opacity: 0;
  //   -webkit-transform: translate(-10rem, 0);
  //   transform: translate(-10rem 0);
  // } */
</style>
