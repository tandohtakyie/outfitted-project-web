<template>
  <div class="header">
    <template  v-if="loggedIn">
    <nav class="navbar navbar-expand-lg navbar-light">
      <img class="outfitted-logo" src="@/assets/images/logo_reversed_cropped.png" size="20">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/dashboard"  class="nav-link" href="#">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/customers" class="nav-link" href="#">Customers</router-link>
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
      <button class="btn-blue-outfitted btn-hover" @click="signOut">Sign out</button>
    </nav>
    </template>
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
<style lang="scss">
  .header{
    img.outfitted-logo {
      width: 85px;
      height: 80px;
      margin: 15px 0px;
    }

    .navbar{
      background-color: white!important;
      border-bottom: 1px solid #2321275c!important;
      
      ul.navbar-nav{
        margin: auto;

        a{
          line-height: 15px;
          margin: 0 3px;
        }
        li{
          a{
            border-bottom: 2px solid #23212700;
            transition: 0.5s!important;

            &.router-link-active{
              color: #232127!important;
              font-weight: bold!important;
              transition: 1s!important;
            }
          }
          &:hover{
            a{
              border-bottom: 2px solid #232127!important;
              transition: 1s!important;
            }
          }
        }
      }
    }
  }

</style>