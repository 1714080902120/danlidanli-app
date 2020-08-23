<template>
  <div id="member-shop-top">
    <div class="search">
      <span>{{ searchData.title }}</span>
    </div>
    <div class="type-list">
      <div class="type-item" v-for="item in typeList" :key="item.name" v-waves>
        <span class="img" :style="{ 'backgroundImage': `url(https:${item.imageUrl})` }"></span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="blocks-list">
      <span class="blocks-item" v-for="item in blocksData" :key="item.index" :style="{ 'backgroundImage': `url(https:${item.imageUrl})` }" v-waves></span>
    </div>
  </div>
</template>

<script>

export default {
  name: "MemberShopTop",
  props: {
    searchData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    blocksData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    typeList: {
      type: Array,
      default: () => {
        return []
      }

    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style lang="less" scoped>
* {
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center center;
}
#member-shop-top {
  width: 10rem;
  background-color: rgb(54, 54, 54);
  padding: 0 0.3rem;
  flex-direction: column;
  font-size: 0.3rem;
  border-bottom: 0.01rem solid rgba(100, 100, 100, 0.3);
  .search {
    width: 9.4rem;
    height: 1rem;
    border-radius: 1rem;
    background-color: rgba(45, 45, 45, 1);
    justify-content: center;
    margin: 0.3rem 0;
    span {
      font-size: 0.32rem;
      font-weight: bold;
      &::before {
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        margin-right: .2rem;
        background-size: 100% 100%;
        background-image: url("~assets/img/member-shop/search_pink.svg");
      }
    }
  }
  .type-list {
    flex-wrap: wrap;
    justify-content: space-around;
    .type-item {
      width: 2.2rem;
      height: 2.2rem;
      flex-direction: column;
      justify-content: center;
      span {
        justify-content: center;
        &:first-child {
          border-radius: 100%;
          width: 1.4rem;
          height: 1.4rem;
          background-size: 100% 100%;
          margin-bottom: .2rem;
        }
      }
    }
  }
  .blocks-list {
    justify-content: space-around;
    width: 9.4rem;
    margin: .3rem 0;
    opacity: .9;
    .blocks-item {
      width: 2.8rem;
      height: 1.3rem;
      background-size: 100% 100%;
      border-radius: 0.1rem;
    }
  }
}
</style>