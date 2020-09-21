<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 class="d-flex justify-left align-start">
            <img src="../assets/closing-btn.svg" style="padding-top: 21px; padding-left: 24px;" @click="goToBack">
        </v-flex>
        <v-flex xs12 class="d-flex justify-center align-start text-center">
            <v-card color="transparent" flat tile>
                <img src="../assets/kiosk-icon.svg">
            </v-card>
        </v-flex>
        <v-flex xs12 class="d-flex justify-center align-start text-center">
            <v-card class="text-center" color="transparent" flat tile>
                <v-card-text class="cant-call-sub">응답 가능한 셔틀을 확인할 수 없습니다.<br>더 좋은 서비스 제공을 위해 노력하겠습니다.</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 class="d-flex align-end pb-0">
            <v-btn block depressed tile color="#2E3990" height="50px" class="call-again-btn" @click.native="callAgain">다시 호출하기</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    mounted() {
        this.start = this.$route.query.start;
        this.end = this.$route.query.end;
        this.station_startId = parseInt(this.$route.query.station_startId);
        this.station_endId = parseInt(this.$route.query.station_endId);
        this.startName = this.$route.query.startName;
        this.endName = this.$route.query.endName;
        this.count = this.$route.query.count;
        this.minutes = this.$route.query.minutes;
        this.vehicle_id = parseInt(this.$route.query.vehicle_id);
    },

    methods: {
        goToBack() {
            this.$toasted.show("호출이 취소되었습니다.", {
                theme: "bubble",
                position: "top-center"
            }).goAway(2000);
            this.$router.replace('/');
        },

        callAgain() {
            this.$router.replace({
                name: "CallingLayout",
                query: {
                    start: this.start,
                    end: this.end,
                    station_startId: this.station_startId,
                    station_endId: this.station_endId,
                    startName: this.startName,
                    endName: this.endName,
                    count: this.count,
                    minutes: this.minutes,
                    vehicle_id: this.vehicle_id
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
