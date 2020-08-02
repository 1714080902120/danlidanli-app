<template>
  <div id="category">
    <BaseOuter>
    </BaseOuter>
  </div>
</template>

<script>
import { BaseOuter } from './index'

export default {
  name: 'Category',
  data() {
    return {
      
    }
  },
  created () {
    this.bus()
  },
  activated () {
    this.bus()
  },
  components: {
    BaseOuter
  },
  methods: {
    bus () {
      this.$Bus.$emit('isInActive', 1)
    }
  },
}
</script>

<style lang="less" scoped>
  #category {

  }
</style>