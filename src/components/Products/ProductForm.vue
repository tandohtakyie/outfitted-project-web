<template>
  <div id="product-form">
    <form @submit.prevent="manageSubmit">
      <label>Product name</label>
      <label>
        <input class="productNameInput"
               ref = "nameField"
               v-model="product.name"
               type="text"
               :class="{ 'has-error': submission && emptyName }"
        />
      </label>
      <label>Stock</label>
      <label>
        <input class="productStockInput"
               ref = "productStockField"
               v-model="product.amount"
               type="text"
               :class="{ 'has-error': submission && emptyStock }"
        />
      </label>
      <p v-if="submission && emptyField" class="failure-message">
        Please fill out the required fields ! </p>
      <p v-else-if="success" class="acceptance-message">Product has been successfully added!</p>
      <button>Add product</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'product-form',
  data() {
    return {
      submission: false,
      failure: false,
      invalidEmail: false,
      emptyField: false,
      success: false,
      product: {
        name: '',
        stock: '',
        id: '',
      },
    }
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      if (this.emptyName || this.emptyStock)  {

        this.failure = true
        this.emptyField = true
        this.$refs.nameField.focus()
        return
      }

      this.success = true
      this.$emit('add:product', this.product)
      this.$refs.nameField.focus()
      this.product = {
        name: "",
        stock: "",
      }
      this.submission = false
    },

    clearStatus() {
      this.success = false
      this.failure = false
      this.emptyField = false
    }
  },
  computed: {
    emptyName() {
      return this.product.name === ''
    },

    emptyStock() {
      return this.product.stock === ''
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