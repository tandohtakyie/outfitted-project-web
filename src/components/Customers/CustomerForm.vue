<template>
  <div id="customer-form">
    <form @submit.prevent="manageSubmit">
      <label>Customer name</label>
      <label>
        <input class="customerNameInput"
               ref = "customerNameField"
               v-model="customer.name"
               type="text"
               :class="{ 'has-error': submission && emptyCustomerName }"
        />
      </label>
      <label>Customer email</label>
      <label>
        <input class="customerEmailInput"
               ref = "customerEmailField"
               v-model="customer.email"
               type="text"
               :class="{ 'has-error': submission && emptyCustomerEmail }"
        />
      </label>
      <label>Customer password</label>
      <label>
        <input class="customerPasswordInput"
               ref = "customerPasswordField"
               v-model="customer.password"
               type="text"
               :class="{ 'has-error': submission && emptyCustomerPassword }"
        />
      </label>

      <p v-if="submission && emptyField" class="failure-message">
        Please fill out the required fields ! </p>
      <p v-else-if="success" class="acceptance-message">Customer has been successfully added!</p>
      <button>Add Customer</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'customer-form',
  data() {
    return {
      submission: false,
      failure: false,
      emptyField: false,
      success: false,
      customer: {
        name: '',
        email: '',
        password: ''
      },
    }
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      if (this.emptyCustomerName) {
        this.failure = true
        this.emptyField = true
        return
      }

      this.success = true
      this.$emit('add:customer', this.customer)
      this.customer = {
        name: "",
        email: "",
        password: ""
      }
      this.submission = false
    },

    clearStatus() {
      this.success = false
      this.failure = false
      this.emptyField = false
    },
  },
  computed: {
    emptyCustomerEmail(){
      return this.customer.email ===''
    },
    emptyCustomerName(){
      return this.customer.name ===''
    },
    emptyCustomerPassword(){
      return this.customer.password ===''
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