<template>
  <div id="trends">
    <BaseOuter>
    </BaseOuter>
  </div>
</template>

<script>
import { BaseOuter } from './index'

export default {
  name: 'Trends',
  data() {
    return {
      
    }
  },
  created() {
    this.bus()
  },
  activated() {
    this.bus()
  },
  components: {
    BaseOuter
  },
  methods: {
    bus () {
      this.$Bus.$emit('isInActive', 2)
    }
  }
}
</script>

<style lang="less" scoped>
  #trends {

  }
</style>