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
    },
    probeType: {
      type: Number,
      default: 0
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
      this.scroll()
    });
  },
  components: {},
  methods: {
    getBetterScroll() {
      this.BS = new BS(this.$refs.wrapper, {
        click: true,
        bounce: this.bounce,
        probeType: this.probeType
      });
    },
    refresh() {
      this.BS.refresh();
    },
    scroll() {
      return this.BS.on('scroll', ({ y }) => {
        return y
      })
    },
    scrollTo(x = 0, y) {
      return this.BS.scrollTo(x, y)
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
}
</style>