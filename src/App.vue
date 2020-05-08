<template>
  <div id="app">
    <Sidebar />
    <Base />
    <router-view />
  </div>
</template>

<script>
import Base from "components/common/base/Base";
import Sidebar from "components/common/base/sidebar/Sidebar";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {
  },
  components: {
    Base,
    Sidebar
  },
  methods: {

  }
};
</script>

<style scoped>
@import "assets/css/base.css";
@import "assets/css/normalize.css";
#app {
  overflow: hidden;
  background-color: var(--base-bg-color-sec);
}
</style>
