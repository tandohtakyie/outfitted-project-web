<template>
  <div id="main-app">
    <navigationbar></navigationbar>
    <div class="container d-flex flex-column align-items-center justify-content-center">
        <router-view></router-view>
    </div>
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

<style lang="scss">
  @import "assets/main.css";
  @import "assets/scss/main.scss";
</style>