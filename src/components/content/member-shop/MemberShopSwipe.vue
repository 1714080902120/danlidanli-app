<template>
  <div id="member-shop-swipe">
    <mt-swipe
      v-if="swipeData.length > 0"
      class="mt-swipe"
      :auto="3000"
      :speed="300"
      :showIndicators="false"
    >
      <mt-swipe-item class="mt-swipe-item" v-for="item in swipeData" :key="item.name">
        <img v-lazy="`https:${item.pic}`" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "MemberShopSwipe",
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
  created() {
  },
  methods: {}
};
</script>

<style lang="less" scoped>
#member-shop-swipe {
  width: 10rem;
  background-color: rgb(54, 54, 54);
  margin: -.5rem 0;
  .mt-swipe {
    height: 3.5rem;
    .mt-swipe-item {
      border-radius: 0.1rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 3rem 3rem;
      background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
      width: 10rem;
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 0.1rem;
        width: 9.4rem;
      }
    }
  }
}
</style>