<template>
    <div>
      <h1>Enter Your Information</h1>
      <form @submit.prevent="submitForm">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" />
  
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="age" />
  
        <label for="gender">Gender:</label>
        <select v-model="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        age: '',
        gender: 'Male'
      };
    },
    methods: {
      submitForm() {
        // Passing data to another page via query params or via Vuex, etc.
        this.$router.push({
          name: 'ResultPage',
          query: { name: this.name, age: this.age, gender: this.gender }
        });
      }
    }
  };
  </script>
  