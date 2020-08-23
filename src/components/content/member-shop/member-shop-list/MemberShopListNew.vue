<template>
  <div id="member-shop-list-new" v-if="list.length > 0">
    <div class="top">订阅喜欢的商品可及时获取商品动态哦</div>
    <div class="items">
      <div class="item" v-for="(item, index) in list" :key="item.id + index" v-waves>
        <div class="main">
          <img class="img" :src="item.imageUrls[0]" alt />
          <div class="right">
            <div class="title">{{ item.title }}</div>
            <div class="right-sub">
              <div class="img-list">
                <img
                  v-for="(index) in item.imageUrls.length - 1"
                  :key="index"
                  :src="item.imageUrls[index + 1]"
                  alt
                />
              </div>
              <div class="follows">订阅</div>
            </div>
          </div>
        </div>
        <div class="sub">
          <span>{{ item.hasWished }}</span>
          <span>{{ item.like }}人已订阅</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberShopAll } from "network/membershop";
import { COOKIE } from 'common/const.js'

export default {
  name: "MemberShopListNew",
  props: {
    feeds: {
      type: Array,
      default: () => {
        return [];
      }
    },
    num: {
      type: Number,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      pageNum: 1,
      func: null
    };
  },
  created() {
    this.bus();
    
    this.func = this.$debounce(this.increaseList, 500, true);
    for (let i = 0; i < this.feeds.length; i++) {
      let a = this.feeds[i];
      if (a.type === "mallitems" && a.imageUrls.length > 1) {
        this.list.push(a);
      }
    }
    this.pageNum = this.num
    if (this.list.length <= 0) {
      this.increaseList();
    }
  },

  methods: {
    bus() {
      this.$Bus.$on("newAddData", () => {
        this.func();
      });
    },
    increaseList() {
      this.pageNum += 1;
      memberShopAll(
        COOKIE,
        this.pageNum,
        "",
        "cold",
        "",
        20,
        50,
        "iphone",
        "h5"
      ).then(res => {
        let data = res.data.vo.feeds.list;
        if (data.length > 0) {
          let l = [];
          for (let i = 0; i < this.feeds.length; i++) {
            let a = this.feeds[i];
            if (a.type === "mallitems" && a.imageUrls.length > 1) {
              l.push(a);
            }
          }
          if (l.length <= 0) {
            this.increaseList();
          } else {
            this.list.push(...l);
            return true;
          }
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
#member-shop-list-new {
  width: 10rem;
  font-size: 0.3rem;
  background-color: rgb(35, 35, 35);
  align-items: flex-start;
  flex-direction: column;
  .top {
    width: 100%;
    background-color: rgb(248, 247, 192);
    color: rgb(250, 215, 119);
    padding: 0 0.3rem;
    height: .6rem;
  }
  .items {
    width: 100%;
    padding: 0 0.3rem;
    flex-direction: column;
    .item {
      width: 100%;
      background-color: rgb(54, 54, 54);
      flex-direction: column;
      margin-bottom: 0.3rem;
      border-radius: 0.1rem;
      padding: 9 0.1rem;
      .main {
        width: 100%;
        border-radius: 0.1rem 0.1rem 0 0;
        .img {
          width: 2rem;
          margin-right: .1rem;
        }
        .right {
          width: 7.6rem;
          flex-direction: column;
          align-items: flex-start;
          .title {
            width: 100%;
            color: #fff;
            font-weight: bold;
            font-size: 0.35rem;
          }
          .right-sub {
            width: 100%;
            .img-list {
              width: 5rem;
              justify-content: flex-start;
              img {
                width: 1rem;
                margin-right: .2rem;
              }
            }
            .follows {
              width: 1.4rem;
              height: .7rem;
              border-radius: .5rem;
              margin-right: .1rem;
              color: var(--color-tint);
              justify-content: center;
              border: .02rem solid var(--color-tint);
            }
          }
        }
      }
      .sub {
        opacity: 0.6;
        height: 1rem;
        padding: 0 0.1rem;
        width: 100%;
        justify-content: space-between;
        span {
          &:first-child {
            &::before {
              content: "";
              width: 0.5rem;
              height: 0.5rem;
              background-position: center center;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              margin-right: 0.1rem;
              background-image: url("~assets/img/user/space/discuss_dark.svg");
            }
          }
        }
      }
    }
  }
}
</style>