<template>
  <div id="home-movie-nav">
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
  name: "HomeMovieNav",
  data() {
    return {
      list: [
        {
          src: require("assets/img/home/home_movie/whale.svg"),
          title: "纪录片",
          bgColor: "rgb(48,169,219)"
        },
        {
          src: require("assets/img/home/home_movie/glasses.svg"),
          title: "电影",
          bgColor: "rgb(139,149,239)"
        },
        {
          src: require("assets/img/home/home_movie/sofa.svg"),
          title: "电视剧",
          bgColor: "rgb(241,101,127)"
        },
        {
          src: require("assets/img/home/home_movie/small_video.svg"),
          title: "综艺",
          bgColor: "rgb(50,169,217)"
        },
        {
          src: require("assets/img/home/home_movie/scare.svg"),
          title: `害怕`,
          bgColor: "rgb(2,232,152)"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#home-movie-nav {
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