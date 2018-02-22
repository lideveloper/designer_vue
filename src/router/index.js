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
import DiscussDetail from '@/pages/displayworker/task/DiscussDetail'
import SignDesignCompact from '@/pages/displayworker/task/SignDesignCompact'

import DesingerHome from '@/pages/designer/DesingerHome'
import DesignTaskList from '@/pages/designer/designlist/DesignTaskList'
import DesignEditor from '@/pages/designer/DesignEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/editor'},
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
    }, {
      path: '/displayworker/discuss/:id',
      name: 'discuss',
      component: DiscussDetail
    }, {
      path: '/displayworker/signdesign/:id',
      name: 'signdesign',
      component: SignDesignCompact
    }, {
      path: '/designer',
      name: 'designer',
      component: DesingerHome,
      children: [
        {
          path: "designlist",
          name: "designlist",
          component: DesignTaskList
        }
      ]
    }, {
      path: "/editor",
      name: "editor",
      component: DesignEditor
    }
  ]
})
