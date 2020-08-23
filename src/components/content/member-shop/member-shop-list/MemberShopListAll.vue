<template>
  <div id="member-shop-list-all" v-if="feeds.length > 0">
    <div class="items">
      <div class="item" v-for="item in feeds" :key="item.id" v-waves>
        <img v-if="item.type === 'mallitems'" :src="item.imageUrls[0]" alt />
        <img v-if="item.type === 'ticketproject'" :src="item.cover" alt />
        <img v-if="item.type === 'ugcs'" :src="'https:' + item.imgs.split(';')[0]" alt />
        <div class="title">
          <div v-if="item.type !== 'ugcs'" class="title-tag">
            <span
              class="tag-name"
              v-if="item.tags && item.tags.typeAndLimitTagName !== ''"
              :style="{ 'width': `${.35 * item.tags.typeAndLimitTagName.length}rem` }"
            >{{ item.tags.typeAndLimitTagName }}</span>
            <span class="title-content">{{ item.title }}</span>
          </div>
          <div class="ugcs-title" v-if="item.type === 'ugcs'">{{ item.displayMessage }}</div>
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

        <div class="sub" v-if="item.type !== 'ugcs'">
          <div class="sub-price">
            <span>{{ item.priceSymbol }}</span>
            <span>{{ item.priceDesc[0] }}</span>
          </div>
          <div class="sub-want" v-if="item.type === 'ticketproject'">{{ item.want }}</div>
          <div class="sub-want" v-if="item.type === 'mallitems'">{{ item.like }}人想要</div>
        </div>
        <div class="ugcs-sub" v-else-if="item.type === 'ugcs'">
          <div class="up">
            <span :style="{ 'backgroundImage': `url(${item.face})` }"></span>
            <span>{{ item.uname }}</span>
          </div>
          <div class="like">
            <span>{{ item.upvote }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberShopListAll",
  props: {
    feeds: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
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
#member-shop-list-all {
  width: 10rem;
  font-size: 0.3rem;
  background-color: rgb(35, 35, 35);
  padding-top: 0.1rem;
  .items {
    position: relative;
    width: 10rem;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 0 0.3rem;
    .item {
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
          .tag-name {
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
          span {
            display: inline;
          }
        }
        .ugcs-title {
          padding: 0 0.1rem;
          width: 4.5rem;
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
      .ugcs-sub {
        width: 100%;
        justify-content: space-between;
        .up {
          span {
            &:first-child {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 100%;
              margin-right: 0.1rem;
            }
          }
        }
        .like {
          opacity: 0.6;
          span {
            opacity: 0.6;
            &:first-child {
              font-size: 0.35rem;
              &::before {
                content: "";
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.1rem;
                background-size: 100% 100%;
                background-image: url("~assets/img/video/likes_empty_white.svg");
              }
            }
          }
        }
      }
    }
  }
}
</style>