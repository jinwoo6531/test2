<template>
<v-container class="pt-0 pb-6 pl-5 pr-5 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout wrap class="ma-0">
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-center align-center text-left">
            <v-card class="auth-phone-wrap pa-0" color="transparent" flat tile>
                <v-card-title class="pa-0 pb-2 auth-phone-title">휴대폰 번호를 입력해주세요.</v-card-title>
                <v-card-text class="pa-0 auth-phone-content">SMS로 인증번호를 보냅니다.</v-card-text>
                <v-card-actions class="pa-0 pt-9">
                    <!-- +82 -->
                    <input class="PhoneField d-flex pa-2 pl-4" type="number" v-model="phNo" placeholder="'-' 없이 번호만 입력해주세요." />
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-center align-center text-left">
            
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
            <v-flex xs12 sm12 md12 class="pa-0 justify-space-between">
                <v-card class="text-left pa-0" color="transparent" flat tile>
                    <v-btn depressed tile color="#E61773" id="sign-in-button" width="100%" height="50px" class="phone-next" @click="sendOtp">인증번호 받기</v-btn>
                </v-card>
            </v-flex>
        </v-flex>
        <div style="display: none;" id="recaptcha-container"></div>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: "AccessPhone",

    data: () => ({
        phoneNumber: "",
        phNo: "",
        appVerifier: "",
        otp: "",
        coderesult: 0
    }),

    methods: {
        sendOtp() {
            if (this.phNo.length != 11) {
                alert("전화번호 형식을 지켜주세요!");
            } else {
                let countryCode = "+82"; // Korea
                this.phoneNumber = countryCode + this.phNo
            }
            this.$store
                .dispatch("sendOtp", {
                    phoneNumber: this.phoneNumber
                })
                .then(() => {
                    if (this.phNo.length == 11) {
                        this.$router.push({
                            name: "AccessCode",
                            params: {
                                phoneNumber: this.phoneNumber
                            }
                        })
                    }
                })
        }
    },

    created() {
        this.$store.dispatch('initReCaptcha');
    }
};
</script>

<style>
.auth-phone-wrap {
    width: 100%;
}

.auth-phone-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.auth-phone-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #828282;
}

.PhoneField {
    font-weight: normal;
    font-size: 14px;
    width: 100%;
    height: 50px;
    background: #FFF;
    border: 0.5px solid #C4C4C4;
    border-radius: 2px;
    padding: 20px 18px 0 16px;
}

.phone-next {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    border-radius: 2px !important;
    color: #FFFFFF !important;
}
</style>
