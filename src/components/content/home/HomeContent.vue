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
      const text = [ '从前没得选，现在我想做个好人~', '华为：最贵的终端~', '快进来rua！' ]
      await getHomeSwipe().then(res => {
        this.swipeData = res.map((n, i) => {
          n['text'] = text[i]
          return n
        })
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