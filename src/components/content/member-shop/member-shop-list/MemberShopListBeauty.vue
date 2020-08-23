<template>
  <div id="member-shop-list-beauty">
    <div class="items">
      <div class="item" v-for="item in items" :key="item.data.id" v-waves>
        <div class="cover">
          <img v-lazy="item.data.imageUrls[0]" alt />
        </div>
        <div class="title">{{ item.data.title }}</div>
        <div class="sub">
          <span class="view">{{ item.data.stats.view }}</span>
          <span class="reply">{{ item.data.stats.reply }}</span>
          <span class="like">{{ item.data.stats.like }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberShopFeedType } from "network/membershop";
import { COOKIE } from 'common/const.js'

export default {
  name: "MemberShopListBeauty",
  data() {
    return {
      func: null,
      pageNum: 0,
      items: []
    };
  },
  created() {
    this.func = this.$debounce(this.toGetMemberShopFeedType, 500, true);
    this.func();
    this.bus();
  },
  methods: {
    toGetMemberShopFeedType() {
      this.pageNum += 1;
      memberShopFeedType(COOKIE, this.pageNum, 3).then(res => {
        let data = res.data.vo;
        this.items.push(...data.items);
      });
    },
    bus() {
      this.$Bus.$on("beautyAddData", () => {
        this.func();
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
#member-shop-list-beauty {
  width: 10rem;
  padding: 0 0.3rem;
  font-size: .3rem;
  background-color: rgb(35, 35, 35);
  .items {
    width: 9.4rem;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    // padding-top: .1rem;
    .item {
      width: 100%;
      background-color: rgb(54, 54, 54);
      border-radius: 0.1rem;
      flex-direction: column;
      margin-bottom: .3rem;
      .cover {
        border-radius: .1rem .1rem 0 0;
        width: 100%;
        height: 5.2rem;
        align-items: flex-start;
        background-size: 50% 50%;
        background-image: url("~assets/img/base/bilibili_user_logo_bg.svg");
        img {
          border-radius: .1rem .1rem 0 0;
          width: 100%;
        }
      }
      .title {
        font-size: .35rem;
        margin-top: .2rem;
        font-weight: bold;
        color: rgb(223, 223, 223);
        padding: 0 .1rem;
        height: 1rem;
        width: 100%;
      }
      .sub {
        padding: 0 .3rem;
        opacity: .6;
        height: 1rem;
        width: 100%;
        span {
          height: 100%;
          width: 1.6rem;
          opacity: .6;
          margin-right: .2rem;
          &::before {
            content: '';
            width: .5rem;
            height: .5rem;
            background-position: center center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-right: .1rem;
          }
          &:nth-child(1) {
            &::before {
              background-image: url("~assets/img/member-shop/view.svg");
            }
          }
          &:nth-child(2) {
            &::before {
              background-image: url("~assets/img/user/space/discuss_dark.svg");
            }
          }
          &:nth-child(3) {
            &::before {
              opacity: .6;
            width: .46rem;
            height: .46rem;
              background-image: url("~assets/img/video/likes_empty_white.svg");
            }
          }
        }
      }
    }
  }
}
</style>