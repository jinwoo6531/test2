import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import store from '../store'
import 'firebase/auth'
import 'firebase/firestore'
import axios from 'axios'
import router from '../router'


firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged(async (user) => {
  await store.dispatch("fetchUser", user)
  // console.log('user level check: ', user)
  if (user) {
    axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + user.uid)
      .then(response => {
        if (response.data.level == 2) {
          router.replace({
            name: 'AgreeCheck'
          }).catch((err) => {
            if (err.name == 'NavigationDuplicated')
              return
          })
        }
      })
  } else {
    router.replace({
      name: 'Walkthrough'
    }).catch((err) => {
      if (err.name == 'NavigationDuplicated')
        return
    })
  }
})