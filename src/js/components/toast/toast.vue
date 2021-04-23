<template lang="pug">
  .app-toast(
    v-if="isShow",
    :class="{'info': type=== 'info','success': type=== 'success','wraning': type=== 'wraning','danger': type=== 'danger'}"
  )  {{ text }}
</template>
<style scoped lang="stylus" scoped>
@import '~@css/global/base.styl'
.app-toast
  position: fixed;
  left: 50%;
  top: 50%;
  background: #fff;
  padding: px2rem(10) px2rem(20);
  br(8);
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 50
  f(14);
  line-height: 1.2;
  box-sizing: border-box
.info
  background: #909399;

.success
  background: #67C23A;

.wraning
  background: #E6A23C;

.danger
  background: #F56C6C;
</style>
