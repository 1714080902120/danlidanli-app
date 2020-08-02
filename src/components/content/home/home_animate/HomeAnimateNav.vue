<template>
  <div id="home-animate-nav">
    <div class="outer">
      <div class="item" v-for="item in list" :key="item.title">
        <div :style="{ 'background-color': item.bgColor }">
          <span :style="{ 'backgroundImage': `url(${item.src})` }"></span>
        </div>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeAnimateNav",
  data() {
    return {
      list: [
        {
          src: require("assets/img/home/home_animate/animate.svg"),
          title: "番剧",
          bgColor: "var(--color-tint)"
        },
        {
          src: require("assets/img/home/home_animate/national.svg"),
          title: "国创",
          bgColor: "var(--color-tint)"
        },
        {
          src: require("assets/img/home/home_animate/timestap.svg"),
          title: "时间表",
          bgColor: "rgb(1, 120, 255)"
        },
        {
          src: require("assets/img/home/home_animate/index.svg"),
          title: "索引",
          bgColor: "rgb(1, 120, 255)"
        },
        {
          src: require("assets/img/home/home_animate/love.svg"),
          title: `${new Date().getMonth() + 1}月新番`,
          bgColor: "#ff0"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#home-animate-nav {
  width: 10rem;
  overflow: hidden;
  border-bottom: .02rem solid rgba(100, 100, 100, .3);
  .outer {
    height: 2.4rem;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      div {
        font-size: 0.3rem;
        &:first-child {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .2rem;
          span {
            width: 0.6rem;
            height: 0.6rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
          }
        }
      }
    }
  }
}
</style>