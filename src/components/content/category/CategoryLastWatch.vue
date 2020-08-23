<template>
  <div id="category-last-watch">
    <div class="title">最近看过的频道</div>
    <div class="content">
      <div class="item" :style="{ 'background-color': item.theme_color }" v-for="item in usualView" :key="item.id">
        <div class="background" :style="{ 'backgroundImage': `url(${item.background})` }">
          <div class="cover">
            <img v-lazy="item.cover" alt />
          </div>
          <div class="title-sub">
            <span>{{ item.name }}</span>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsualView } from "network/user.js";
import { COOKIE } from 'common/const.js'

export default {
  name: "CategoryLastWatch",
  data() {
    return {
      usualView: []
    };
  },
  created() {
    this.toGetUsualView();
  },
  methods: {
    toGetUsualView() {
      getUsualView(COOKIE).then(res => {
        if (res.data != -1) {
          for (let i = 0; i < res.data.channels.length; i++) {
            const e = res.data.channels[i];
            this.usualView.push(e);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#category-last-watch {
  margin-top: 0.3rem;
  width: 10rem;
  background-color: rgb(56, 56, 56);

  .title {
    height: 1rem;
    font-size: 0.4rem;
    line-height: 1rem;
    opacity: .6;
    margin-left: .3rem;
    margin-bottom: -.3rem;
  }
  .content {
    display: flex;
    align-items: center;
    overflow: hidden;
    overflow-x: scroll;
    padding-left: .3rem;
    height: 4.2rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      border-radius: 0.1rem;
      height: 3.5rem;
      margin-right: 0.2rem;
      box-shadow: -.1rem .1rem .1rem rgba(0, 0, 0, .2);
      .background {
        width: 2.4rem;
        height: 3.5rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        border-radius: 0.1rem;
        background-repeat: no-repeat;
        background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
        background-position: center top;
        background-size: 100% 40%;
        opacity: .9;
        .cover {
          position: relative;
          top: .9rem;
          width: 1.08rem;
          height: 1.08rem;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-repeat: no-repeat;
          background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
          background-position: center center;
          background-size: 50% 50%;
          z-index: 2;
          background-color: rgb(50, 50, 50);
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
          }
        }
        .title-sub {
          font-size: 0.3rem;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 2.1rem;
          border-radius: 0 0 0.1rem 0.1rem;
          background-color: rgb(53, 53, 53);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span {
            display: flex;
            align-items: center;
            height: 1rem;
            &:first-child {
              font-weight: bold;
              font-size: .35rem;
              align-items: flex-end;
            }
            &:last-child {
              height: .8rem;
              opacity: .6;
              
            }
          }
        }
      }
    }
  }
}
</style>