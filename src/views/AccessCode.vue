<template>
<v-container>
    <v-layout>
        <v-flex>
            <input type="number" v-model="otp" placeholder="인증번호" />
            <button @click="verifyOtp">확인</button>
            <br />
            <button @click="sendOtp">재전송</button>
            <div id="recaptcha-container"></div>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data: () => ({
        otp: ""
    }),

    methods: {
        verifyOtp() {
            if (this.otp.length == 6) {
                this.$store.dispatch("verifyOtp", {
                    otp: this.otp
                });
            } else {
                alert("잘못된 인증코드 형식 입니다.")
            }
        },
        
        sendOtp() {
            this.$store
                .dispatch("sendOtp", {
                    phoneNumber: this.$route.params.phoneNumber
                })
                .then(() => {
                    // 만약에 Database에 있는 uid라면
                    this.$router.push({
                        name: "Home"
                    })
                    // 만약에 Database에 없는 uid라면
                    this.$router.push({
                        name: "AccessCode"
                    })
                });
        },
    },

    created() {
        this.$store.dispatch('initReCaptcha');
    }
};
</script>

<style>
</style>
