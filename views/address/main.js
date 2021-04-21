import Vue from 'vue'
Vue.config.productionTip = false

import App from '@pages/address/index.vue'

new Vue({
  render: h => h(App)
}).$mount('#root')
