<template>
  <div id="popup">
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="inner" @click="colla()"></div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    isShowPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    colla() {
      this.$Bus.$emit('popupInvisible')
    }
  },
  watch: {
    isShowPopup(newVal) {
      this.popupVisible = newVal;
    },
    immediate: true,
    deep: true
  }
};
</script>

<style lang="less" scoped>
#popup {
  .inner {
    width: 750px;
    height: 600px;
  }
}
</style>