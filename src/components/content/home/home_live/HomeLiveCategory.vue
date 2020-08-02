<template>
  <div id="home-live-category" v-if="list.length > 0">
    <div class="list">
      <div class="item" v-for="item in list" :key="item.title">
        <img v-lazy="item.pic" alt="">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeLiveCategory',
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="less" scoped>
#home-live-category {
  width: 10rem;
  overflow: hidden;
  .list {
    width: 10rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      color: #fff;
      font-size: .3rem;
      width: 2.5rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
      }
      &:last-child {
        // margin-left: 0;
        margin-right: auto;
      }
    }
  }
}
</style>