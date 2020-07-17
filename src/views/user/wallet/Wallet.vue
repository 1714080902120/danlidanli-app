<template>
  <div id="wallet">
    <transition name="slide-fade">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
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
}
</style>