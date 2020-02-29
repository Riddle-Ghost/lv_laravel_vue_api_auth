<template>
    <div>
        <div v-if="flashSuccess" @click="unsetFlashSuccess" class="alert alert-success" role="alert">
            {{flashSuccess}}
        </div>
        <div v-if="flashError" @click="unsetFlashError" class="alert alert-danger" role="alert">
            {{flashError}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flashSuccessNewPage: null
        }
    },
    computed: {
        flashSuccess() {
            return this.$store.getters.flashSuccess || this.flashSuccessNewPage
        },
        flashError() {
            return this.$store.getters.flashError
        }
    },
    methods: {
        unsetFlashSuccess() {
            this.$store.commit('flashSuccess', null)
        },
        unsetFlashSuccessNewPage() {
            this.$store.commit('flashSuccessNewPage', null)
        },
        unsetFlashError() {
            this.$store.commit('flashError', null)
        },
    },
    created() {
        this.flashSuccessNewPage = this.$store.getters.flashSuccessNewPage
        this.unsetFlashSuccessNewPage()
    },
    beforeDestroy() {
        this.unsetFlashSuccess()
        this.unsetFlashError()
    }
}
</script>

<style>
.alert {
    cursor: pointer;
}
</style>