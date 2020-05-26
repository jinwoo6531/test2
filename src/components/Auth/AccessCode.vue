<template>
<v-container class="pt-0 pb-6 pl-5 pr-5 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-center align-center text-left">
            <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
                <v-card-title class="pa-0 pb-4 auth-code-title">인증번호를 입력해주세요.</v-card-title>
                <v-card-text class="pa-0 auth-code-content">인증번호가 수신되지 않는 경우 스팸메시지 차단 기능을 확인하시기 바랍니다.</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-center align-center text-left">
            <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
                <v-card-actions class="pa-0">
                    <!-- <input type="text" v-model="otp" autofocus maxlength="6" class="AccessCode" placeholder="인증번호" /> -->
                    <input type="text" v-model="otp1" v-on:keyup.delete="deleteCode" class="AccessCode" maxlength="1" autofocus style="margin-right: 6px;">
                    <input type="text" v-model="otp2" v-on:keyup.delete="deleteCode" class="AccessCode" maxlength="1" style="margin-right: 6px;">
                    <input type="text" v-model="otp3" v-on:keyup.delete="deleteCode" class="AccessCode" maxlength="1" style="margin-right: 6px;">
                    <input type="text" v-model="otp4" class="AccessCode" maxlength="1" style="margin-right: 6px;">
                    <input type="text" v-model="otp5" class="AccessCode" maxlength="1" style="margin-right: 6px;">
                    <input type="text" v-model="otp6" class="AccessCode" maxlength="1">
                </v-card-actions>
                <v-flex class="pa-0 pt-4 d-flex justify-space-between" xs12 sm12 md12>
                    <p class="SendInfo">{{ this.phoneN }} 로 SMS를 보냈습니다.</p>
                    <p class="RemainTime">{{ remainTime }}</p>
                </v-flex>
                <v-flex class="pa-0 pt-5 d-flex justify-space-between" xs12 sm12 md12>
                    <p class="DoneTime">{{ this.doneTime }}</p>
                    <p class="AgainBtn" text @click="sendOtp">인증번호 다시 받기</p>
                </v-flex>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
            <v-flex xs12 sm12 md12 class="pa-0 justify-space-between">
                <v-card class="text-left pa-0" color="transparent" flat tile>
                    <v-btn depressed tile color="#E61773" width="100%" height="50px" class="auth-next" @click="verifyOtp" v-if="this.otp1.length >= 1 && this.otp2.length >= 1 && this.otp3.length >= 1 && this.otp4.length >= 1 && this.otp5.length >= 1 && this.otp6.length >= 1">다음</v-btn>
                    <v-btn depressed tile color="#E0E0E0" width="100%" height="50px" class="auth-next" @click="verifyOtp" v-else>다음</v-btn>
                </v-card>
            </v-flex>
        </v-flex>
        <div style="display: none;" id="recaptcha-container"></div>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data: () => ({
        otp: [],
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
        phoneN: '',
        remainTime: 0,
        doneTime: ''
    }),

    updated() {
        if (this.otp1.length == 1) {
            this.$nextTick(function () {
                this.$refs.authcode2.focus()
            })
        }
        if (this.otp2.length == 1) {
            this.$nextTick(function () {
                this.$refs.authcode3.focus()
            })
        }
        if (this.otp3.length == 1) {
            this.$nextTick(function () {
                this.$refs.authcode4.focus()
            })
        }
        if (this.otp4.length == 1) {
            this.$nextTick(function () {
                this.$refs.authcode5.focus()
            })
        }
        if (this.otp5.length == 1) {
            this.$nextTick(function () {
                this.$refs.authcode6.focus()
            })
        }
    },

    mounted() {
        console.log(this.$route.params.phoneNumber)
        let start = this.$route.params.phoneNumber.substring(3, 6)
        let mid = this.$route.params.phoneNumber.substring(6, 10)
        let end = this.$route.params.phoneNumber.substring(10, 14)
        this.phoneN = start + '-' + mid + '-' + end

        this.timeOut()

        this.$refs.authcode1.focus()
    },

    created() {
        this.$store.dispatch('initReCaptcha')
        this.timeStart()
    },

    beforeDestroy() {
        clearInterval(this.polling)
    },

    methods: {
        timeStart() {
            this.polling = setInterval(() => {
                this.timeOut()
            }, 1000)
        },

        timeOut() {
            var a = new Date() - this.$store.getters.timer
            let second = (180 - parseInt(a / 1000))
            this.minutes = parseInt(second / 60)
            this.seconds = second % 60

            this.remainTime = this.minutes + '분' + this.seconds + '초'
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.timeStop()
                this.doneTime = '인증번호 유효시간이 만료 됐습니다.'
            }
        },

        timeStop() {
            clearInterval(this.polling)
        },

        verifyOtp() {
            this.otp = []
            this.otp.push(this.otp1, this.otp2, this.otp3, this.otp4, this.otp5, this.otp6)
            this.otp = this.otp.join("")
            console.log(this.otp)

            if (this.otp.length == 6) {
                this.$store.dispatch("verifyOtp", {
                    otp: this.otp
                })
            } else {
                alert("잘못된 인증코드 형식 입니다.")
            }

            this.otp1 = ''
            this.otp2 = ''
            this.otp3 = ''
            this.otp4 = ''
            this.otp5 = ''
            this.otp6 = ''
        },

        async sendOtp() {
            await this.$store.dispatch("sendOtp", {
                phoneNumber: this.$route.params.phoneNumber
            })
            this.doneTime = '인증번호를 재발송하였습니다.'
            clearInterval(this.polling)
            this.timeOut()
            this.timeStart()
        },
    }
};
</script>

<style scoped>
.auth-code-wrap {
    width: 100%;
}

.auth-code-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.auth-code-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #828282;
}

.AccessCode {
    width: 47px;
    height: 47px;
    background: #FFFFFF;
    border: 0.5px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 2px;
    text-align: center;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    color: #262626;
}

.SendInfo {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #BDBDBD;
}

.RemainTime {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #E61773;
}

.DoneTime {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #EB5757;
}

.AgainBtn {
    text-decoration-line: underline;
    color: #E61773;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
}

.auth-next {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    border-radius: 2px !important;
    color: #FFFFFF !important;
}
</style>
