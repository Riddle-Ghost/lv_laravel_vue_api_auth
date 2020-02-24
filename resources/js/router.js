import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Home from './views/Home'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Verify from './views/auth/Verify'
import Reset from './views/auth/Reset'
import Email from './views/auth/Email'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/laravue-test/public/',
            name: 'home',
            component: Home
        },
        {
            path: '/laravue-test/public/login',
            name: 'login',
            component: Login
        },
        {
            path: '/laravue-test/public/register',
            name: 'register',
            component: Register
        },
        {
            path: '/laravue-test/public/verify',
            name: 'verify',
            component: Verify,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/laravue-test/public/reset',
            name: 'reset',
            component: Reset,
            meta: { 
                requiresAuth: true
            }
        },
        {
            path: '/laravue-test/public/email',
            name: 'email',
            component: Email,
            meta: { 
                requiresAuth: true
            }
        },
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