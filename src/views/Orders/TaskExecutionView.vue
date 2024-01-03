<template>
  <div class="space-y-3">
    <h2 class="text-3xl font-bold mb-4">Execute task</h2>

      <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="p-1 bg-white  rounded-lg">
              <form @submit.prevent="findDossierTasks()" class="flex items-center">
                  <label class="form-label mr-2">Enter dossier barcode</label>
                  <input type="text" class="form-control border border-gray-300 rounded-lg px-2 py-1" v-model="dossier.barcode">
                  <span class="danger">{{ errArray['status_error'] ? errArray['status_error'].toString() : '' }}</span>
                  <span class="danger">{{ errArray['non_field_errors'] ? errArray['non_field_errors'].toString() : '' }}</span>
                  <span id='err' class="danger"></span>
              </form>
          </div>     
      </div>

      <!-- Tasks Lists -->

      <div v-if="filteredTasks.length !== 0 && !showForm" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Order
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Service
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Barcode
                    </th>
                    <th scope="col" class="px-6 py-3">
                            Deadline
                    </th>
                    <th scope="col" class="px-6 py-3">
                            Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Details</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in filteredTasks" :key="task.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ task.order.id }}
                    </th>
                    <td class="px-6 py-3">
                      {{ task.order.service }}
                    </td>
                    <td class="px-6 py-3">
                      {{ task.dossier }}
                    </td>
                    <td class="px-6 py-3">
                      {{ task.deadline }}
                    </td>
                    <td class="px-6 py-3">
                      {{ task.task_status }}
                    </td>
                    <td class="px-6 py-3 text-right">
                      <button @click="showForm=true" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
                        Execute
                      </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="showForm">

      <button @click="showForm=false">
        Back
      </button>

    </div>
  </div>
</template>



<script>
import axios from 'axios'


export default{

data(){
    return{
    tasks: [],
    showForm:false,
    'dossier':{
        'barcode':'',
    },
    'errArray': [],
    }
},

computed: {
    filteredTasks() {
      return this.tasks.filter(task => task.task_status !== 'on_selection');
    },
  },

methods: {

  findDossierTasks(){
    axios.get('/api/orders/tasks/?dossier__barcode=' + this.dossier.barcode).then(
        response =>{
            console.log(response.data)
            this.tasks = response.data.results
            this.errArray = []
        }
    ).catch(error =>{
      if (error.response) {
    console.log(error.response.data);
    this.errArray = error.response.data;
      }
    } 
  )
  },
}
}
</script> 