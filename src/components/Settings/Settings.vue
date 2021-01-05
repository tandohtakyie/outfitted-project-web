<template>

  <div><h1>Settings</h1>
  <employer-form :employee="login" type="settings" @edit:employee="editEmployee"/>

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




  methods: {

    async editEmployee(id, updatedEmployee) {
            id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
          var db = firebase.firestore();
          try {
            firebase.auth().currentUser.updateEmail(updatedEmployee.email).then(function() {
                          }).catch(function(error) {
                          console.log(error);
                          });
            await db.collection('accounts').doc(id).update(updatedEmployee);
            this.employees = this.employees.map(employee => (employee.id === id, employee));
          } catch (error) {console.log(error)
          }
        }

    },
    data() {
    return {
            login: this.getLoggedEmployee(),
            test: {
                            name: 'neha',
                            email: '',
                            id: '',
                            password: '',
                            address:{
                              street: '',
                              city: '',
                              state: '',
                              postalCode: '',
                            }
                          },
        }
    }

}
</script>

<style scoped>

</style>