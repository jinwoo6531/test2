<template>
<v-container class="pt-0 pb-6 pl-5 pr-5 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-center align-center text-left">
            <v-card class="agree-wrap pa-0" color="transparent" flat tile>
                <v-card-title class="pa-0 pb-4 auth-title">약관에 동의해주세요.</v-card-title>
                <v-card-text class="pa-0 agree-content"><span style="text-decoration-line: underline; color: #E61773;">서비스 이용약관, 개인정보 처리방침, 위치기반서비스 이용약관, 마케팅 정보 수신 동의</span>에 동의하시겠습니까?</v-card-text>

                <v-card-text class="pa-0 pt-9 auth-content" style="float: left;">
                    <span style="float: left;">약관을 확인하였으며, 모두 동의합니다.</span>
                    <v-checkbox :ripple="false" v-model="agree" class="pa-0 ma-0" color="#E61773" style="display: inline-block; float: right;"></v-checkbox>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex flex-column justify-end align-top text-left">

        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
            <v-flex xs12 sm12 md12 class="pa-0 justify-space-between">
                <v-card class="text-left pa-0" color="transparent" flat tile>
                    <v-card-text class="check-ok-info pb-6">
                        서비스 이용약관에 동의함으로써 이벤트, 혜택 등을 알려드리는 마케팅 정보 수신에 동의하게 됩니다.
                    </v-card-text>
                </v-card>
                <v-btn depressed tile :ripple="false" color="#E61773" width="100%" height="50px" class="auth-next" @click="goToWelcome" v-if="agree == true">다음</v-btn>
                <v-btn depressed disabled tile color="#E0E0E0" width="100%" height="50px" class="auth-next" @click="goToWelcome" v-else>다음</v-btn>
            </v-flex>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data: () => ({
        agree: false
    }),

    methods: {
        goToWelcome() {
            this.$router.replace('/auth/register')
        }
    }
}
</script>

<style scoped>
.check-ok-info {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    letter-spacing: -0.035em;
    color: #A7A7A7;
}
</style>
