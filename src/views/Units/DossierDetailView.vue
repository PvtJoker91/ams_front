<template>
  <div v-if="!showCard" class="bg-white border border-gray-200 rounded-lg flex items-center justify-center h-80">
      <form @submit.prevent="unitSearch">
          <label class="block mb-2 text-xl font-bold">Для просмотра информации о единице хранения</label><br>
          <label>Введите штрих-код досье или архивного бокса</label><br>
          <input type="text" v-model="barcode" placeholder="Штрих-код ЕХ" class="w-full mt-10 py-2 px-6 border border-gray-200 rounded-lg">
          <span class="danger">{{ errArray['non_field_errors'] ? errArray['non_field_errors'].toString() : '' }}</span>
          <span class="danger">{{ errArray['detail'] ? errArray['detail'].toString() : '' }}</span>
          <span id="err" class="danger"></span>
      </form>
  </div>



  <div v-if="showCard">
    <div class="flex items-center">
      <button class="mb-6 mr-6 rounded-md bg-purple-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-purple-500" 
          @click="showCard=false">Назад
      </button>
      <h2 class="text-2xl font-bold mb-8">Карточка досье {{dossier.barcode}}</h2>
    </div>

    <div class="p-8 bg-white rounded-lg">
      <div class="flex items-center">
          <button class="mr-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" 
              @click="showHistory=false">Информация о досье
          </button>
          <button class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" 
              @click="showHistory=true">История досье
          </button>
      </div>

      <div v-if="!showHistory" class="flex mt-3" >
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-4">Информация о хранении:</h2>
              <div class="container mx-auto grid grid-cols-2 gap-4 mb-6 mt-2">
                  <div>
                      <b class="block">Статус: </b>
                      <span class="block">{{ dossier.status }}</span>
                  </div>
                  <div>
                      <b class="block">Архивный бокс: </b>
                      <span v-if="dossier.archive_box!=null" class="block">{{ dossier.archive_box.barcode }}</span>
                  </div>
                  <div>
                      <b class="block">Сектор: </b>
                      <span class="block">{{ dossier.current_sector}}</span>
                  </div>
                  <div>
                      <b class="block">Расположение: </b>
                      <span class="block">{{ dossier.location}}</span>
                  </div>
              </div>
              <h2 class="text-xl font-bold mb-4">Информация о договоре:</h2>
              <div class="container mx-auto grid grid-cols-2 gap-4 mb-6 mt-2">

                  <div>
                      <b class="block">ФИО клиента: </b>
                      <span class="block">{{ dossier.contract.client.last_name }} {{ dossier.contract.client.first_name }} {{ dossier.contract.client.middle_name }}</span>
                  </div>
                  <div>
                      <b class="block">Тип продукта: </b>
                      <span class="block">{{ dossier.contract.product.name }}</span>
                  </div>
                  <div>
                      <b class="block">Номер договора: </b>
                      <span class="block">{{ dossier.contract.contract_number }}</span>
                  </div>
                  <div>
                      <b class="block">Дата заключения: </b>
                      <span class="block">{{ dossier.contract.time_create }}</span>
                  </div>
              </div>
              <h2 class="text-xl font-bold mb-4">Информация о регистрации:</h2>
              <div class="container mx-auto grid grid-cols-2 gap-4 mb-6 mt-2">
                  <div>
                      <b class="block">Дата регистрации: </b>
                      <span class="block">{{ dossier.registration_date }}</span>
                  </div>
                  <div>
                      <b class="block">Регистратор: </b>
                      <span class="block">{{ dossier.registerer }} {{ dossier.registerer}}</span>
                  </div>
              </div>
          </div>
        </div>
        <div v-if="showHistory">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        N
                    </th>

                    <th scope="col" class="px-6 py-3">
                        Дата
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Статус
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Архивный бокс
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Сотрудник
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="change, n in dossier.history" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ n+1 }}
                    </th>
                    <td class="px-6 py-3">
                      {{ change.timestamp }}
                    </td>
                    <td class="px-6 py-3">
                      {{change.status}}
                    </td>
                    <td class="px-6 py-3">
                      {{ change.archive_box }}
                    </td>
                    <td class="px-6 py-3">
                      {{ change.user_last_name }} {{ change.user_first_name }}
                    </td>
                </tr>
            </tbody>
        </table>

        </div>
      </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showCard:false,
        showHistory: false,
        barcode:'',
        errArray:[],  
        dossier:{
          'contract':{
              'client':{},
              'product':{}
            },
          'archive_box':{
            'barcode':''
          },
          'registerer':{
            'last_name':'',
            'first_name':'',
          },
        },
      }
    },



    methods: {
      unitSearch(){
        axios.get('/api/units/dossier/' + this.barcode + '/',
                    ).then(response =>{
                            console.log(response.data)
                            this.dossier = response.data;
                            this.showCard = true;
                            }         
                ).catch(error =>{
                    console.log(error)
                })
    }
      
    }
    
  };
  
  </script>