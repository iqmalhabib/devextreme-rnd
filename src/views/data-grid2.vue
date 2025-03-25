<template>
    <div>
      <h1>Data Grid Example</h1>
      <DataGrid
        :jsonUrl="'https://dummyjson.com/c/0e7c-5bfd-4519-ae06'"
        :columns="columns"
        :summaryColumns="summaryColumns"
      />
    </div>
    <FormPage/>

  </template>
  
  <script>
  import DataGrid from '../components/datagrid-component.vue'; // assuming DataGrid is in the components folder
  import FormPage from '@/views/FormPage.vue';
  
  export default {
    components: {
      DataGrid,
      FormPage
    },
    data() {
              return {
                columns: [
          { field: 'name', caption: 'Name' },
          { field: 'language', caption: 'Language' },
          { field: 'id', caption: 'ID' },
          { field: 'bio', caption: 'Bio' },
          { field: 'version', caption: 'Version' }
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>
  