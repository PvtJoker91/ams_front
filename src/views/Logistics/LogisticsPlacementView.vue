<template>
  <div class="space-y-3"> 
      <h2 class="text-3xl font-bold mb-4">Placement</h2>
      <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div div class="p-1 bg-white  rounded-lg"> 
              <form @submit.prevent="barcodeAddressDictMaker(insertForm)" class="mb-8">
                  <textarea rows="20" cols="30" class="border border-gray-300 rounded-lg" v-model="insertForm"
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
                  <p><button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-lg mt-2">Place for storage</button></p>                                     
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
      "archiveBox": {
          "barcode":"",
          "current_sector":"2",
          "status":"Under storage",
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
      axios.patch('/api/logistics/placement/' + this.archiveBox.barcode + '/', this.archiveBox).then(
          response =>{
              console.log(response.data)
          }
      ).catch(error =>{
          console.log(error)
      })
    }
    this.insertForm = ''
  },
  }
  

}
</script>