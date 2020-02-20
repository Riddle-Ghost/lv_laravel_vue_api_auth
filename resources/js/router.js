import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Verify from './views/auth/Verify'
import Reset from './views/auth/Reset'
import Email from './views/auth/Email'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/laravue-test/public/',
            component: Home
        },
        {
            path: '/laravue-test/public/login',
            component: Login
        },
        {
            path: '/laravue-test/public/register',
            component: Register
        },
        {
            path: '/laravue-test/public/verify',
            component: Verify
        },
        {
            path: '/laravue-test/public/reset',
            component: Reset
        },
        {
            path: '/laravue-test/public/email',
            component: Email
        },
    ],
    mode: 'history'
})