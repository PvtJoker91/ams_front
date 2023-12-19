<template>

    <div class="space-y-3">
    <h2 class="text-3xl font-bold mb-4">My orders</h2>
       <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <li v-for="o in orders">
            <RouterLink :to="{name: 'orderDetail', params:{'id': o.id}}" class="py-2 px-2  rounded-lg">
              {{ o.client_department }}  {{ o.status }}
            </RouterLink>
          </li>
        </div>
    </div>

</template>


<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'

export default{
  setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },
  data(){
      return{
      orders: [],
      }
  },
  mounted() {
    this.getOrders();
  },

  methods: {
    getOrders(){
      axios.get('api/orders/').then(response =>{
                          console.log(response.data)
                          this.orders = response.data
                          }
                          ).catch(error =>{
                  console.log(error)
              }
              )
    }

  }

}
</script> 

  