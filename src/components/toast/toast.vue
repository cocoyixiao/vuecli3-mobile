<template lang="pug">
  .app-toast(
    v-if="isShow",
    :class="{'info': type=== 'info','success': type=== 'success','wraning': type=== 'wraning','danger': type=== 'danger'}"
  )  {{ text }}
</template>
<style scoped lang="stylus">
.app-toast
  position: fixed;
  left: 50%;
  top: 50%;
  background: #ccc;
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 50
.info
  background: #00aaee;

.success
  background: #00ee6b;

.wraning
  background: #eea300;

.danger
  background: #ee000c;
</style>
