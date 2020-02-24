import Vue from 'vue'
import Vuex from 'vuex';

import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        flash: null
    },
    getters: {
        getFlash: state => state.flash,
    },
    mutations: {
        changeFlash(state, val) {
            state.flash = val
        },
    },
    modules: {
        auth
    }
})