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
        <v-flex xs12 sm12 md12 class="justify-center align-top pa-0" style="height: 230px">
            <v-card color="#E0E0E0" flat tile class="pa-6 persentH">
                <v-card color="#FFF" flat tile class="persentH">
                    <v-card-text class="pa-0 cancel-info1" style="text-align: left; padding-top: 18px !important; padding-left: 26px !important; padding-bottom: 9px !important;">내역</v-card-text>
                    <v-divider class="ml-5 mr-5"></v-divider>
                    <v-row class="ma-0 pl-9 pr-9" style="padding-top: 14px;">
                        <v-col class="pa-0 cancel-info2">총 탑승요금</v-col>
                        <v-col class="pa-0 cancel-info3">{{ 1000 * parseInt(this.count) }}</v-col>
                    </v-row>
                    <v-row class="ma-0 pl-9 pr-9" style="padding-bottom: 13px !important;">
                        <v-col class="pa-0 cancel-info2">x 위약금</v-col>
                        <v-col class="pa-0 cancel-info4">총 탑승요금의 50%</v-col>
                    </v-row>
                    <v-divider class="ml-5 mr-5"></v-divider>
                    <v-row class="ma-0 pl-9 pr-9">
                        <v-col class="pa-0 pt-4 cancel-info5" style="text-align: left;">취소 위약금</v-col>
                        <v-col class="pa-0 pt-2 cancel-info6" style="text-align: right;">{{ 500 * parseInt(this.count) }}<span style="font-size: 14px !important;">원</span></v-col>
                    </v-row>
                </v-card>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="justify-center text-center pa-6 pb-0">
            <v-card class="text-center" color="transparent" flat tile style="padding-top: 15px !important;">
                <v-card-text class="why-not-ride pt-0 pb-0">
                    셔틀이 출발지에 도착한 후 <br>
                    5분이 지났지만 탑승이 확인되지 않았어요.
                </v-card-text>
                <v-card-text class="why-not-ride pa-0 pt-4">
                    탑승요금 {{ 1000 * parseInt(this.count) }}원의 50%가 <br>
                    취소 위약금으로 발생하며 차액은 환불됩니다.
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="justify-center text-center pa-6 pt-0">
            <v-card class="text-center" color="transparent" flat tile>

            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pa-6">
            <v-btn block depressed tile color="#E61773" height="50px" class="ok-btn" @click="goToMain">확인</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'AutoCancel',

    data:() => ({
        count: 0
    }),

    computed: {
        allPay() {
            let pay = 1000 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        payment() {
            let pay = 500 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    mounted() {
        this.count = this.$route.query.passenger_count;
    },

    methods: {
        goToMain() {
            this.$router.replace('/');
        }
    }

}
</script>

<style scoped>
.cancel-info1 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    color: #828282 !important;
}

.cancel-info2 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    line-height: 20px;
    color: #828282 !important;
    text-align: left;
}

.cancel-info3 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #262626 !important;
    text-align: right;
}

.cancel-info4 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #EB5757 !important;
    text-align: right;
}

.cancel-info5 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #262626 !important;
}

.cancel-info6 {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 24px !important;
    color: #EB5757 !important;
}

.auto-cancel {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    color: #262626 !important;
    margin-top: 36px !important;
}

.why-not-ride {
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
