import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase";
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
}).$mount('#app')
