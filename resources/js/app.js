import Vue from 'vue'
import router from './router'
import App from './components/App'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

require('./bootstrap');

const app = new Vue({
    el: '#app',
    router,
    components: {
        App
    }
});