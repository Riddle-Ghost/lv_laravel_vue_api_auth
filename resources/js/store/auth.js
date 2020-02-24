export default {
    state: {
        status: '',
        user: {},
        token: localStorage.getItem('token') || '',
        expiresAt: localStorage.getItem('expires_at') || '',
        url: {
            user: '/laravue-test/public/api/user',
            logout: '/laravue-test/public/api/logout',
            login: '/laravue-test/public/api/login',
            register: '/laravue-test/public/api/register',
        },
    },
    getters: {
        userName: state => state.user.name,
        token: state => state.token,
        expiresAt: state => state.expiresAt,
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        auth_user(state, user) {
            state.user = user
        },
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, expires_at){
            state.status = 'success'
            state.token = token
            state.expires_at = expires_at
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
            state.expiresAt = ''
            state.user = {}
        },
    },
    actions: {

        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('/laravue-test/public/api/register', user)
                .then(responce => {
                    commit('changeFlash', responce.data.message)
                    resolve(responce)
                })
                .catch(err => {
                    commit('auth_error', err)
                    reject(err)
                })
            })
        },

        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('/laravue-test/public/api/login', user)
                .then(responce => {
                    const token = responce.data.token
                    const expires_at = responce.data.expires_at
                    localStorage.setItem('token', token)
                    localStorage.setItem('expires_at', expires_at)
                    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
                    commit('auth_success', token, expires_at)
                    resolve(responce)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires_at')
                    reject(err)
                })
            })
        },

        logout({commit}){
            return new Promise((resolve, reject) => {
                axios.post('/laravue-test/public/api/logout')
                .then(responce => {

                    commit('logout')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires_at')
                    delete axios.defaults.headers.common['Authorization']
                    resolve()
                })
                .catch(err => {
                    commit('auth_error')
                    reject(err)
                })
            })
        },

        user({commit}){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.get('/laravue-test/public/api/user')
                .then(responce => {
                    const user = responce.data
                    commit('auth_user', user)
                    resolve(responce)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires_at')
                    reject(err)
                })
            })
        },
    }
}