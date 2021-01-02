<template>

  <div><h1>Settings</h1>
  <employer-form :employees="login" type="settings" @edit:employee="editEmployee"/>

  </div>

</template>

<script>
import EmployerForm from '@/components/Employees/EmployerForm.vue'
import firebase from "firebase";
export default {
name: "Home",
components: {
    EmployerForm,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },

mounted() {
    this.getLogin()
  },

  methods: {
    async getLogin() {
        console.log("login get");
    },
    async editEmployee(id, updatedEmployee) {
            id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
          var db = firebase.firestore();
          try {
            await db.collection('accounts').doc(id).update(updatedEmployee);
            this.employees = this.employees.map(employee => (employee.id === id, employee));
          } catch (error) {console.log(error)
          }
        }

    },
    data() {
    return {
            login: String,
        }
    }

}
</script>

<style scoped>

</style>