<template>
  <div><h1>DASHBOARD</h1>
    <p v-if="lowStockProductArray.length < 1" class="empty-table">No stock found</p>
    <div v-else>
      <column-chart :data="lowStockProductArray"/>
    </div>
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
    }
  },
  created() {
    this.loadLowStockProduct();
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
  }
}
</script>

<style scoped>

</style>