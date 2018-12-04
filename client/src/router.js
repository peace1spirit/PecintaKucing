import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'profile',
          component: () => import(/* webpackChunkName: "about" */ './components/Profile.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/Admin.vue'),
      children: [
        {
          path: 'profile',
          component: () => import(/* webpackChunkName: "about" */ './components/ProfileAdmin.vue')
        },
        {
          path: 'userlist',
          component: () => import(/* webpackChunkName: "about" */ './components/UserList.vue')
        }
      ]
    }
  ]
})
