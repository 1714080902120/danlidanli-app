<template>
  <div id="category-zone">
    <div class="item" v-for="item in list" :key="item.name" v-waves>
      <div class="img" :style="{ 'backgroundImage': `url(${item.src})` }"></div>
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import icon from "./zone";
export default {
  name: "CategoryZone",
  data() {
    return {
      list: icon
    };
  }
};
</script>

<style lang="less" scoped>
#category-zone {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: 0.26rem;

  .item {
    width: 2.5rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .img {
      width: 1rem;
      height: 1rem;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-bottom: .2rem;
    }
  }
}
</style>