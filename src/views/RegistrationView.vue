<template>
    <div class="container-fluid"> 
        <h2 class="alert alert-danger mt-2">Registration</h2>
        <div class="container-fluid">
            <div>
                <form @submit.prevent="openArchiveBox()">
                    <label class="form-label float-left ml-2">Open archive box</label>
                    <input type="text" class="form-control" v-model="archiveBox.barcode">
                    <span class="danger">{{errArray['sector_error']?errArray['sector_error'].toString():''}}</span>
                    <span class="danger">{{errArray['non_field_errors']?errArray['non_field_errors'].toString():''}}</span>
                    <span id='err' class="danger"></span>                           
                </form>
            </div>
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <button @click="closeArchiveBox()">Close archive box</button>
            </div>
        </div>
        <div class="container-fluid">
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <form id="dossierBarcodeForm" @submit.prevent="saveDossier()">
                    <label class="form-label float-left ml-2">Enter barcode to register:</label>
                    <input type="text" class="form-control" v-model="dossier.barcode">
                    <span class="danger">{{errArray['validation_error']?errArray['validation_error'].toString():''}}</span>
                    <span class="danger">{{errArray['dossier_sector_error']?errArray['dossier_sector_error'].toString():''}}</span>
                    <span class="danger">{{errArray['dossier_box_error']?errArray['dossier_box_error'].toString():''}}</span>
                    <span id='err' class="danger"></span>                               
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
                <div v-if="Object(this.contracts).length !==0" >
                    <div class="row">
                        <div class="col"><b>Product:</b></div>
                        <div class="col"><b>Contract number: </b></div>
                        <div class="col"><b>Client last name: </b></div>
                        <div class="col"><b>Client name: </b></div>
                        <div class="col"><b>Client middle name: </b></div>
                        <div class="col"><b>Client birthday: </b></div>
                        <div class="col"><b>Client passport: </b></div>
                    </div>
                    <div class='highlighted' @click="saveContract(contract)" v-for="contract in contracts">            
                    <div class="row">
                        <div class="col">{{ contract.product.name }}</div>
                        <div class="col">{{ contract.contract_number}}</div>
                        <div class="col">{{ contract.client.last_name }}</div>
                        <div class="col">{{ contract.client.name }}</div>
                        <div class="col"> {{ contract.client.middle_name }}</div>
                        <div class="col">{{ contract.client.birthday }}</div>
                        <div class="col">{{ contract.client.passport }}</div>
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
                <button @click="registerDossier()">Register</button>
            </div>

            <!-- <div>
                <b>VARS</b><br>
                <b>ArchiveBox</b> {{archiveBox}}<br>
                <b>Dossier</b> {{dossier}}<br>
                <b>Contract</b>  {{contract}}<br>
                <b>currentArchiveBox</b> {{currentArchiveBox}}<br>
                <b>currentDossier</b> {{currentDossier}}<br>
                <b>currentContract</b>  {{currentContract}}<br>
                <b>dossiers</b> {{dossiers}}<br>
                <b>contracts</b> {{contracts}}

            </div>  -->
            

            <div v-if="Object(this.dossiers).length !==0">
                <p>Registred in this AB: ({{dossiers.length}})</p>
               
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
            'barcode':'',
            'status':'On registration',
            'current_sector':'1',
            "storage_address":"",
        },
        'dossier':{
            'barcode':'',
            'archive_box':'',
            'contract':'',
            'current_sector':'1',
            'status':'On registration',
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

    openArchiveBox(){
        if (this.archiveBox.barcode) {
        axios.post(this.api + 'registration/ab/', this.archiveBox).then(
            response =>{
                console.log(response.data)
                this.currentArchiveBox = response.data
                this.dossiers = response.data.dossiers
                this.errArray = []
                this.contracts = []
                this.currentDossier = {}
                this.currentContract = {}
            }
        ).catch(error =>{
            if (error.response) {
      console.log(error.response.data);
      this.errArray = error.response.data;
      this.currentArchiveBox = {};
      this.dossiers = [];

    }
    })

    }
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
        axios.get(this.api + 'registration/dossier/'+ '?barcode=' + this.dossier.barcode).then(
            response =>{
                console.log(response.data)
                if (response.data.length == 0){
                this.currentDossier = this.dossier
                this.contracts = []
                this.currentContract = {}
            } else {this.currentDossier = {}} 
            }
        ).catch(error =>{
            if (error.response) {
      console.log(error.response.data);
      this.errArray = error.response.data;

    }
        })
    },

    searchContract(){
        axios.get(this.api + 'search/' + 
                    '?contract_number='+this.contract.contract_number +
                    '&client__last_name='+this.contract.client__last_name +
                    '&client__name='+this.contract.client__name +
                    '&client__middle_name='+this.contract.client__middle_name +
                    '&client__passport='+this.contract.client__passport,
                    ).then(response =>{
                            console.log(response.data)
                            this.contracts = response.data
                            if (this.contracts.length == 1){
                                this.saveContract(this.contracts[0]);
                            }                         
                            }          
                ).catch(error =>{
                    console.log(error)
                }
                )
    },

    saveContract(contract){
        this.currentContract = contract
        this.currentDossier.contract = this.currentContract.id     
        },
  
    registerDossier(){
        this.currentDossier.status = 'Is registred'
        this.currentDossier.archive_box = this.currentArchiveBox.id
        axios.post(this.api + 'registration/dossier/', this.currentDossier).then(
            response =>{
                console.log(response.data)
                if(response.data){
                    this.dossiers.push(response.data);
                    this.contracts = [];
                    this.currentDossier = {};
                    this.currentContract = {};
                }
                
            }
        ).catch(error =>{
            console.log(error)
        })
    },
    


    }

}
</script>