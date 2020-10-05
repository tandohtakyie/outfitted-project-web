<template>
  <div class="appContainer">
    <div id="app" class="mainContainer">
      <Header></Header>
      <h1>Employee List</h1>
      <employer-form :employees="employees" @add:employee="createEmployee"/>
      <admin-panel :employees="employees"
                   @delete:employee="deleteEmployee"
                   @edit:employee="editEmployee"
      />
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import AdminPanel from '@/components/AdminPanel.vue'
import EmployerForm from '@/components/EmployerForm.vue'
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    AdminPanel,
    EmployerForm,
  },
  data() {
    return {
      employees: [
        {
          id: 1,
          name: 'Test account',
          email: 'test.account@outfited.com'
        },
      ],
    }
  },

  mounted() {
    this.getAllEmployees()
  },

  methods: {
    async getAllEmployees() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        this.employees = data
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