<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Completion</h2>
      <div class="container-fluid">
          <div>
              <form @submit.prevent="openArchiveBox()">
                  <label class="form-label float-left ml-2">Open archive box</label>
                  <input type="text" class="form-control" v-model="archiveBox.barcode">
                  <span class="danger">{{errArray['status_error']?errArray['status_error'].toString():''}}</span>
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
              <form id="dossierBarcodeForm" @submit.prevent="addOrRemoveDossier()">
                  <label class="form-label float-left ml-2">Enter barcode to add/remove dossier:</label>
                  <input type="text" class="form-control" v-model="dossier.barcode">
                  <span class="danger">{{errArray['dossier_status_error']?errArray['dossier_status_error'].toString():''}}</span>
                  <span class="danger">{{errArray['non_field_errors']?errArray['non_field_errors'].toString():''}}</span>
                  <span class="danger">{{errArray['validation_error']?errArray['validation_error'].toString():''}}</span>
                  <span id='err' class="danger"></span>                            
              </form>
          </div>
          <div style="width:100%; height:1px; clear:both;"></div>
                    <div id="line_block" v-if="Object(this.dossiers).length !==0">
                      <p>Dossiers in this AB: ({{dossiers.length}})</p>
                        <li v-for="d in dossiers">
                            {{ d.barcode }}
                        </li>
                      </div> 
                    <div id="line_block" v-if="Object(this.addedDossiers).length !==0 || Object(this.removedDossiers).length !==0">
                      <p>Added dossiers: ({{addedDossiers.length}})</p>
                        <li v-for="d in addedDossiers">
                            {{ d.barcode }}
                        </li>                        
                    </div> 
                    <div id="line_block" v-if="Object(this.addedDossiers).length !==0 || Object(this.removedDossiers).length !==0">
                      <p>Removed dossiers: ({{removedDossiers.length}})</p>
                        <li v-for="d in removedDossiers">
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
      addedDossiers: [],
      removedDossiers: [],
      'api': 'http://127.0.0.1:8000/api/',
      'archiveBox': {
          'barcode':'',
          'status':'Under completion',
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
      axios.post(this.api + 'logistics/completion/', this.archiveBox).then(
          response =>{
              console.log(response.data)
              this.currentArchiveBox = response.data
              this.dossiers = response.data.dossiers
              this.currentDossier = {}
              this.addedDossiers = []
              this.removedDossiers = []
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
    if (this.dossiers.length == 0 && this.addedDossiers.length == 0){
        axios.delete(this.api + 'logistics/completion/' + this.currentArchiveBox.barcode + '/').then(
            response =>{
                console.log(response.data)
                this.removedDossiers = []
                this.currentArchiveBox = {}
                this.currentDossier = {}
            }
        ).catch(error =>{
            console.log(error)
        })
  
      } else {
      this.currentArchiveBox.status = 'Is completed'
      axios.post(this.api + 'logistics/completion/', this.currentArchiveBox).then(
          response =>{
              console.log(response.data)
              this.dossiers = []
              this.addedDossiers = []
              this.removedDossiers = []
              this.currentArchiveBox = {}
              this.currentDossier = {}
          }
      ).catch(error =>{
          console.log(error)
      })
    }
    },

  isBarcodePresent(jsonData, barcodeToCheck) {
    return jsonData.some(obj => obj.barcode === barcodeToCheck);
    },

    
    moveToDestination(dossier, sourceArray, destinationArray) {
      const index = sourceArray.findIndex(i => i.barcode === dossier.barcode);
      sourceArray.splice(index, 1);
      destinationArray.push(dossier);
    },

  addOrRemoveDossier(){
      this.currentDossier = _.cloneDeep(this.dossier);
      if (
        !this.isBarcodePresent(this.dossiers, this.currentDossier.barcode) &&
        !this.isBarcodePresent(this.addedDossiers, this.currentDossier.barcode) &&
        !this.isBarcodePresent(this.removedDossiers, this.currentDossier.barcode)
        ){
            this.currentDossier.archive_box = this.currentArchiveBox.id;
            this.currentDossier.status = 'Added to a box';
            axios.patch(this.api + 'logistics/completion/dossier/' +  this.currentDossier.barcode + '/', this.currentDossier).then(
            response =>{
                console.log(response.data)
                this.addedDossiers.push(this.currentDossier);
                this.errArray = [];
            }
        ).catch(error =>{
            if (error.response) {
                console.log(error.response.data);
                this.errArray = error.response.data;
                }
            }
        )
    }  else if (this.isBarcodePresent(this.dossiers, this.currentDossier.barcode)){
        this.moveToDestination(this.currentDossier, this.dossiers, this.removedDossiers);
        this.currentDossier.archive_box = null;
        this.currentDossier.status = 'Removed from a box';
        console.log(this.currentDossier)


    } else if (this.isBarcodePresent(this.addedDossiers, this.currentDossier.barcode)){
        this.moveToDestination(this.currentDossier, this.addedDossiers, this.removedDossiers);
        this.currentDossier.archive_box = null;
        this.currentDossier.status = 'Removed from a box';
        console.log(this.currentDossier)

    } else if (this.isBarcodePresent(this.removedDossiers, this.currentDossier.barcode)){
        this.moveToDestination(this.currentDossier, this.removedDossiers, this.addedDossiers);
        this.currentDossier.archive_box = this.currentArchiveBox.id;
        this.currentDossier.status = 'Added to a box';
        console.log(this.currentDossier)
        
    } 
      axios.patch(this.api + 'logistics/completion/dossier/' +  this.currentDossier.barcode + '/', this.currentDossier).then(
          response =>{
              console.log(response.data)
          }
      ).catch(error =>{
          console.log(error)
      })
    },
  

}

}
</script>