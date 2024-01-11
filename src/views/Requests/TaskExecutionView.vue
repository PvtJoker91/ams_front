<template>
  <div class="space-y-3">
    <h2 class="text-3xl font-bold mb-4">Execute task</h2>

      <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="p-1 bg-white  rounded-lg">
              <form @submit.prevent="findDossierTasks()" class="flex items-center">
                  <label class="form-label mr-2">Enter dossier barcode</label>
                  <input type="text" class="form-control border border-gray-300 rounded-lg px-2 py-1" v-model="dossierBarcode" required>
                  <span class="danger">{{ errArray['status_error'] ? errArray['status_error'].toString() : '' }}</span>
                  <span class="danger">{{ errArray['detail'] ? errArray['detail'].toString() : '' }}</span>
                  <span id='err' class="danger"></span>
                  <span v-if="messege" class="danger">{{ messege }}</span>
              </form>
          </div>     
      </div>

      <!-- Tasks Lists -->

      <div v-if="tasks.length!=0 && !showForm" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Request
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
                <tr v-for="task in tasks" :key="task.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ task.request.id }}
                    </th>
                    <td class="px-6 py-3">
                      {{ task.request.service }}
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
                      <button v-if="task.request.service=='full_scanning' || task.request.service=='scanning_by_documents'"
                      @click="getScans(task)" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
                        Execute
                      </button>
                      <button v-if="task.request.service=='temporary_issuance' || task.request.service=='unrecoverable_issuance'"
                      @click="addDossierToRegistry(task, 'rc')" class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500">
                        Add to registry
                      </button>
                      <button v-if="!closeTaskForm" @click="closeTaskForm=true, currentTask=task" class="rounded-md bg-red-600 px-3 py-2 ml-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500">
                              Close
                      </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="closeTaskForm" class="mt-3 ml-3 flex flex-col">
          <form @submit.prevent="closeTask(currentTask, 'rejected')" class="w-full">
            <div>
              <label for="commentary" class="text-s">Input closing reason dossier {{ currentTask.dossier }} from request {{ currentTask.request.id }}:</label>
              <input id="commentary" v-model="commentary" class="ml-5" required>
            </div>
              
            <div class="mt-5">  
              <button type="submit" class="float-left ml-2 mb-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                  Close task
              </button>
              <button @click="closeTaskForm=false, commentary=''" class="float-left ml-2 mb-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Cancel
              </button>
            </div>
          </form>
        </div>
    </div>
    <div v-if="showForm" class="relative overflow-x-auto shadow-md sm:rounded-lg">

    <div class="flex flex-col">
      <div class="mt-1 ml-1">
        <button @click="showForm=false" class="float-left ml-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            Back
        </button>
        <button @click="uploadForm=true" v-if="!uploadForm" class="float-left ml-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400">
            Add scan
        </button>
      </div>
      <div class="flex">
        <div class=" mt-3 ml-3 mb-8 mr-12">
            <h2 class="text-xl font-bold mb-4">Request description</h2>
            <p>{{ currentTask.request.description }}</p>
        </div>

        
        <div v-if="!closeTaskForm2" class="mt-3 ml-3">
          <button @click="closeTaskForm2=true" class="float-left ml-2 rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
            Close task
          </button>
        </div>


        <div v-if="closeTaskForm2" class="mt-3 ml-3 flex flex-col">
          <form @submit.prevent="closeTask(currentTask, 'completed')" class="w-full">
            <div>
              <label for="commentary" class="text-l font-bold">Closing reason:</label>
              <input id="commentary" v-model="commentary" class="ml-5" required>
            </div>
              
            <div class="mt-5">  
              <button type="submit" class="float-left ml-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                  Close task
              </button>
              <button @click="closeTaskForm2=false, commentary=''" class="float-left ml-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="flex ml-3">

        <div class="w-1/3 mr-1 ml-1 mt-5 mb-12">
            <h2 class="text-l font-bold">Added scans:</h2>
            <ul>
                <li v-for="scan in scans" :key="scan.id">
                    <a :href="scan.file" target="_blank" class="text-blue-500 hover:text-blue-700">{{ scan.name }}</a>
                </li>
            </ul>
        </div>

        <div v-if="uploadForm" class="w-2/3 mr-1 ml-1 mt-5">
            <form @submit.prevent="uploadScan" class="w-full">
                <label for="fileInput" class="float-left ml-2 rounded-md bg-orange-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
                    Choose file
                </label>
                <input type="file" id="fileInput" @change="handleFileChange" class="hidden" />
                <span class="ml-2">{{ scan.file.name }}</span>
                <div class="mt-2">
                    <label for="fileName">Имя:</label>
                    <input type="text" id="fileName" v-model="scan.fileName" required class="w-full rounded-md border px-3 py-2" />
                </div>
                <div class="mt-2 mb-4">
                    <label for="fileDescription">Описание:</label>
                    <input type="text" id="fileDescription" v-model="scan.fileDescription" class="w-full rounded-md border px-3 py-2" />
                </div>
                <button type="submit" v-if="scan.file" class="float-right mt-3 mr-3 mb-3 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400">
                    Upload
                </button>
            </form>
        </div>
    </div>
  </div>
  </div>
