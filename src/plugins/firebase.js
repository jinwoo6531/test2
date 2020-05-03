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

// 현재 사용자를 가져온다. (auth 개체에 관찰자를 설정)
firebase.auth().onAuthStateChanged((user) => {
    Vue.prototype.$isFirebaseAuth = true
    if (user) {
        router.push('/')
    } else {
        router.push('/auth/accessphone')
    }
    store.dispatch("fetchUser", user)
})