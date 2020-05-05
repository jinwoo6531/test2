<template>
<v-container style="height: 100%;" fluid>
    <v-layout row wrap>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <p class="AccessCodeTitle mb-0">인증번호를 입력해주세요.</p>
        </v-flex>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <p class="AccessCodeSMS mb-0">인증번호가 수신되지 않는 경우 스팸메시지 차단 기능을 확인하시기 바랍니다.</p>
        </v-flex>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <input type="text" v-model="otp" autofocus class="AccessCode" placeholder="인증번호" />
        </v-flex>
        <v-flex class="pa-3 pt-0" d-flex xs12 sm12>
            <v-flex class="pa-0" justify-start d-flex xs8 sm8>
                <p class="SendInfo">{{ this.phoneN }} 로 SMS를 보냈습니다.</p>
            </v-flex>
            <v-flex class="pa-0" justify-end d-flex xs4 sm4>
                <p class="RemainTime">{{$store.getters.timer}}</p>
            </v-flex>
        </v-flex>
        <v-flex class="pa-3 pt-0" d-flex xs12 sm12>
            <v-flex class="pa-0" justify-start d-flex xs8 sm8>
                <p class="DoneTime">인증번호 유효시간이 만료 됐습니다.</p>
            </v-flex>
            <v-flex class="pa-0" justify-end d-flex xs4 sm4>
                <p class="AgainBtn" text @click="sendOtp">인증번호 다시 받기</p>
            </v-flex>
        </v-flex>
        <v-flex class="pa-0" d-flex xs12 sm12>
            <v-footer absolute style="margin-bottom: 24px; background: transparent;">
                <v-btn depressed color="#E0E0E0" @click="verifyOtp" class="NextPageBtn black--text" block>다음</v-btn>
            </v-footer>
        </v-flex>
        <div style="display: none;" id="recaptcha-container"></div>
    </v-layout>
</v-container>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
    computed: {
        ...mapState([
            'timer'
        ])
    },

    data: () => ({
        otp: '',
        phoneN: ''
    }),

    mounted() {
        console.log(this.$route.params.phoneNumber)
        let start = this.$route.params.phoneNumber.substring(3, 6)
        let mid = this.$route.params.phoneNumber.substring(6, 10)
        let end = this.$route.params.phoneNumber.substring(10, 14)
        this.phoneN = start + '-' + mid + '-' + end

        console.log(this.$store.getters.timer - new Date())
    },

    methods: {
        verifyOtp() {
            console.log(typeof (this.$store.getters.timer))
            var a = new Date() - this.$store.getters.timer
            var second = (180 - parseInt(a / 1000)) //1 2 3 ...   179 %60 178 177 
            var minute = parseInt(second / 60)
            console.log(parseInt(a / 1000) )
            console.log('hi,',second % 60, '초')
            console.log('hi,',minute, '분')
            
            


            if (this.otp.length == 6) {
                this.$store.dispatch("verifyOtp", {
                    otp: this.otp
                });
            } else {
                alert("잘못된 인증코드 형식 입니다.")
            }
        },

        sendOtp() {
            this.$store.dispatch("sendOtp", {
                phoneNumber: this.$route.params.phoneNumber
            })
        },
    },

    created() {
        this.$store.dispatch('initReCaptcha');
    }
};
</script>

<style scoped>
.AccessCodeTitle {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.AccessCodeSMS {
    font-weight: normal;
    font-size: 14px;
    color: #828282;
}

.AccessCode {
    width: 100%;
    height: 47px;
    background: #FFFFFF;
    border: 0.5px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 2px;
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

.NextPageBtn {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    border-radius: 2px;
}
</style>