</template>



<script>
import axios from 'axios'
import { useUserStore } from '@/stores/user'


export default{
  setup() {
            const userStore = useUserStore()
            return {
                userStore,
            }
          },

  data(){
      return{
      tasks: [],
      scans: [],
      currentTask:{},
      showForm:false,
      closeTaskForm:false,
      closeTaskForm2:false,
      uploadForm:false,
      dossierBarcode:'',
      messege:'',
      commentary:'',
      scan:{
        'file':'',
        'fileName':'',
        'fileDescription':''
      },

      'errArray': [],
      }
  },


  methods: {

    findDossierTasks(){
      this.tasks = [];
      this.messege = '';
      this.showForm = false;
      this.currentTask = '';
      axios.get('/api/requests/execute-tasks/?dossier_barcode=' + this.dossierBarcode).then(
          response =>{
              console.log(response.data)
              this.tasks = response.data
              this.errArray = []
              if(this.tasks.length == 0){
                this.messege = 'There are no active tasks for this dossier'
              }
          }
      ).catch(error =>{
        if (error.response) {
      console.log(error.response.data);
      this.errArray = error.response.data;
        }
      } 
    )
    },

    getScans(task) {
      this.currentTask = task;
      axios.get('/api/units/scans/?dossier=' + this.dossierBarcode)
        .then(response => {
          console.log(response.data)
          this.scans = response.data;
          this.showForm = true;
          this.uploadForm = false;
          this.scan = {
                        'file':'',
                        'fileName':'',
                        'fileDescription':''
                      };
        })
        .catch(error => {
          console.error('Error fetching scans:', error);
        });
    },

    handleFileChange(event) {
      this.scan.file = event.target.files[0];
    },

    uploadScan() {
      const formData = new FormData();
      formData.append('dossier', this.dossierBarcode);
      formData.append('file', this.scan.file);
      formData.append('name', this.scan.fileName);
      formData.append('description', this.scan.fileDescription);

      axios.post(`/api/units/scans/`, formData)
        .then(response => {
          console.log('Scan uploaded successfully');
          this.getScans(this.currentTask)
        })
        .catch(error => {
          console.error('Error uploading scan:', error);
        });
    },

    addDossierToRegistry(taskToRegistry, registryType){
      let registry = {
        'type':registryType,
        'status':'creation',
        'sender':this.userStore.user.id
      }
      axios.post(`/api/units/registry/?task_id=${taskToRegistry.id}`, registry
                  ).then(response =>{
                          console.log(response.data);
                          this.tasks = this.tasks.filter(task =>(task != taskToRegistry));
                          
                          }         
              ).catch(error =>{
                  console.log(error)
              }
          );

    },

    closeTask(taskToClose, status){
      axios.patch('/api/requests/tasks/'+ taskToClose.id + '/',
              {
              task_status:status,
              executor:this.userStore.user.id,
              commentary:this.commentary,
              }
                  ).then(response =>{
                          console.log(response.data);
                          this.closeTaskForm = false;
                          this.closeTaskForm2 = false;
                          this.showForm = false;
                          this.currentTask = {};
                          this.tasks = this.tasks.filter(task =>(task != taskToClose));
                          this.addDossierToRegistry(taskToClose, 'rl')
                          
                          }         
              ).catch(error =>{
                  console.log(error)
              }
          );
      this.commentary = '';
    
  },

  },

}
</script> 