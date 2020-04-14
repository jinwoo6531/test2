<template>
<v-container>
    <v-layout>
        <v-flex>
            <input type="number" v-model="otp" placeholder="인증번호" />
            <button @click="verifyOtp">확인</button><br>
            <!-- <button @click="sendOtp">재전송</button> -->
            <div id="recaptcha-container"></div>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"

export default {

    data: () => ({
        otp: '',
    }),

    methods: {
        verifyOtp() {
            // if (this.phNo.length != 10 || this.otp.length != 6) {
            if (this.otp.length != 6) {
                alert('잘못된 인증코드 형식 입니다.')
            } else {
                window.confirmationResult.confirm(this.otp)
                    .then(result => {
                        console.log(result)
                        alert('로그인 성공.')
                        this.$router.replace({
                            name: "Home"
                        })
                    }).catch(error => {
                        alert(error + '인증코드가 잘못되었습니다.')
                    })
            }
        },

        initReCaptcha() {
            setTimeout(() => {
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': function (response) {
                        console.log(response)
                    },
                    'expired-callback': function () {}
                })
                this.appVerifier = window.recaptchaVerifier
            }, 1000)
        }
    },

    created() {
        this.initReCaptcha()
    }

}
</script>

<style>

</style>
