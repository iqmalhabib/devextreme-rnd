<template>
    <div>
      <h1>Submitted Information</h1>
      <p>Name: {{ name }}</p>
      <p>Age: {{ age }}</p>
      <p>Gender: {{ gender }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        age: '',
        gender: ''
      };
    },
    created() {
      // Retrieve data from the query params
      this.name = this.$route.query.name;
      this.age = this.$route.query.age;
      this.gender = this.$route.query.gender;
    }
  };
  </script>
  