<template>
<div>
    <employer-form :employees="employees" type="add" @add:employee="createEmployee"/>
      <employer-panel :employees="employees"
                   @delete:employee="deleteEmployee"
                   @edit:employee="editEmployee"
      />
</div>
</template>

<script>
import EmployerPanel from '@/components/Employees/EmployerPanel.vue'
import EmployerForm from '@/components/Employees/EmployerForm.vue'
import firebase from "firebase";

export default {
  name: 'employeeComponent',
  components: {
    EmployerPanel,
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
    async getOneEmployee(id){
        var db = firebase.firestore();
        var emp = db.collection('accounts').doc(id);
        var doc = await emp.get();
        if (!doc.exists) {
          console.log('No such document!');
          return null;

        } else {
          console.log('Document data:', doc.data());
          return doc.data();
        }
    },
    //caution: This signs you out and logs you in as newly made user
    async createEmployee(employee) {
    var db = firebase.firestore();
    try {
      //register with email and password
      firebase.auth().createUserWithEmailAndPassword(employee.email, employee.password)
        .then((user) => {
          //get registered uid
          //use id in firebase
          console.log(user);
          delete employee.password;
          employee.uid = user.user.uid;
          db.collection('accounts').add(employee)
            .then((empReturn) => {
              console.log(empReturn);
              var fstoreID = empReturn.id;
              console.log(fstoreID);
              employee.id = fstoreID;
              db.collection('accounts').doc(fstoreID).update(employee);
          this.employees = [...this.employees, employee];
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
            });



        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
        }catch (error) {console.log(error)}
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
        //var oldEmp = getOneEmployee(id);
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