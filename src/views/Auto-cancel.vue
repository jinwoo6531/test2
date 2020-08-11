<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" style="background-color: #FFF;" fluid grid-list-md fill-height>
    <v-layout wrap class="ma-0">
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center pa-6 pb-4">
            <v-card color="transparent" flat tile>
                <img src="../assets/access-logo.svg" style="margin-top: 19px;">
                <v-card-text class="auto-cancel pa-0">
                    호출이 자동취소 됐습니다.
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pa-6">
            <v-btn block depressed tile color="#2E3990" height="50px" class="ok-btn" @click="goToMain">확인</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'AutoCancel',

    methods: {
        goToMain() {
            this.$router.replace('/');
        }
    }

}
</script>

<style scoped>
.auto-cancel {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    color: #262626 !important;
    margin-top: 36px !important;
}

.ok-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}
</style>
