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

export default{

  data(){
      return{
      orders: [],
      api: 'http://127.0.0.1:8000/api/',
      }
  },
  mounted() {
    this.getOrders();
  },

  methods: {
    getOrders(){
      axios.get(this.api + 'orders/').then(response =>{
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

  