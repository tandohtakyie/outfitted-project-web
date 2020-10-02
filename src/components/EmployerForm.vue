<template>
  <div id="employer-form">
  <form @submit.prevent="manageSubmit">
        <label>Employee name</label>
    <label>
      <input
          v-model="employee.name"
          type="text"
          :class="{ 'has-error': submission && emptyName }"
          @focus="clearStatus"
          @keypress="clearStatus"
      />
    </label>
    <label>Employee email</label>
    <label>
      <input v-model="employee.email"
             type="text"
             :class="{ 'has-error': submission && (emptyEmail || isEmailInvalid)}"
             @focus="clearStatus"
      />
    </label>
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
const emailRe =
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
          return
        }

        if (this.isEmailInvalid)  {

          this.failure = true
          this.invalidEmail = true
          return
        }

        this.success = true
        this.$emit('add:employee', this.employee)
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
      isEmailInvalid() {
        return !emailRe.test(this.employee.email)
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