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
               v-model="product.stock"
               type="text"
               :class="{ 'has-error': submission && emptyStock }"
        />
      </label>
      <label>Supplier</label>
      <label>
        <input class="supplierNameInput"
               ref = "supplierField"
               v-model="product.supplier"
               type="text"
               :class="{ 'has-error': submission && emptySupplierName }"
        />
      </label>
      <div class = "imageChoser">
        <label>Choose a product image</label>
        <input type="file" accept="image/*" @change="chosenImage ">
      </div>
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
      emptyField: false,
      success: false,
      product: {
        name: '',
        stock: '',
        id: '',
        supplier: '',
        productImage: '',
      },
    }
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      console.log("het gaat checken of het leeg is")
      if (this.emptyName || this.emptyStock || this.emptySupplierName || this.emptyProductPicture) {
        this.failure = true
        this.emptyField = true
        this.$refs.nameField.focus()
        console.log("het checkt of het leeg is")
        return
      }

      this.success = true
      this.$emit('add:product', this.product)
      this.$refs.nameField.focus()
      this.product = {
        name: "",
        stock: "",
        supplier: "",
        id: "",
        productImage: "",
      }
      this.submission = false
    },

    clearStatus() {
      this.success = false
      this.failure = false
      this.emptyField = false
    },
    chosenImage(event) {
      console.log(event)
      this.product.productImage = event.target.files[0]
    },
  },
    computed: {
      emptyName() {
        return this.product.name === ''
      },
      emptyStock() {
        return this.product.stock === ''
      },
      emptySupplierName() {
        return this.product.supplier === ''
      },
      emptyProductPicture() {
        return this.product.productImage === ''
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