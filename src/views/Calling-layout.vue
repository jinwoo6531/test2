<template>
<v-app style="position: relative;">
    <v-container class="pa-0 gradient" fluid fill-height v-if="ready">
        <div class="circle"></div>
        <div class="start-info">
            <span class="info-title">출발지</span>
            <br>
            <span>{{ startName }}</span>
        </div>
        <div class="end-info">
            <span class="info-title">도착지</span>
            <br>
            <span>{{ endName }}</span>
        </div>
        <v-card class="d-flex justify-start call-cancel" color="transparent" flat @click="callCancelModal">
            호출 취소하기
        </v-card>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <v-card color="transparent" flat></v-card>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <v-card class="pa-2 text-center call-msg" color="transparent" v-html="message" flat></v-card>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <v-card color="transparent" flat></v-card>
            </v-col>
        </v-row>
        <v-row no-gutters class="start-end-table">
            <v-col xs="12" sm="12" md="12">
                <v-card class="pa-2" color="transparent" flat>
                    <v-card-text class="mb-0 pt-0 pb-0 user-select-info">탑승인원 <span>{{ count }}명</span></v-card-text>
                    <v-card-text class="mb-0 pt-2 pb-0 user-select-info">소요시간 <span>{{ minutes }}분</span></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import {
    mapState
} from 'vuex'
import axios from 'axios'

