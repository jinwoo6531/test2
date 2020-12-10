<template>
<!-- 자동 취소 페이지 -->
<v-container class="pa-0 ma-0 flex-wrap text-center" style="background-color: #FFF;" fluid grid-list-md fill-height>
    <v-layout wrap class="ma-0">
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center">
            <v-card color="transparent" flat tile>
                <v-card-text class="auto-cancel pa-0">
                    호출이 자동취소 되었습니다.
                </v-card-text>
                <img src="../assets/auto-cancel.svg" style="margin-top: 25px;">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-center text-center pa-6 pb-4">
            <v-card color="transparent" flat tile>
                <v-card-text class="auto-cancel-content pa-0">
                    셔틀이 출발지에 도착했지만 <br>
                    탑승이 확인되지 않았어요. <br>
                    <br>
                    다음에 다시 이용해주세요.
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pa-6">
            <v-btn block depressed tile color="#2E3990" height="50px" class="ok-btn" @click.native="goToMain">확인</v-btn>
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

.auto-cancel-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    line-height: 20px;
    text-align: center;
    color: #262626 !important;
}

.ok-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}
</style>
