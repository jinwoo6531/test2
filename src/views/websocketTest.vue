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
        var msgSend = false;
        this.socket = new WebSocket("ws://222.114.39.8:9103");
        this.socket.onopen = (event) => {
            console.log('onopen', event);
            this.status = 'connected';

            this.socket.onmessage = ({ data }) => { // websocket에 있는 정보들을 받는다.
                this.webSocketData = JSON.parse(data);
                console.log('webSocketData: ', this.webSocketData);
                if (this.webSocketData.what == 'PING') {
                    if (msgSend == false) {
                        this.sendMessage();
                        msgSend = true;
                    }
                    this.webSocketData = JSON.parse(data);
                }
            };
        }

    },

    watch: {
        webSocketData() {
            this.vehicle_id = this.webSocketData.how.vehicle_id;
            this.vehicle_mid = this.webSocketData.how.vehicle_mid;
            this.callStatus = this.webSocketData.how.function;
            if (this.callStatus == 'complete') { // 배차 완료될 경우
                console.log('배차 완료')
                this.$router.replace({
                    name: "CallingShuttle",
                    params: {
                        vehicle_id: this.vehicle_id,
                        vehicle_mid: this.vehicle_mid,
                        site_id: this.webSocketData.how.site_id,
                        start: this.webSocketData.how.current_station_id,
                        end: this.webSocketData.how.target_station_id,
                        count: this.webSocketData.how.passenger
                    }
                })
            }
        }
    },

    methods: {
        sendMessage() { // ondemand 측에서 보내줘야 할 데이터
            this.webSocketData = {
                where: '',
                who: 'tasio_id',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    vehicle_id: 5,
                    function: 'call',
                    current_station_id: 12,
                    target_station_id: 13,
                    passenger: 2
                }
            }

            this.socket.send(JSON.stringify(this.webSocketData));
        },

        disconnect() {
            this.socket.close();
            this.status = "disconnected";
            console.log('socket', this.status);
        },
    },

    destroyed() {
        this.disconnect();
    },
}
</script>
