<template>
  <div id="app">
    <Sidebar />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Sidebar from "components/common/base/sidebar/Sidebar";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  components: {
    Sidebar
  },
  methods: {}
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
</style>
