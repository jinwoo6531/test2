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
            if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.type == 'ondemand') {
                this.vehicle_id = this.webSocketData.how.vehicle_id;
                this.vehicle_mid = this.webSocketData.how.vehicle_mid;
                this.callStatus = this.webSocketData.how.function;
                if (this.callStatus == 'start') {
                    // {
                    //     where: sejong_datahub
                    //     who: server_id
                    //     what: EVENT
                    //     how: {
                    //         type: ondemand(string)
                    //         vehicle_id:  vehicle의 ID(number)
                    //         vehicle_mid: vheicle의 관리 ID(string)
                    //         site_id: vehicle에 소속된 site의 ID(number)
                    //         function: start(string)
                    //         eta: 현재 위치까지 오는데 걸리시간
                    //     }
                    // }
                    console.log('ondemand START EVENT(배차 확인)', this.status);
                    this.$router.replace({
                        name: "CallingShuttle",
                        params: {
                            vehicle_id: this.vehicle_id,
                            vehicle_mid: this.vehicle_mid,
                            site_id: this.webSocketData.how.site_id,
                            eta: this.webSocketData.how.eta,
                            current_station_id: this.webSocketData.how.current_station_id,
                            target_station_id: this.webSocketData.how.target_station_id,
                            passenger: this.webSocketData.how.passenger
                        }
                    })
                }
                if (this.callStatus == 'complete') { // 배차 완료될 경우 (사용자가 나 탔어! 할 때)
                    // {
                    //     where: sejong_datahub
                    //     who: [safety_id]
                    //     what: EVENT
                    //     how: {
                    //         type: ondemand(string)
                    //         vehicle_id: vehicle의 ID(number)
                    //         vehicle_mid: vheicle의 관리 ID(string)
                    //         site_id: vehicle에 소속된 site의 ID(number)
                    //         function: complete(string)
                    //     }
                    // }
                    console.log('ondemand START EVENT(배차 완료)', this.status);
                }
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
