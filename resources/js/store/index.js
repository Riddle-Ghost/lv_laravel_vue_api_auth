import Vue from 'vue'
import Vuex from 'vuex';

import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        flashSuccess: null,
        flashSuccessNewPage: null,
        flashError: null,
        loading: false,
    },
    getters: {
        flashSuccess: state => state.flashSuccess,
        flashError: state => state.flashError,
        flashSuccessNewPage: state => state.flashSuccessNewPage,
        loading: state => state.loading,
    },
    mutations: {
        flashSuccess(state, val) {
            state.flashSuccess = val
        },
        flashError(state, val) {
            state.flashError = val
        },
        flashSuccessNewPage(state, val) {
            state.flashSuccessNewPage = val
        },
        loading(state, val) {
            state.loading = val
        },
    },
    modules: {
        auth
    }
})