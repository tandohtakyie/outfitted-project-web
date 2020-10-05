<template>
<div>
    <employer-form :employees="employees" @add:employee="createEmployee"/>
      <admin-panel :employees="employees"
                   @delete:employee="deleteEmployee"
                   @edit:employee="editEmployee"
      />
</div>
</template>

<script>
import AdminPanel from '@/components/Employees/AdminPanel.vue'
import EmployerForm from '@/components/Employees/EmployerForm.vue'
import firebase from "firebase";

export default {
  name: 'crudComponent',
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

      const previousEmployeeId =
          this.employees.length > 0
              ? this.employees[this.employees.length - 1].id
              : 0;
      const newEmployeeId = previousEmployeeId + 1;
      const newEmployee = { ...employee, newEmployeeId };

      var db = firebase.firestore();
      try {
        await db.collection('accounts').doc(employee.name).set(newEmployee);
        this.employees = [...this.employees, newEmployee]
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

<style scoped>

</style>