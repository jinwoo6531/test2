/*

// eslint-disable-next-line no-undef
importScripts ( 'https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js' );
// eslint-disable-next-line no-undef
importScripts ( 'https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js' );

import * as firebase from 'firebase/app';
import firebaseConfig from '../../firebaseConfig'   

// firebase 시작
firebase.initializeApp(firebaseConfig)

// firebase messaging 다시 호출하기
const messaging = firebase.messaging()

// service worker 내에서 알림을 보내기 위해
// 웹 페이지가 열려 있지 않을 때만 호출된다.
messaging.setBackgroundMessageHandler((payload) => {
    const title = 'Tasio 입니다.'
    const options = {
        body: payload.data.status
    }

    // Promise를 return 한다.
    return self.registration.showNotification(title, options)
})

*/