<template>
  <div id="home-animate-list" v-if="homeAnimateData.length > 0">
    <div class="content">
      <div class="items" v-for="items in homeAnimateData" :key="items.type">
        <div class="items-title">
          <span>{{ items.type }}</span>
          <span class="title-right">查看更多</span>
        </div>

        <div class="items-content">
          <div class="item" v-for="item in items.list" :key="item.aid">
            <div class="cover" v-waves>
              <img v-lazy="item.pic" alt />
              <div class="detail">
                <div class="up">{{(item.play / 10000).toFixed(1)}}万追番</div>
              </div>
            </div>
            <div class="item-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeAnimateData } from "network/home.js";
export default {
  name: "HomeAnimateList",
  data() {
    return {
      rid: 31,
      homeAnimateData: []
    };
  },
  created() {
    this.toGetHomeAnimateData();
    
  },
  methods: {
    toGetHomeAnimateData() {
      this.rid += 1;
      let arr = [32, 33, 51, 152];
      arr.forEach(e => {
        getHomeAnimateData(e, "ranking", 0).then(res => {
          let obj = {
            type: [...res][0].typename,
            list: [...res].filter((n, i) => {
              return n && i <= 3
            })
          };

          this.homeAnimateData.push(obj);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#home-animate-list {
  width: 10rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #fff;
  .content {
    display: flex;
    flex-direction: column;
    .items {
      margin-bottom: 0.3rem;
      border-bottom: 0.02rem solid rgba(100, 100, 100, 0.3);
      &:last-child {
        border-bottom: none;
      }
      .items-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.4rem;
        height: 1rem;
        .title-right {
          position: relative;
          margin-right: 0.4rem;
          opacity: 0.6;
          &::after {
            content: "";
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
            transform: rotateZ(180deg);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url("~assets/img/video/back_white.svg");
          }
        }
      }
      .items-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          position: relative;
          margin-bottom: 0.3rem;
          .cover {
            position: relative;
            width: 4.5rem;
            height: 3rem;
            border-radius: 0.1rem 0.1rem 0 0;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 2rem 2rem;
            background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
            img {
              border-radius: 0.1rem 0.1rem 0 0;
              width: 4.5rem;
              height: 2.9rem;
            }
            .detail {
              padding: 0 0.1rem;
              width: 4.5rem;
              position: absolute;
              bottom: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
          .item-title {
            width: 4.5rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.35rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>