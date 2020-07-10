import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// import { isMobile, isWechat } from '../utils/ua-check'
// router.beforeEach((to, from, next) => {
//   if (!isMobile() && !isWechat()) {
//     alert('该页面仅支持微信访问！')
//   } else {
//     next()
//   }
// })

export default router
