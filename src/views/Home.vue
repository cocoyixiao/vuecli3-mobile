<template lang="pug">
  .home
    img(alt="vue logo", src="../assets/images/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
