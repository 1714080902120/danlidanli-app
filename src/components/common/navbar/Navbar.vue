<template>
  <div id="navbar" ref="navbar" @touchstart="touchStart()" @touchmove="touchMove()" @touchend="touchEnd()">
    <slot name="navbar"></slot>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    spped: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {};
  },
  methods: {
    touchStart() {},
    touchMove() {
    },
    touchEnd() {}
  },
  components: {}
};
</script>

<style lang="less" scoped>
#navbar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 90px;
  line-height: 90px;
  overflow-x: auto;
  transition: .5s;
}
#navbar::-webkit-scrollbar {
    display: none;
  }
</style>