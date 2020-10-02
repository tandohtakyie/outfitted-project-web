<template>
  <div id="employer-form">
  <form @submit.prevent="manageSubmit">
        <label>Employee name</label>
        <input
            v-model="employee.name"
            type="text"
            :class="{ 'has-error': submission && emptyName }"
            @focus="clearStatus"
            @keypress="clearStatus"
        />
        <label>Employee email</label>
        <input v-model="employee.email"
               type="text"
               :class="{ 'has-error': submission && emptyEmail }"
               @focus="clearStatus"
        />
    <p v-if="failure && submission" class="failure-message">
      Please fill out the required fields ! </p>
    <p v-if="success" class="acceptance-message">Employee has been successfully added!</p>

    <button>Add Employee</button>
     </form>
  </div>
</template>

<script>
  export default {
    name: 'employer-form',
    data() {
      return {
        submission: false,
        failure: false,
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

        if (this.emptyName || this.emptyEmail) {

          this.failure = true
          return
        }

        this.$emit('add:employee', this.employee)
        this.employee = {
          name: "",
          email: "",
        }
        this.submission = false
        this.failure = false
        this.success = true
      },

    clearStatus() {
      this.success = false
      this.failure = false
    }
   },
    computed: {
      emptyName() {
        return this.employee.name === ''
      },

      emptyEmail() {
        return this.employee.email === ''
      },
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