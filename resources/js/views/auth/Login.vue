<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Login</div>
                
                <flash></flash>

                <div class="card-body">
                    <form @submit.prevent="login">

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
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
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
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
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="remember"
                                    v-model="remember"
                                    >
                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                                <router-link class="btn btn-link"
                                to="/laravue-test/public/reset-password"
                                >
                                    Забыли пароль ?
                                </router-link>
                                <router-link class="btn btn-link"
                                to="/laravue-test/public/verify-email"
                                >
                                    Не пришло письмо подтверждения ?
                                </router-link>
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
import { required, minLength, email } from 'vuelidate/lib/validators'
import Flash from '../../components/Flash'
export default {
    data() {
        return {
            email: '',
            password: '',
            remember: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    },
    methods: {
        login() {
            if(!this.$v.$invalid) {
                let data = {
                    email: this.email,
                    password: this.password,
                    remember: this.remember
                }
                this.$store.dispatch('login', data)
                .then(() => this.getUser() )
                .catch(err => {
                    console.log(err)
                    if (err.response.status == 403) {
                        this.$router.push('/laravue-test/public/verify-email')
                    }
                })
            }
        },
        getUser() {
            this.$store.dispatch('user')
            .then(() => this.$router.push('/laravue-test/public'))
            .catch(err => console.log(err))
        }
    },
    components: {
        Flash
    }
}
</script>