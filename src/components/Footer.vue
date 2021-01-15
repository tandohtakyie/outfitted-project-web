<template>

  <div v-if="loggedIn" class="footer">
    <span>Copyright &copy; <strong>OutFitted</strong></span>
  </div>

</template>



<script>
  import firebase from "firebase";

  export default {
    name: "Footer",
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
    },
    data() {
      return {
        loggedIn: false
      };
    }
  };
</script>
<style lang="scss">
  .footer {
    padding: 15px;
    left: 0;
    bottom: 0;
    width: 100%;
    color: black;
    background-color: rgb(247, 247, 247);
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>