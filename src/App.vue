<template>
  <div id="app">
    <Sidebar />
    <transition name="slide-fade">
      <keep-alive>
        <router-view class="Router" />
      </keep-alive>
    </transition>

    <div v-if="active()">
      <Tabbar />
    </div>
    <div class="modal" v-if="modal"></div>
  </div>
</template>

<script>
import Sidebar from "components/common/base/sidebar/Sidebar";
import Tabbar from "components/common/base/tabbar/Tabbar";

export default {
  name: "App",
  data() {
    return {
      modal: false
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
        return reg.test(path) || this.modal;
      };
    }
  },
  watch: {
    "$store.state.uuid"() {
      this.$router.push({ path: "/personal-space" });
    },
    "$store.state.openSideBar"(newVal) {
      this.modal = newVal;
    },
    // watch: {
    //   // $route(to, from) {
    //   //   console.log(to, from);

    //   //   let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
    //   //   if (isBack) {
    //   //     this.transitionName = "slide-right";
    //   //   } else {
    //   //     this.transitionName = "slide-left";
    //   //   }
    //   //   this.$router.isBack = false;
    //   // }
    // },
    immediate: true
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
@import "assets/css/mint-ui-reset/base.less";
#app {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
  background-color: var(--base-bg-color);
}
#app::-webkit-scrollbar {
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

.modal {
  position: absolute;
  top: 0;
  width: 10rem;
  height: 100vh;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
