<template>
<v-app style="position: relative;">
    <v-container fluid v-if="isLoading == true" style="display: flex; position: absolute; background: rgba(0, 0, 0, 0.5); height: 100%; pointer-events: none !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card color="transparent" flat>
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate size="50" color="#E61773"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-center" style="color: #FFF;">
                    인증 상태를 기다리는 중입니다.
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>

    <v-container class="pt-0 pb-6 pl-5 pr-5 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex flex-column justify-start align-center text-left">
                <div class="back-to-auth-code pb-6 pt-10" @click="goToBack">
                    <img src="../../assets/back-icon.svg">
                </div>
                <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
                    <v-card-title class="pa-0 pb-2 auth-code-title">인증번호를 입력해주세요.</v-card-title>
                    <v-card-text class="pa-0 auth-code-content">인증번호가 수신되지 않는 경우 스팸메시지 차단 기능을 확인하시기 바랍니다.</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 class="d-flex flex-column justify-start align-center text-left">
                <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
                    <v-card class="pa-0 d-flex flex-column justify-center align-center" width="100%" color="transparent" flat tile>
                        <v-card class="pa-0" color="transparent" flat tile>
                            <v-otp-input ref="otpInput" input-classes="otp-input" separator=" " :num-inputs="6" :is-input-num="false" v-if="isLoading == true" />
                            <v-otp-input ref="otpInput" input-classes="otp-input" separator=" " :num-inputs="6" :should-auto-focus="true" :is-input-num="true" @on-change="handleOnChange" @on-complete="handleOnComplete" v-else />
                        </v-card>
                    </v-card>
                    <v-flex class="pa-0 pt-4 d-flex justify-space-between" xs12 sm12 md12>
                        <p class="SendInfo">{{ phoneN }} 로 SMS를 보냈습니다.</p>
                        <p class="RemainTime">{{ remainTime }}</p>
                    </v-flex>
                    <v-flex class="pa-0 d-flex justify-space-between" xs12 sm12 md12>
                        <p class="DoneTime">{{ this.doneTime }}</p>
                        <p class="AgainBtn" text @click="sendOtp" v-if="isLoading == false">인증번호 다시 받기</p>
                        <p class="AgainBtn" text v-else>인증번호 다시 받기</p>
                    </v-flex>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
                <v-flex xs12 sm12 md12 class="pa-0 justify-space-between">
                    <v-card class="text-left pa-0" color="transparent" flat tile>
                        <v-btn depressed tile color="#E61773" width="100%" height="50px" class="auth-next" disabled v-if="!ready || isLoading == true">다음</v-btn>
                        <v-btn depressed tile color="#E61773" width="100%" height="50px" class="auth-next" @click="verifyOtp" v-else>다음</v-btn>
                    </v-card>
                </v-flex>
            </v-flex>
            <div style="display: none;" id="recaptcha-container"></div>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    data: () => ({
        otp: null,
        isDisabled: false,
        isError: false,
        shouldResetOTP: false,
        phoneN: "",
        remainTime: 0,
        ready: 0,
        doneTime: ""
    }),

    computed: {
        ...mapGetters(['isLoading'])
    },

    created() {
        this.$store.dispatch("initReCaptcha");
        this.timeStart();

        if (this.$route.params.phoneNumber == undefined) {
            this.$router.go(-1)
        }
    },

    mounted() {
        console.log(this.$route.params.phoneNumber);
        let start = this.$route.params.phoneNumber.substring(3, 6);
        let mid = this.$route.params.phoneNumber.substring(6, 10);
        let end = this.$route.params.phoneNumber.substring(10, 14);
        this.phoneN = start + "-" + mid + "-" + end;

        this.timeOut();
    },

    beforeDestroy() {
        clearInterval(this.polling);
    },

    methods: {
        goToBack() {
            this.$router.go(-1)
        },

        handleOnComplete(value) {
            this.ready = value
        },

        handleOnChange() {
            this.ready = 0
        },

        timeStart() {
            this.polling = setInterval(() => {
                this.timeOut();
            }, 1000);
        },

        timeOut() {
            var a = new Date() - this.$store.getters.timer;
            let second = 180 - parseInt(a / 1000);
            this.minutes = parseInt(second / 60);
            this.seconds = second % 60;

            if (this.minutes < 10) this.minutes = '0' + this.minutes
            if (this.seconds < 10) this.seconds = '0' + this.seconds

            this.remainTime = this.minutes + ":" + this.seconds;
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.timeStop();
                this.doneTime = "인증번호 유효시간이 만료 됐습니다.";
            }
        },

        timeStop() {
            clearInterval(this.polling);
        },

        verifyOtp() {
            this.$store.dispatch("verifyOtp", {
                otp: this.ready
            });
        },

        async sendOtp() {
            await this.$store.dispatch("sendOtp", {
                phoneNumber: this.$route.params.phoneNumber
            });
            this.doneTime = "인증번호를 재발송하였습니다.";
            clearInterval(this.polling);
            this.timeOut();
            this.timeStart();
        }
    }
};
</script>

<style lang="less">
.otp-input {
    width: 47px;
    height: 47px;
    padding: 5px;
    margin-right: 8px;
    font-size: 20px;
    border-radius: 2px;
    background: #FFFFFF;
    border: 0.5px solid #C4C4C4;
    text-align: center;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    color: #262626;

    &.error {
        border: 1px solid red !important;
    }
}
</style><style scoped>
.back-to-auth-code {
    width: 100%;
    text-align: left;
}

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
    background: red;
    border: 0.5px solid #c4c4c4;
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
    color: #bdbdbd;
}

.RemainTime {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #e61773;
}

.DoneTime {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #eb5757;
}

.AgainBtn {
    text-decoration-line: underline;
    color: #e61773;
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
    color: #ffffff !important;
}
</style>
