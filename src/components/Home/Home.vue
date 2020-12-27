<template>
  <div>
    <HomeStatistics
      :products="products" v-if="products.length"
    />
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