<template>
    <div>
        <h1>Hello froa App.vue</h1>

        <router-link to="/">Тест</router-link>
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
