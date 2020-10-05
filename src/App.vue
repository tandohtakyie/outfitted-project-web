<template>
  <div id="main-app">
    <navigationbar></navigationbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import navigationbar from "@/components/Navigationbar";
import Footer from "@/components/Footer";

export default {
  name: 'app',
  components: {
    navigationbar,
    Footer
  },
  data() {
    return {

    }
  }
}



</script>

<style>
@import "assets/main.css";
</style>