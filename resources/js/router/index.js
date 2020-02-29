import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../views/Home'
import Protected from '../views/Protected'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Verify from '../views/auth/Verify'
import Reset from '../views/auth/Reset'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
      {
          path: '/laravue-test/public/',
          name: 'home',
          component: Home
      },
      {
        path: '/laravue-test/public/protected',
        name: 'protected',
        component: Protected,
        meta: { requiresAuth: true }
      },
      {
          path: '/laravue-test/public/login',
          name: 'login',
          component: Login,
      },
      {
          path: '/laravue-test/public/register',
          name: 'register',
          component: Register,
      },
      {
          path: '/laravue-test/public/reset-password',
          name: 'reset',
          component: Reset,
      },
      {
          path: '/laravue-test/public/verify-email',
          name: 'verify',
          component: Verify,
      }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/laravue-test/public/login') 
    } else {
      next() 
    }
  })

export default router