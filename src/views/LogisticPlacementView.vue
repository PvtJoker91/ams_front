<template>
  <div class="container-fluid"> 
      <h2 class="alert alert-danger mt-2">Placement</h2>
      <div class="container-fluid">
          <div>
            <p>Enter archive box</p>
              <form id="ab" @submit.prevent="barcodeAddressDictMaker(insertForm)">
                  <textarea autofocus rows="20" cols="30" v-model="insertForm"
                  placeholder=
"Insert shelf barcode then 
archive boxes barcodes 
then again shelf barcode 
each on new string 
Example:
10.00.00.-A.00.01
AB-00-000001
AB-00-000002
AB-00-000003
10.00.00.-A.00.01
10.00.00.-A.00.02
AB-00-000004
AB-00-000005
AB-00-000006
10.00.00.-A.00.02"></textarea>
                  <p><button type="submit" class="btn btn-primary float-left ml-2">Place for storage</button></p>                                     
              </form>
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
      "archiveBox": {
          "barcode":"",
          "current_sector":"2",
          "status":"Storage",
          "storage_address":{
                "shelf_code": ""
              }
      },
      }
  },

  methods: {

  barcodeAddressDictMaker(string){
    const result = {};
    const listBarcodeAddress = string.split("\n");
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
    if (result){this.placeArchiveBox(this.barcodeAddressDict)};
    
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