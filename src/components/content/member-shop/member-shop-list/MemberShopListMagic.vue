<template>
  <div id="member-shop-list-magic">
    <div class="items">
      <div class="item" v-for="item in days" :key="item.itemsId" v-waves>
        <img :src="'https:' + item.img" :alt="item.name" />
        <div class="title">
          <div class="title-tag">
            <span
              class="tag-name"
              v-if="item.tags"
              :style="{ 'width': `${.35 * item.tags.typeAndLimitTagName.length}rem` }"
            >{{ item.tags.typeAndLimitTagName }}</span>
            <span class="title-content">{{ item.name }}</span>
          </div>
        </div>
        <div class="label" v-if="item.tags">
          <span
            class="pro"
            v-if="item.tags.promotionTagNames.length > 0"
          >{{ item.tags.promotionTagNames[0] }}</span>
          <span
            class="rec"
            v-if="item.tags.recommendTagNames.length > 0"
          >{{ item.tags.recommendTagNames[0] }}</span>
          <span
            class="mar"
            v-if="item.tags.marketingTagNames.length > 0"
          >{{ item.tags.marketingTagNames[0] }}</span>
          <span
            class="sal"
            v-if="item.tags.saleTypeTagNames.length > 0"
          >{{ item.tags.saleTypeTagNames[0] }}</span>
        </div>

        <div class="sub">
          <div class="sub-price">
            <span>{{ item.pricePrefix }}</span>
            <span>{{ item.priceDesc[0] }}</span>
          </div>
          <div class="sub-want">{{ item.like }}人想要</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberShopHome } from "network/membershop";

export default {
  name: "MemberShopListMagic",
  data() {
    return {
      pageNum: 0,
      days: [],
      func: null
    };
  },
  created() {
    this.func = this.$debounce(this.toGetMemberShopMagicData, 500, true);
    this.func();
    this.bus();
  },
  methods: {
    toGetMemberShopMagicData() {
      this.pageNum += 1;
      memberShopHome(this.pageNum, 30, 1.0, 0, 7).then(res => {
        if (res.data.vo.days.length > 0) {
          for (let i = 0; i < res.data.vo.days.length; i++) {
            this.days.push(...res.data.vo.days[i].presaleItems);
          }
        }
      });
    },
    bus() {
      this.$Bus.$on("magicAddData", () => {
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
#member-shop-list-magic {
  width: 10rem;
  font-size: 0.3rem;
  background-color: rgb(35, 35, 35);
  padding-top: 0.1rem;
  align-items: flex-start;
  flex-direction: column;
  .items {
    display: inline-flex;
    position: relative;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 0.3rem;
    .item {
      display: inline-flex;
      width: 4.6rem;
      flex-direction: column;
      border-radius: 0.1rem;
      background-color: rgb(54, 54, 54);
      margin-bottom: 0.2rem;
      &:nth-child(2n + 1) {
        margin-right: 0.2rem;
      }
      img {
        width: 100%;
        border-radius: 0.1rem;
      }
      .title {
        padding: 0 0.1rem;
        font-size: 0.35rem;
        font-weight: bold;
        margin: 0.2rem 0;
        line-height: .6rem;
        width: 100%;
        .title-tag {
          display: inline;
          span {
            display: inline;
            &:first-child {
              display: inline-block;
              text-align: center;
              margin-right: 0.1rem;
              height: 0.4rem;
              opacity: 0.6;
              font-size: 0.25rem;
              line-height: 0.4rem;
              border-radius: 0.25rem;
              border: 0.03rem solid rgb(175, 175, 175);
            }
          }
        }
      }
      .label {
        padding: 0 0.1rem;
        margin: 0.1rem 0;
        width: 100%;
        height: 0.6rem;

        justify-content: flex-start;
        span {
          font-size: 0.25rem;
          color: var(--color-tint);
          border: 0.02rem solid var(--color-tint);
          border-radius: 0.06rem;
          margin-right: 0.1rem;
        }
        .pro {
          color: rgb(241, 149, 10);
          border-color: rgb(241, 149, 10);
        }
        .rec {
          color: rgb(241, 237, 10);
          border-color: rgb(241, 237, 10);
        }
        .mar {
        }
        .sal {
          color: rgb(29, 241, 10);
          border-color: rgb(29, 241, 10);
        }
      }
      .sub {
        justify-content: space-between;
        width: 100%;

        padding: 0 0.1rem;
        position: relative;
        bottom: 0;
        height: 0.6rem;
        div {
          &:first-child {
            span {
              font-size: 0.35rem;
              &:last-child {
                font-weight: bold;
                font-size: 0.5rem;
              }
            }
            color: var(--color-tint);
          }
          &:last-child {
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>