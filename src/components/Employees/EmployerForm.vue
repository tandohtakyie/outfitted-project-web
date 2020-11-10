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
             :class="{ 'has-error': submission && (noEmail || invalidEmail)}"
      />
    </label>
    <label>Employee password</label>
    <label>
      <input class="employeeInput"
             ref = "passwordField"
             v-model="employee.password"
             type="text"
             :class="{ 'has-error': submission && noPassword}"
      />
    </label>
    <div id="seccond-row ">
    <label>Street</label>
    <label>
      <input class="employeeInput"
             ref = "streetField"
             v-model="employee.address.street"
             type="text"
             :class="{ 'has-error': submission && noStreet}"
      />
    </label>
    <label>City</label>
    <label>
      <input class="employeeInput"
             ref = "cityField"
             v-model="employee.address.city"
             type="text"
             :class="{ 'has-error': submission && noCity}"
      />
    </label>
    <label>State</label>
    <label>
      <input class="employeeInput"
             ref = "stateField"
             v-model="employee.address.state"
             type="text"
             :class="{ 'has-error': submission && noState}"
      />
    </label>
    <label>Postal code</label>
    <label>
      <input class="employeeInput"
             ref = "postalCodeField"
             v-model="employee.address.postalCode"
             type="text"
             :class="{ 'has-error': submission && (noPostalCode || invalidPostalcode)}"
      />
    </label>

    </div>
    <p v-if="failure && submission && isFieldEmpty" class="failure-message">
      Please fill out the required fields ! </p>
    <p v-else-if="failure && submission && invalidEmail" class="failure-message">
      Please enter a valid email address! </p>
    <p v-else-if="failure && submission && invalidPostalcode" class="failure-message">
      Please enter a valid postal code (example postalcode: 1045 px)! </p>
    <p v-else-if="success" class="acceptance-message">Employee has been successfully added!</p>
    <button>Add Employee</button>
     </form>
  </div>
</template>

<script>

const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validPostalCode = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

  export default {
    name: 'employer-form',
    data() {
      return {
        submission: false,
        failure: false,
        invalidEmail: false,
        invalidPostalcode: false,
        noName: false,
        noEmail: false,
        noPassword: false,
        noPostalCode: false,
        noStreet: false,
        noCity: false,
        noState: false,
        success: false,
        isFieldEmpty: false,
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

        this.emptyField()

        if (!this.validEmail)  {

          this.failure = true
          this.invalidEmail = true
          this.$refs.emailField.focus()
          return
        }else if(!validPostalCode){
          this.failure = true
          this.invalidPostalcode = true
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
      this.isFieldEmpty = false
    },
      emptyField(){
        if(this.employee.name == ''){this.noName = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.nameField.focus() }
        else if(this.employee.address.state == '') {this.noState = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.streetField.focus()}
        else if (this.employee.email == '') {this.noEmail = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.emailField.focus()}
        else if(this.employee.password == ''){this.noPassword = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.passwordField.focus()}
        else if (this.employee.address.postalCode == ''){this.noPostalCode = true,
            this.isFieldEmpty = true, this.failure = true, this.$refs.postalCodeField.focus()}
        else if (this.employee.address.street() == ''){this.noStreet = true, this.isFieldEmpty = true
            ,this.failure = true, this.$refs.streetField.focus()}
        else if (this.employee.address.city){this.noCity = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.cityField.focus()}
        else if (this.employee.address.state){this.noState = true, this.isFieldEmpty = true,
            this.failure = true, this.$refs.stateField.focus()}
      }
   },
    computed: {
      validEmail() {
        return validEmail.test(this.employee.email)
      },
      validPostalCode(){
        return validPostalCode.test(this.employee.address.postalCode)
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