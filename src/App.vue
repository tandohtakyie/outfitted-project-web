<template>
  <div id="main-app">
    <navigationbar></navigationbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import Navigationbar from "@/components/Navigationbar";
import Footer from "@/components/Footer";

export default {
  name: 'app',
  components: {
    Navigationbar,
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