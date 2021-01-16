<template>
  <div>
    <b-modal id="addProductModal"
             title="Add new product"
             size="lg"
             scrollable
             header-bg-variant="dark"
             header-text-variant="light">
      
      <b-container fluid>
        <b-row class="mb-1">
          <b-col>
            <div id="product-form">
              <form @submit.prevent="manageSubmit">
                <div class="form-group">
                  <label>Product name</label>
                    <input class="productNameInput"
                          ref = "nameField"
                          v-model="product.name"
                          type="text"
                          :class="{ 'has-error': submission && emptyName }"
                    />
                </div>
                <div class="row">
                  <div class="form-group col">
                  <label>Stock</label>
                    <input class="productStockInput"
                          ref = "productStockField"
                          v-model.number="product.stock"
                          type="number"
                          :class="{ 'has-error': submission && emptyStock }"
                    />
                  </div>
                  <div class="form-group col">
                  <label>Price</label>
                    <input class="productPriceInput"
                          ref = "productPriceField"
                          v-model.number="product.price"
                          type="number"
                          :class="{ 'has-error': submission && emptyName }"
                    />
                  </div>
                  <div class="form-group col">
                    <label>Discount percentage</label>
                    <input class="discountInput"
                            ref = "discountField"
                            v-model.number="product.discount"
                            type="number"
                            min="0"
                            max="100"
                            :class="{ 'has-error': submission}"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Supplier</label>
                  <input class="supplierNameInput"
                        ref = "supplierField"
                        v-model="product.supplier"
                        type="text"
                        :class="{ 'has-error': submission && emptySupplierName }"
                  />
                </div>
                <div class="form-group">
                  <label>Product description</label>
                  <textarea class="descriptionInput"
                        ref = "descriptionField"
                        v-model="product.productDescription"
                        type="text"
                        :class="{ 'has-error': submission && emptySupplierName }"
                  />
                </div>
                <div class="form-group">
                  <label>Product category</label>
                  <select id="categoryMenu" type="text" class="custom-select" :class="{'has-error': submission && emptySupplierName}">
                    <option v-for="option in this.categories" v-bind:key="option.id" :value="option.name">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="imageChoser">
                    <label>Choose an image product</label>
                    <input type="file" accept="image/*" @change="chosenImage ">
                  </div>
                </div>
                <p v-if="submission && emptyField" class="failure-message">
                  Please fill out the required fields ! </p>
                <p v-else-if="success" class="acceptance-message">Product has been successfully added!</p>
                <!-- <button>Add product</button> -->
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
            @click="$bvModal.hide('addProductModal')">
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
        discount: 0,
        category: '',
      },
    }
  },
  mounted() {
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      if (this.emptyName || this.emptyStock || this.emptySupplierName
          || this.emptyProductPicture || this.emptyProductDescription || this.emptyPrice ) {
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
        stock: 0,
        supplier: "",
        id: "",
        price: 0,
        productImage: "",
        productDescription: "",
        category: "",
        discount: 0,
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