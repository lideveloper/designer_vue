import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home/home',
      name: 'home',
      component: Home
    }
  ]
})
