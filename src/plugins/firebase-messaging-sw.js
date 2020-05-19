// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
 
// Initialize Firebase
var config = {
    authDomain: "tasio-fcef3.firebaseapp.com",
    databaseURL: "https://tasio-fcef3.firebaseio.com",
    projectId: "tasio-fcef3",
    storageBucket: "tasio-fcef3.appspot.com",
    messagingSenderId: "289638736893",
};
this.$firebase.initializeApp(config);
 
const messaging = this.$firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload){
 
    const title = "Hello World";
    const options = {
            body: payload.data.status
    };
 
    return self.registration.showNotification(title,options);
});