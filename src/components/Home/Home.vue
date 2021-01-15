<template>
  <div class="w-100">
    <b-tabs content-class="mt-5" fill>
      <b-tab title="Products with low stock" active>
        <HomeStatistics
          :products="products" v-if="products.length"
        />
      </b-tab>
      <b-tab title="Amount of products per supplier">
        <p>I'm the second tab</p>
        </b-tab>
  </b-tabs>
  </div>
</template>

<script>
import HomeStatistics from "@/components/Home/HomeStatistics";
import firebase from "firebase";

export default {
name: "Home",
  components: {
  HomeStatistics,
},  data() {
    return {
      products: [],
    }
  },
  mounted() {
    this.getAllProducts();
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
  }
}
</script>

<style scoped>

</style>