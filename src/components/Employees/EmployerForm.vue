<template>
  <div>
    <!-- Modal -->
    <b-modal id="addEmployeeModal"
             title="Add new employee"
             size="lg"
             scrollable
             header-bg-variant="dark"
             header-text-variant="light">
      
      <b-container fluid>
        <b-row class="mb-1">
          <b-col>
            <div id="employer-form">
              <form @submit.prevent="manageSubmit">
                <div class="form-group">
                  <label>Employee name</label>
                  <input class="employeeInput"
                      ref = "nameField"
                      v-model="employee.name"
                      type="text"
                      :class="{ 'has-error': submission && emptyName }"
                  />
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label>Employee email</label>
                    <input class="employeeInput"
                        ref = "emailField"
                        v-model="employee.email"
                          type="text"
                          :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                  <div class="form-group col" v-if="type !== 'settings'">
                    <label>Employee password</label>
                    <input class="employeeInput"
                           ref = "passwordField"
                           type = "password"
                           minlength="8" required
                           v-model="employee.password"
                           :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                </div>
                <div class="jumbotron row mt-3">
                  <div class="form-group">
                    <label>Street</label>
                    <input class="employeeInput"
                          ref = "streetField"
                          v-model="employee.address.street"
                          type="text"
                          :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                  <div class="form-group col">
                    <label>City</label>
                    <input class="employeeInput"
                          ref = "cityField"
                          v-model="employee.address.city"
                          type="text"
                          :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                  <div class="form-group col">
                    <label>State</label>
                    <input class="employeeInput"
                          ref = "stateField"
                          v-model="employee.address.state"
                          type="text"
                          :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                  <div class="form-group col">
                    <label>Postal code</label>
                    <input class="employeeInput"
                          ref = "postalCodeField"
                          v-model="employee.address.postalCode"
                          type="text"
                          :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
                    />
                  </div>
                </div>
              <p v-if="failure && submission && emptyField" class="failure-message">
                Please fill out the required fields ! </p>
              <p v-else-if="failure && submission && invalidEmail" class="failure-message">
                Please enter a valid email address! </p>
              <p v-else-if="success" class="acceptance-message">Employee has been successfully added!</p>
              <button v-if="type === 'settings'">Edit Employee</button>
              <!-- <button v-if="type === 'add'">Add Employee</button> -->
              </form>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="lg"
            @click="$bvModal.hide('addEmployeeModal')">
            Close
          </b-button>
          <b-button
              size="lg"
              variant="success"
              class="float-right"
              @click="manageSubmit()">
            Add
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import firebase from "firebase";
  export default {

    name: 'employer-form',
    props: ['type'],
    data() {
      return {
        submission: false,
        failure: false,
        invalidEmail: false,
        emptyField: false,
        success: false,
        employee: {
          name: '',
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
    },
    mounted: function(){
        if(this.type === "settings"){
            delete this.employee.password;
            this.getLoggedEmployee();
        }
    },
    methods: {
        async getLoggedEmployee(){
            var db = firebase.firestore();
            var loggedIn = firebase.auth().currentUser;

            const docRef = db.collection('accounts');
            const snapshot = await docRef.where('uid', '==', loggedIn.uid).get();
            if (snapshot.empty) {
              return;
            }

            snapshot.forEach(doc => {
              var employee = doc.data();
              this.employee.name = employee.name;
              this.employee.email = employee.email;
              this.employee.address = employee.address;
              this.employee.id = employee.id;
            });
        },
      manageSubmit() {
        this.submission = true
        this.clearStatus()

        if (this.emptyName || this.emptyEmail)  {

          this.failure = true
          this.emptyField = true
          this.$refs.nameField.focus()
          return
        }

        if (!this.validEmail)  {

          this.failure = true
          this.invalidEmail = true
          this.$refs.emailField.focus()
          return
        }

        this.success = true
        if(this.type === "settings"){
            this.$emit('edit:employee', this.employee.id, this.employee)
        }
        else this.$emit('add:employee', this.employee)
        this.$refs.nameField.focus()
this.employee = {
          name: '',
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
        this.submission = false
      },

    clearStatus() {
      this.success = false
      this.failure = false
      this.invalidEmail = false
      this.emptyField = false
    }
   },
    computed: {
      emptyName() {
        return this.employee.name === ''
      },

      emptyEmail() {
        return this.employee.email === ''
      },
      validEmail() {
        return validEmail.test(this.employee.email)
      }

    },
 }
</script>

<style scoped>

[class*='-notification'] {
  font-weight: 400;
}

form {
  margin-bottom: 5rem;
}

.acceptance-message {
  color: #32a95d;
}
.failure-message {
  color: #d33c40;
}
</style>