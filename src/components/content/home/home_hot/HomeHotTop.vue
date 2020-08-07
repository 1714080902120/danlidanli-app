<template>
  <div id="home-hot-top">
    <div class="item" v-for="item in list" :key="item.title">
      <div :style="{ 'background-color': item.bgColor }" v-waves>
        <span :style="{'backgroundImage': `url(${item.src})`}"></span>
      </div>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHotTop",
  data() {
    return {
      list: [
        {
          src: require("assets/img/home/home_hot/rank.svg"),
          title: "排行榜",
          bgColor: 'var(--color-tint)'
        },
        {
          src: require("assets/img/home/home_hot/date.svg"),
          title: "每周必看",
          bgColor: '#ff0'
        },
        {
          src: require("assets/img/home/home_hot/good.svg"),
          title: "入站必刷",
          bgColor: '#fa0'
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#home-hot-top {
  width: 10rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    width: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      color: #fff;
      font-size: 0.3rem;
      &:first-child {
        border-radius: 100%;
        height: 1.3rem;
        width: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: .1rem;
        span {
          
          width: .8rem;
          height: .8rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 80% 80%;
        }
      }
    }
  }
}
</style>