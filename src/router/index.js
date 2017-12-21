import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Report from '@/components/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/cities/:name',
      name: 'Report',
      component: Report
    }
  ]
})
