<template>
    <div>
      <h1>Data Grid Example</h1>
      <DataGrid
        :jsonUrl="'https://dummyjson.com/c/367d-e938-4b1d-aa47'"
        :columns="columns"
        :summaryColumns="summaryColumns"
        :lookup-data-source="lookupDataSourceConfig"
      />
    </div>
    <ResultPage/>
  </template>
  
  <script>
  import DataGrid from '../components/datagrid-component.vue'; // assuming DataGrid is in the components folder
  import ResultPage from '@/views/ResultPage.vue';
  
  export default {
    components: {
      DataGrid,
      ResultPage
    },
    data() {
        return {
          columns: [
            { field: 'CompanyName', caption: 'Company Name'},
            { field: 'Address', caption: 'Address' },
            { field: 'City', caption: 'City', sortOrder: 'asc' },
            { field: 'State', caption: 'State' },
            { field: 'Zipcode', caption: 'Zip Code' },
            { field: 'Phone', caption: 'Phone' },
            { field: 'Fax', caption: 'Fax' },
            { field: 'Website', caption: 'Website' },
          ],
          summaryColumns: [
            { field: 'State', summaryType: 'count' },
            { field: 'City', summaryType: 'count' },
          ],
          // Define the lookup data source for the City field
            lookupDataSourceConfig: [
            { id: 1, name: 'Richfield' },
            { id: 2, name: 'Naperville' },
            { id: 3, name: 'Dallas' },
            { id: 4, name: 'Mooresville' },
            { id: 5, name: 'Cupertino' },
            { id: 6, name: 'Camp Hill' },
            { id: 7, name: 'Warner Robbins' },
            { id: 8, name: 'Arcadia' },
            { id: 9, name: 'Compton' },
            { id: 10, name: 'Seattle' },
            { id: 11, name: 'Los Angeles' },
            { id: 12, name: 'El Segundo' },
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
  