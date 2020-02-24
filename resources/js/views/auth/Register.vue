<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Register</div>

                <div class="card-body">
                    <form @submit.prevent="register">

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control"
                                :class="{'is-invalid': $v.name.$invalid && $v.name.$dirty}"
                                v-model.trim="$v.name.$model"
                                >
                                <span class="invalid-feedback" role="alert">
                                    <strong>xcvfxg</strong>
                                </span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                            <div class="col-md-6">
                                <input type="text" class="form-control"
                                :class="{'is-invalid': $v.email.$invalid && $v.email.$dirty}"
                                v-model.trim="$v.email.$model"
                                >
                                <span class="invalid-feedback" role="alert">
                                    <strong>dfghdfgfd</strong>
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
                                    <strong>sdgdgdf</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
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
                                    Register
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passConfirm: ''
        }
    },
    
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        passConfirm: {
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        register() {

            if(!this.$v.$invalid) {

                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('register', data)
                .then(() => this.$router.push('/laravue-test/public/login') )
                .catch(err => console.log(err))
            }
        }
    }
}
</script>