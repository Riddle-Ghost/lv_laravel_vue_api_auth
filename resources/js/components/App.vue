<template>
    <div>
        <h1>Hello froa App.vue</h1>

        <router-link to="/laravue-test/public/">home</router-link>
        <router-link to="/laravue-test/public/login">login</router-link>
        <router-link to="/laravue-test/public/register">register</router-link>
        <router-link to="/laravue-test/public/verify">verify</router-link>
        <router-link to="/laravue-test/public/reset">reset</router-link>
        <router-link to="/laravue-test/public/email">email</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
            console.log(this.$route)
        }
    }
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>