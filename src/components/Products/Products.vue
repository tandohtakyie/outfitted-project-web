<template>
  <div>
    <product-form :products="products" @add:product="createProduct"/>
    <product-panel :products="products"
                 @delete:product="deleteProduct"
                 @edit:product="editProduct"
    />
  </div>
</template>

<script>
import ProductForm from "@/components/Products/ProductForm";
import ProductPanel from "@/components/Products/ProductPanel";
import firebase from "firebase";

export default {
  name: 'crudComponent',
  components: {
    ProductForm,
    ProductPanel,
  },
  data() {
    return {

      products: [

      ],
    }
  },

  mounted() {
    this.getAllProducts()
  },

  methods: {
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

    async createProduct(product) {
      console.log(product);

      this.setNewProductId(product);
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(product.name).set(product);
        this.products = [...this.products, product]
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProduct(id) {
      console.log(id);
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(id).delete();
        this.products = this.products.filter(product => product.name !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async editProduct(id, updatedProduct) {
      console.log(id);
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(id).set(updatedProduct);
        this.products = this.products.map(product => (product.id === id, product));
      } catch (error) {
        console.error(error)
      }
    },
    setNewProductId(product){
      const previousProductId =
          this.products.length > 0
              ? this.products[this.products.length - 1].id
              : 0;
      product.id = previousProductId + 1;
    },
  }
}
</script>

<style scoped>

</style>