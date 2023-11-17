<template>
    <div class="container-fluid"> 
        <h2 class="alert alert-danger mt-2">Registration</h2>
        <div class="container-fluid">
            <div>
                <form @submit.prevent="openArchiveBox()">
                    <label class="form-label float-left ml-2">Open archive box</label>
                    <input type="text" class="form-control" v-model="archiveBox.barcode">                             
                </form>
            </div>
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <button @click="closeArchiveBox()">Close archive box</button>
            </div>
        </div>
        <div class="container-fluid">
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <form @submit.prevent="saveDossier()">
                    <label class="form-label float-left ml-2">Enter barcode to register:</label>
                    <input type="text" class="form-control" v-model="dossier.barcode">                             
                </form>
            </div>


            <div v-if="Object.keys(this.currentDossier).length !==0 && Object.keys(this.currentContract).length == 0">
            <h2 class="alert alert-info">Contract search</h2>
                <form @submit.prevent="searchContract(saveContract)">
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
                    <div class="row">
                        <div class="col">
                            {{ contract.product.name }}    
                        </div>
                        <div class="col">
                            {{ contract.contract_number}}
                        </div>
                        <div class="col">
                            {{ contract.client.last_name }}
                        </div>
                        <div class="col">
                            {{ contract.client.name }}
                        </div>
                        <div class="col">
                            {{ contract.client.middle_name }}
                        </div>
                    </div>
                            
                    </div>
                </div>
            </div>
            <div class="container-fluid" v-if="Object.keys(this.currentContract).length !== 0">
                <div class="container-flui">
                        <b>Client: </b> {{ currentContract.client.last_name }} {{ currentContract.client.name }} {{ currentContract.client.middle_name }}<br>
                        <b>Client birthday: </b> {{ currentContract.client.birthday }}<br>
                        <b>Client passport number: </b> {{ currentContract.client.passport }}<br>
                        <b>Product: </b> {{ currentContract.product.name }}<br>
                        <b>Contract number: </b> {{ currentContract.contract_number}}<br>
                        <b>Contract date: </b> {{ currentContract.time_create}}<br>
                        
                    </div>                 
                <button @click="registerDossier(openArchiveBox)">Register</button>
            </div>

            <!-- <div>
                <b>VARS</b><br>
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
            'status':'On registration',
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

    closeArchiveBox(){
        this.currentArchiveBox.status = 'Is registred'
        axios.post(this.api + 'registration/ab/', this.currentArchiveBox).then(
            response =>{
                console.log(response.data)
                this.dossiers = []
                this.currentArchiveBox = {}
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
     
    searchContract(saveIfOne){
        axios.get(this.api + 'search/' + 
                    '?contract_number='+this.contract.contract_number +
                    '&client__last_name='+this.contract.client__last_name +
                    '&client__name='+this.contract.client__name +
                    '&client__middle_name='+this.contract.client__middle_name +
                    '&client__passport='+this.contract.client__passport,
                    saveIfOne
                    ).then(response =>{
                            console.log(response.data)
                            this.contracts = response.data
                            }          
                ).catch(error =>{
                    console.log(error)
                }
                ).then(saveIfOne)
    },

    saveContract(contract){
        if (this.contracts.length == 1){
            this.currentContract = this.contracts[0];
        } else 
            {
            this.currentContract = contract
            }
        this.dossier.contract = this.currentContract.id     
        },
  
    registerDossier(reOpenBox){
        axios.post(this.api + 'registration/dossier/', this.dossier, reOpenBox).then(
            response =>{
                console.log(response.data)
            }
        ).catch(error =>{
            console.log(error)
        }).then(reOpenBox)
    },
    
    }

}
</script>