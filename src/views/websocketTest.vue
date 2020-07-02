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
        logs: [],
        status: "disconnected",
        socket: null
    }),

    methods: {
        connect() {
            this.socket = new WebSocket("ws://115.93.143.2:9103");
            this.socket.onopen = (event) => {
                console.log(event)
                /* this.status = "connected";
                this.logs.push({
                    event: "연결 완료: ",
                    data: 'ws://115.93.143.2:9103'
                }) */

                this.socket.onmessage = ({
                    data
                }) => {
                    this.logs.push({
                        event: "배차 수신",
                        data
                    });
                };
            };
        },

        disconnect() {
            this.socket.close();
            this.status = "disconnected";
            this.logs = [];
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
            this.message = {
                where: '',
                who: 'tasio9772',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    site_id: 1, // 지역 번호
                    start: 'start_id', // 출발지 id
                    end: 'end_id', // 도착지 id
                    startName: 'startName', // 출발지 명
                    endName: 'endName', // 도착지 명
                    count: 5, // 탑승객 수
                    minutes: 12, // 소요 시간
                    vehicle_id: 6, // 셔틀 번호
                    value: 'call'
                }
            }

            this.socket.send(this.message);
            this.logs.push({
                event: "배차 요청",
                data: this.message
            });

            this.message = "";
        }
    }
}
</script>
