<template>
  <div class="wrapper" ref="wrapper" :style="{ width: screenWidth, height: screenHeight }">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BS from "better-scroll";
export default {
  name: "BetterScroll",
  props: {
    bounce: {
      type: Boolean,
      default: true
    },
    screenWidth: {
      type: String,
      default: "100%"
    },
    screenHeight: {
      type: String,
      default: "100vh"
    }
  },
  data() {
    return {
      BS: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getBetterScroll();
    });
  },
  components: {},
  methods: {
    getBetterScroll() {
      this.BS = new BS(this.$refs.wrapper, {
        click: true,
        bounce: this.bounce
      });
    },
    refresh() {
      this.BS.refresh();
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
}
</style>