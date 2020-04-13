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
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

Vue.prototype.$utils = utils
Vue.config.productionTip = false

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'http://115.93.143.2:9103'
// 모든 요청에 추가할 헤더 설정
var username = 'yjhyeon@aspringcloud.com'
var password = '9772dbwls!'
axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password)

var firebaseConfig = {
  apiKey: "AIzaSyAv5CnjBSIPh9v3FZvV7auV9IBmUaaJl_c",
    authDomain: "tasio-fcef3.firebaseapp.com",
    databaseURL: "https://tasio-fcef3.firebaseio.com",
    projectId: "tasio-fcef3",
    storageBucket: "tasio-fcef3.appspot.com",
    messagingSenderId: "289638736893",
    appId: "1:289638736893:web:628d81b525bd8c9743ef94",
    measurementId: "G-6KSNTBC2KL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
