<template>
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
    <!-- <v-card class="d-flex justify-start call-cancel" color="transparent" flat @click="goToMain"> -->
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
            <v-card class="pa-2 text-center call-msg" color="transparent" flat>
                {{ message }}
            </v-card>
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
</template>

<script>
export default {
    name: 'CallingLayout',

    data: () => ({
        message: '타시오 자율주행 셔틀을 호출 중입니다.',
        ready: false,
        logs: [],
        status: 'disconnected',
        connection: null
    }),

    created() {
        // Web Socket
        this.connection = new WebSocket("ws://115.93.143.2:9103/ws/vehicle")

        // 연결이 성공적으로 열릴 때
        this.connection.onopen = (event) => {
            console.log('connection onopen: ', event)
            this.status = "Successfully connected to 9103 WebSocket Server"
            console.log(this.status)
        }
        // 설정한 WebSocket 연결이 메시지를 받을 때마다
        this.connection.onmessage = (event) => {
            console.log('connection onmessage: ', event)
            // 여기에 배차 정보 로직을 구현한다.
            // alive check를 해주는 것이 중요하다.
            // -> 핑을 보냈는데 서버에서 5초 안에 퐁이 안오면 다시 핑을 보내주어야한다.
        }


        // ☆만약에 ping이 안들어올 때, 연결이 끊어질 때 다시 연결될 수 있게하기!!★

    },

    mounted() {
        this.site = this.$route.params.site
        this.start = this.$route.params.start
        this.end = this.$route.params.end
        this.startName = this.$route.params.startName
        this.endName = this.$route.params.endName
        this.count = this.$route.params.count
        this.minutes = this.$route.params.minutes
        this.ready = true

        setTimeout(() => {
                this.$router.push({
                    name: "CallingShuttle",
                    params: {
                        site: this.site,
                        start: this.start,
                        end: this.end,
                        startName: this.startName,
                        endName: this.endName,
                        count: this.count,
                        minutes: this.minutes
                    }
                })
            }, 3000)

        //     setTimeout(() => {
        //         this.message = '조금만 더 기다려주세요. 타시오에게 연락해볼게요...'
        //     }, 60000)

        // setTimeout(() => {
        //     this.$router.push('/fail')
        // }, 180000)
    },

    computed: {
        /* cardWidth() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    return "232px"
                case "sm":
                    return "232px"
                case "md":
                    return '300px'
                case "lg":
                    return '6800px'
            }
        } */
    },

    methods: {
        callCancelModal() {
            alert('호출을 정말로 취소하세요?')
            this.$router.push('/')
        },

        sendMessage(message) {
            // 우리가 보내고 싶은 메세지
            console.log('sendMessage connection: ', this.connection)
            // 아직 서버에서 보내만주지 send를 하지는 않기 때문에 작동하지 않는다!
            this.connection.send(message)
        },

        disconnect() {
            this.connection.close()
            console.log("socket close")
            this.status = false
        }
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
    width: 100%;
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
    width: 232px;
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
