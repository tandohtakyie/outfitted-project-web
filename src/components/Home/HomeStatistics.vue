<template>
  <div class="full-screen">
    <b-tabs content-class="mt-5" fill>
      <b-tab title="Products with low stock" active>
        <p v-if="lowStockProductArray.length < 1" class="empty-table">No stock found</p>
        <div v-else>
          <column-chart :data="lowStockProductArray" :styles="{width: '100%', position: 'relative'}"/>
        </div>
      </b-tab>
      <b-tab title="Product prices">
        <p v-if="lowStockProductArray.length < 1" class="empty-table">No stock found</p>
        <div v-else>
          <column-chart :data="productPriceArray" :styles="{width: '100%', position: 'relative'}"/>
        </div>
        </b-tab>
    </b-tabs>
  </div>
</template>


<script>
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Vue from "vue";
Vue.use(Chartkick.use(Chart))

export default {
  name: "HomeStatistics",
  data() {
    return {
      lowStockProductArray: [],
      productPriceArray: [],
    }
  },
  created() {
    this.loadLowStockProduct();
    this.loadProductPrice();
  },
  props: {
    products: Array,
  },

  methods: {
    loadLowStockProduct() {
     var index2 = 0;
      for (var index in this.products) {
        if (this.products[index].stock < 30) {
          this.lowStockProductArray[index2] = [this.products[index].name, this.products[index].stock ] ;
          index2++;
        }
      }
    },
    loadProductPrice(){
      var index2 = 0;
      for (var index in this.products) {
          this.productPriceArray[index2] = [this.products[index].name, this.products[index].price ] ;
          index2++;
        }
    }
  }
}
</script>

<style scoped>

</style>