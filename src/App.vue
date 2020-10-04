<template>
  <div id="app" class="small-container">
    <h1>Employee List</h1>
    <employer-form :employees="employees" @add:employee="createEmployee"/>
    <admin-panel :employees="employees"
                 @delete:employee="deleteEmployee"
                 @edit:employee="editEmployee"
/>
  </div>
</template>

<script>
import AdminPanel from '@/components/AdminPanel.vue'
import EmployerForm from '@/components/EmployerForm.vue'
import firebase from "firebase";
export default {
  name: 'app',
  components: {
    AdminPanel,
    EmployerForm,
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
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 600px;
}
</style>