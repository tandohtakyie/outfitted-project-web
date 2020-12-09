<template>
<div>
    <employer-form :employees="employees" type="add" @add:employee="createEmployee"/>
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
  name: 'employeeComponent',
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
      console.log(error)
      }
    },

    async createEmployee(employee) {

      //this.setNewEmployeeId(employee);
      var db = firebase.firestore();
      try {
        var empDB = await db.collection('accounts').add(employee);
        var id = empDB.id;
        employee.id = id;
        await empDB.update({id: id});
        this.employees = [...this.employees, employee]
      } catch (error) {console.log(error)
      }
    },
    async deleteEmployee(id) {
      var db = firebase.firestore();
      try {
        await db.collection('accounts').doc(id).delete();
        this.employees = this.employees.filter(employee => employee.id !== id);
      } catch (error) {console.log(error)
      }
    },
    async editEmployee(id, updatedEmployee) {
        id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
      var db = firebase.firestore();
      try {
        await db.collection('accounts').doc(id).update(updatedEmployee);
        this.employees = this.employees.map(employee => (employee.id === id, employee));
      } catch (error) {console.log(error)
      }
    },
    //Here, amount of objects is accessed to provide unique numeric id.
    //input: object Employee. Output: altered employee.id.
    setNewEmployeeId(employee){
       const previousEmployeeId =
          this.employees.length > 0
              ? this.employees[this.employees.length - 1].id
              : 0;
      employee.id = String(parseInt(previousEmployeeId)+1)
      //output is altered employee id
    },
  }
}
</script>

<style scoped>

</style>