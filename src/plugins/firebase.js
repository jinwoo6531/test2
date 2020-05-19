import Vue from 'vue'
import * as firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import router from '../router'
import store from '../store'
import axios from 'axios'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/messaging'

firebase.initializeApp(firebaseConfig)

// const messaging = firebase.messaging();

// //token값 알아내기
// messaging.requestPermission()
//     .then(function () {
//         console.log("Have permission");
//         return messaging.getToken();
//     })
//     .then(function (token) {
//         console.log('token', token);
//     })
//     .catch(function (erorr) {
//         console.log("Error Occured", erorr);
//     });


Vue.prototype.$firebase = firebase
Vue.prototype.$isFirebaseAuth = false

// 현재 사용자를 가져온다. (auth 개체에 관찰자를 설정)
firebase.auth().onAuthStateChanged(async (user) => {
    Vue.prototype.$isFirebaseAuth = true
    store.dispatch("fetchUser", user)

    if (user) {
        await axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + user.uid)
            .then(response => {
                if (response.data.level == 1) {
                    router.push('/')
                } else {
                    router.push('/auth/agreecheck')
                }
            })
    } else {
        router.push('/accessagree')
    }
})