<template>
  <div id="customer-panel">
    <p v-if="customers.length < 1" class="empty-table">No customers found</p>
    <table v-else>
      <thead>
      <tr>
        <th>Customer name</th>
        <th>Customer email</th>
        <th>Order is successful</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key="customer.uid">
        <td v-if="editing === customer.uid">
          <label>
            <input type ="text" v-model="customer.name">
          </label>
        </td>
        <td v-else>{{ customer.name }}</td>
        <td v-if="editing === customer.uid">
          <label>
            <input type ="text" v-model="customer.email">
          </label>
        </td>
        <td v-else>{{ customer.email }}</td>
        <table>
            <tr v-for="order in Orders(customer)" :key="order.orderTime">
                <td>
                    <label>Success: {{order.isSuccess}}</label>
                </td>
                <td>
                    <label>{{order.orderStatus}}</label>
                </td>
            </tr>
        </table>
        <td v-if="editing === customer.uid">
          <button @click="editCustomer(customer)">Save</button>
        </td>
        <td v-else>
          <button @click="editMode(customer.uid)">Edit</button>
          <button @click="$emit('delete:customer', customer.uid)">Delete</button>
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
    orders: Array,
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
      if (customer.name === '' ) return
      this.$emit('edit:customer', customer.uid, customer)
      this.editing = null
    },
    Orders(customer){
      console.log(customer);
      return this.orders.filter(order => order.orderBy === customer.uid)
    },
  },
  computed: {


},
}

</script>

<style scoped>
button {
  margin: 0.5rem;
}
</style>