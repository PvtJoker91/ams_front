<template>
    <div class="space-y-3">
    <h2 class="text-3xl font-bold mb-4">Order</h2>
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <div class="mt-4">
                        <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" 
                        @click="showSearch=false">Order info</button>
                        <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500" 
                        @click="showSearch=true">Added dossiers</button>
                </div>

                    <div v-if="!this.showSearch" >
                        <h2 class="text-xl font-bold mb-4">Order Details</h2>
                        <div class="container mx-auto grid grid-cols-2 gap-4">
                            <div>
                                <b class="block">Client: </b>
                                <span class="block">{{ currentOrder.client }}</span>
                            </div>
                            <div>
                                <b class="block">Client department: </b>
                                <span class="block">{{ currentOrder.client_department }}</span>
                            </div>
                            <div>
                                <b class="block">Order creator: </b>
                                <span class="block">{{ currentOrder.creator.first_name }} {{ currentOrder.creator.last_name }}</span>
                            </div>
                            <div>
                                <b class="block">Order service: </b>
                                <span class="block">{{ currentOrder.service }}</span>
                            </div>
                            <div>
                                <b class="block">Order urgency: </b>
                                <span class="block">{{ currentOrder.urgency }}</span>
                            </div>
                            <div>
                                <b class="block">Order creation date: </b>
                                <span class="block">{{ currentOrder.time_create }}</span>
                            </div>
                            <div>
                                <b class="block">Order description: </b>
                                <span class="block">{{ currentOrder.description}}</span>
                            </div>
                        </div> 
                    </div>         
            
                    <div v-if="this.showSearch" class="w-3/5 ml-2">
                            <DossiersSearch />
                    </div>
        </div>
    </div>
</template>
    
    <script>
    import axios from 'axios'
    import DossiersSearch from '@/components/DossiersSearch.vue'
    
    export default {


        components: {
            DossiersSearch,
        },

        data() {
            return {
                currentOrder:{
                    creator:{}
            },
                showSearch: false
            }
        },

        mounted() {
            this.getOrder();
        },
    
        methods: {
            getOrder(){
                axios.get('/api/orders/' + this.$route.params.id + '/',
                            ).then(response =>{
                                    console.log(response.data)
                                    this.currentOrder = response.data
                                    }         
                        ).catch(error =>{
                            console.log(error)
                        })
            }
          
        }
    }
    </script>