export default {
    state: {
        user: {},
        token: localStorage.getItem('token') || '',
        expiresAt: localStorage.getItem('expires_at') || '',
        url: {
            user: '/laravue-test/public/api/user',
            logout: '/laravue-test/public/api/logout',
            login: '/laravue-test/public/api/login',
            register: '/laravue-test/public/api/register',
            resendVerify: '/laravue-test/public/api/email/resend',
            sendPassResetMail: '/laravue-test/public/api/password/email',
        },
    },
    getters: {
        userName: state => state.user.name,
        token: state => state.token,
        expiresAt: state => state.expiresAt,
        isLoggedIn: state => !!state.token,
        url: state => state.url,
    },
    mutations: {
        auth_user(state, user) {
            state.user = user
        },
        auth_success(state, token, expires_at){
            state.token = token
            state.expires_at = expires_at
        },
        logout(state){
            state.token = ''
            state.expiresAt = ''
            state.user = {}
        },
    },
    actions: {

        setTokens({commit}, response) {
            const token = response.data.token
            const expires_at = response.data.expires_at
            localStorage.setItem('token', token)
            localStorage.setItem('expires_at', expires_at)
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            commit('auth_success', token, expires_at)
        },
        unsetTokens({commit}) {
            localStorage.removeItem('token')
            localStorage.removeItem('expires_at')
            delete axios.defaults.headers.common['Authorization']
            commit('logout')
        },

        register({ commit, getters }, user){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(getters.url.register, user)
                .then(response => {
                    commit('flashSuccessNewPage', response.data.message)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },

        login({ commit, getters }, user){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(getters.url.login, user)
                .then(response => {
                    this.dispatch('setTokens', response)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires_at')
                    commit('loading', false)
                    reject(err)
                })
            })
        },

        logout({ commit, getters }){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(getters.url.logout)
                .then(response => {
                    this.dispatch('unsetTokens')
                    commit('loading', false)
                    resolve()
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },

        user({ commit, getters }){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.get(getters.url.user)
                .then(response => {
                    const user = response.data
                    commit('auth_user', user)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires_at')
                    commit('loading', false)
                    reject(err)
                })
            })
        },

        verify({commit}, url){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.get(url)
                .then(response => {
                    this.dispatch('setTokens', response)
                    this.dispatch('user')
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },
        resendVerify({ commit, getters }, user){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(getters.url.resendVerify, user)
                .then(response => {
                    commit('flashSuccess', response.data.message)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },
        sendPassResetMail({ commit, getters }, user){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(getters.url.sendPassResetMail, user)
                .then(response => {
                    commit('flashSuccess', response.data.message)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },
        resetPassword({ commit }, [url, data]){
            return new Promise((resolve, reject) => {
                commit('loading', true)
                axios.post(url, data)
                .then(response => {
                    commit('flashSuccessNewPage', response.data.message)
                    commit('loading', false)
                    resolve(response)
                })
                .catch(err => {
                    commit('flashError', err.response.data.message)
                    commit('loading', false)
                    reject(err)
                })
            })
        },
    }
}