<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Сбросить пароль</div>

                <div class="card-body">

                    <flash></flash>

                    <form v-if="!queryURL" @submit.prevent="sendEmail">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Ваш E-Mail</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control"
                                :class="{'is-invalid': $v.email.$invalid && $v.email.$dirty}"
                                v-model.trim="$v.email.$model"
                                >
                                <span class="invalid-feedback" role="alert">
                                    <strong>Неверный формат эмейла</strong>
                                </span>
                            </div>
                        </div>
                        
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Send Password Reset Link
                                </button>
                            </div>
                        </div>
                    </form>

                    <form v-if="queryURL" @submit.prevent="reset">

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Новый пароль</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control"
                                :class="{'is-invalid': $v.password.$invalid && $v.password.$dirty}"
                                v-model.trim="$v.password.$model"
                                >
                                <span class="invalid-feedback" role="alert">
                                    <strong>В пароле должно быть больше символов</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Подтвердите пароль</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control"
                                :class="{'is-invalid': $v.passConfirm.$invalid && $v.passConfirm.$dirty}"
                                v-model.trim="$v.passConfirm.$model"
                                >
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Reset Password
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
import Flash from '../../components/Flash'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default{
    data() {
        return {
            queryURL: this.$route.query.queryURL || '',
            email: '',
            password: '',
            passConfirm: '',
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(8)
        },
        passConfirm: {
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        sendEmail() {
            
            if(!this.$v.email.$invalid) {
                let data = {
                    email: this.email,
                }
                this.$store.dispatch('sendPassResetMail', data)
                .catch(err => console.log(err))
            }
        },
        reset() {
            if(!this.$v.password.$invalid && !this.$v.passConfirm.$invalid) {
                let url = this.queryURL
                let data = {
                    password: this.password,
                    password_confirmation: this.passConfirm
                }
                this.$store.dispatch('resetPassword', [url, data])
                .then(() => {
                    this.$router.push('/laravue-test/public/login')
                 } )
                .catch(err => console.log(err))
            }
        }
    },
    components: {
        Flash
    }
}
</script>