import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import utils from './utils'
import store from './store'
import 'leaflet-routing-machine'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth' // for authentication
import 'firebase/storage' // for storage
import 'firebase/database' // for realtime database
import 'firebase/firestore' // for cloud firestore
import 'firebase/messaging' // for cloud messaging
import 'firebase/functions' // for cloud functions

Vue.prototype.$utils = utils
Vue.config.productionTip = false

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'http://115.93.143.2:9103'
// 모든 요청에 추가할 헤더 설정
var username = 'yjhyeon@aspringcloud.com'
var password = '9772dbwls!'
axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password)

let app = ''

var firebaseConfig = {
  apiKey: "AIzaSyB1-ghXWkaklsBqRGl_RGes9GiO2YF50Y0",
  authDomain: "tasio-19a7e.firebaseapp.com",
  databaseURL: "https://tasio-19a7e.firebaseio.com",
  projectId: "tasio-19a7e",
  storageBucket: "tasio-19a7e.appspot.com",
  messagingSenderId: "557365782718",
  appId: "1:557365782718:web:6230565419ccea0a29d6ef",
  measurementId: "G-509ZP8CB3K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
