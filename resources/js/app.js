import Vue from 'vue'
import router from './router'
import App from './components/App'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'

import store from './store'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)

require('./bootstrap');

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    }
});