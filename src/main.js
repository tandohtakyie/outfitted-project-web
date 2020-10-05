import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import firebase from "firebase";

import Home from "@/components/Home"
import Employees from "@/components/Employees";
import Products from "@/components/Products";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {library} from "@fortawesome/fontawesome-svg-core";

Vue.use(VueRouter);
const routes = [
{path: "/", component: Home},
{path: "/employees", component: Employees},
{path: "/products", component: Products},
];

const router = new VueRouter({
  routes,
  mode: 'history'});
Vue.component('Navigation', require('./components/Navigationbar.vue').default);



import{faPlus, faMinus, faTrash, faCheck, faEdit} from "@fortawesome/free-solid-svg-icons"


library.add(faPlus, faMinus, faTrash, faCheck, faEdit);
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCzT-Xw_dUYzgrUl5wZ64u1riEJbYzzH-I",
  authDomain: "outfitted-4da25.firebaseapp.com",
  databaseURL: "https://outfitted-4da25.firebaseio.com",
  projectId: "outfitted-4da25",
  storageBucket: "outfitted-4da25.appspot.com",
  messagingSenderId: "899720153742",
  appId: "1:899720153742:web:ba2d0e91f0493cef8f17df",
  measurementId: "G-8CJRL0J8W5"


};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
