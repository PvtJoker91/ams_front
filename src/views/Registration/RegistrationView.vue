<template>
    <div class="space-y-3">
        <h2 class="text-3xl font-bold mb-4">Registration</h2>
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="p-1 bg-white  rounded-lg">
                <div>
                    <form @submit.prevent="openArchiveBox()" class="flex items-center">
                        <label class="mr-2">Open archive box</label>
                        <input type="text" v-model="archiveBox.barcode" class="border border-gray-300 rounded-lg px-2 py-1">
                        <span class="danger">{{ errArray['detail'] ? errArray['detail'].toString() : '' }}</span>
                        <span class="danger">{{errArray['non_field_errors'] ? errArray['non_field_errors'].toString() : ''}}</span>
                        <span id="err" class="danger"></span>
                    </form>
                </div>

                <div v-if="Object.keys(this.currentArchiveBox).length !== 0" class="mt-2">
                    <button class="py-1 px-2 bg-purple-600 text-white rounded-lg" @click="closeArchiveBox()">Close AB</button>
                </div>
            </div>

            <div class="p-1 bg-white  rounded-lg" v-if="Object.keys(this.currentArchiveBox).length !== 0">
                <form id="dossierBarcodeForm" @submit.prevent="saveDossier" class="flex items-center">
                    <label class="form-label mr-2">Enter barcode to register:</label>
                    <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="dossier.barcode">
                    <span class="danger">{{errArray['validation_error'] ? errArray['validation_error'].toString() : ''}}</span>
                    <span class="danger">{{errArray['dossier_status_error'] ? errArray['dossier_status_error'].toString() : ''}}</span>
                    <span class="danger">{{errArray['dossier_box_error'] ? errArray['dossier_box_error'].toString() : ''}}</span>
                    <span id="err" class="danger"></span>
                </form>
            </div>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg" v-if="Object.keys(this.currentDossier).length !== 0 && Object.keys(this.currentContract).length === 0 && Object.keys(this.contracts).length === 0">
            <h2 class="text-2xl font-bold mb-4">Contract search</h2>
            <form @submit.prevent="searchContract" class="mb-4">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="mr-2">Client last name</label>
                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="contract.client__last_name">
                    </div>

                    <div>
                        <label class="mr-2">Client name</label>
                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="contract.client__name">
                    </div>

                    <div>
                        <label class="mr-2">Client mid name</label>
                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="contract.client__middle_name">
                    </div>

                    <div>
                        <label class="mr-2">Client passport</label>
                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="contract.client__passport">
                    </div>

                    <div>
                        <label class="mr-2">Contract number</label>
                        <input type="text" class="border border-gray-300 rounded-lg px-2 py-1" v-model="contract.contract_number">
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit" class="py-1 px-2 bg-purple-600 text-white rounded-lg">Search</button>
                </div>
            </form>
        </div>

        <div class="p-12 bg-white border border-gray-200 rounded-lg" v-if="Object(this.contracts).length !==0" >
            <div class="grid grid-cols-7 gap-4">
                <div class="col"><b>Product:</b></div>
                <div class="col"><b>Contract number:</b></div>
                <div class="col"><b>Client last name:</b></div>
                <div class="col"><b>Client name:</b></div>
                <div class="col"><b>Client middle name:</b></div>
                <div class="col"><b>Client birthday:</b></div>
                <div class="col"><b>Client passport:</b></div>
            </div>

            <div v-for="contract in contracts" :key="contract.id" class="highlighted cursor-pointer hover:bg-gray-100" @click="saveContract(contract)">
                <div class="grid grid-cols-7 gap-4">
                    <div class="col">{{ contract.product.name }}</div>
                    <div class="col">{{ contract.contract_number }}</div>
                    <div class="col">{{ contract.client.last_name }}</div>
                    <div class="col">{{ contract.client.name }}</div>
                    <div class="col">{{ contract.client.middle_name }}</div>
                    <div class="col">{{ contract.client.birthday }}</div>
                    <div class="col">{{ contract.client.passport }}</div>
                </div>
            </div>
        </div>

        <div class="p-12 bg-white border border-gray-200 rounded-lg" v-if="Object.keys(this.currentContract).length !== 0">
            <div class="container mx-auto grid grid-cols-3 gap-4">
                <div>
                    <b class="block">Client: </b>
                    <span class="block">{{ currentContract.client.last_name }} {{ currentContract.client.name }} {{ currentContract.client.middle_name }}</span>
                </div>
                <div>
                    <b class="block">Client birthday: </b>
                    <span class="block">{{ currentContract.client.birthday }}</span>
                </div>
                <div>
                    <b class="block">Client passport number: </b>
                    <span class="block">{{ currentContract.client.passport }}</span>
                </div>
                <div>
                    <b class="block">Product: </b>
                    <span class="block">{{ currentContract.product.name }}</span>
                </div>
                <div>
                    <b class="block">Contract number: </b>
                    <span class="block">{{ currentContract.contract_number }}</span>
                </div>
                <div>
                    <b class="block">Contract date: </b>
                    <span class="block">{{ currentContract.time_create }}</span>
                </div>
            </div>         
            <div class="mt-4">
                <button class="py-1 px-2 bg-purple-600 text-white rounded-lg" @click="registerDossier()">Register</button>
            </div>
        </div>

        <div class="p-2 bg-white border border-gray-200 rounded-lg" v-if="Object.keys(dossiers).length !== 0">
            <h5 class="text-xl font-bold mb-4">Registered in this AB: ({{dossiers.length}})</h5>
            <ul>
                <li v-for="dossier in dossiers" class="mb-1">
                    {{ dossier.barcode }}
                </li>
            </ul>
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
        'archiveBox': {
            'barcode':'',
            'status':'Under registration',
            'current_sector':'1',
            "storage_address":"",
        },
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

    openArchiveBox(){
        if (this.archiveBox.barcode) {
            axios.post('/api/registration/ab/', this.archiveBox).then(
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
        if (this.dossiers.length == 0){
        axios.delete('/api/registration/ab/' + this.currentArchiveBox.barcode + '/').then(
            response =>{
                console.log(response.data)
                this.currentArchiveBox = {}
                this.contracts = []
                this.currentDossier = {}
                this.currentContract = {}
            }
        ).catch(error =>{
            console.log(error)
        })
  
      } else {
        this.currentArchiveBox.status = 'Is registered'
        axios.post('/api/registration/ab/', this.currentArchiveBox).then(
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
    }
    },


    saveDossier(){
        axios.get('/api/registration/dossier/'+ '?barcode=' + this.dossier.barcode).then(
            response =>{
                console.log(response.data)
                if (response.data.length == 0){
                this.currentDossier = this.dossier;
                this.contracts = [];
                this.currentContract = {};
                this.errArray = [];
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
        axios.get('/api/contracts/' + 
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
        this.contracts = []    
        },
  
    registerDossier(){
        this.currentDossier.status = 'Is registred'
        this.currentDossier.archive_box = this.currentArchiveBox.id
        axios.post('/api/registration/dossier/', this.currentDossier).then(
            response =>{
                console.log(response.data)
                if(response.data){
                    this.dossiers.push(response.data);
                    this.contracts = [];
                    this.currentDossier = {};
                    this.currentContract = {};
                    this.dossier.barcode = '';
                    this.contract.contract_number = '';
                    this.contract.client__last_name = '';
                    this.contract.client__name = '';
                    this.contract.client__middle_name = '';
                    this.contract.client__passport = '';
                }
                
            }
        ).catch(error =>{
            console.log(error)
        })
    },
    


    }

}
</script>