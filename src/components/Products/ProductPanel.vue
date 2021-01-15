<template>
  <div id="product-panel">
    <p v-if="products.length < 1" class="empty-table">No products found</p>
    <table class="table table-striped table-bordered" v-else>
      <thead class="thead-dark">
      <tr>
        <th>Product name</th>
        <th>Available stock</th>
        <th>Supplier</th>
        <th>Product description</th>
        <th>Category</th>
        <th>Price</th>
        <th>Discount percentage</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.name">
          </label>
        </td>
        <td v-else>{{ product.name }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.stock">
          </label>
        </td>
        <td v-else>{{ product.stock }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.supplier">
          </label>
        </td>
        <td v-else>{{ product.supplier }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.productDescription">
          </label>
        </td>
        <td v-else>{{ product.productDescription }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.category">
          </label>
        </td>
        <td v-else>{{ product.category }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.price">
          </label>
        </td>
        <td v-else>{{ product.price }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model.number="product.discount">
          </label>
        </td>
        <td v-else>{{ product.discount }}</td>
        <td v-if="editing === product.id">
          <button @click="editProduct(product)" class="btn-table btn-primary btn-sm">
            <font-awesome-icon icon="save" />
          </button>
        </td>
        <td v-else>
          <button @click="editMode(product.id)" class="btn-table btn btn-success btn-sm">
            <font-awesome-icon icon="edit" />
          </button>
          <button @click="$emit('delete:product', product)" class="btn-table btn btn-danger btn-sm">
            <font-awesome-icon icon="trash" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'product-panel',
  props: {
    products: Array,
  },
  data() {
    return {
      editing: null,
    }
  },
  methods: {
    editMode(id) {
      this.editing = id
    },

    editProduct(product) {
      if (product.name === '' || product.stock === '') return
      this.$emit('edit:product', product.id, product)
      this.editing = null
    }
  }

}
</script>

<style scoped>
button {
  margin: 0.5rem;
}
</style>