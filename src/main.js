import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false

//引入全局toast
import toastRegistry from './components/toast/index'
Vue.use(toastRegistry)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
