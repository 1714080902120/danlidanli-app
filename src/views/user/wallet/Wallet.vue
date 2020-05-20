<template>
  <div id="wallet">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Wallet",
  data() {
    return {};
  },
  created() {},
  activated() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#wallet {
  position: relative;
}
</style>