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
      <div class="container-fluid" v-if="Object(this.dossiers).length !== 0">
          <h2 class="alert alert-info">Search result</h2>
          <div>
                <div v-for="d in dossiers">
                   <a>{{ d.contract.product.name }} {{ d.contract.contract_number }} {{ d.contract.client.last_name }} {{ d.contract.client.name }} {{ d.contract.client.middle_name }}</a>
                   <button id="add_dossier_button" @click="addDossierToOrder()">Add</button>
                </div>
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
      dossiers:[],
      products:[
                {name:'BSA', id:1},
                {name:'Credit', id:2},
                {name:'Credit Card', id:3},
                {name:'Deposit', id:4},
                {name:'Debet Card', id:5}
            ],
      selectedProduct:'',
      'api': 'http://127.0.0.1:8000/api/orders/',
      'dossier':{
            'barcode':'',
            'contract':{
                'contract_number':'',
                'client':{
                    'last_name':'',
                    'name':'',
                    'middle_name':'',
                    'passport':'',
                    'birthday':'',
                },
                'product':{
                    'id':''
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
      axios.get(this.api + 'search/' + 
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
                          this.dossiers = response.data
                          if(response.data.length==0){
                            this.emptyResult = true
                          }                      
                          }          
              ).catch(error =>{
                  console.log(error)
              }
              )
  },



  addDossierToOrder(){

      axios.post(this.api + 'registration/dossier/', this.currentDossier).then(
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

  