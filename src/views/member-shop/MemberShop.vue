<template>
  <div id="member-shop">
    <BaseOuter>
    </BaseOuter>
  </div>
</template>

<script>
import { BaseOuter } from './index'

export default {
  name: 'MemberShop',
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
      this.$Bus.$emit('isInActive', 3)
    }
  }
}
</script>

<style lang="less" scoped>
  #member-shop {

  }
</style>