<template>
  <div id="app">
    <Base/>
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script>
import Base from 'components/common/base/Base'
import Sidebar from 'components/common/base/sidebar/Sidebar'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Base,
    Sidebar
  }
}
</script>

<style scoped>
@import 'assets/css/base.css';
@import 'assets/css/normalize.css';
#app {
  overflow: hidden;
  background-color: rgba(30, 30, 30, .8);
}
</style>
