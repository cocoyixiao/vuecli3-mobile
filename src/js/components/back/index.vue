<template lang="pug">
    div(class="back-jw-title")
        van-icon(name="arrow-left"  size="30")
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style lang="stylus">
@import '~@css/global/base.styl'
.back-jw-title
  position: fixed
  width: px2rem(30)
  height: px2rem(30)
  left: px2rem(8)
  top: px2rem(15)
  color: #fff
  border-radius px2rem(5)
  z-index: 999
</style>
