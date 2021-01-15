<template>
  <div>
    <customer-form :customers="customers" @add:customer="createCustomer"/>
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
import CustomerForm from "@/components/Customers/CustomerForm";
import firebase from "firebase";

export default {
  name: 'customersComponent',
  components: {
    CustomerForm,
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
    }
  },

  mounted() {
    this.getAllCustomers()
    this.getAllOrders()
    this.getAllProducts()
  },

  methods: {
    async getAllCustomers() {
      try {
        var db = firebase.firestore();
        const customers = db.collection('customers');
        const snapshot = await customers.get();
        snapshot.forEach(doc => {
          this.customers = [...this.customers, doc.data()]
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
    async createCustomer(customer) {
      var db = firebase.firestore();
      try {
        //register with email and password
        firebase.auth().createUserWithEmailAndPassword(customer.email, customer.password)
            .then((user) => {
              //get registered uid
              //use id in firebase
              console.log(user);
              delete customer.password;
              customer.uid = user.user.uid;
              db.collection('customers').add(customer)
                  .then((empReturn) => {
                    console.log(empReturn);
                    var fstoreID = empReturn.id;
                    console.log(fstoreID);
                    customer.id = fstoreID;
                    db.collection('customers').doc(fstoreID).update(customer);
                    this.customers = [...this.customers, customer];
                  })
                  .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                  });



            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
            });
      }catch (error) {console.log(error)}
    },
    async deleteCustomer(id) {
      var db = firebase.firestore();
      try {
        await db.collection('customers').doc(id).delete();
        this.customers = this.customers.filter(customer => customer.id !== id);
      } catch (error) {console.log(error)
      }
    },
    async deleteOrder(id) {
      var db = firebase.firestore();
      try {
        await db.collection('orders').doc(id).delete();
        this.orders = this.orders.filter(order => order.id !== id);
      } catch (error) {console.log(error)
      }
    },
    async editCustomer(id, updatedCustomer) {
      id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
      var db = firebase.firestore();
      try {
        await db.collection('customers').doc(id).update(updatedCustomer);
        this.customers = this.customers.map(customer => (customer.id === id, customer));
      } catch (error) {console.log(error)
      }
    },
    async editOrder(id, updatedOrder) {
      id = id.replace(/\s/g, '');//for some strange reason, id gets malformed with spaces. this fixes that problem
      var db = firebase.firestore();
      try {
        await db.collection('orders').doc(id).update(updatedOrder);
        this.orders = this.orders.map(order => (order.id === id, order));
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
      customer.id = String(parseInt(previousCustomerId)+1)
    },
  }
}
</script>

<style scoped>

</style>