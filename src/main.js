import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import utils from './utils'
import store from './store'
import 'leaflet-routing-machine'
import axios from 'axios'
import firebase from 'firebase/app'
import firebaseConfig from '../firebaseConfig'
import 'firebase/auth' // for authentication
import 'firebase/firestore' // for cloud firestore
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
