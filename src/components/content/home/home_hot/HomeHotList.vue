<template>
  <div id="home-hot-list">
    <div class="recommend-list">
      <ul v-if="homeHotData.length > 0">
        <li v-for="(item, index) in homeHotData" :key="index" v-waves>
          <div class="inner">
            <div class="item-left">
              <img :src="item.pic" />
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="item-right">
              <div class="item-right-title">{{ item.title }}</div>
              <span class="label">{{ labelList[Math.round(Math.random() * 2)] }}</span>
              <div class="publish-time">{{ item.author }}</div>
              <div class="message">
                <div class="message-left">
                  <span>{{ (item.play / 10000).toFixed(1) + '万次播放' }}</span>
                  <span>·{{ date }}</span>
                </div>

                <span>
                  <img src="~assets/img/recommend_list/three_points_dark.svg" alt />
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getHomeHotData } from "network/home.js";

export default {
  name: "HomeHotList",
  data() {
    return {
      skip: -1,
      rid: 1,
      homeHotData: [],
      getData: null,
      labelList: ['百万播放', '很多人点赞', '投币数较多'],
      date: `${new Date().getMonth() + 1}-${new Date().getDate()}`
    };
  },
  created() {
    this.bus()
    this.getData = this.$debounce(this.toGetHomeHotData, 500, true);
    this.getData();
  },
  methods: {
    async toGetHomeHotData() {
      this.skip += 1
      await getHomeHotData({ skip: this.skip, rid: this.rid }).then(res => {
        this.homeHotData.push(...res);
      });
    },
    bus() {
      this.$Bus.$on('homeHotListPullUpData', () => {
        this.getData()
      })
    }
  },
  watch: {
    'homeHotData' () {
      this.$Bus.$emit('needToRefresh')
    }
  }
};
</script>

<style lang="less" scoped>
#home-hot-list {
  width: 10rem;
  overflow: hidden;

  .recommend-list {
    padding-top: 0;
    transition: 0.3s;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        flex-direction: column;

        .inner {
          padding: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          list-style: none;
          height: 2.6rem;
          border-bottom: 0.01rem solid rgba(100, 100, 100, 0.3);
          .item-left {
            position: relative;
            width: 3rem;
            height: 2rem;
            border-radius: 0.1rem;
            background-size: 3rem 2rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
            img {
              width: 3rem;
              height: 2rem;
              border-radius: 0.1rem;
            }
            .time {
              font-size: 0.3rem;
              position: absolute;
              bottom: 0.05rem;
              right: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(50, 50, 50, 0.6);
            }
          }
          .item-right {
            position: relative;
            height: 2rem;
            flex: auto;
            display: flex;
            padding-left: 0.3rem;
            flex-direction: column;
            justify-content: space-between;
            .item-right-title {
              font-size: 0.4rem;
              width: 6rem;
              height: 1.5rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .label {
              color: #fff;
              font-size: 0.25rem;
              background-color: rgb(243, 169, 20);
              width: 1.6rem;
              height: 0.5rem;
              border-radius: 0.05rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .publish-time {
              font-size: 0.3rem;
              display: flex;
              align-items: flex-end;
              opacity: 0.7;
              height: 1rem;
              img {
                opacity: 0.6;
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.03rem;
                padding-bottom: 0.05rem;
              }
            }
            .message {
              height: 0.4rem;
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              font-size: 0.3rem;
              .message-left {
                opacity: 0.6;
              }
              span {
                img {
                  width: 0.5rem;
                  height: 0.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>