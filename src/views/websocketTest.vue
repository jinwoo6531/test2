<template>
<div id="app">
    <button @click="disconnect" v-if="status === 'connected'">연결끊기</button>
    <button @click="connect" v-if="status === 'disconnected'">연결</button> {{ status }}
    <br /><br />
    <div v-if="status === 'connected'">
        <form @submit.prevent="sendMessage" action="#">
            <input v-model="message"><button type="submit">배차 요청</button>
        </form>
        <ul id="logs">
            <li v-for="log in logs" :key="log" class="log">
                {{ log.event }}: {{ log.data }}
            </li>
        </ul>
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
        this.socket = new WebSocket('ws://115.93.143.2:9103');
        this.socket.onopen = (event) => {
            console.log(event);
            this.status = 'connection';

            this.socket.onmessage = ({
                data
            }) => { // websocket에 있는 정보들을 받는다.
                this.webSocketData = data;
            };
        }
    },

    destroyed() {
        this.disconnect();
    },

    watch: {
        webSocketData() {
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
        disconnect() {
            this.socket.close();
            this.status = "disconnected";
        },

        sendMessage() {
            /* {
                where: '' # not mandatory
                who: [tasio_id]
                what: EVENT
                how: {
                    type: ondemand(string)
                    vehicle_id: vehicle의 ID(number)
                    value: call(string)
                }
            } */
            this.message = { // ondemand 측에서 보내줘야 할 데이터
                who: 'tasio9772',
                site_id: this.$route.query.site, // 지역 번호
                start: this.$route.query.start, // 출발지 id
                end: this.$route.query.end, // 도착지 id
                startName: this.$route.query.startName, // 출발지 명
                endName: this.$route.query.endName, // 도착지 명
                count: this.$route.query.count, // 탑승객 수
                minutes: this.$route.query.minutes, // 소요 시간
                vehicle_id: ''
            }

            this.socket.send(this.message);
        }
    }
}
</script>
