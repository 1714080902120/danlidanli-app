<template>
  <div id="trends-top">
    <div class="search">
      <div class="outer">
        <img src="~assets/img/home/search_dark.svg" alt />
        <input type="text" name id placeholder="探索你感兴趣的频道" />
      </div>
    </div>
    <div class="content">
      <div class="title" v-if="title !== ''">{{ title }}</div>
      <div class="items">
        <div class="items-live" v-if="liveList.length > 0">
          <div class="item-live" v-for="item in liveList" :key="item.uid">
            <span :style="{ 'backgroundImage': `url(${item.face})` }"></span>
            <span>直播中</span>
            <span>{{ item.uname }}</span>
          </div>
        </div>
        <div class="items-view" v-if="viewList.length > 0">
          <div class="item-view" v-for="item in viewList" :key="item.user_profile.info.uid">
            <span :style="{ 'backgroundImage': `url(${item.user_profile.info.face})` }"></span>
            <span>{{ item.user_profile.info.uname }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DynamicTop, DynamicTopLive } from "network/trends";

export default {
  name: "TrendsTop",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      liveList: [],
      viewList: []
    };
  },
  created() {
    this.toGetTopData();
  },
  methods: {
    toGetTopData() {
      DynamicTop().then(res => {
        if (res.data.items && res.data.items.length > 0) {
          this.viewList = [...res.data.items];
        }
      });
      DynamicTopLive().then(res => {
        if (res.data.items && res.data.items.length > 0) {
          this.liveList = [...res.data.items];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  display: flex;
  align-items: center;
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
#trends-top {
  width: 10rem;
  background-color: rgb(54, 54, 54);
  justify-content: center;
  font-size: 0.3rem;
  padding: 0 0.3rem;
  flex-direction: column;
  .search {
    width: 9.4rem;
    height: 1.4rem;
    justify-content: center;
    border-bottom: 0.01rem solid rgba(100, 100, 100, 0.2);
    .outer {
      width: 9.4rem;
      height: 0.8rem;
      padding: 0 0 0 0.3rem;
      background-color: rgba(45, 45, 45, 1);
      border-radius: 0.6rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        opacity: 0.6;
      }
      input {
        width: 8rem;
        height: 0.6rem;
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 0.3rem;
        color: #fff;
      }
    }
  }
  .content {
    width: 100%;
    height: 3rem;
    .title {
      height: 0.6rem;
      width: 100%;
    }
    .items {
      overflow: hidden;
      overflow-x: scroll;
      font-size: 0.25rem;
      .items-live {
        .item-live {
          width: 1.8rem;
          height: 2rem;
          flex-direction: column;
          position: relative;
          justify-content: center;
          span {
            &:nth-child(1) {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 100%;
              border: 0.02rem solid var(--color-tint);
              background-color: transparent;
              background-size: 99% 99%;
              margin-bottom: 0.2rem;
            }
            &:nth-child(2) {
              bottom: 0.5rem;
              position: absolute;
              width: 80%;
              height: 0.4rem;
              border-radius: 0.5rem;
              justify-content: center;
              background-color: var(--color-tint);
              color: #fff;

              &::before {
                content: "";
                width: 0.25rem;
                height: 0.25rem;
                margin-right: 0.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-position: center center;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-image: url("~assets/img/trends/live.svg");
              }
            }
            &:nth-child(3) {
              opacity: 0.8;
              width: 80%;
              // text-align: center;
              justify-content: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .items-view {
        .item-view {
          width: 1.8rem;
          height: 2rem;
          flex-direction: column;
          justify-content: center;
          span {
            &:nth-child(1) {
              position: relative;
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 100%;
              margin-bottom: 0.2rem;
              &::after {
                content: "";
                position: absolute;
                width: 0.2rem;
                height: 0.2rem;
                border-radius: 100%;
                background-color: var(--color-tint);
                right: -0rem;
                bottom: 0.1rem;
                box-shadow: -.05rem 0 .05rem rgba(0, 0, 0, .6), /*左边阴影*/ .05rem 0 .05rem rgba(0, 0, 0, .6),
                  /*右边阴影*/ 0 -.05rem .05rem rgba(0, 0, 0, .6), /*顶部阴影*/ 0 .05rem .05rem rgba(0, 0, 0, .6); /*底边阴影*/
              }
            }
            &:nth-child(2) {
              opacity: 0.8;
              width: 80%;
              // text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>