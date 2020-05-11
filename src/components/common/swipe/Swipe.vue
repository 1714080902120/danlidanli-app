<template>
  <div id="swipe">
    <mt-swipe
      v-if="swipeData.length > 0"
      class="mt-swipe"
      @change="handleChange()"
      :auto="3000"
      :speed="500"
    >
      <mt-swipe-item v-for="item in swipeData" :key="item.id">
        <img v-lazy="`${item.url}${item.name}`" :alt="item.alt" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "Swipe",
  props: {
    swipeData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleChange() {}
  }
};
</script>

<style lang="less" scoped>
#swipe {
  position: relative;
  border-radius: 10px;
  padding-top: 20px;
  height: 340px;
  line-height: 340px;
  .mt-swipe {
    width: 7500px;
    height: 300px;
          border-radius: 10px;
    img {
      border-radius: 10px;
      margin: 0 15px;
      width: 720px;
      height: 300px;
    }
  }
}
img[lazy=loading] {
  background-image: url('~assets/img/base/bilibili_user_logo_bg.svg');
}
</style>