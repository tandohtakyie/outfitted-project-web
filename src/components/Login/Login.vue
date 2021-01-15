<template>
  <div v-if="loggedOut" class="login-box d-flex flex-column align-items-center justify-content-center w-100">
    <img class="outfitted-logo" src="@/assets/images/logo_reversed_cropped.png" size="20">
    <div class="card w-50">
      <div class="card-header">OutFitted Admin Panel</div>
      <div class="card-body">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <form action="#" @submit.prevent="submit">
          <div class="form-group row">
            <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

            <div class="col-md-6">
              <input
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  value
                  required
                  autofocus
                  v-model="form.email"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

            <div class="col-md-6">
              <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  required
                  v-model="form.password"
              />
            </div>
          </div>

          <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-4">
              <button type="submit" class="btn-blue-outfitted btn-hover">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "@/main";

export default {
  created(){
    this.checkAuth()
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null,
      loggedOut: false
    };
  },
  methods: {
    checkAuth(){
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.loggedOut = false;
          if (this.$route.path !== "/dashboard"){router.push({path: '/dashboard'});}
        } else {
          // No user is signed in.
          this.loggedOut = true;
        }
      });
    },
    submit() {
      firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(function() {
            if (this.$route.path !== "/dashboard"){
              router.push({path: '/dashboard'});
            }
          })
          .catch(err => {
            this.error = err.message;
          });
    }
  }
};
</script>
<style lang="scss">
  .login-box{
    img{
      width: 130px;
      margin-bottom: 30px;
    }
  }
  .card{
    .card-header{
      background-color: #232127;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
</style>