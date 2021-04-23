<template>
  <div class="dialog" v-show="visible">
    <div class="dialog-container">
      <div class="dialog-title">{{ config.title }}</div>
      <div class="content" v-html="config.content"></div>
      <div class="btns">
        <div v-if="config.cancelText" class="btn cancel" @click="close">
          {{ config.cancelText }}
        </div>
        <div v-if="config.confirmText" class="btn confirm" @click="confirm">
          {{ config.confirmText }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      config: {
        title: '提示',
        content: '确定删除？',
        confirmText: '关闭'
      }
    }
  },
  methods: {
    show(obj) {
      this.visible = true
      this.config = Object.assign(this.config, obj)
    },
    close() {
      this.visible = false
      this.$emit('close')
    },
    confirm() {
      this.visible = false
      this.$emit('comfirm')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@css/global/base.styl'
.dialog
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .dialog-container
    width: 61.8%;
    height: auto;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    br(8);
    position: relative;
    padding 0
    pt(10)
    .dialog-title
      width: 100%;
      height: px2rem(40);
      line-height px2rem(40);
      f(16)
      color: #696969;
      font-weight: 600;
      box-sizing: border-box;
      text-align: center
    .content
      color: #666;
      line-height: 1.5;
      padding px2rem(5) px2rem(20) px2rem(20)
      box-sizing: border-box;
      f(14)

    .btns
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      display flex
      flex-wrap: nowrap

      &::before
        content: ''
        height: 1px
        width: 200%
        background: #E9E9E9
        left: -50%
        top: 0
        posA()
        db()
        f(0)
        transform: scale(0.5)
        position: absolute

      .btn
        flex 1
        display: inline-block;
        height: px2rem(40);
        line-height: px2rem(40);
        br(5);
        cursor: pointer;
        f(16)
        &.confirm
          color: #FF7E41;
        &.cancel
          color: $deepgray
        &:hover
          opacity: 0.9
</style>
