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
               v-model.number="product.stock"
               type="number"
               :class="{ 'has-error': submission && emptyStock }"
        />
      </label>
      <label>Price</label>
      <label>
        <input class="productPriceInput"
               ref = "productPriceField"
               v-model.number="product.price"
               type="number"
               :class="{ 'has-error': submission && emptyName }"
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
      <div id="second row">

      <label>
        <label>Product description</label>
        <textarea class="descriptionInput"
               ref = "descriptionField"
               v-model="product.productDescription"
               type="text"
               :class="{ 'has-error': submission && emptySupplierName }"
        />
        <label>Product category</label>
        <select id="categoryMenu"
                  ref = "categoryField"
                  v-model="product.category"
                  type="text"
                  :class="{ 'has-error': submission && emptySupplierName  }"
        />
      </label>
      </div>
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
   props: {
    categories: Array,
  },
  data() {
    return {
      submission: false,
      failure: false,
      emptyField: false,
      success: false,
      product: {
        name: '',
        stock: 0,
        id: '',
        price: 0,
        supplier: '' ,
        productImage: '',
        productDescription: '',
        category: '',
      },
    }
  },
  mounted() {
    this.fillDropdown();
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      console.log("het gaat checken of het leeg is")
      if (this.emptyName || this.emptyStock || this.emptySupplierName
          || this.emptyProductPicture || this.emptyProductDescription || this.emptyPrice ) {
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
        stock: 0,
        supplier: "",
        id: "",
        price: 0,
        productImage: "",
        productDescription: "",
        category: "",
      }
      this.submission = false
    },
    fillDropdown() {
      var select = document.getElementById("categoryMenu");
      for(var index in this.categories) {
        select.options[select.options.length] = new Option(this.categories[index].name, index);
      }
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
      emptyProductDescription(){
        return this.product.productDescription === ''
      },
      emptyPrice(){
        return this.product.price ===''
      },
      emptyCategory(){
        return this.product.category ===''
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