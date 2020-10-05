import Vue from 'vue'
import App from './App.vue'
import './plugins/firebase'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import utils from './utils'
import 'leaflet-routing-machine'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueScrollPicker from "vue-scroll-picker"
import "vue-scroll-picker/dist/style.css"
import OtpInput from "@bachdgvn/vue-otp-input"
import Toasted from 'vue-toasted'
 
Vue.use(Toasted)
 
Vue.component("v-otp-input", OtpInput);

Vue.use(VeeValidate)
Vue.use(VueScrollPicker)

Vue.prototype.$utils = utils
Vue.config.productionTip = false

// baseURL 기본값을 정의한다
axios.defaults.baseURL = 'https://test.aspringcloud.com'
// axios.defaults.baseURL = 'https://gunsanapi.tasio.io:300' // 회사 외부 API
// axios.defaults.baseURL = 'http://192.168.200.13:8000' // 회사 내부 API
// 모든 요청에 추가할 헤더 설정
var username = 'admin@aspringcloud.com'
var password = 'spring#007'
axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
