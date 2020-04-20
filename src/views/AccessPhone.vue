<template>
<v-container style="height: 100%;" fluid :grid-list-md="$vuetify.breakpoint.xs">
    <v-layout row wrap>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <p class="AccessPhoneTitle mb-0">휴대폰 번호를 입력해주세요.</p>
        </v-flex>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <p class="AccessPhoneSMS mb-0">SMS로 인증번호를 보냅니다.</p>
        </v-flex>
        <v-flex class="pa-3" d-flex xs12 sm12>
            <!-- +82 -->
            <input class="PhoneField d-flex pa-2" type="text" v-model="phNo" placeholder="'-' 없이 번호만 입력해주세요." />
        </v-flex>
        <v-flex class="pa-0" d-flex xs12 sm12>
            <v-footer absolute style="margin-bottom: 24px; background: transparent;">
                <v-btn depressed color="#E61773" id="sign-in-button" class="RequestAccessCode white--text" block @click="sendOtp">인증번호 받기</v-btn>
            </v-footer>
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
.AccessPhoneTitle {
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.AccessPhoneSMS {
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

.RequestAccessCode {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    height: 50px;
    border-radius: 2px;
    padding-top: 16px;
    padding-bottom: 14px;
}
</style>
