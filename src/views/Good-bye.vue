<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" fluid fill-height>
    <v-layout wrap class="ma-0">
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center pb-0 mt-10">
            <v-card color="transparent" flat tile>
                <img src="../assets/goodbyeok.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-start text-center">
            <v-card class="text-center" color="transparent" flat tile>
                <v-card-text class="goodbye-title">회원탈퇴가 완료 되었습니다.</v-card-text>
                <v-card-text class="goodbye-sub">
                    그동안 타시오를 이용해주셔서 <br>
                    대단히 감사합니다. <br>
                    보다 나은 서비스로 다시 찾아 뵙겠습니다.
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
            <v-btn block depressed tile color="#E61773" height="50px" class="go-to-accessphone" @click="goToAccessphone">확인</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'GoodBye',

    methods: {
        goToAccessphone() {
            this.$firebase.auth().signOut()
                .then(() => {
                    this.$router.replace('/auth/accessphone')
                });
        }
    }

}
</script>

<style scoped>
.goodbye-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    color: #262626 !important;
    padding: 0px;
    padding-top: 47px !important;
}

.goodbye-sub {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    line-height: 23px;
    color: #555555 !important;
    padding: 0px;
    padding-top: 43px !important;
}

.go-to-accessphone {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}
</style>
