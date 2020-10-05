<template>
  <div id="product-panel">
    <p v-if="products.length < 1" class="empty-table">No products found</p>
    <table v-else>
      <thead>
      <tr>
        <th>Product name</th>
        <th>Available stock</th>
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
        <td>{{ product.name }}</td>
        <td v-if="editing === product.name">
          <label>
            <input type ="text" v-model="product.stock">
          </label>
        </td>
        <td>{{ product.stock }}</td>
        <td v-if="editing === product.stock">
          <button @click="editProduct(product)">Save</button>
        </td>
        <td v-else>
          <button @click="editMode(product.name)">Edit</button>
          <button @click="$emit('delete:product', product.name)">Delete</button>
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
      this.$emit('edit:product', product.name, product)
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