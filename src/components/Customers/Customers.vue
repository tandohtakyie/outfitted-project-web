<template>
  <div>
    <customer-panel :customers="customers"
                    @delete:customer="deleteCustomer"
                    @edit:customer="editCustomer"
                    :orders="orders"
                    @delete:order="deleteOrder"
                    @edit:order="editOrder"
                    :products="products"
    />
  </div>
</template>

<script>
import CustomerPanel from "@/components/Customers/CustomerPanel";
import firebase from "firebase";

export default {
  name: 'customersComponent',
  components: {
    CustomerPanel,
  },
  data() {
    return {
      customers: [

      ],
      orders: [

      ],
      products: [

      ],
      addresses: [

      ],
    }
  },

  mounted() {
    this.getAllCustomers()
    this.getAllOrders()
    this.getAllProducts()
    this.getAllAddresses()
  },

  methods: {
    async getAllCustomers() {
      try {
        var db = firebase.firestore();
        const customers = db.collection('customers');
        const snapshot = await customers.get();
        snapshot.forEach(doc => {
          var newAddress = doc.data();
          const address = db.collection('customers').id(doc.data().id).collection('customerAddress');
          const snp = await address.get();

          snp.forEach(ad => {
            newAddress.address = [...newAddress.address, ad];
          });

          this.customers = [...this.customers, newAddress];
        });
      } catch (error) {
        console.error(error)
      }
    },
    async getAllOrders() {
      try {
        var db = firebase.firestore();
        const orders = db.collection('orders');
        const snapshot = await orders.get();
        snapshot.forEach(doc => {
          this.orders = [...this.orders, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async getAllProducts() {
      try {
        var db = firebase.firestore();
        const products = db.collection('products');
        const snapshot = await products.get();
        snapshot.forEach(doc => {
          this.products = [...this.products, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async deleteCustomer(id) {
      var db = firebase.firestore();
      try {
        await db.collection('customers').doc(id).delete();
        this.customers = this.customers.filter(customer => customer.uid !== id);
      } catch (error) {console.log(error)
      }
    },
    async deleteOrder(id) {
      var db = firebase.firestore();
      try {
        await db.collection('orders').doc(id).delete();
        this.orders = this.orders.filter(order => order.OrderID !== id);
      } catch (error) {console.log(error)
      }
    },
    async editCustomer(id, updatedCustomer) {
      id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
      var db = firebase.firestore();
      try {
        await db.collection('customers').doc(id).update(updatedCustomer);
        this.customers = this.customers.map(customer => (customer.uid === id, customer));
      } catch (error) {console.log(error)
      }
    },
    async editOrder(id, updatedOrder) {
      console.log(updatedOrder.orderStatus)

      id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
      var db = firebase.firestore();
      try {
        await db.collection('orders').doc(id).update(updatedOrder);
        this.orders = this.orders.map(order => (order.OrderID === id, order));
      } catch (error) {console.log(error)
      }
    },
    //Here, amount of objects is accessed to provide unique numeric id.
    //input: object Customer. Output: altered Customer.id.
    setNewCustomerId(customer){
      const previousCustomerId =
          this.customers.length > 0
              ? this.customers[this.customers.length - 1].id
              : 0;
      customer.uid = String(parseInt(previousCustomerId)+1)
    },
  }
}
</script>

<style scoped>

</style>