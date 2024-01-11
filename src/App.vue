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
              <span class="cursor-pointer" @click="toggleRequestsMenu">Search and request</span>
            <ul v-show="requestsMenuOpen" class="pl-4">
              <li><RouterLink to="/requests/create">Create request</RouterLink></li>
              <li><RouterLink to="/requests/myrequests">My requests</RouterLink></li>
            </ul>
          </div>

          <div v-if="hasGroup('Registration')">
          <RouterLink to="/registration" class="block py-2">Registration</RouterLink>
          </div>
          
          <div v-if="hasGroup('Logistics')" class="block py-2">
            <span class="cursor-pointer" @click="toggleLogisticsMenu">Logistics</span>
            <ul v-show="logisticsMenuOpen" class="pl-4">
              <li><RouterLink to="/logistics/checking">Checking</RouterLink></li>
              <li><RouterLink to="/logistics/completion">Completion</RouterLink></li>
              <li><RouterLink to="/logistics/placement">Placement</RouterLink></li>
            </ul>
          </div>

          <div v-if="hasGroup('Logistics')" class="block py-2">
            <span class="cursor-pointer" @click="toggleSelectionMenu">Selection</span>
            <ul v-show="selectionMenuOpen" class="pl-4">
              <li><RouterLink to="/selection/orders">Selection orders</RouterLink></li>
              <li><RouterLink to="/selection/create">Create selection order</RouterLink></li>
              <li><RouterLink to="/selection/execute">Execute selection order</RouterLink></li>
            </ul>
          </div>
          
          <div v-if="hasGroup('Requests')" class="block py-2">
            <span class="cursor-pointer" @click="toggleRequestsFulfillmentMenu">Requests fulfillment</span>
            <ul v-show="requestsFulfillmentMenuOpen" class="pl-4">
              <li><RouterLink to="/requests/list">Requests</RouterLink></li>
              <li><RouterLink to="/requests/tasks">Tasks</RouterLink></li>
              <li><RouterLink to="/requests/tasks/execution">Tasks execution</RouterLink></li>
              <li><RouterLink to="/units/registry">Registries</RouterLink></li>
            </ul>
          </div>

        </template>
      </div>

      <div class="py-5 px-8 mt-auto">
        <template v-if="userStore.user.isAuthenticated && userStore.user.id">
          <RouterLink :to="{name: 'profile', params:{'id': userStore.user.id}}" class="block py-2 px-2 bg-purple-600 text-white rounded-lg">
            {{ userStore.user.first_name }} {{ userStore.user.last_name }}
          </RouterLink>
        </template>
      </div>
    </aside>

    <main class="flex-1 px-8 py-6">
      <RouterView />
    </main>

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

      components: {
      },

      beforeCreate() {
          this.userStore.initStore()

          const token = this.userStore.user.access

          if (token) {
              axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          } else {3
              axios.defaults.headers.common["Authorization"] = "";
          }
      },

      data() {
        return {
          logisticsMenuOpen: false,
          selectionMenuOpen: false,
          requestsMenuOpen: false,
          requestsFulfillmentMenuOpen: false,
        };
      },
      methods: {
        toggleLogisticsMenu() {
          this.logisticsMenuOpen = !this.logisticsMenuOpen;
        },
        toggleSelectionMenu() {
          this.selectionMenuOpen = !this.selectionMenuOpen;
        },
        toggleRequestsMenu() {
          this.requestsMenuOpen = !this.requestsMenuOpen;
        },
        toggleRequestsFulfillmentMenu() {
          this.requestsFulfillmentMenuOpen = !this.requestsFulfillmentMenuOpen;
        },
        hasGroup(groupName) {
            return this.userStore.user && this.userStore.user.groups.some(group => group.name === groupName);
        },

      },
  }
</script>