<template>
  <nav class="py-10 px-8 border-b border-gray-200">
      <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between">
            <div class="menu-left">
                    <RouterLink to="/" class="text-xl">Archive Management System</RouterLink>
                </div>


              <div class="menu-center flex space-x-12">
               

                  <RouterLink to="/orders">
                    Search and order
                  </RouterLink>

                  <RouterLink to="/registration">
                    Registration
                  </RouterLink>

                  <RouterLink to="/logistics">
                    Logistics
                  </RouterLink>

                  <RouterLink to="/requests">
                    Requests
                  </RouterLink><br>
              </div>

              <div class="menu-right">
                  <template v-if="userStore.user.isAuthenticated && userStore.user.id">
                      <RouterLink :to="{name: 'profile', params:{'id': userStore.user.id}}">
                          <img :src="userStore.user.avatar" class="w-12 rounded-full">
                      </RouterLink>
                  </template>

                  <template v-else>
                      <RouterLink to="/login" class="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Log in</RouterLink>
                  </template>
              </div>
          </div>
      </div>
  </nav>

  <main class="px-8 py-6">
      <RouterView />
  </main>

  <Toast />
</template>

<script>
  import axios from 'axios'
  import Toast from '@/components/Toast.vue'
  import { useUserStore } from '@/stores/user'

  export default {
      setup() {
          const userStore = useUserStore()

          return {
              userStore
          }
      },

      components: {
          Toast
      },

      beforeCreate() {
          this.userStore.initStore()

          const token = this.userStore.user.access

          if (token) {
              axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          } else {
              axios.defaults.headers.common["Authorization"] = "";
          }
      }
  }
</script>