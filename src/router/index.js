import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login'
import HelloWorld from '@/components/HelloWorld'
import DisplayworkerHome from '@/pages/displayworker/DisplayworkerHome'
import NewTask from '@/pages/displayworker/task/NewTask'
import FailTask from '@/pages/displayworker/fail/FailTask'
import CompactTask from '@/pages/displayworker/compact/CompactTask'
import NoInvitedDetail from '@/pages/displayworker/task/NoInvitedDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/displayworker/task'},
    {
      path: '/login',
      name: 'login',
      component: HelloWorld
    },
    {
      path: '/displayworker',
      name: 'displayworker',
      component: DisplayworkerHome,
      children: [
        {
          path: "task",
          name: "newtask",
          component: NewTask
        },
        {
          path: "fail",
          name: "failtask",
          component: FailTask
        },
        {
          path: "compact",
          name: "compacttask",
          component: CompactTask
        }
      ]
    }, {
      path: '/displayworker/noinvited/:id',
      name: 'noinvited',
      component: NoInvitedDetail
    }
  ]
})
