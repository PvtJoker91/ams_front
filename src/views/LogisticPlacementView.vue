<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Placement</h2>
      <div class="container-fluid">
          <div>
              <form @submit.prevent="barcodeAddressDictMaker(insertForm)">
                  <label class="form-label float-left ml-2">Enter archive box</label>
                  <input type="text" class="form-control" v-model="insertForm">
                  <button type="submit" class="btn btn-primary float-left ml-2">Разместить</button>                             
              </form>
              {{barcodeAddressDict}}
              {{archiveBox}}
          </div>
      </div>
  </div>

</template>


<script>
import axios from 'axios'

export default{

  data(){
      return{
      insertForm: '',
      barcodeAddressDict: {},
      'api': 'http://127.0.0.1:8000/api/',
      'archiveBox': {
          'barcode':'',
          'current_sector':'2',
          'status':'Storage',
          'storage_address':{
              'shelf_code': ''
              }
      },
      }
  },

  methods: {

  barcodeAddressDictMaker(string){
    const result = {};
    const listBarcodeAddress = string.split(" ");
    let curShelf = listBarcodeAddress[0];
    let curBox = listBarcodeAddress[1];
    let i = 1;

    while (i < listBarcodeAddress.length - 1) {
        if (curBox !== curShelf) {
            result[curBox] = curShelf;
            curBox = listBarcodeAddress[i + 1];
        } else {
            curShelf = listBarcodeAddress[i + 1];
            curBox = listBarcodeAddress[i + 2];
        }
        i += 1;
    }

    this.barcodeAddressDict = result;
    this.placeArchiveBox(this.barcodeAddressDict);
},


placeArchiveBox(dict){
    
    for (const [box, shelf] of Object.entries(dict)) {
      this.archiveBox.barcode = box;
      this.archiveBox.storage_address.shelf_code = shelf;
      axios.patch(this.api + 'logistic/ab/' + this.archiveBox.barcode + '/', this.archiveBox).then(
          response =>{
              console.log(response.data)
          }
      ).catch(error =>{
          console.log(error)
      })
    }
  },
  }

}
</script>