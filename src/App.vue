<template>
  <div id="main-app">
    <navigationbar></navigationbar>
    <div class="container d-flex flex-column align-items-center justify-content-center">
        <transition name="fade">
      <router-view></router-view>
    </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "@/main";
import Navigationbar from "@/components/Navigationbar";
import Footer from "@/components/Footer";

export default {
  name: 'app',
  components: {
    Navigationbar,
    Footer
  },
  mounted(){
    this.checkAuth()
  },
  methods: {
    checkAuth(){
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          router.push({path: '/dashboard'});
        }else {
          // No user is signed in.
          this.$router.push("/login").catch(()=>{});
        }
      });
    }
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