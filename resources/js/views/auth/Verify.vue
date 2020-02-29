<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card" v-if="!queryURL">
                <div class="card-header">Подтвердите Ваш эмейл</div>
                <div class="card-body">
                    <flash></flash>
                    Прежде чем вы сможете войти, надо подтвердить Ваш эмейл.
                    Если вы не получили письмо, 
                    <a href="" @click.prevent="resendToggle = !resendToggle">нажмите сюда, чтобы отправить еще раз</a>
                    
                    <form v-if="resendToggle" @submit.prevent="resendEmail">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Ваш эмейл</label>
                            <div class="col-md-6">
                                <input type="email" class="form-control" autofocus
                                :class="{'is-invalid': $v.email.$invalid && $v.email.$dirty}"
                                v-model.trim="$v.email.$model"
                                >
                                <span class="invalid-feedback" role="alert">
                                    <strong>Неверный формат эмейла</strong>
                                </span>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Flash from '../../components/Flash'
export default {
    data() {
        return {
            queryURL: this.$route.query.queryURL || '',
            resendToggle: false,
            email: '',
        }
    },
    validations: {
        email: {
            required,
            email
        }
    },
    created() {
        if (this.queryURL) {

            let url = this.queryURL

            this.$store.dispatch('verify', url)
            .then(() => this.$router.push('/laravue-test/public/') )
            .catch(err => console.log(err))
        }
    },
    methods: {
        resendEmail() {
            if(!this.$v.$invalid) {

                let user = {email: this.email}

                this.$store.dispatch('resendVerify', user)
                .then(() => this.resendToggle = false)
                .catch(err => console.log(err))
            }
        }
    },
    components: {
        Flash
    }
}
</script>

<style scoped>
.form-group {
    margin-top: 20px;
}
</style>