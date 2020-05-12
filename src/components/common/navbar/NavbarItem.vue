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
  .item {
    font-size: 32px;
    width: 150px;
    text-align: center;
    .inner {
      width: 100px;
      margin: auto;
      height: 90px;
      line-height: 90px;
    }
    .active {
      font-weight: 800;
      color: var(--color-tint);
      border-bottom: 5px solid var(--color-tint);
    }
  }
}
</style>