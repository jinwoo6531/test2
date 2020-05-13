<template>
<v-container class="pa-0 gradient" fluid fill-height>
    <div class="circle"></div>
        <v-card class="d-flex justify-end call-cancel" color="transparent" flat>
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
                    타시오 자율주행 셔틀을 호출 중입니다.
                </v-card>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <v-card color="transparent" flat></v-card>
            </v-col>
        </v-row>
        <v-row no-gutters class="start-end-table">
            <v-col xs="3" sm="3" md="3">
                <v-card class="pa-2" color="transparent" flat>
                    <v-simple-table dense style="background: transparent;">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left" style="border-bottom: none; font-size: 13px;">출발지</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="font-size: 16px;">자율주행테마파크</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
            <v-col xs="4" sm="4" md="4">
                <v-card class="pa-2 arrow-icon" color="transparent" flat>
                    <v-simple-table dense style="background: transparent;">
                        <template v-slot:default>
                            <tbody>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src="../assets/arrow-right.svg">
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
            <v-col xs="3" sm="3" md="3">
                <v-card class="pa-2" color="transparent" flat>
                    <v-simple-table dense style="background: transparent;">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left" style="border-bottom: none; font-size: 13px;">도착지</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>선착장행 주차장</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
</v-container>
</template>

<script>
export default {
    name: 'CallingLayout',

    mounted() {
        setTimeout(() => {
            this.$router.push('/map/callingshuttle')
        }, 3000)
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
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');

.gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(208.69deg, #E6B817 0.28%, #E61773 100.58%);
    position: relative;
}

.call-cancel {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    color: #FFFFFF;
    width: 100%;
    position: absolute;
    top: 16px;
    right: 25px;
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

table tr th,
table tr td {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF !important;
    border-bottom: none !important;
}

.start-end-table {
    position: absolute;
    width: 100%;
    bottom: 30px;
}

.arrow-icon {
    width: 100%;
    height: 100%;
    text-align: center;
}

/* Circle */
.circle {
    height: 200px;
    width: 200px;
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
