<template>
  <div id="swipe">
    <mt-swipe
      v-if="swipeData.length > 0"
      class="mt-swipe"
      :auto="3000"
      :speed="300"
      :showIndicators="false"
    >
      <mt-swipe-item v-for="item in swipeData" :key="item.id">
        <img :src="`${item.url}${item.name}`" :alt="item.alt" />
        <div class="text">{{ item.text }}</div>
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
  }
};
</script>

<style lang="less" scoped>
#swipe {
  position: relative;
  border-radius: 10px;
  padding-top: 15px;
  height: 340px;
  line-height: 340px;
  margin-bottom: -.1rem;
    background-repeat: no-repeat;
  background-position: center center;
  background-size: 3rem 3rem;
  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
  .mt-swipe {
    width: 750px;
    height: 300px;
    border-radius: 10px;
    img {
      border-radius: 10px;
      margin: 0 15px;
      width: 720px;
      height: 300px;
    }
    .text {
      position: absolute;
      top: 100px;
      left: 30px;
      font-size: .4rem;
      color: rgb(255, 255, 255);
    }
  }
}

</style>