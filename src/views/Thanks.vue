<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" style="background-color: #FFF;" fluid grid-list-md fill-height>
    <v-layout wrap class="pa-6 ma-0">
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center">
            <v-card color="transparent" flat tile>
                <img src="../assets/access-logo.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-top text-center pa-0" style="margin-top: 43px;">
            <v-card color="transparent" flat tile>
                <img src="../assets/thanks.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-top text-center">
            <v-card class="text-center" color="transparent" flat tile>
                <v-card-text class="thanks-call pt-0">타시오와 함께<br>행복한 여정이 되시길 바랄게요!</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pb-0">
            <v-btn block depressed tile color="#E61773" height="50px" class="ok-btn">확인</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'Thanks'

}
</script>

<style scoped>
.thanks-call {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    line-height: 29px;
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
