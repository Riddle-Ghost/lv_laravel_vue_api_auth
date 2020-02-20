import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

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
        }
    ],
    mode: 'history'
})