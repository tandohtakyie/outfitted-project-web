<template>
  <div class="appContainer">
    <div id="app" class="mainContainer">
      <Header></Header>
      <h1>Employee List</h1>
      <crud-component></crud-component>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CrudComponent from "@/components/CrudComponent";

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    CrudComponent,
  },
  data() {
    return {

      employees: [

      ],
    }
  },

  methods: {

  }
}
</script>

<style>
@import "assets/main.css";
</style>