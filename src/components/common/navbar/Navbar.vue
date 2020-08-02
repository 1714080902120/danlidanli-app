<template>
  <div
    id="navbar"
    ref="navbar"
    @touchstart="touchStart()"
    @touchmove="touchMove()"
    @touchend="touchEnd()"
  >
    <slot name="navbar"></slot>
    <span class="bottom" ref="bottom"></span>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      default: 1
    };
  },
  methods: {
    touchStart() {},
    touchMove() {},
    touchEnd() {},
    bottom () {
    }
  },
  watch: {
    '$route.path' (newVal) {
      if (newVal.indexOf('/home/') !== -1) {
        let path = newVal.split('/home')[1]
        let arr = ['/live', '/', '/hot', '/animate', '/movie', '/new-date', '/study']
        arr.forEach((e, i) => {
          if (e === path) {
            this.$nextTick(() => {        
              this.$refs.bottom.style.transform = `translateX(${2 * (i - this.default)}rem)`
            })            
          }
        })
      }
    },
    immediate: true,
    deep: true
  },
};
</script>

<style lang="less" scoped>
#navbar {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 1rem;
  line-height: 1rem;
  overflow-x: auto;
  transition: 0.5s;
  .bottom {
    position: absolute;
    width: 90px;
    height: 5px;
    background-color: var(--color-tint);
    bottom: 0;
    left: 180px;
    transition: .3s;
  }
}
#navbar::-webkit-scrollbar {
  display: none;
}
</style>