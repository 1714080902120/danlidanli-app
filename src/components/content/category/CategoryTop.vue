<template>
  <div id="category-top">
    <div class="search">
      <div class="outer">
        <img src="~assets/img/home/search_dark.svg" alt />
        <input type="text" name id placeholder="探索你感兴趣的频道" />
      </div>
    </div>
    <div class="all">
      <div class="item-first">
        <div class="item-inner">
          <span>{{ count }}</span>
        </div>
        <div class="item-title">全部频道</div>
      </div>
      <div class="item-last">
        <div class="item-inner">
          <span>+</span>
        </div>
        <div class="item-title">添加订阅</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryTop",
  props: {
    followsList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      count: 2533,
    };
  },
  created () {
    this.bus()
  },
  methods: {
    bus() {
      this.$Bus.$on('channelsCount', count => {
        this.count = count
      })
    }
  }
};
</script>

<style lang="less" scoped>
#category-top {
  width: 10rem;
  background-color: rgb(56, 56, 56);
  display: flex;
  justify-content: center;
  padding: 0 0.3rem;
  flex-direction: column;
  .search {
    width: 9.4rem;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .outer {
      width: 9.4rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      padding: 0 0 0 0.3rem;
      background-color: rgba(45, 45, 45, 1);
      border-radius: 0.6rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        opacity: .6;
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
  .all {
    width: 10rem;
    display: flex;
    align-items: center;
    height: 2.4rem;
    .item-first, .item-last {
      display: flex;
      flex-direction: column;
      // align-items: center;
      width: 2rem;
      .item-inner {
        width: 1.2rem;
        height: 1.2rem;
        background-color: rgba(247, 75, 131, 0.8);
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: .36rem;
        span {
          color: #fff;
          display: flex;
          align-items: center;
          font-weight: bold;
          flex-wrap: wrap;
          justify-content: center;
          &:after {
            font-weight: initial;
            content: "个频道";
            font-size: .3rem;
          }
        }
      }
      .item-title {
        margin-top: .15rem;
        font-size: .3rem;
      }
    }
    .item-last {
      .item-inner {
        background-color: transparent;
        border: .04rem dashed var(--color-text);
        span {
          color: inherit;
          font-weight: initial;
          font-size: .8rem;
          font-weight: lighter;
          &::after {
            content: '';
          }
        }
      }
    }
  }
}
</style>