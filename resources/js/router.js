import Vue from 'vue'
import VueRouter from 'vue-router'
import ExampleComponent from './components/ExampleComponent'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/laravue-test/public/',
            component: ExampleComponent
        }
    ],
    mode: 'history'
})