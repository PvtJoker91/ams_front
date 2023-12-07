<template>
    <div>
      <h2 class="alert alert-danger mt-2">Detail Dossier View</h2>
      <p>Dossier ID: {{ dossier.id }}</p>
      <p>Last Name: {{ dossier.contract.client.last_name }}</p>
      <p>Name: {{ dossier.contract.client.name }}</p>
      <!-- Другие поля и информация о досье... -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        'api': 'http://127.0.0.1:8000/api/',
        'dossier':{
        'id':'',
        'barcode':'',
        'contract':{
            'id':'',
            'contract_number':'',
            'time_create':'',
            'client':{
                'id':'',
                'last_name':'',
                'name':'',
                'middle_name':'',
                'passport':'',
                'birthday':'',
            },
            'product':{
                'id':'',
                'name':''
            }

        },
    },
      };
    },
    // Жизненный цикл компонента
    async beforeRouteEnter(to, from, next) {
      try {
        // Выполняем запрос к API с использованием Axios
        const response = await axios.get(`http://127.0.0.1:8000/api/units/dossier/${to.params.dossierId}/`);
        const dossier = response.data;
  
        // Передаем данные в следующий хук
        next(vm => {
          vm.dossier = dossier;
        });
      } catch (error) {
        console.log(error);
        // Можно также редиректнуть на страницу ошибки или обработать иначе
        next('/');
      }
    },
    // Другие хуки и определения компонента...
  };
  </script>