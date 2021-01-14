<template>
  <div id="customer-panel">
    <p v-if="customers.length < 1" class="empty-table">No customers found</p>
    <table class="table table-striped table-bordered" v-else>
      <thead class="thead-dark">
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
          <button @click="editCustomer(customer)" class="btn-table btn-primary btn-sm">
            <font-awesome-icon icon="save" />
          </button>
        </td>
        <td v-else>
          <button @click="editMode(customer.id)" class="btn-table btn btn-success btn-sm">
            <font-awesome-icon icon="edit" />
          </button>
          <button @click="$emit('delete:customer', customer)" class="btn-table btn btn-danger btn-sm">
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