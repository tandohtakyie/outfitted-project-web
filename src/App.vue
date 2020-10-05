<template>
  <div id="main-app">
    <navigationbar></navigationbar>
    <router-view></router-view>
  </div>
</template>

<script>

import firebase from "firebase";
import Navigationbar from "@/components/Navigationbar";
export default {
  name: 'app',
  components: {
    Navigationbar
  },
  data() {
    return {

      employees: [

      ],
    }
  },

  mounted() {
    this.getAllEmployees()
  },

  methods: {
    async getAllEmployees() {
      try {
        var db = firebase.firestore();
        const accounts = db.collection('accounts');
        const snapshot = await accounts.get();
        snapshot.forEach(doc => {
          this.employees = [...this.employees, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },

    async createEmployee(employee) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(employee),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        const data = await response.json()
        this.employees = [...this.employees, data]
      } catch (error) {
        console.error(error)
      }
    },
    async deleteEmployee(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: "DELETE"
        });
        this.employees = this.employees.filter(employee => employee.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async editEmployee(id, updatedEmployee) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedEmployee),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        const data = await response.json()
        this.employees = this.employees.map(employee => (employee.id === id ? data : employee))
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
@import "assets/main.css";
</style>