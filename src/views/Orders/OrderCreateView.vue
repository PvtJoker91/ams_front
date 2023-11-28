<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Search and order documents</h2>
      <div class="container-fluid">
          <h2 class="alert alert-info">Create order</h2>
              
      </div>
  </div>

</template>


<script>
import axios from 'axios'

export default{

  data(){
      return{
      search : false,
      myOrders: false,
      order: {},
      dossiers:[],
      contracts:[],
      'api': 'http://127.0.0.1:8000/api/',
      'dossier':{
            'barcode':'',
            'archive_box':'',
            'contract':'',
            'current_sector':'1',
            'status':'',
        },
        'contract':{
            'id':'',
            'contract_number':'',
            'client__last_name':'',
            'client__name':'',
            'client__middle_name':'',
            'client__passport':'',
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
      axios.get(this.api + 'search/' + 
                  '?contract_number='+this.contract.contract_number +
                  '&client__last_name='+this.contract.client__last_name +
                  '&client__name='+this.contract.client__name +
                  '&client__middle_name='+this.contract.client__middle_name +
                  '&client__passport='+this.contract.client__passport,
                  ).then(response =>{
                          console.log(response.data)
                          this.contracts = response.data                      
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

  