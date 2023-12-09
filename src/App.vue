<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white">
      <div class="py-5 px-8 border-b border-gray-700">
        <RouterLink to="/" class="text-xl block">AMS</RouterLink>
      </div>

      <div class="py-5 px-8">
        <template v-if="userStore.user.isAuthenticated">


          <div class="block py-2">
            <span class="cursor-pointer" @click="toggleOrdersMenu">Search and order</span>
            <ul v-show="ordersMenuOpen" class="pl-4">
              <li><RouterLink to="/orders/create">Create order</RouterLink></li>
              <li><RouterLink to="/orders/search">Search dossiers</RouterLink></li>
              <li><RouterLink to="/orders/myorders">My orders</RouterLink></li>
            </ul>
          </div>

          <RouterLink to="/registration" class="block py-2">Registration</RouterLink>
          
          <div class="block py-2">
            <span class="cursor-pointer" @click="toggleLogisticsMenu">Logistics</span>
            <ul v-show="logisticsMenuOpen" class="pl-4">
              <li><RouterLink to="/logistics/Checking">Checking</RouterLink></li>
              <li><RouterLink to="/logistics/Completion">Completion</RouterLink></li>
              <li><RouterLink to="/logistics/Placement">Placement</RouterLink></li>
            </ul>
          </div>
          
          <RouterLink to="/requests" class="block py-2">Requests</RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/login" class="block py-2">Log in</RouterLink>
        </template>
      </div>

      <div class="py-5 px-8 mt-auto">
        <template v-if="userStore.user.isAuthenticated && userStore.user.id">
          <RouterLink :to="{name: 'profile', params:{'id': userStore.user.id}}" class="block py-2 px-2 bg-purple-600 text-white rounded-lg">
            {{ userStore.user.email }}
          </RouterLink>
        </template>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 px-8 py-6">
      <RouterView />
    </main>

    <!-- Toast component or other global components -->
    <Toast />
  </div>
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
      },
      data() {
        return {
          logisticsMenuOpen: false,
          ordersMenuOpen: false,
        };
      },
      methods: {
        toggleLogisticsMenu() {
          this.logisticsMenuOpen = !this.logisticsMenuOpen;
        },
        toggleOrdersMenu() {
          this.ordersMenuOpen = !this.ordersMenuOpen;
        },
      },
  }
</script>