<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Search and order documents</h2>
      <div class="container-fluid" v-if="Object(this.dossiers).length == 0">
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
                                  <option v-for="product in products" v-bind:value="product.id">{{product.name}}</option>
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
                  <button type="submit" class="btn btn-primary float-left ml-2">Search</button>
              </form>
      </div>
      <div class="container-fluid" v-if="Object(this.dossiers).length !== 0 && Object.keys(this.currentDossier).length == 0">
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
      </div>
      <div v-if="Object(this.emptyResult) == true">
        <h3>Nothing found</h3>
      </div>

  </div>

  

</template>


<script>
import axios from 'axios'

export default{

  data(){
      return{
      emptyResult: false,
      currentDossier:{},
      dossiers:[],
      clients:[],
      products:[
                {name:'BSA', id:1},
                {name:'Credit', id:2},
                {name:'Credit Card', id:3},
                {name:'Deposit', id:4},
                {name:'Debet Card', id:5}
            ],
      selectedProduct:'',
      'api': 'http://127.0.0.1:8000/api/',
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
    openSearch(){
        this.search = true
        this.myOrders = false
    },
    openMyOrders(){
        this.myOrders = true
        this.search = false
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
                            this.dossiers = response.data
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

    this.dossiers.forEach((dossier) => {
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
  showDossierDetail(chosenDossier){
    this.currentDossier = chosenDossier

  },
  backToSearchResult(){
    this.currentDossier = {}
  },

  addDossierToOrder(dossier){

      axios.post(this.api + 'orders/', dossier).then(
          response =>{
              console.log(response.data)
              if(response.data){
                  this.dossiers.push(response.data);
                  this.contracts = [];
              }
              
          }
      ).catch(error =>{
          console.log(error)
      })
  },
  


  }

}
</script> 

  