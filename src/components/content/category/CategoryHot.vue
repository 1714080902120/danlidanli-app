<template>
  <div id="category-hot">
    <span class="title">
      <span>热门频道</span>
      <span @click="changeRecommendList()">换一换</span>
    </span>
    <div class="content">
      <div class="recommend-list">
        <div class="recommend-item" v-for="item in recommendList" :key="item.id">
          <img v-lazy="item.cover" alt />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="recommend-swipe">
        <div class="swipe-inner" ref="swipe">
          <div class="inner-item" v-for="item in channelsList" :key="item.name">
            <div class="left">
              <img v-lazy="item.cover" alt />
              <div class="title-sub">
                <span>{{ item.name }}</span>
                <span>{{ item.archives[0].name }}</span>
              </div>
            </div>
            <div class="right">去看看</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="items" v-for="items in channelsList" :key="items.id">
          <div class="items-title">
            <div class="title-left">
              <span>{{ items.name }}</span>
              <span>10分钟前更新</span>
            </div>
            <div class="title-right">{{ (items.subscribed_count / 10000).toFixed(1) }}万订阅</div>
          </div>
          <div class="item-list">
            <div class="item" v-for="item in items.archives" :key="item.id">
              <div class="cover">
                <img v-lazy="item.cover" alt />
                <div class="view-like-dura">
                  <span>{{ item.view_count }}</span>
                  <span>{{ item.like_count }}</span>
                  <span>{{ item.duration }}</span>
                </div>
              </div>
              <div class="item-title">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelsDetail } from "network/user.js";

export default {
  name: "CategoryHot",
  data() {
    return {
      channelsList: [],
      recommendList: [],
      count: 0,
      swipeLength: 0
    };
  },
  created() {
    this.toGetChannelsDetail();
  },
  methods: {
    toGetChannelsDetail() {
      getChannelsDetail('', '', '').then(res => {
        if (res.data !== -1) {
          this.$Bus.$emit("channelsCount", res.data.total);
          this.channelsList.push(...res.data.archive_channels);
          this.changeRecommendList();
          this.swipe();
        }
      });
    },
    changeRecommendList() {
      this.count += 1;
      this.RandomRecommendList();
    },
    RandomRecommendList() {
      this.recommendList = this.channelsList.filter((n, i) => {
        return n && i >= (this.count - 1) * 5 && i < this.count * 5;
      });
    },
    swipe() {
      this.$nextTick(() => {
        var timer = setInterval(() => {
          this.swipeLength += 1;
          this.$refs.swipe.style.transform = `translateY(-${1 *
            this.swipeLength}rem)`;
          if (this.swipeLength >= this.channelsList.length - 1) {
            console.log(123)
            clearInterval(timer);
            timer = null;
          }
        }, 5000);
      });
    }
  }
};
</script>

<style lang="less" scoped>
#category-hot {
  margin-top: 0.3rem;
  width: 10rem;
  padding: 0 .3rem;
  background-color: rgb(56, 56, 56);
  font-size: .3rem;
  .title {
    height: 1rem;
    font-size: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      &:last-child {
        display: flex;
        align-items: center;
        // margin-right: 0.3rem;
        &::after {
          content: "";
          margin-left: .1rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
          background-image: url("~assets/img/category/change.svg");
          height: 0.4rem;
          width: 0.4rem;
          opacity: 0.6;
        }
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .recommend-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .recommend-item {
        width: 2rem;
        height: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 100%;
          margin-bottom: 0.2rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
    }
    .recommend-swipe {
      overflow: hidden;
      height: 1.2rem;
      width: 9.4rem;
      padding: 0.1rem 0;
      margin-top: .3rem;
      background-color: var(--base-set-bg-color);
      .swipe-inner {
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .inner-item {
          width: 9rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          .left {
            display: flex;
            align-items: center;
            justify-content: space-around;
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 100%;
              margin-right: .1rem;
            }
            .title-sub {
              display: flex;
              align-items: flex-start;
              // justify-content: flex-start;
              flex-direction: column;
              span {
                font-size: 0.3rem;
                &:first-child {
                  color: #fff;
                }
                &:last-child {
                  width: 6rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          .right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.6rem;
            height: 0.6rem;
            border-radius: 0.1rem;
            background-color: var(--color-tint);
            color: #fff;
          }
        }
      }
    }
    .main {
      margin-top: .5rem;
      .items {
        margin-top: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: .01rem solid rgba(100, 100, 100, .3);
        .items-title {
          width: 9.4rem;
          height: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 0.3rem;
            span {
              &:first-child {
                font-size: 0.45rem;
                font-weight: bold;
                color: #fff;
              }
            }
          }
          .title-right {
            display: flex;
            align-items: center;
            justify-content: center;
            
            width: 2.4rem;
            height: 0.6rem;
            border: 0.03rem solid var(--color-tint);
            border-radius: 0.1rem;
            color: var(--color-tint);
          }
        }
        .item-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-around;
          
          .item {
            width: 4.5rem;
            .cover {
              position: relative;
              border-radius: 0.1rem;
              width: 4.5rem;
              height: 2.5rem;
              background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
              background-position: center center;
              background-size: 50% 50%;
              background-repeat: no-repeat;
              img {
                width: 4.5rem;
                height: 2.5rem;
                
                border-radius: 0.1rem;
              }
              .view-like-dura {
                width: 4.5rem;
                position: absolute;
                bottom: 0.1rem;
                // padding: 0 0.05rem;
                display: flex;
                align-items: center;
                font-size: 0.3rem;
                color: #fff;
                justify-content: space-around;
                span {
                  display: flex;
                  align-items: center;
                  &:nth-child(1) {
                    &::before {
                      content: "";
                      width: 0.4rem;
                      height: 0.4rem;
                      background-position: center center;
                      background-size: 100% 100%;
                      background-repeat: no-repeat;
                      background-image: url("~assets/img/recommend_list/play_dark.svg");
                    }
                  }
                  &:nth-child(2) {
                    &::before {
                      content: "";
                      width: 0.4rem;
                      height: 0.4rem;
                      background-position: center center;
                      background-size: 100% 100%;
                      background-repeat: no-repeat;
                      background-image: url("~assets/img/recommend_list/danmaku_dark.svg");
                    }
                  }
                  &:nth-child(3) {
                  }
                }
              }
            }
            .item-title {
              width: 4.5rem;
              height: 1rem;
              line-height: 1rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              
            }
          }
        }
      }
    }
  }
}
</style>