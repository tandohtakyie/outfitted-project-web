<template>
  <div id="customer-panel">
    <p v-if="customers.length < 1" class="empty-table">No customers found</p>
    <table v-else>
      <thead>
      <tr>
        <th>Customer details</th>
        <th>Order details</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers" :key="customer.uid">
        <td>
          <ul class="no-bullets">
          <li v-if="editing === customer.uid">
          <label>
            <input type ="text" v-model="customer.name">
          </label>
        </li>
        <li v-else>{{"Name: " + customer.name }}</li>
        <li v-if="editing === customer.uid">
          <label>
            <input type ="text" v-model="customer.email">
          </label>
        </li>
        <li v-else>{{"Email: " +customer.email }}</li>
          </ul>
        </td>
        <table>
            <tr v-for="order in getOrders(customer)" :key="order.OrderID">
              <td v-if="editing === customer.uid">
                <select
                    id="statusMenu"
                    v-model="order.orderStatus">
                  <option value="sent">Order sent</option>
                  <option value="pending">Order Pending</option>
                  <option value="cancelled">Order cancelled</option>
                </select>
              </td>
                <td v-else>
                    <label>{{order.orderStatus}}</label>
                </td>
              <td>
                  <li v-for = "product in getProducts(order)" :key="product.id">
                    {{product.name}}
                  </li>
              </td>
            </tr>
        </table>
        <td v-if="editing === customer.uid">
          <button @click="sendUpdate(customer, order)">Save</button>
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

    sendUpdate(customer) {
      if (customer.name === '' ) return
      this.$emit('edit:customer', customer.uid, customer)
      this.getOrders(customer).forEach(order =>  this.$emit('edit:order', order.OrderID, order));

      this.editing = null
    },
    getOrders(customer){
      return this.orders.filter(order => order.orderBy === customer.uid)
    },
    getProducts(order){
      let productArray = [];
      for (var i = 0; i < order.OrderedProductIDs.length; i++) {
        productArray[i] = this.products.find(product => product.id === order.OrderedProductIDs[i]);
      }
      return productArray;
    },
    selectStatus(order){
      document.getElementById("statusMenu").value = order.orderStatus;
    }
  },
  computed: {


},
}

</script>

<style scoped>
button {
  margin: 0.5rem;
}
ul.no-bullets {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
</style>