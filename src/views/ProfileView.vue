<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                
                <p><strong>{{ userStore.user.email }}</strong></p>

                    <button 
                        class="inline-block py-4 px-3 bg-red-600 text-xs text-white rounded-lg" 
                        @click="logout()"
                        v-if="userStore.user.id"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>


        <div class="main-center col-span-2 space-y-4">
            <div 
                class="bg-white border border-gray-200 rounded-lg"
                v-if="userStore.user.id === user.id"
            >

            </div>

        </div>

        <div class="main-right col-span-1 space-y-4">
        </div>
</template>

<style>
input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>

<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'


export default {
    name: 'FeedView',

    setup() {
        const userStore = useUserStore()


        return {
            userStore,

        }
    },

    components: {
        
    },

    data() {
        return {

            user: {
                id: ''
            },
        }
    },

    mounted() {

    },

    watch: { 
        
    },

    methods: {


        logout() {
            console.log('Log out')

            this.userStore.removeToken()

            this.$router.push('/')
        }
    
    }
}
</script>