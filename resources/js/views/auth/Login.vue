<template>
    <div class="container-login">
        <div class="img">
            <img src="">
        </div>
        <div class="login-content">
            <form class="user form-login" @submit.prevent="validateBeforeSubmit">
                <img src="http://smi-ci.herokuapp.com/img/avatar.svg">
                <h3 class="title">Bienvenue sur système de gestion de disque </h3>

                <p class="help is-danger" v-if="!$v.loginData.email.required">Le champ email est réquis</p>
                <p class="help is-danger" v-if="!$v.loginData.password.required">Le champ mot de passe est réquis</p>
                <p class="text-danger" v-if="loginError">Nom d'utilisateur ou mot de passe incorrect .</p>

                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                        <h5>Email</h5>
                        <input required type="email" v-model="loginData.email" @input="$v.loginData.email.$touch()"
                               maxlength="255" class="input">
                    </div>
                </div>
                <div class="input-div pass">
                    <div class="i">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                        <h5>mot de passe</h5>
                        <input required type="password" v-model="loginData.password"
                               @input="$v.loginData.password.$touch()"
                               maxlength="255" class="input">
                    </div>

                </div>
                <input :disabled="isLoading"
                       type="submit" class="btn-login" value="se connecter">
            </form>
        </div>
    </div>
</template>

<script type="text/babel">
import {mapActions} from 'vuex'

const {required, email, minLength} = require('vuelidate/lib/validators')

export default {
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
            loginError: false,
            submitted: false,
            isLoading: false
        }
    },
    validations: {
        loginData: {
            email: {
                required,
                email,
            },
            password: {
                required
            },
        },
    },
    mounted() {
        const inputs = document.querySelectorAll(".input");


        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }


        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    },
    methods: {
        ...mapActions('Auth', ['login']),
        async validateBeforeSubmit() {
            axios.defaults.withCredentials = true
            this.$v.loginData.$touch()
            if (this.$v.$invalid) {
                return true
            }

            this.isLoading = true

            try {
                await this.login(this.loginData)
                this.isLoading = false
                this.loginError = false
                this.$router.push('/admin/dashboard')
            } catch (error) {
                this.loginError = true
                this.isLoading = false
            }
        }
    },
}
</script>
