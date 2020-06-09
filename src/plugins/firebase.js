import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import store from '../store'
import 'firebase/auth'
import 'firebase/firestore'


firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user)
  if (user) {
    store.getters.user.loggedIn = true
  }
  else {
    store.getters.user.loggedIn = false
  }
})