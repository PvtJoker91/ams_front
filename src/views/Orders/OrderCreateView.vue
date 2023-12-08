<template>
        
<div class="space-y-12" v-if="Object.keys(this.currentOrder).length == 0">

    <form @submit.prevent="saveOrder()">


            <div class="border-b border-gray-900/10 pb-12">
            <h1 class="text-base font-semibold leading-7 text-gray-900">Fill  your order details</h1>
            

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                
                <div class="sm:col-span-3">
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

                <div class="sm:col-span-6">
                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div class="mt-2">
                    <textarea type="text" v-model="order.description" required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </textarea>
                </div>
                </div>

            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
        </div>
            </div>

    </form>
</div>


        <div class="space-y-12" v-if="Object.keys(this.currentOrder).length !== 0 && !showSearch">
            <h2>Add dossiers to your order</h2>
            <div style="width:100%; height:1px; clear:both;"></div>
                    <div id="line_block">
                      <p><b>Search dossier to add </b></p>
                      <button @click="showSearch=!showSearch" class="btn btn-primary float-left ml-2">Search</button>
                      <li v-for="d in addedDossiers">
                            {{ d.contract.product.name }} {{ d }} 
                      </li>
                    </div> 
                    
                    <div id="line_block">
                      <p><b>Current order</b></p>
                      <li>{{ this.currentOrder.client }}</li>
                      <li>{{ this.currentOrder.client_department }}</li>
                      <li>{{ this.currentOrder.service }}</li>
                      <li>{{ this.currentOrder.urgency }}</li>
                      <li>{{ this.currentOrder.description }}</li>

                      
                    </div>  
          <div style="width:100%; height:1px; clear:both;"></div>
        </div>



        <div class="space-y-12" v-if="Object(this.foundDossiers).length == 0 && showSearch">
            <h2 class="alert alert-info">Fill in your search details</h2>
                <form @submit.prevent="searchDossiers()">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client last name</label>
                                <input type="text" class="form-control" v-model="dossier.contract.client.last_name">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client name</label>
                                <input type="text" class="form-control" v-model="dossier.contract.client.name">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client mid name</label>
                                <input type="text" class="form-control" v-model="dossier.contract.client.middle_name">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client passport</label>
                                <input type="text" class="form-control" v-model="dossier.contract.client.passport">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client birthday</label>
                                <input type="date" class="form-control" v-model="dossier.contract.client.birthday">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                      <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Product name (choose)</label>
                                <select class="form-control" v-model="dossier.contract.product.id">
                                    <option v-for="product in products" v-bind:value="product.name">{{product.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Contract number</label>
                                <input type="text" class="form-control" v-model="dossier.contract.contract_number">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Dossier barcode</label>
                                <input type="text" class="form-control" v-model="dossier.barcode">
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-right ml-2">Search</button>
                </form>
                <button @click="showSearch=!showSearch" class="btn btn-primary float-left ml-2">Back</button>
        </div>
        
        
        
        <div class="space-y-12" v-if="Object(this.foundDossiers).length !== 0 && Object.keys(this.currentDossier).length == 0">
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
            {{ this.addedDossiers.length }}
            <button @click="foundDossiers=[]" class="btn btn-primary float-left ml-2">Back</button>
        </div>
        <div v-if="Object(this.emptyResult) == true">
          <h3>Nothing found</h3>
        </div>
  
  </template>
  
  
  <script>
  import axios from 'axios'
  
  export default{
  
    data(){
        return{
        emptyResult: false,
        showSearch: false,
        currentDossier:{},
        currentOrder:{},
        foundDossiers:[],
        addedDossiers:[],
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
        products:[
                  {name:'BSA'},
                  {name:'Credit'},
                  {name:'Credit Card'},
                  {name:'Deposit'},
                  {name:'Debet Card'}
              ],
        'api': 'http://127.0.0.1:8000/api/',
        'order':{
            'id':'',
            'status':'',
            'creator':'',
            'client':'',
            'client_department':'',
            'service':'',
            'urgency':'',
            'description':'',
            'dossiers':[]
        },
        'dossier':{
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
  
        'errArray': [],
        }
    },
  
    methods: {
    saveOrder(){
      this.currentOrder = this.order
      this.foundDossiers = []
    },
    
    backToOrder(){
      this.currentOrder = {}
    },


    backToSearchResult(){
      this.currentDossier = {};
      this.foundDossiers = [];

    },
  
    addDossierToOrder(dossier){
        const index = this.addedDossiers.indexOf(dossier);

        if (index !== -1) {
            this.addedDossiers.splice(index, 1);
        } else {
            this.addedDossiers.push(dossier);
}
    },






    searchDossiers(){
        this.emptyResult = false
        axios.get(this.api + 'units/dossier/' + 
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
                            if(response.data.length==0){
                              this.emptyResult = true
                            } else {
                              this.foundDossiers = response.data
                              this.convertDossiersToClients()
                            }                      
                            }          
                ).catch(error =>{
                    console.log(error)
                }
                )
    },
  
    convertDossiersToClients(){
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
      this.clients = Object.values(clientsObj);
    },
    
  
    }
  
  }
  </script> 
  
    