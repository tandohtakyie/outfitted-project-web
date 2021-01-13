import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"
import firebase from "firebase";
import store from "./store";


import Home from "@/components/Home/Home"
import Employees from "@/components/Employees/Employees";
import Customers from "@/components/Customers/Customers";
import Products from "@/components/Products/Products";
import Categories from "@/components/Categories/Categories";
import Login from "@/components/Login/Login";
import Settings from "@/components/Settings/Settings";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {library} from "@fortawesome/fontawesome-svg-core";

Vue.use(Router);
const routes = [
{path: "/dashboard", component: Home, meta: {requiresAuth: true}},
{path: "/employees", component: Employees, meta: {requiresAuth: true}},
  {path: "/customers", component: Customers, meta: {requiresAuth: true}},

  {path: "/products", component: Products, meta: {requiresAuth: true}},
  {path: "/categories", component: Categories, meta: {requiresAuth: true}},
  {path: "/settings", component: Settings, meta: {requiresAuth: true}},
{path: "/login", component: Login},
];



const router = new Router({
  routes,
  base: process.env.BASE_URL,
  mode: 'history'});

export default router
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

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const isAuthenticated = firebase.auth().currentUser;
//   console.log("isauthenticated", isAuthenticated);
//   if (requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
