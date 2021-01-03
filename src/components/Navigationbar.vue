


<template>
<div class="header">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="outfitted-logo" src="@/assets/outfitted_logo.jpeg" size="20">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">

          <router-link to="/dashboard"  class="nav-link" href="#">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/employees" class="nav-link" href="#">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products" class="nav-link" href="#">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/categories" class="nav-link" href="#">Categories</router-link>
        </li>
        <li class="nav-item">
           <router-link to="/settings" class="nav-link" href="#">Settings</router-link>
        </li>
      </ul>

    </div>

    <button class="but" @click="signOut">Sign out</button>
  </nav>
</div>
</template>

<script>
import firebase from "firebase";

export default {
name: "Navigationbar",
  mounted() {
    this.setupFirebase();
  },  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push("/login");
          });
    }
  },
  data() {
    return {
      loggedIn: false
    };
  }
};

</script>

<style scoped>

</style>