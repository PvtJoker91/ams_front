<template>

<div v-if="Object(this.foundDossiers).length == 0" class="p-6 bg-white border border-gray-200 rounded-lg">
    <h2 class="alert alert-info">Fill in your search details</h2>
    <form @submit.prevent="searchDossiers()">
        <div class="grid grid-cols-2 gap-4">
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
<div v-if="Object(this.foundDossiers).length !== 0" class="p-6 bg-white border border-gray-200 rounded-lg">
    <h2 class="alert alert-info">Search result</h2>
    <div>
        <ul class="tree" v-for="client in clients">
            <li>
                <details open>
                    <summary><b>{{ client.last_name }} {{ client.name }} {{ client.middle_name }} |  {{ client.dossiers.length }} dossier</b></summary>
                        <ul>
                            <li v-for="dossier in client.dossiers">
                                <a>
                                    Product: {{ dossier.contract.product.name }}, Contract number: {{ dossier.contract.contract_number }}, Contract date: {{ dossier.contract.time_create }}, Barcode: {{ dossier.barcode }}, Status: {{ dossier.status }}
                                </a>
                            <button id="add_dossier_button" @click="addDossierToOrder(dossier)">Add</button>
                            </li>
                        </ul>
                </details>
            </li>
        </ul>
    </div>
    <button @click="foundDossiers=[]" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Back</button>
</div>




</template>
    
    <script>
    import axios from 'axios'
    
    export default {
        data() {
            return {
                clients:'',
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
    
    
        methods: {
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
                            this.convertDossiersToClients()
                            }                              
                ).catch(error =>{
                    console.log(error)
                }
                )
            },
  
            convertDossiersToClients(){
                // console.log(this.foundDossiers)
                
                const clientsObj = {};
                this.foundDossiers.forEach((dossier) => {
                const client = dossier.contract.client;
                const clientKey = client.id;
            
                if (!clientsObj[clientKey]) {
                    clientsObj[clientKey] = {
                    id: client.id,
                    last_name: client.last_name,
                    name: client.name,
                    middle_name: client.middle_name,
                    passport: client.passport,
                    birthday: client.birthday,
                    dossiers: [],
                    };
                }
                clientsObj[clientKey].dossiers.push({
                    id: dossier.id,
                    barcode: dossier.barcode,  
                    status: dossier.status,  
                    contract: {
                    id: dossier.contract.id,
                    contract_number: dossier.contract.contract_number,
                    time_create: dossier.contract.time_create,
                    product: {
                        id: dossier.contract.product.id,
                        name: dossier.contract.product.name,
                    },
                    },
                });
                });

                console.log(clientsObj)


                this.clients = Object.values(clientsObj);

                console.log(this.clients)
                },
    
    

            addDossierToOrder(dossier){
                const index = this.addedDossiers.indexOf(dossier);

                if (index !== -1) {
                    this.addedDossiers.splice(index, 1);
                } else {
                    this.addedDossiers.push(dossier);
                }
            },
        }
    }
    </script>