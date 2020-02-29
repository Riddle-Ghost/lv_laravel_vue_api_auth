<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <li class="nav-item">
                            <router-link class="nav-link" to="/laravue-test/public/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/laravue-test/public/protected">Protected</router-link>
                        </li>

                        <template v-if="!isLoggedIn">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/laravue-test/public/login">Login</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/laravue-test/public/register">Register</router-link>
                            </li>
                        </template>

                        <b-nav tabs v-if="isLoggedIn">
                            <b-nav-item-dropdown
                                id="my-nav-dropdown"
                                :text="userName"
                                toggle-class="nav-link-custom"
                                right
                            >
                                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                            </b-nav-item-dropdown>
                        </b-nav>
                    </ul>
                </div>
            </div>
        </nav>

        <h1>Hello from App.vue</h1>
        <Preloader></Preloader>
        <router-view></router-view>
    </div>
</template>

<script>
import Preloader from './Preloader'
export default {
    computed: {
        userName() {
            return this.$store.getters.userName
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            .then(() => {
            this.$router.push('/laravue-test/public/login')
            })
        }
    },
    created() {
        if (this.isLoggedIn) {

            this.$store.dispatch('user')
            .catch(err => console.log(err))
        }
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    this.$store.dispatch("logout")
                }
                throw err
            })
        })
    },
    components: {
        Preloader
    }
}
</script>

<style>

</style>