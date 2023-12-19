<template>
    <div>
      <h2 class="alert alert-danger mt-2">Detail Dossier View</h2>
      <p>Dossier ID: {{ dossier.id }}</p>
      <p>Last Name: {{ dossier.contract.client.last_name }}</p>
      <p>Name: {{ dossier.contract.client.name }}</p>
      <!-- Другие поля и информация о досье... -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
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
        this.getDossier();
    },

    methods: {
      getDossier(){
            axios.get('/api/units/dossier/' + this.$route.params.id + '/',
                        ).then(response =>{
                                console.log(response.data)
                                this.dossier = response.data
                                }         
                    ).catch(error =>{
                        console.log(error)
                    })
        }
      
    }
    
  };
  
  </script>