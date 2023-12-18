<template>    

    <div class="space-y-12">
        <form @submit.prevent="saveOrder()">
            <div class="border-b border-gray-900/10 pb-12">
                <h1 class="text-base font-semibold leading-7 text-gray-900">Fill  your order details</h1>
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-2">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Client</label>
                    <div class="mt-2">
                        <input type="text"  v-model="order.client" required 
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    </div>

                    <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Client department</label>
                    <div class="mt-2">
                        <input type="text" v-model="order.client_department" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    </div>

                    <div class="sm:col-span-3">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Service (choose)</label>
                    <div class="mt-2">
                        <select id="service" v-model="order.service" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="service in services" v-bind:value="service.id">{{service.type}}</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-3">
                    <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Urgency (choose)</label>
                    <div class="mt-2">
                        <select id="urgency" v-model="order.urgency" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option v-for="urgency in urgencys" v-bind:value="urgency.hours">{{urgency.type}}</option>
                        </select>
                    </div>
                    </div>

                    <div class="sm:col-span-5">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div class="mt-2">
                        <textarea type="text" v-model="order.description" required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </textarea>
                    </div>
                    </div>

                </div>
                <div class="mt-6 flex items-center gap-x-6">
                    <button type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
                </div>
            </div>
        </form>
    </div>


  </template>
  
  
  <script>
  import axios from 'axios'

  import { useUserStore } from '@/stores/user'
  
  export default{
    setup() {
        const userStore = useUserStore()

        return {
            userStore,
        }
    },
    
    data(){
        return{
        services:[
                  {type:'Full scanning', id:'full_scanning'},
                  {type:'Scanning by documents', id:'scanning_by_documents'},
                  {type:'Temporary issuance', id:'temporary_issuance'},
                  {type:'Unrecoverable issuance', id:'unrecoverable_issuance'},
              ],
        urgencys:[
                  {type:'Standard - 40 w.h.', hours:40},
                  {type:'Increased - 16 w.h.', hours:16},
                  {type:'High - 8 w.h.', hours:8},
              ],             

        order:{
            'status':'',
            'creator':'',
            'client':'',
            'client_department':'',
            'service':'',
            'urgency':'',
            'description':'',
            'dossiers':[]
        },
  
        'errArray': [],
        }
    },
  
    methods: {
    saveOrder(){
      this.order.creator = this.userStore.user.id;
      this.order.status = 'creation';
      axios.post('/api/orders/', this.order
                            ).then(response =>{
                                    console.log(response.data)
                                    this.$router.push({
                                        name:'orderDetail',
                                        params: {id: response.data.id}
                                    })
                                    
                                    }         
                        ).catch(error =>{
                            console.log(error)
                        }
                        )

    },
    }
  
  }
  </script> 
  
    