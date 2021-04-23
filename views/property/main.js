import Vue from 'vue'
Vue.config.productionTip = false

//引入全局toast
import toastRegistry from '@components/toast/index'
Vue.use(toastRegistry)

import App from '../../src/js/pages/property/index.vue'
new Vue({
  render: h => h(App)
}).$mount('#root')
