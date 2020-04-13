<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            +82<input type="number" v-model="phNo" placeholder="전화번호">
            <button id="sign-in-button" @click="sendOtp">보내기</button>
            <div id="recaptcha-container"></div>
            <br>
            <input type="number" v-model="otp" placeholder="인증번호"/>
            <button @click="verifyOtp">확인</button><br>
            <button @click="sendOtp">재전송</button>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    name: 'AccessPhone',

    data: () => ({
        phoneNumber: '',
        phNo: '',
        appVerifier: '',
        otp: '',
        coderesult: 0
    }),

    methods: {
        sendOtp() {
            if(this.phNo.length != 10) {
                alert('전화번호 형식을 지켜주세요!')
            } else {
                let countryCode = '+82' // Korea
                this.phoneNumber = countryCode + this.phNo
            }
            firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.appVerifier)
            .then(confirmationResult => {
                // SMS 전송
                window.confirmationResult = confirmationResult
                alert('메세지를 전송하였습니다!')
            }).catch(error => {
                // SMS 전송 실패
                alert(error + '메세지 전송에 실패하였습니다!')
            })
        },

        verifyOtp() {
            if(this.phNo.length != 10 || this.otp.length != 6) {
                alert('잘못된 전화번호 / 인증코드 형식 입니다.')
            } else {
                window.confirmationResult.confirm(this.otp)
                .then(result => {
                    var user = result.user
                    console.log(user)
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
                    'expired-callback': function () {
                    }
                });
                //
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
