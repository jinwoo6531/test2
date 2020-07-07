<template>
<div id="app">
    <h3>WEB SOCKET TEST</h3>
    <div v-if="status === 'connected'">
        connected!
    </div>
    <div v-else>
        disconnected!
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
        message: "",
        webSocketData: {},
        status: "disconnected",
        socket: null,
        callStatus: 'no'

    }),

    created() {
        this.socket = new WebSocket('ws://222.114.39.8:9103/ws/vehicle');
        this.socket.onopen = (event) => {
            console.log(event);
            this.status = 'connected';

            this.socket.onmessage = ({ data }) => { // websocket에 있는 정보들을 받는다.
                this.webSocketData = data;
                console.log('webSocketData: ', this.webSocketData);
                this.sendMessage();
            };
        }
    },

    watch: {
        webSocketData() {
            console.log('watch webSocketData: ', this.webSocketData)
            // PONG 날라오면?
            if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.type == 'ondemand') {
                this.vehicle_id = this.webSocketData.how.vehicle_id;
                this.callStatus = this.webSocketData.how.value;
                if (this.callStatus == 'call') {
                    this.$router.replace({
                        name: "CallingShuttle",
                        params: {
                            site: this.webSocketData.how.site,
                            start: this.webSocketData.how.start,
                            end: this.webSocketData.how.end,
                            startName: this.webSocketData.how.startName,
                            endName: this.webSocketData.how.endName,
                            count: this.webSocketData.how.count,
                            minutes: this.webSocketData.how.minutes,
                            vehicle_id: this.vehicle_id
                        }
                    })
                }
            }
        }
    },

    methods: {
        sendMessage() {
            // this.message = { // ondemand 측에서 보내줘야 할 데이터
            //     who: 'tasio9772',
            //     site_id: this.$route.query.site, // 지역 번호
            //     start: this.$route.query.start, // 출발지 id
            //     end: this.$route.query.end, // 도착지 id
            //     startName: this.$route.query.startName, // 출발지 명
            //     endName: this.$route.query.endName, // 도착지 명
            //     count: this.$route.query.count, // 탑승객 수
            //     minutes: this.$route.query.minutes, // 소요 시간
            //     vehicle_id: ''
            // }

            this.message = { // ondemand 측에서 보내줘야 할 데이터
                who: 'tasio9772',
                site_id: 1, // 지역 번호
                start: 9, // 출발지 id
                end: 10, // 도착지 id
                startName: '자율주행테마파크', // 출발지 명
                endName: '고군산 관광벨트', // 도착지 명
                count: 2, // 탑승객 수
                minutes: '12', // 소요 시간
                vehicle_id: ''
            }

            console.log('msg: ', this.message)

            this.socket.send(this.message);
        },

        disconnect() {
            this.socket.close();
            this.status = "disconnected";
        },
    },

    destroyed() {
        this.disconnect();
    },
}
</script>