export default {
    name: 'CallingLayout',

    data: () => ({
        message: '자율주행 셔틀을<br/>호출하고 있어요',
        ready: false,
        displayName: '',
        status: 'disconnected',
        webSocketData: {},
        webSocketData2: {},
        timeCount: 0
    }),

    computed: {
        ...mapState(['uid'])
    },

    created() {
        axios.get('https://ondemand.tasio.io:400/shuttle-9d5cb/us-central1/app/api/read/' + this.uid)
            .then(response => {
                this.displayName = response.data.displayName;

                this.onOpenWebsocket();
                this.onMessageWebSocket();
            }).catch(error => {
                console.log('User read: ', error);
            })

    },

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

        this.ready = true;

        this.failTimer = setTimeout(() => {
            this.$router.replace({
                name: "CallFail",
                query: {
                    start: this.start,
                    end: this.end,
                    station_startId: this.station_startId,
                    station_endId: this.station_endId,
                    startName: this.startName,
                    endName: this.endName,
                    count: this.count,
                    minutes: this.minutes,
                    vehicle_id: parseInt(this.$route.query.vehicle_id)
                }
            });
        }, 60000);
    },

    watch: {
        socket() {
            let webSocketError = this.socket.onerror = (error) => {
                this.$toasted.show(`WebSocket 서버와 통신 중에 에러가 발생했습니다.  ${error}`, {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);
            };

            let webSocketClose = this.socket.onclose = () => {
                this.$toasted.show('WebSocket 서버와 접속이 끊기면 호출되는 함수', {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);
            };

            if (webSocketError || webSocketClose) {
                this.disconnect();
                this.onOpenWebsocket();
                this.onMessageWebSocket();
            }
        }
    },

    methods: {
        callCancelModal() {
            // WebSocket Cancel
            this.cancleMessage();
            this.disconnect();

            this.$toasted.show("호출이 취소되었습니다.", {
                theme: "bubble",
                position: "top-center"
            }).goAway(2000);
            this.$router.replace('/');
        },

        onOpenWebsocket() {
            // this.socket = new WebSocket("wss://ws.tasio.io:11511", [],{
            //    rejectUnauthorized: false
            //});
            this.socket = new WebSocket("wss://ws.tasio.io:11511", [] );
            // this.socket = new WebSocket("ws://222.114.39.8:11411");
            this.socket.onopen = (event) => {
                console.log('onopen', event);
                this.sendMessage();
            }
        },

        onMessageWebSocket() {
            this.socket.onmessage = ({
                data
            }) => { // websocket에 있는 정보들을 받는다.
                this.webSocketData = JSON.parse(data);
                console.log(this.webSocketData.what, 'webSocketData: ', this.webSocketData);
                if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.type == 'ondemand' && this.webSocketData.how.function == 'go' && this.webSocketData.how.uid == this.uid) {
                    this.$router.replace({
                        name: "CallingShuttle",
                        params: {
                            socket: this.socket,
                            vehicle_id: this.webSocketData.how.vehicle_id, // vehicle의 ID(number)
                            vehicle_mid: this.webSocketData.how.vehicle_mid, // vheicle의 관리 ID(string)
                            site_id: this.webSocketData.how.site_id, // vehicle에 소속된 site의 ID(number)
                            current_station_id: this.start,
                            target_station_id: this.end,
                            passenger: this.count
                        }
                    })

                }
            };
        },

        /* sendMessage() { // 테스트용
            this.webSocketData = {
                where: '',
                who: 'tasio_id',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    vehicle_id: 4,
                    function: 'call',
                    current_station_id: 9,
                    target_station_id: 10,
                    passenger: 2,
                    passenger_name: "타시오",
                    uid: this.uid
                }
            };

            this.socket.send(JSON.stringify(this.webSocketData));
        }, */

        sendMessage() { // ondemand 측에서 보내줘야 할 데이터
            this.webSocketData = {
                where: '',
                who: 'tasio_id',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    vehicle_id: this.vehicle_id,
                    function: 'call',
                    current_station_id: this.station_startId,
                    target_station_id: this.station_endId,
                    passenger: this.count,
                    passenger_name: this.displayName,
                    uid: this.uid
                }
            };

            this.socket.send(JSON.stringify(this.webSocketData));
        },

        cancleMessage() {
            this.webSocketData2 = {
                where: '',
                who: 'tasio_id',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    vehicle_id: parseInt(this.$route.query.vehicle_id),
                    function: 'cancel_call',
                    current_station_id: parseInt(this.$route.query.station_startId),
                    target_station_id: parseInt(this.$route.query.station_endId),
                    passenger: parseInt(this.$route.query.count),
                    passenger_name: this.displayName,
                    uid: this.uid
                }
            };

            this.socket.send(JSON.stringify(this.webSocketData2));
        },

        disconnect() {
            this.socket.close();
            this.status = "disconnected";
            console.log('socket', this.status);
        }
    },

    destroyed() {
        // this.disconnect();
        clearTimeout(this.waitTimer);
        clearTimeout(this.failTimer);
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');

.gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(208.69deg, #00CFFF 0.28%, #BE378B 66.62%, #E61773 100.58%);
    position: relative;
}

.call-cancel {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    position: absolute;
    top: 16px;
    padding-left: 25px;
}

.call-msg {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    color: #FFFFFF;
    margin: 0 auto;
}

.start-end-table {
    position: absolute;
    width: 100%;
    bottom: 30px;
}

.user-select-info {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8) !important;
}

.user-select-info>span {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
    padding-left: 12px;
}

.start-info,
.end-info {
    position: absolute;
    width: 100%;
    text-align: center;
}

.start-info {
    top: 160px;
}

.start-info span,
.end-info span {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}

.info-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    color: #FFFFFF;
    opacity: 0.7;
}

.end-info {
    bottom: 160px;
}

/* Circle */
.circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transition: height .25s ease, width .25s ease;
    transition: height .25s ease, width .25s ease;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.circle:before,
.circle:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    border: 0.5px solid #FFF;
}

.circle:before {
    -webkit-animation: ripple 2s linear infinite;
    animation: ripple 2s linear infinite;
}

.circle:after {
    -webkit-animation: ripple 2s linear 1s infinite;
    animation: ripple 2s linear 1s infinite;
}

@-webkit-keyframes ripple {
    0% {
        -webkit-transform: scale(1);
    }

    75% {
        -webkit-transform: scale(1.75);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(2);
        opacity: 0;
    }
}

@keyframes ripple {
    0% {
        transform: scale(0.5);
    }

    75% {
        transform: scale(1.75);
        opacity: 1;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
