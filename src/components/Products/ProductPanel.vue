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
        <td v-else>{{ product.name }}</td>
        <td v-if="editing === product.id">
          <label>
            <input type ="text" v-model="product.stock">
          </label>
        </td>
        <td v-else>{{ product.stock }}</td>
        <td v-if="editing === product.id">
          <button @click="editProduct(product)">Save</button>
        </td>
        <td v-else>
          <button @click="editMode(product.id)">Edit</button>
          <button @click="$emit('delete:product', product.id)">Delete</button>
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