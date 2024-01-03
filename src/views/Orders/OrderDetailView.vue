<template>
    <div class="space-y-3">
    <h2 class="text-3xl font-bold mb-4">Order №{{ currentOrder.id }}  {{ currentOrder.time_create }}</h2>
            <div class="p-8 bg-white rounded-lg">
                <div v-if="currentOrder.status == 'creation'" class="flex items-center">
                    <button class="mr-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" 
                         @click="showSearch=false">Order info
                    </button>
                    <button class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" 
                        @click="showSearch=true">Add dossiers
                        <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {{ addedDossiers.length }}
                        </span>
                    </button>
                </div>

                <div  v-if="!this.showSearch" class="flex mt-3" >
                    <div class="flex-1">
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
                                <b class="block">Creator: </b>
                                <span class="block">{{ currentOrder.creator.first_name }} {{ currentOrder.creator.last_name }}</span>
                            </div>
                            <div>
                                <b class="block">Service: </b>
                                <span class="block">{{ currentOrder.service }}</span>
                            </div>
                            <div>
                                <b class="block">Urgency: </b>
                                <span class="block">{{ currentOrder.urgency }}</span>
                            </div>
                            <div v-if="currentOrder.time_create!==null">
                                <b class="block">Creation date: </b>
                                <span class="block">{{ currentOrder.time_create }}</span>
                            </div>
                            <div v-if="currentOrder.time_close!==null">
                                <b class="block">Close date: </b>
                                <span class="block">{{ currentOrder.time_close }}</span>
                            </div>
                            <div>
                                <b class="block">Status: </b>
                                <span class="block">{{ currentOrder.status }}</span>
                            </div>
                            <div>
                                <b class="block">Description: </b>
                                <span class="block">{{ currentOrder.description}}</span>
                            </div>
                            <div v-if="currentOrder.close_reason!==null">
                                <b class="block">Close reason: </b>
                                <span class="block">{{ currentOrder.close_reason}}</span>
                            </div>
                            <div v-if="currentOrder.closer!==null">
                                <b class="block">Closer: </b>
                                <span class="block">{{ currentOrder.closer.first_name }} {{ currentOrder.closer.last_name }}</span>
                            </div>
                        </div>

                    
                    <div class="flex items-center">    
                        <div v-if="currentOrder.status == 'sent_for_processing' && !hasGroup('Archive clients')" class="flex items-center">
                            <button @click="orderAccept()" class="float-left ml-2 mt-4 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500" >
                                Accept order
                            </button>
                        </div>

                    
                        <div v-if="this.addedDossiers.length !==0 && currentOrder.status == 'creation'">
                            <button @click="orderSend()" class="float-left ml-2 mt-4 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                                    Submit order
                            </button>
                        </div>
                            
                        <div v-if="currentOrder.status == 'creation'">
                            <button @click="orderDelete()" class="float-left ml-2 mt-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                    Delete order
                            </button>
                        </div>
                        
                        <div v-if="currentOrder.status !== 'creation' && currentOrder.status !== 'cancelled' && currentOrder.status !== 'complete'">
                            <button v-if="!showDialog" @click="showDialog=true" class="float-left ml-2 mt-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                    Close order
                            </button>
                            <div v-if="showDialog" class="ml-6">
                                <p>Input the reason of order closing</p>
                                <div class="flex items-center">
                                    <input v-model="currentOrder.close_reason">
                                    <button @click="orderCancel()" class="float-left ml-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                        Close order
                                    </button>
                                    <button @click="showDialog=false, currentOrder.close_reason=null" class="float-left ml-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                        <div v-if="Object(addedDossiers).length!==0">
                            <h2 class="text-xl font-bold mb-4">Dossiers in the order  ({{ addedDossiers.length }})</h2>
                            <li v-for="dossier in addedDossiers">
                                    <RouterLink :to="{name: 'dossierDetail', params:{'id': dossier.id}}" v-bind:currentDossier="dossier" target="_blank" class="py-2 px-2  rounded-lg">
                                        {{ dossier.barcode }}
                                    </RouterLink>
                                <button v-if="currentOrder.status == 'creation'"
                                @click="addRemoveDossierToOrder(dossier)" class="rounded-md bg-indigo-600 px-1 py-0.2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
                                    Remove
                                </button>
                            </li>
                        </div>
                    </div>
                </div>         
            
                <div v-if="this.showSearch" class="ml-2">


                        <div v-if="Object(foundDossiers).length==0">
                        <div class="mt-4">
                                <h2 class="text-xl font-bold mb-4">Fill in your search details</h2>
                        </div>

                        <form @submit.prevent="searchDossiers()">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Client last name</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.client.last_name">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Client name</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.client.name">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Client mid name</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.client.middle_name">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Client passport</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.client.passport">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Client birthday</label>
                                        <input type="date" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.client.birthday">
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Product name (choose)</label>
                                        <select class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.product.name">
                                            <option v-for="product in products" v-bind:value="product.name">{{product.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Contract number</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.contract.contract_number">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label class="block text-sm font-medium leading-6 text-gray-900">Dossier barcode</label>
                                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1.5" v-model="dossier.barcode">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Search</button>
                            </div>

                        </form>
                        </div>

                    <!-- Search Result -->
                    <div v-if="Object(foundDossiers).length!==0" class="mt-5">
                        <div class="flex items-center">
                            <button @click="foundDossiers=[]" class="rounded-md bg-purple-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">
                                Back
                            </button>
                            <h1 class="text-2xl font-bold ml-4">Search result</h1>
                        </div>
                        <div class="p-1 bg-white rounded-lg mt-5">

                            <div class="grid grid-cols-4 mb-3">
                                <div class="col"><b>Client</b></div>
                                <div class="col"><b>Product:</b></div>
                                <div class="col"><b>Contract number:</b></div>
                                <div class="col"><b></b></div>
                            </div>

                            <div v-for="dossier in foundDossiers" :key="dossier.id" class="highlighted">
                                <ul>
                                    <details>
                                        <summary>
                                            <div class="grid grid-cols-4">
                                                <div class="col">{{ dossier.contract.client.last_name }} {{ dossier.contract.client.name }} {{ dossier.contract.client.middle_name }}</div>
                                                <div class="col">{{ dossier.contract.product.name }}</div>
                                                <div class="col">{{ dossier.contract.contract_number }}</div>
                                                <div class="col">
                                                    <button @click="addRemoveDossierToOrder(dossier)" 
                                                    class="rounded-md px-2 py-0.2 text-sm font-semibold text-white shadow-sm "
                                                    :class="{ 
                                                    'bg-gray-500 hover:bg-gray-600': addedDossiers.includes(dossier), 
                                                    'bg-green-500 hover:bg-green-600': !addedDossiers.includes(dossier) }">
                                                        Add/Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </summary>
                                        <div class="mt-3 text-sm">
                                            <li><b>Birthday:</b>     {{ dossier.contract.client.birthday }}</li>
                                            <li><b>Passport:</b>     {{ dossier.contract.client.passport}}</li>
                                            <li><b>Barcode:</b>     {{ dossier.barcode }}</li>
                                        </div>
                                    </details>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
    
    <script>
    import axios from 'axios';
    import { useUserStore } from '@/stores/user'


    export default {
        setup() {
            const userStore = useUserStore()
            return {
                userStore,
            }
        },


        data() {
            return {
                currentOrder:{
                    creator:'',
                    closer:''
                },
                showSearch: false,
                showDialog: false,
                foundDossiers:[],
                addedDossiers:[],
                emptyResult: false,
                products:[
                  {name:''},
                  {name:'BSA'},
                  {name:'Credit'},
                  {name:'Credit Card'},
                  {name:'Deposit'},
                  {name:'Debet Card'}

              ],
                dossier:{
                    'id':'',
                    'barcode':'',
                    'status':'',
                    'contract':{
                        'id':'',
                        'contract_number':'',
                        'time_create':'',
                        'client':{
                            'id':'',
                            'last_name':'',
                            'name':'',
                            'middle_name':'',
                            'passport':'',
                            'birthday':'',
                        },
                        'product':{
                            'id':'',
                            'name':''
                        }
                    },
                },
            }
        },

        mounted() {
            this.getOrder();
        },
    
        methods: {
            getOrder(){
                axios.get('/api/orders/orders/' + this.$route.params.id + '/',
                            ).then(response =>{
                                    console.log(response.data)
                                    this.currentOrder = response.data
                                    this.addedDossiers = response.data.dossiers
                                    }         
                        ).catch(error =>{
                            console.log(error)
                        })
            },
            searchDossiers(){
                axios.get('/api/units/dossier/' + 
                    '?barcode='+ this.dossier.barcode +
                    '&contract__contract_number='+this.dossier.contract.contract_number +
                    '&contract__client__last_name='+this.dossier.contract.client.last_name +
                    '&contract__client__name='+this.dossier.contract.client.name +
                    '&contract__client__middle_name='+this.dossier.contract.client.middle_name +
                    '&contract__client__passport='+this.dossier.contract.client.passport + 
                    '&contract__client__birthday='+this.dossier.contract.client.birthday +
                    '&contract__product__id='+this.dossier.contract.product.id,
                    ).then(response =>{
                            console.log(response.data)
                            this.foundDossiers = response.data
                            }                              
                ).catch(error =>{
                    console.log(error)
                }
                )
            },

            addRemoveDossierToOrder(dossier){
                const index = this.addedDossiers.indexOf(dossier);

                if (index !== -1) {
                    this.addedDossiers.splice(index, 1);
                } else {
                    this.addedDossiers.push(dossier);
                }
            },
            
            orderSend(){
                if(this.addedDossiers.length !==0 && this.currentOrder.status == 'creation'){
                this.currentOrder.dossiers = this.getID(this.addedDossiers)
                this.currentOrder.status = 'sent_for_processing'
                this.currentOrder.time_create = this.getCurrentDateTime()
                axios.patch('/api/orders/orders/'+ this.currentOrder.id + '/', this.currentOrder
                            ).then(response =>{
                                    console.log(response.data)
                                    this.$router.push({
                                        name:'orderList'
                                    })
                                    }         
                        ).catch(error =>{
                            console.log(error)
                            this.currentOrder.status = 'creation'
                        }
                        )
                }         
            },
            createTasks() {
                let tasks = []
                for (let i = 0; i < this.addedDossiers.length; i++ ){
                    let dossier = this.addedDossiers[i];
                    let task = {
                                dossier:dossier.barcode,
                                order:this.currentOrder.id,
                                task_status:"accepted"
                                }
                    tasks.push(task)
                }
                axios.post('/api/orders/tasks/', tasks
                    ).then(response =>{
                        console.log(response.data)
                        this.$router.push({
                                        name:'orderList'
                                    });
                    }
                ).catch(error =>{
                    console.log(error)
                });
            
            },

            orderAccept(){
                if(this.currentOrder.status == 'sent_for_processing'){
                axios.patch('/api/orders/orders/'+ this.currentOrder.id + '/', {status:'accepted'}
                            ).then(response =>{
                                    console.log(response.data);
                                    this.createTasks();
                                    }         
                        ).catch(error =>{
                            console.log(error)
                            this.currentOrder.status = 'sent_for_processing'
                        }
                        )
                }         
            },
            orderCancel(){
                if(this.currentOrder.status !== 'creation'){
                axios.patch('/api/orders/orders/'+ this.currentOrder.id + '/',
                        {
                        status:'cancelled',
                        close_reason:this.currentOrder.close_reason,
                        closer:this.userStore.user.id
                        }
                            ).then(response =>{
                                    console.log(response.data)
                                    this.$router.push({
                                        name:'orderList'
                                    })
                                    }         
                        ).catch(error =>{
                            console.log(error)
                        }
                        )
                     
                }
            },

            orderDelete(){
                if(this.currentOrder.status == 'creation'){
                axios.delete('/api/orders/orders/'+ this.currentOrder.id + '/',
                            ).then(response =>{
                                    console.log(response.data)
                                    this.$router.push({
                                        name:'orderCreate'
                                    })
                                    }         
                        ).catch(error =>{
                            console.log(error)
                        }
                        )
                }
            },

            getID(objectsArray){
                let idArray = []
                for (let i = 0; i < objectsArray.length; i++) {
                    idArray.push(objectsArray[i].barcode);
                    }
                return idArray
            },

            getCurrentDateTime() {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 19);
                return formattedDate;
            },
            
            hasGroup(groupName) {
            return this.userStore.user && this.userStore.user.groups.some(group => group.name === groupName);
            },

        }
    }
    </script>