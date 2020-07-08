<template>
  <div id="navbar-item">
    <div
      class="item"
      @touchstart="touchStart()"
      @touchmove="touchMove($event)"
      @touchend="touchEnd()"
      v-waves
    >
      <div class="inner" :class="{ active: isActive }">
        <slot name="navbar-item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavbarItem",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    touchStart() {},
    touchMove() {},
    touchEnd() {}
  },
  watch: {}
};
</script>

<style lang="less" scoped>
#navbar-item {
  background-color: rgb(58, 58, 58);
  .item {
    font-size: 26px;
    width: 150px;
    text-align: center;
    color: rgba(216, 216, 216, .6);
    .inner {
      width: 100px;
      margin: auto;
      height: 1rem;
      line-height: 1rem;
    }
    .active {
      font-weight: 800;
      color: var(--color-tint);
    }
  }
}
</style>