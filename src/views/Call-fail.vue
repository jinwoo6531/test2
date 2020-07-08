<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center">
            <v-card color="transparent" flat tile>
                <img src="../assets/kiosk-icon.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-center text-center">
            <v-card class="text-center" color="transparent" flat tile>
                <v-card-text class="cant-call pt-0">타시오를 호출할 수 없습니다.<br>불편을 드려 죄송합니다.</v-card-text>
                <v-card-text class="cant-call-sub">응답 가능한 타시오를 확인할 수 없습니다.<br>더 좋은 서비스 제공을 위해 노력하는<br>타시오 팀이 되겠습니다.</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
            <v-btn block depressed tile color="#E61773" height="50px" class="call-again-btn" @click="callAgain">다시 호출하기</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    mounted() {
        this.site = this.$route.query.site;
        this.start = this.$route.query.start;
        this.end = this.$route.query.end;
        this.startName = this.$route.query.startName;
        this.endName = this.$route.query.endName;
        this.count = this.$route.query.count;
        this.minutes = this.$route.query.minutes;

        alert('this.site: ', this.site)
    },
    
    methods: {
        callAgain() {
            this.$router.replace({
                name: "CallingLayout",
                params: {
                    site: this.site,
                    start: this.start,
                    end: this.end,
                    startName: this.startName,
                    endName: this.endName,
                    count: this.count,
                    minutes: this.minutes
                }
            });
        }
    }
}
</script>

<style scoped>
.cant-call {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.cant-call-sub {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 19px;
    color: #828282;
}

.call-again-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}
</style>
