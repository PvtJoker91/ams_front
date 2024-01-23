<template>

    <div class="max-w-7xl bg-white text-center">
        <h1 class="mb-6 text-2xl">Добро пожаловать в Систему Управления Архивными Документами!</h1>
    

    <div v-if="userStore.user.isAuthenticated && userStore.user.id" class="max-w-7xl bg-white text-center">
        <h3 class="mb-6 text-xl text-gray-500">Выберите раздел:</h3>
        <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
            <RouterLink to="/requests">
            <div class="main-left">
                <div class="p-12 bg-white border border-gray-200 rounded-lg text-center ml-5 mb-5">
                    <h1 class="mb-6 text-2xl">Создание заявок в архив</h1>
                </div>
            </div>
            </RouterLink>

            <RouterLink to="/archive">
            <div class="main-right">
                <div class="p-12 bg-white border border-gray-200 rounded-lg text-center mr-5 mb-5">
                    <h1 class="mb-6 text-2xl">Выполнение задач архива</h1>
                </div>
            </div>
            </RouterLink>
        </div>
    </div>

    <div v-else class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">

                <p class="mb-6 text-gray-500">
                    Для получения доступа, пожалуйста, войдите в систему!
                </p>


            </div>
        </div>

        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" v-on:submit.prevent="submitForm">
                    <div>
                        <label>E-mail</label><br>
                        <input type="email" v-model="form.email" placeholder="Ваш адрес электронной почты" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>

                    <div>
                        <label>Пароль</label><br>
                        <input type="password" v-model="form.password" placeholder="Ваш пароль" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                    </div>

                    <template v-if="errors.length > 0">
                        <div class="bg-red-300 text-white rounded-lg p-6">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                    </template>

                    <div>
                        <button class="py-4 px-6 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-500">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from '@/stores/user'

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        }
    },
    methods: {
        async submitForm() {
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your e-mail is missing')
            }

            if (this.form.password === '') {
                this.errors.push('Your password is missing')
            }

            if (this.errors.length === 0) {
                await axios
                    .post('/api/auth/jwt/create/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data)

                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    })
                    .catch(error => {
                        console.log('error', error)

                        this.errors.push('The email or password is incorrect!')
                    })
            }
            
            if (this.errors.length === 0) {
                await axios
                    .get('/api/users/me/')
                    .then(response => {
                        this.userStore.setUserInfo(response.data)

                        this.$router.push('/')
                    })
                    .catch(error => {
                        console.log('error', error)
                    })
            }
        }
    }
}
</script>