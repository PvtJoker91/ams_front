<template>
    <div class="container-fluid"> 
        <h2 class="alert alert-danger mt-2">Registration</h2>
        <div class="col-md-5">
            <div>
                <form @submit.prevent="openArchiveBox()">
                    <label class="form-label float-left ml-2">Open archive box</label>
                    <input type="text" class="form-control" v-model="archiveBox.barcode">                             
                </form>
            </div>
        </div>
        <div class="col-md-5">
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <form @submit.prevent="saveDossier()">
                    <label class="form-label float-left ml-2">Enter barcode to register:</label>
                    <input type="text" class="form-control" v-model="dossier.barcode">                             
                </form>
            </div>


            <div v-if="Object.keys(this.currentDossier).length !==0 && Object.keys(this.currentContract).length == 0">
            <h2 class="alert alert-info">Contract search</h2>
                <form @submit.prevent="searchContract()">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client last name</label>
                                <input type="text" class="form-control" v-model="contract.client__last_name">
                                </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client name</label>
                                <input type="text" class="form-control" v-model="contract.client__name">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client mid name</label>
                                <input type="text" class="form-control" v-model="contract.client__middle_name">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Client passport</label>
                                <input type="text" class="form-control" v-model="contract.client__passport">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label class="form-label float-left ml-2">Contract number</label>
                                <input type="text" class="form-control" v-model="contract.contract_number">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary float-left ml-2">Search</button>
                    </div>
                    
                </form>
                <div v-if="Object.keys(this.contracts).length !==0" >
                    <div class='highlighted' @click="saveContract(contract)" v-for="contract in contracts">
                        {{ contract.product.name }} {{ contract.contract_number}}  {{ contract.client.last_name }} {{ contract.client.name }} {{ contract.client.middle_name }}
                    </div>
                </div>
            </div>
            <div v-if="Object.keys(this.currentContract).length !== 0">
                {{ currentContract.product.name }} {{ currentContract.contract_number}}  {{ currentContract.client.last_name }} {{ currentContract.client.name }} {{ currentContract.client.middle_name }}
                <button @click="registerDossier()">Register</button>
            </div>

            <!-- <div>
                VARS<br>
                <b>currentArchiveBox</b> {{currentArchiveBox}}<br>
                <b>currentDossier</b> {{currentDossier}}<br>
                <b> currentContract</b>  {{currentContract}}<br>
                <b>dossiers</b> {{dossiers}}<br>
                <b>contracts</b> {{contracts}}

            </div>  -->
            

            <div v-if="Object(this.dossiers).length !==0">
                <p>Registred in this AB:</p>
                <li v-for="dossier in dossiers">
                    {{ dossier.barcode }}
                </li>
            </div>
        </div>
    </div>

</template>

<style>
.highlighted {
    outline: 1px solid black;
  }
  
  .highlighted:hover {
    outline: none;
  }
</style>

<script>
import axios from 'axios'

export default{

    data(){
        return{
        currentArchiveBox: {},
        currentDossier: {},
        currentContract: {},
        dossiers:[],
        contracts:[],
        'api': 'http://127.0.0.1:8000/api/',
        'archiveBox': {
            'id':'',
            'barcode':'',
            'current_sector':'1',
            'dossiers': [
                            {
                            'contract': '',
                            'barcode': ''
                            }
                        ]
        },
        'dossier':{
            'barcode':'',
            'archive_box':this.currentArchiveBox,
            'contract':this.currentContract,
            'current_sector':'1',
            'status':'Is Registred',
        },
        'contract':{
            'contract_number':'',
            'client__last_name':'',
            'client__name':'',
            'client__middle_name':'',
            'client__passport':'',
        }
        }
    },

    methods: {

        openArchiveBox(){
        axios.post(this.api + 'registration/ab/', this.archiveBox).then(
            response =>{
                console.log(response.data)
                this.dossiers = response.data.dossiers
                this.currentArchiveBox = response.data
                this.contracts = []
                this.currentDossier = {}
                this.currentContract = {}
            }
        ).catch(error =>{
            console.log(error)
        })

    },

    saveDossier(){
                this.dossier.archive_box = this.currentArchiveBox.id
                this.currentDossier = this.dossier
                this.contracts = []
                this.currentContract = {}
    },
     
    searchContract(){
        axios.get(this.api + 'search/' + 
                    '?contract_number='+this.contract.contract_number +
                    '&client__last_name='+this.contract.client__last_name +
                    '&client__name='+this.contract.client__name +
                    '&client__middle_name='+this.contract.client__middle_name +
                    '&client__passport='+this.contract.client__passport
                ).then(
            response =>{
                console.log(response.data)
                this.contracts = response.data
            }
        ).catch(error =>{
            console.log(error)
        })

    },

    saveContract(contract){
                this.currentContract = contract
                this.dossier.contract = this.currentContract.id
        },

    refreshVars(){
                this.currentDossier = {}
                this.currentContract = {}
                this.dossiers = []
                this.contracts = []
        },       
    registerDossier(){
        axios.post(this.api + 'registration/dossier/', this.dossier).then(
            response =>{
                console.log(response.data)
            }
        ).catch(error =>{
            console.log(error)
        })
        this.openArchiveBox()
    },
    }

}
</script>