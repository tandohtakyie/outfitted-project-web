<template>
  <div id="customer-panel">
    <p v-if="customers.length < 1" class="empty-table">No customers found</p>
    <table v-else>
      <thead>
      <tr>
        <th>Customer name</th>
        <th>Customer email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td v-if="editing === customer.id">
          <label>
            <input type ="text" v-model="customer.name">
          </label>
        </td>
        <td v-else>{{ customer.name }}</td>
        <td v-if="editing === customer.id">
          <label>
            <input type ="text" v-model="customer.email">
          </label>
        </td>
        <td v-else>{{ customer.email }}</td>
        <td v-if="editing === customer.id">
          <button @click="editCustomer(customer)">Save</button>
        </td>
        <td v-else>
          <button @click="editMode(customer.id)">Edit</button>
          <button @click="$emit('delete:customer', customer)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'customer-panel',
  props: {
    customers: Array,
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

    editCustomer(customer) {
      if (customer.name === '' || customer.customerImage === '') return
      this.$emit('edit:customer', customer.id, customer)
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