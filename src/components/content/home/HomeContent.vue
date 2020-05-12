<template>
  <div id="home-content">
    <Swipe :swipeData="swipeData"/>
    <RecommendList :data="homeData"/>
  </div>
</template>

<script>
import Swipe from 'components/common/swipe/Swipe'
import { getHomeSwipe, getHomeData } from 'network/home'
import RecommendList from 'components/common/recommend_list/RecommendList'
export default {
  name: 'HomeContent',
  data() {
    return {
      swipeData: [],
      homeData: []
    }
  },
  created() {
    this.toGetHomeSwipeData(),
    this.toGetHomeData()
  },
  methods: {
    async toGetHomeSwipeData () {
      await getHomeSwipe().then(res => {   
        this.swipeData = res   
      })
    },
    async toGetHomeData () {
      await getHomeData({ skip: 0 }).then(res => {   
        console.log(res);
        this.homeData = res
      })
    }
  },
  components: {
    Swipe,
    RecommendList
  }
}
</script>

<style lang="less" scoped>
  #home-content {
    background-color: var(--base-bg-color-sec);
  }
</style>