<template>
  <div id="app">
    <Sidebar />
    <keep-alive>
      <router-view />
    </keep-alive>
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
    return {};
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
      let reg = /home|category|trends|member-shop/gi 
      return () => {
        return (
          reg.test(path)
        );
      };
    }
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
@import "assets/css/mint-ui-reset/base.less";
#app {
  overflow: hidden;
  background-color: var(--base-bg-color-sec);
}
#app::-webkit-scrollbar {
  display: none;
}
</style>
