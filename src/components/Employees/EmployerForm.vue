<template>
  <div id="employer-form">
  <form @submit.prevent="manageSubmit">
        <label>Employee name</label>
    <label>
      <input class="employeeInput"
          ref = "nameField"
          v-model="employee.name"
          type="text"
          :class="{ 'has-error': submission && emptyName }"
      />
    </label>
    <label>Employee email</label>
    <label>
      <input class="employeeInput"
          ref = "emailField"
          v-model="employee.email"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>
    <label>Employee password</label>
    <label>
      <input class="employeeInput"
             ref = "passwordField"
             v-model="employee.password"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>
    <div id="seccond-row ">
    <label>Street</label>
    <label>
      <input class="employeeInput"
             ref = "streetField"
             v-model="employee.address.street"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>
    <label>City</label>
    <label>
      <input class="employeeInput"
             ref = "cityField"
             v-model="employee.address.city"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>
    <label>State</label>
    <label>
      <input class="employeeInput"
             ref = "stateField"
             v-model="employee.address.state"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>
    <label>Postal code</label>
    <label>
      <input class="employeeInput"
             ref = "postalCodeField"
             v-model="employee.address.postalCode"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || invalidEmail)}"
      />
    </label>

    </div>
    <p v-if="failure && submission && emptyField" class="failure-message">
      Please fill out the required fields ! </p>
    <p v-else-if="failure && submission && invalidEmail" class="failure-message">
      Please enter a valid email address! </p>
    <p v-else-if="success" class="acceptance-message">Employee has been successfully added!</p>
    <button>Add Employee</button>
     </form>
  </div>
</template>

<script>
const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  export default {
    name: 'employer-form',
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
    methods: {
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
        this.$emit('add:employee', this.employee)
        this.$refs.nameField.focus()
        this.employee = {
          name: "",
          email: "",
        }
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