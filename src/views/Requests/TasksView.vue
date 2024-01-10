<template>
  <h2 class="text-3xl font-bold mb-8">Tasks</h2>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                      <div class="flex items-center">
                          Deadline
                          <button @click="loadTasks(ordering='?ordering=-deadline')"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></button>
                      </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                      <div class="flex items-center">
                          Status
                          <button @click="loadTasks(ordering='?ordering=-status')"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></button>
                      </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Details</span>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="task in tasks" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                  <RouterLink :to="{name: 'requestDetail', params:{'id': task.request.id}}" target="_blank" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                     Details
                  </RouterLink>
                </td>
              </tr>
          </tbody>
      </table>
      <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-3 mb-3 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">{{paginationInfo.totatTasks}}</span></span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mr-3 mb-3">
              <li v-if="paginationInfo.currentPage>1">
                  <button  @click="loadPreviousPage" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
              </li>
              <li v-if="paginationInfo.currentPage>3">
                  <button  @click="loadRequestedPage(1)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</button>
              </li>
              
              
          
              <li v-if="paginationInfo.totalPages>1" v-for="index in generatePagesRange(paginationInfo.currentPage, paginationInfo.totalPages, 2)">
                  <button  @click="loadRequestedPage(index + 1)" 
                  :class="{
                    'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white':index+1==paginationInfo.currentPage,
                    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':index+1!==paginationInfo.currentPage
                    
                  }">{{index + 1}}</button>
              </li>
              <li v-if="paginationInfo.currentPage<paginationInfo.totalPages-2">
                  <button  @click="loadRequestedPage(paginationInfo.totalPages)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{paginationInfo.totalPages}}</button>
              </li>
              <li v-if="paginationInfo.currentPage<paginationInfo.totalPages">
                  <button  @click="loadNextPage" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
              </li>
          </ul>
      </nav>
  </div>
  
  </template>
  
  
  <script>
  import axios from 'axios'
  import { useUserStore } from '@/stores/user'
  
  export default{
    setup() {
          const userStore = useUserStore()
  
          return {
              userStore
          }
      },
    data(){
        return{
        tasks: [],
        pageUrl: '/api/requests/tasks/',
        paginationInfo: {
          currentPage:null,
          totatTasks:null,
          totalPages:null,
        },
        ordering:null
        }
    },
    mounted() {
      this.loadTasks();
    },
  
    methods: {
     loadTasks(ordering=null){
      if(ordering){
        this.ordering = ordering
        this.pageUrl = '/api/requests/tasks/' + ordering
      }
      axios.get(this.pageUrl).then(
        response =>{
          console.log(response.data)
          this.tasks = response.data.results;
          this.paginationInfo = {
            currentPage: response.data.current_page,
            totalPages: response.data.pages,
            totatTasks: response.data.count
          };
          this.pageUrl = response.data.next;
          } 
          ).catch(error =>{
                if (error.response) {
                  console.log(error.response.data)
                }
                })
      },
      loadNextPage() {
        const nextPage = parseInt(this.paginationInfo.currentPage) + 1;
        this.pageUrl = "/api/requests/tasks/?page=" + nextPage;
        if(this.ordering){
          this.pageUrl = "/api/requests/tasks/" + this.ordering + "&page=" + nextPage;
        }
        this.loadTasks();
      },
      loadPreviousPage() {
        const previousPage = parseInt(this.paginationInfo.currentPage) - 1;
        this.pageUrl = "/api/requests/tasks/?page=" + previousPage;
        if(this.ordering){
          this.pageUrl = "/api/requests/tasks/" + this.ordering + "&page=" + previousPage;
        }
        this.loadTasks();
      },
  
      loadRequestedPage(page) {
        this.pageUrl = "/api/requests/tasks/?page=" + page;
        if(this.ordering){
          this.pageUrl = "/api/requests/tasks/" + this.ordering + "&page=" + page;
        }
        this.loadTasks();
    
      },
      generatePagesRange(currentPage, totalPages, gap) {
        const range = [];
        currentPage = parseInt(currentPage)
        let start = Math.max(0, currentPage - gap - 1);
        let end = Math.min(currentPage + gap, totalPages);
        for (let i = start; i <= end - 1; i++) {
          range.push(i);
        }
        return range;
      },
    }
  
  }
  </script> 
  
    