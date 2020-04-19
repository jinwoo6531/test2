import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import router from '../router'
import store from '../store'

import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase
Vue.prototype.$isFirebaseAuth = false

// firebase 인증 상태 확인
firebase.auth().onAuthStateChanged((user) => {
    Vue.prototype.$isFirebaseAuth = true

    store.dispatch("fetchUser", user) 
    if (user) {
        router.push ('/dashboard')
    } else {
        router.push('/accessphone')
    }
})