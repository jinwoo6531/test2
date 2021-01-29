<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" fluid grid-list-md fill-height>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 class="d-flex justify-left align-start" @click="goToBack">
            <img src="../assets/closing-btn.svg" style="padding-top: 21px; padding-left: 24px;">
        </v-flex>
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
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    data: () => ({
        isrefund: '',
        latest_mid: '',
    }),

    computed: {
        ...mapState(['uid'])
    },

    created() {
        console.log('fail uid: ', this.uid);
        axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.uid)
            .then(response => {
                console.log(response)
                this.isrefund = response.data.isrefund;
                this.latest_mid = response.data.latest_mid;
                console.log(this.latest_mid)
            }).catch(error => {
                console.log('User read: ', error);
            })
    },

    mounted() {
        this.site = this.$route.query.site;
        this.start = this.$route.query.start;
        this.end = this.$route.query.end;
        this.station_startId = parseInt(this.$route.query.station_startId);
        this.station_endId = parseInt(this.$route.query.station_endId);
        this.startName = this.$route.query.startName;
        this.endName = this.$route.query.endName;
        this.count = this.$route.query.count;
        this.minutes = this.$route.query.minutes;
        this.vehicle_id = parseInt(this.$route.query.vehicle_id)
    },

    methods: {
        goToBack() {
            if (this.isrefund == '0') {
                axios({
                    url: "https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/payment/cancel",
                    method: "post",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        merchant_uid: this.latest_mid, // 주문번호 *
                        reason: "타시오 호출 취소", // 환불 사유 *,
                        cancel_request_amount: 1000 * parseInt(this.count)
                    }
                }).then(response => {
                    console.log('환불 완료: ', response);
                    this.$toasted.show("호출이 취소되었습니다.", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(2000);
                    if (this.site == 1) {
                        this.$router.replace('/map/gunsan');
                    } else if (this.site == 2) {
                        this.$router.replace('/map/daegu');
                    } else if (this.site == 3) {
                        this.$router.replace('/map/sejong');
                    } else if (this.site == 4) {
                        this.$router.replace('/map/sangam');
                    }
                }).catch(error => {
                    console.log('환불 실패', error);
                    this.$toasted.show("환불을 실패하였습니다.", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(2000);

                    if (this.site == 1) {
                        this.$router.replace('/map/gunsan');
                    } else if (this.site == 2) {
                        this.$router.replace('/map/daegu');
                    } else if (this.site == 3) {
                        this.$router.replace('/map/sejong');
                    } else if (this.site == 4) {
                        this.$router.replace('/map/sangam');
                    }
                })
            } else {
                this.$toasted.show("결제하신 내역이 없습니다.", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);
                if (this.site == 1) {
                    this.$router.replace('/map/gunsan');
                } else if (this.site == 2) {
                    this.$router.replace('/map/daegu');
                } else if (this.site == 3) {
                    this.$router.replace('/map/sejong');
                } else if (this.site == 4) {
                    this.$router.replace('/map/sangam');
                }
            }
        },

        // 다시 호출
        callAgain() {
            this.$router.replace({
                name: "CallingLayout",
                query: {
                    site: this.site,
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
