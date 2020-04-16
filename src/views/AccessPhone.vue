<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <h3>휴대전화 인증</h3>+82
            <input type="number" v-model="phNo" placeholder="전화번호" />
            <button id="sign-in-button" @click="sendOtp">보내기</button>
            <div id="recaptcha-container"></div>
            <br />
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: "AccessPhone",

    data: () => ({
        phoneNumber: "",
        phNo: "1012345678",
        appVerifier: "",
        otp: "",
        coderesult: 0
    }),

    methods: {
        sendOtp() {
            if (this.phNo.length != 10) {
                alert("전화번호 형식을 지켜주세요!");
            } else {
                let countryCode = "+82"; // Korea
                this.phoneNumber = countryCode + this.phNo;
            }
            this.$store
                .dispatch("sendOtp", {
                    phoneNumber: this.phoneNumber
                })
                .then(() => {
                    this.$router.push({
                        name: "AccessCode",
                        params: {
                            phoneNumber: this.phoneNumber
                        }
                    });
                });
        }
    },
    
    created() {
        this.$store.dispatch('initReCaptcha');
    }
};
</script>

<style>
</style>
