<template>

      <div class="container-fluid">
          <h2 class="alert alert-info">My orders</h2>
          <li v-for="o in orders">
              {{ o.client_department }} {{ o.service }} {{ o.service }} {{ o.service }}
          </li>

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
      axios.get('orders/').then(response =>{
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

  