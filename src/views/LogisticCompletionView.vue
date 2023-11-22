<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Completion</h2>
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
                  <label class="form-label float-left ml-2">Enter barcode to add/remove dossier:</label>
                  <input type="text" class="form-control" v-model="dossier.barcode">                             
              </form>
          </div>
          <div style="width:100%; height:1px; clear:both;"></div>
                    <div id="line_block" v-if="Object(this.dossiers).length !==0">
                      <p>Dossiers in this AB: ({{dossiers.length}})</p>
                        <li v-for="dossier in dossiers">
                            {{ dossier.barcode }}
                        </li>
                      </div> 
                    <div id="line_block" v-if="Object(this.addedDossiers).length !==0">
                      <p>Added dossiers: ({{addedDossiers.length}})</p>
                        <li v-for="dossier in dossiers">
                            {{ dossier.barcode }}
                        </li>                        
                    </div> 
                    <div id="line_block" v-if="Object(this.removedDossiers).length !==0">
                      <p>Removed dossiers: ({{removedDossiers.length}})</p>
                        <li v-for="dossier in dossiers">
                            {{ dossier.barcode }}
                        </li>
                    </div>  
          <div style="width:100%; height:1px; clear:both;"></div>
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
          'archive_box':'',
          'contract':'',
          'current_sector':'2',
          'status':'On completion',
      },
      'errArray': [],
      }
  },

  methods: {

  openArchiveBox(){
      axios.post(this.api + 'logistic/completion/', this.archiveBox).then(
          response =>{
              console.log(response.data)
              this.currentArchiveBox = response.data
              this.dossiers = response.data.dossiers
              this.currentDossier = {}
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
      this.currentArchiveBox.status = 'Is completed'
      axios.post(this.api + 'logistic/completion/', this.currentArchiveBox).then(
          response =>{
              console.log(response.data)
              this.dossiers = []
              this.currentArchiveBox = {}
              this.currentDossier = {}
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
              this.currentDossier.archive_box = this.currentArchiveBox.id
              this.contracts = []
              this.currentContract = {}
          } else(this.currentDossier = {})   
          }
      ).catch(error =>{
          console.log(error)
      })
  },

  addOrRemoveDossier(){
      this.currentDossier.status = 'Is registred'
      axios.post(this.api + 'registration/dossier/', this.currentDossier).then(
          response =>{
              console.log(response.data)
              this.openArchiveBox()
          }
      ).catch(error =>{
          console.log(error)
      })
  },
  

  }

}
</script>