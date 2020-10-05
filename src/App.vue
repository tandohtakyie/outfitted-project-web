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
      console.log(employee);
          var db = firebase.firestore();
            try {
              await db.collection('accounts').doc(employee.name).set(employee);
              this.employees = [...this.employees, employee]
            } catch (error) {
              console.error(error)
            }
    },
    async deleteEmployee(id) {
    console.log(id);
    var db = firebase.firestore();
      try {
        await db.collection('accounts').doc(id).delete();
        this.employees = this.employees.filter(employee => employee.name !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async editEmployee(id, updatedEmployee) {
    console.log(id);
    var db = firebase.firestore();
      try {
            await db.collection('accounts').doc(id).set(updatedEmployee);
            this.employees = this.employees.map(employee => (employee.id === id, employee));
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