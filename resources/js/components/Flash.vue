<template>
<div v-if="flash" @click="unsetFlash" class="alert alert-primary" role="alert">
    {{flash}}
</div>
</template>

<script>
export default {
    computed: {
        flash() {
            return this.$store.getters.getFlash
        }
    },
    methods: {
        unsetFlash() {
            this.$store.commit('changeFlash', null)
        }
    },
    beforeDestroy() {
        this.unsetFlash()
    }
}
</script>

<style>
.alert {
    cursor: pointer;
}
</style>