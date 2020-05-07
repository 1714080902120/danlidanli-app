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
import { getUserData } from "network/user";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    this.getData()
  },
  components: {
    Base,
    Sidebar
  },
  methods: {
    async getData() {
      let userInfo
      if (window.localStorage.getItem("token")) {
        await getUserData({
          url: "/user/base-info",
          method: "get"
        }).then(res => {
          userInfo = res
        });
      }
      this.$store.dispatch('getUserInfoByActions', { userInfo })
    }
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
