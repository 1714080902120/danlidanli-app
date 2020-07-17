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
  padding-top: .2rem;
  height: 5.2rem;
  line-height: 5.2rem;
  margin-bottom: -.1rem;
    background-repeat: no-repeat;
  background-position: center center;
  background-size: 3rem 3rem;
  background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
  .mt-swipe {
    width: 10rem;
    border-radius: .2rem;
    img {
      border-radius: .2rem;
      // margin: 0 15px;
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 9.6rem;
      height: 4.7rem;
    }
    .text {
      position: absolute;
      top: 1.7rem;
      left: .6rem;
      font-size: .4rem;
      color: rgb(255, 255, 255);
    }
  }
}

</style>