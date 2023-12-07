<template>
    <div class="space-y-12"> 
        <h2 class="alert alert-danger mt-2">Archive box check</h2>
        <div class="space-y-12">
            <div>
                <form @submit.prevent="openArchiveBox()">
                    <label class="form-label float-left ml-2">Open archive box</label>
                    <input type="text" class="form-control" v-model="archiveBox.barcode">
                    <span class="danger">{{errArray['status_error']?errArray['status_error'].toString():''}}</span>
                    <span class="danger">{{errArray['non_field_errors']?errArray['non_field_errors'].toString():''}}</span>
                    <span class="danger">{{errArray['detail']?errArray['detail'].toString():''}}</span>
                    <span id='err' class="danger"></span>                        
                </form>
            </div>
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <button @click="closeArchiveBox()">Close archive box</button>
            </div>
        </div>
        <div class="space-y-12">
            <div v-if="Object.keys(this.currentArchiveBox).length !==0">
                <form id="dossierBarcodeForm" @submit.prevent="checkDossier()">
                    <label class="form-label float-left ml-2">Enter barcode to check dossier presence:</label>
                    <input type="text" class="form-control" v-model="dossier.barcode">
                    <span class="danger">{{errArray['dossier_status_error']?errArray['dossier_status_error'].toString():''}}</span>
                    <span class="danger">{{errArray['non_field_errors']?errArray['non_field_errors'].toString():''}}</span>
                    <span class="danger">{{errArray['validation_error']?errArray['validation_error'].toString():''}}</span>
                    <span id='err' class="danger"></span>                            
                </form>
            </div>
            <div v-if="Object(this.messege).length !==0">
                {{ this.messege }}
                <button @click="breakChecking()">Break checking</button>
                <button @click="continueChecking()">Continue checking</button>
            </div>
            <div style="width:100%; height:1px; clear:both;"></div>
                      <div id="line_block" v-if="Object(this.dossiers).length !==0">
                        <p>Dossiers was not checked: ({{dossiers.length}})</p>
                          <li v-for="d in dossiers">
                              {{ d.barcode }}
                          </li>
                        </div> 
                      <div id="line_block" v-if="Object(this.checkedDossiers).length !==0">
                        <p>Checked dossiers: ({{checkedDossiers.length}})</p>
                          <li v-for="d in checkedDossiers">
                              {{ d.barcode }}
                          </li>                        
                      </div> 
            <div style="width:100%; height:1px; clear:both;"></div>
        </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'
  import _ from 'lodash';
  
  
  export default{
  
    data(){
        return{
        currentArchiveBox: {},
        currentDossier: {},
        dossiers: [],
        checkedDossiers: [],
        addedDossiers: [],
        messege: '',
        'api': 'http://127.0.0.1:8000/api/',
        'archiveBox': {
            'barcode':'',
            'status':'Under checking',
            'current_sector':'2',
            "storage_address":"",
        },
        'dossier':{
            'barcode':'',
            'current_sector':'2',
            'status':'',
            'archive_box':'',
        },
        'errArray': [],
        }
    },
  
    methods: {
  
    openArchiveBox(){
        axios.patch(this.api + 'logistics/checking/' + this.archiveBox.barcode + '/', this.archiveBox).then(
            response =>{
                console.log(response.data)
                this.currentArchiveBox = response.data
                this.dossiers = response.data.dossiers
                this.dossier.archive_box = this.currentArchiveBox
                this.currentDossier = {}
                this.checkedDossiers = []
                this.errArray = []
            }
        ).catch(error =>{
          if (error.response) {
        console.log(error.response.data);
        this.errArray = error.response.data;
        this.currentArchiveBox = {};
        this.dossiers = [];
      }
    }
    )
  
    },
  
    closeArchiveBox(){
        if (this.dossiers.length == 0){
        this.currentArchiveBox.status = 'Is checked'
        axios.patch(this.api + 'logistics/checking/' + this.currentArchiveBox.barcode + '/', this.currentArchiveBox).then(
            response =>{
                console.log(response.data)
                this.checkedDossiers = []
                this.currentArchiveBox = {}
                this.currentDossier = {}
                this.archiveBox.barcode = ""
            }
        ).catch(error =>{
            console.log(error)
        })
  
      } else {
        this.messege = 'You have unchecked dossiers in the box. Do you want to break the checking?'
      }
    },

    closeArchiveBoxWithAError(){
        this.currentArchiveBox.status = 'Checked with a error'
        axios.patch(this.api + 'logistics/checking/' + this.currentArchiveBox.barcode + '/', this.currentArchiveBox).then(
            response =>{
                console.log(response.data)
                this.checkedDossiers = []
                this.currentArchiveBox = {}
                this.currentDossier = {}
                this.archiveBox.barcode = ""
            }
        ).catch(error =>{
            console.log(error)
        })
  
      
    },
    breakChecking(){
        for (let i = 0; i < this.dossiers.length; i++ ){
            let dossier = this.dossiers[i];
            dossier.archive_box = null;
            dossier.status = 'Not found while checking';
            axios.patch(this.api + 'logistics/checking/dossier/' + dossier.barcode + '/', dossier).then(
            response =>{
                console.log(response.data)
            }
        ).catch(error =>{
            console.log(error)
        });
        }
        this.dossiers = [];
        this.messege = '';
        this.closeArchiveBoxWithAError()
    },

    continueChecking(){
        this.messege = '';
    },

    isBarcodePresent(jsonData, barcodeToCheck) {
      return jsonData.some(obj => obj.barcode === barcodeToCheck);
      },
    
    moveToDestination(dossier, sourceArray, destinationArray) {
      const index = sourceArray.findIndex(i => i.barcode === dossier.barcode);
      sourceArray.splice(index, 1);
      destinationArray.push(dossier);
    },
    autoClose(){
        if(this.dossiers.length == 0){
            this.closeArchiveBox()
        }
    },
    checkDossier(){
        this.currentDossier = _.cloneDeep(this.dossier);
        if (
          !this.isBarcodePresent(this.dossiers, this.currentDossier.barcode) &&
          !this.isBarcodePresent(this.checkedDossiers, this.currentDossier.barcode)
            ){
                axios.get(this.api + 'logistics/checking/dossier/'+  this.dossier.barcode + '/').then(
                    response =>{
                        console.log(response.data)
                        this.currentDossier = response.data;
                        this.currentDossier.archive_box = this.currentArchiveBox.id;
                        this.currentDossier.status = 'Checked in a box';
                        axios.patch(this.api + 'logistics/checking/dossier/' +  this.currentDossier.barcode + '/', this.currentDossier).then(
                        response =>{
                            console.log(response.data)
                            this.addedDossiers.push(this.currentDossier);
                            this.checkedDossiers.push(this.currentDossier);
                            this.errArray = [];
                        }).catch(error =>{
                                if (error.response) {
                                    console.log(error.response.data);
                                    this.errArray = error.response.data;
                                    }
                                    }
                                )                   

                             
                        }).catch(error =>{
                    if (error.response) {
                        console.log(error.response.data);
                        this.errArray = error.response.data;
                    } 
                 }
            )
      } else if (
          this.isBarcodePresent(this.dossiers, this.currentDossier.barcode) &&
          !this.isBarcodePresent(this.checkedDossiers, this.currentDossier.barcode)
            ){
                this.currentDossier.archive_box = this.currentArchiveBox.id;
                this.currentDossier.status = 'Checked in a box';
                axios.patch(this.api + 'logistics/checking/dossier/' +  this.currentDossier.barcode + '/', this.currentDossier).then(
                response =>{
                    console.log(response.data);
                    this.moveToDestination(this.currentDossier, this.dossiers, this.checkedDossiers)
                    this.errArray = [];
                    this.dossier.barcode = '';
                    this.autoClose()
                }
            ).catch(error =>{
                if (error.response) {
                    console.log(error.response.data);
                    this.errArray = error.response.data;
                    }
                    }
                  )
                }  
            }
        }
  }
  </script>