<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <h3>로그인하기</h3>
            <form @submit.prevent="signIn">
                +82 <input type="number" v-model="form.phNo" placeholder="전화번호">
            </form>
            <button id="sign-in-button" @click="sendOtp">보내기</button>
            <div id="recaptcha-container"></div>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'SignIn',

    data: () => ({
        phoneNumber: '',
        phNo: '',
        appVerifier: '',
        otp: '',
        coderesult: 0
    }),

    methods: {
        sendOtp() {
            if (this.phNo.length != 10) {
                alert('전화번호 형식을 지켜주세요!')
            } else {
                let countryCode = '+82' // Korea
                this.phoneNumber = countryCode + this.phNo
            }
            this.$firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.appVerifier)
                .then(confirmationResult => {
                    // SMS 전송
                    window.confirmationResult = confirmationResult
                    console.log(window.confirmationResult)
                    alert('인증코드를 전송하였습니다!')
                    this.$router.replace({
                        name: "AccessCode"
                    });
                }).catch(error => {
                    // SMS 전송 실패
                    alert(error + '인증코드 전송에 실패하였습니다!')
                })
        },

        verifyOtp() {
            if (this.phNo.length != 10 || this.otp.length != 6) {
                alert('잘못된 전화번호 / 인증코드 형식 입니다.')
            } else {
                window.confirmationResult.confirm(this.otp)
                    .then(result => {
                        console.log(result.user)
                        alert('로그인 성공.')
                        this.$router.replace({
                            name: "Home"
                        });
                    }).catch(error => {
                        alert(error + '인증코드가 잘못되었습니다.')
                    })
            }
        },

        initReCaptcha() {
            setTimeout(() => {
                window.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('recaptcha-container', {
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
