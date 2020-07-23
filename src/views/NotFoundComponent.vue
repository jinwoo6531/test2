<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="text-center pa-0">
            <v-card class="text-center" style="padding-top: 110px;" color="transparent" flat tile>
                <v-card-text class="cant-call pa-0">페이지를 찾을 수 없어요...</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="text-center pa-0">
            <v-card color="transparent" flat tile>
                <img src="../assets/404.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="text-center pa-0" style="margin-top: -30px;">
            <v-card class="text-center" color="transparent" flat tile>
                <v-card-text class="cant-call-sub">
                    지금 조회하는 페이지는 사라졌거나 <br>
                    다른 페이지로 변경되었습니다. <br>
                    이전 페이지나 메인으로 이동해주세요.
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center pr-5 pl-5">
            <div style="width: 100%;">
                <v-btn block depressed tile color="#E61773" height="50px" @click="goToBack" class="call-again-btn">이전 페이지 돌아가기</v-btn>
                <v-card link to="/" color="transparent" flat tile class="try-again">메인 바로가기</v-card>
            </div>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    methods: {
        goToBack() {
            this.$router.go(-1)
        }
    }

}
</script>

<style scoped>
.cant-call {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    color: #262626 !important;
}

.cant-call-sub {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    line-height: 19px;
    color: #828282 !important;
    letter-spacing: 0px;
}

.call-again-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    border-radius: 2px;
}

.try-again {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    text-decoration-line: underline;
    color: #262626 !important;
    margin-top: 10px;
    margin-bottom: 38px;
}
</style>
