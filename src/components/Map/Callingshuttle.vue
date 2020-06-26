<template>
<v-container class="map-container pa-0 ma-0 flex-wrap" fluid grid-list-md fill-height>
    <v-layout row wrap class="ma-0">
        <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%; height: 100%;">
            <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
        </v-flex>
        <v-flex class="d-flex flex-column justify-start text-center pa-0 call-infomation color: #FFF" xs12 sm12 md12 v-if="ready">
            <v-card flat tile color="transparent">
                <v-card-text class="pa-6 pr-3">
                    <v-row no-gutters>
                        <v-col cols="9">
                            <v-card class="pa-0 text-left" tile flat>
                                <v-card-text class="pa-0 pl-1 pb-3 desination"><span style="padding-right: 15px; font-size: 13px; color: #27AE60;">출발지</span>{{ startName }}</v-card-text>
                                <v-card-text class="pa-0 pl-1 pb-2 desination"><span style="padding-right: 15px; font-size: 13px; color: #EB5757;">도착지</span>{{ endName }}</v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="3">
                            <v-card class="pa-0 text-center" tile flat>
                                <v-card-text class="pa-0 pb-3 arrive-wrap">탑승인원</v-card-text>
                                <v-card-text class="pa-0 desination" style="font-size: 18px !important;">{{ count }}명</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-list class="pa-0" color="transparent">
                    <v-list-item color="transparent">
                        <v-list-item-content style="text-align: right;">
                            <v-list-item-title class="desination-info-title">셔틀 번호</v-list-item-title>
                            <v-list-item-subtitle class="desination-info-subtitle">SCN004</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar class="ma-4" width="56px" height="56px">
                            <v-img src="../../assets/profile.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content style="text-align: left;">
                            <v-list-item-title class="desination-info-title">담당자</v-list-item-title>
                            <v-list-item-subtitle class="desination-info-subtitle">주장혁</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <span class="arrive-time">약 {{ minutes }}분 후</span> 셔틀이 출발지에 도착합니다.
                <v-card-actions class="pa-0 pt-5 call-cancel-btn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="callCancel">호출 취소하기</v-btn>
                    <v-dialog v-model="callcanceldialog" max-width="280">
                        <v-card style="width: 280px; height: 242px; background-color: transparent;">
                            <v-card flat class="dialog-background" style="background-color: transparent;">
                                <v-card-text class="pa-3 text-center">
                                    <v-card-text class="pa-0 pt-1 call-dialog-title">호출을 취소하세요?</v-card-text>
                                    <v-card-text class="pa-0 pt-1 call-dialog-subtitle">취소 위약금</v-card-text>
                                    <v-card-text class="pa-0 call-dialog-paymony">500<span style="font-size: 14px !important;">원</span></v-card-text>
                                </v-card-text>

                                <v-card-text class="pa-6 text-center" style="padding-top: 23px !important;">
                                    <v-card-text class="pa-0 call-dialog-content">탑승요금 1,000원의 50%가<br>취소 위약금으로 결제됩니다.</v-card-text>
                                </v-card-text>

                                <v-card flat class="pa-0 d-flex align-self-end">
                                    <v-container class="pa-0">
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-btn color="#FAFAFA" tile depressed class="pa-0 call-cancel-dialog-btn" width="100%" height="56.5px" @click="callcanceldialog = false">호출 유지하기</v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn color="#E61773" tile depressed class="pa-0 call-dialog-btn" width="100%" height="56.5px" @click="callCancleBtn">호출 취소하기</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-card>
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    name: 'CallingShuttle',

    data: () => ({
        ready: false,
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        stationList: [],
        start_icon: {},
        end_icon: {},
        setLat: '',
        setLon: '',
        waypoints: [],
        callcanceldialog: false,

        isrefund: '',
        latest_mid: ''
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),
    },

    created() {
        axios.get('http://34.64.137.217:5000/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
            .then(response => {
                this.isrefund = response.data.isrefund
                this.latest_mid = response.data.latest_mid
            }).catch(error => {
                console.log('User read: ', error)
            })
    },

    mounted() {
        this.site = this.$route.params.site
        this.start = this.$route.params.start
        this.end = this.$route.params.end
        this.startName = this.$route.params.startName
        this.endName = this.$route.params.endName
        this.count = this.$route.params.count
        this.minutes = this.$route.params.minutes

        this.getStation()
        this.ready = true

        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        })

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {})
    },

    methods: {
        getStation() {
            axios.get('/api/stations/')
                .then(response => {
                    if (response.status == 200) {
                        let station_result = response.data
                        let station_count = Object.keys(station_result).length
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == this.site) {
                                this.stationList.push(station_result[i])
                                this.stationList = this.stationList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1
                                })
                            }
                        }

                        // Map View Center Load
                        if (this.site == 1) {
                            this.map.setView([35.812484, 126.4091], 15)
                        } else if (this.site == 2) {
                            this.map.setView([35.836673, 128.686520], 15)
                        } else if (this.site == 3) {
                            this.map.setView([36.599351, 127.270606], 15)
                        } else if (this.site == 4) {
                            this.map.setView([37.579200, 126.888880], 15)
                        }

                        this.getRouting()
                    }
                }).catch(error => {
                    console.log('station (GET) error: ')
                    this.error = error
                    console.log(error)
                })
        },

        getRouting() {
            let startIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/start-icon.svg"),
                iconSize: [40, 40]
            })

            let endIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/end-icon.svg"),
                iconSize: [40, 40]
            })

            // Gunsan
            if (this.site == 1) {
                if (this.start >= 9 && this.end >= 9) {
                    // ADD Between Station
                    if (this.start >= 9 && this.end >= 9 && this.start > this.end && this.start != this.end) {
                        for (let i = this.start; i <= this.end; i++) {
                            this.waypoints.push({
                                lat: this.stationList[i - 9].lat,
                                lng: this.stationList[i - 9].lon
                            })
                        }

                    } else {
                        this.$toasted.show("지원하지 않는 경로입니다...", {
                            theme: "bubble",
                            position: "top-center"
                        }).goAway(800);
                    }

                    if (this.start === '9') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '10') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '11') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '12') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '13') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[4].lat, this.stationList[4].lon], {
                            icon: startIcon
                        })
                    }

                    if (this.end === '9') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '10') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '11') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '12') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '13') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[4].lat, this.stationList[4].lon], {
                            icon: endIcon
                        })
                    }
                }
            } else if (this.site == 2) {
                // Daegu
                if (this.start >= 1 && this.end >= 1) {
                    if (this.start < this.end) {
                        for (let i = this.start; i <= this.end; i++) {
                            this.waypoints.push({
                                lat: this.stationList[i - 1].lat,
                                lng: this.stationList[i - 1].lon
                            })
                        }

                    } else if (this.start > this.end) {
                        this.waypoints.push({
                            lat: this.stationList[this.start - 1].lat,
                            lng: this.stationList[this.start - 1].lon
                        })
                        for (let i = this.start;
                            (i % 4) != this.end; i++) {
                            this.waypoints.push({
                                lat: this.stationList[i % 4].lat,
                                lng: this.stationList[i % 4].lon
                            })
                        }
                        // SAME Station Id
                    } else if (this.start == this.end) {
                        switch (this.start) {
                            case 1:
                                this.waypoints.push({
                                    lat: this.stationList[0].lat,
                                    lng: this.stationList[0].lon
                                }, {
                                    lat: this.stationList[1].lat,
                                    lng: this.stationList[1].lon
                                }, {
                                    lat: this.stationList[2].lat,
                                    lng: this.stationList[2].lon
                                }, {
                                    lat: this.stationList[3].lat,
                                    lng: this.stationList[3].lon
                                }, {
                                    lat: this.stationList[0].lat,
                                    lng: this.stationList[0].lon
                                })
                                break
                            case 2:
                                this.waypoints.push({
                                    lat: this.stationList[1].lat,
                                    lng: this.stationList[1].lon
                                }, {
                                    lat: this.stationList[2].lat,
                                    lng: this.stationList[2].lon
                                }, {
                                    lat: this.stationList[3].lat,
                                    lng: this.stationList[3].lon
                                }, {
                                    lat: this.stationList[0].lat,
                                    lng: this.stationList[0].lon
                                }, {
                                    lat: this.stationList[1].lat,
                                    lng: this.stationList[1].lon
                                })
                                break
                            case 3:
                                this.waypoints.push({
                                    lat: this.stationList[2].lat,
                                    lng: this.stationList[2].lon
                                }, {
                                    lat: this.stationList[3].lat,
                                    lng: this.stationList[3].lon
                                }, {
                                    lat: this.stationList[0].lat,
                                    lng: this.stationList[0].lon
                                }, {
                                    lat: this.stationList[1].lat,
                                    lng: this.stationList[1].lon
                                }, {
                                    lat: this.stationList[2].lat,
                                    lng: this.stationList[2].lon
                                })
                                break
                            default:
                                this.waypoints.push({
                                    lat: this.stationList[3].lat,
                                    lng: this.stationList[3].lon
                                }, {
                                    lat: this.stationList[0].lat,
                                    lng: this.stationList[0].lon
                                }, {
                                    lat: this.stationList[1].lat,
                                    lng: this.stationList[1].lon
                                }, {
                                    lat: this.stationList[2].lat,
                                    lng: this.stationList[2].lon
                                }, {
                                    lat: this.stationList[3].lat,
                                    lng: this.stationList[3].lon
                                })
                        }
                    }

                    if (this.start === '1') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '2') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '3') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                            icon: startIcon
                        })
                    } else if (this.start === '4') {
                        this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                            icon: startIcon
                        })
                    }

                    if (this.end === '1') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '2') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '3') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                            icon: endIcon
                        })
                    } else if (this.end === '4') {
                        this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                            icon: endIcon
                        })
                    }
                }
            }

            this.$utils.map.createRouting(this.map, {
                waypoints: this.waypoints,
                serviceUrl: 'http://115.93.143.2:8104/route/v1',
                addWaypoints: false,
                draggableWaypoints: false,
                showAlternatives: false,
                routeWhileDragging: false,
                lineOptions: {
                    draggable: false,
                    styles: [{
                        color: '#E51973',
                        weight: 5
                    }]
                },
                draggable: false,
                autoRoute: true,
                show: false,
                createMarker: function () {
                    return null;
                }
            })

            console.log('waypoint', this.waypoints)
            console.log('start', this.start)
            console.log('start typeof', typeof (this.start))
            console.log('end', this.end)
            console.log('end typeof', typeof (this.end))
        },

        callCancel() {
            this.callcanceldialog = true
        },

        callCancleBtn() {
            // Firestore에서 회원정보를 조회하고 isRefund가 0이면 환불을 진행할 수 있게 1이면 이미 환불이 된 상태라 불가능하게하기
            // merchant_uid에 last_merchant 담아서 보내주고 reason 담아서 보내주기
            if (this.isrefund == '0') {
                axios({
                    url: "http://34.64.137.217:5000/tasio-288c5/us-central1/app/api/payment/cancel",
                    method: "post",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        merchant_uid: this.latest_mid, // 주문번호 *
                        reason: "타시오 호출 취소", // 환불 사유 *,
                        cancel_request_amount: 500
                    }
                }).then(response => {
                    console.log('환불 완료: ', response)
                    console.log('latest_mid: ', this.latest_mid)
                }).catch(error => {
                    this.$toasted.show("환불을 실패하였습니다.", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(2000);

                    console.log('환불 실패', error)
                })

                this.$router.replace('/')
            } else {
                this.$toasted.show("결제하신 내역이 없습니다.", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);
            }

        }
    },
}
</script>

<style scoped>
.call-infomation {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #FFF;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 35px 35px 0px 0px;
    z-index: 9;
}

.arrive-wrap {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    border: none;
    color: #BDBDBD;
}

.desination {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    color: #262626 !important;
}

.desination-info-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #828282;
}

.desination-info-subtitle {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #262626 !important;
}

.arrive-time {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #E61773;
}

.call-cancel-btn {
    width: 100%;
}

.v-dialog {
    border-radius: 0 !important;
    box-shadow: none !important;
}

.dialog-background {
    width: 2801px;
    height: 242px;
    background-image: url('~@/assets/call-cancel-dialog.png');
}

.call-dialog-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #4F4F4F !important;
}

.call-dialog-subtitle {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    color: #BDBDBD !important;
}

.call-dialog-paymony {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 24px !important;
    color: #EB5757 !important;
}

.call-dialog-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    line-height: 19px;
    color: #262626 !important;
}

.call-dialog-subcontent {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    line-height: 19px;
    color: #828282 !important;
}

.call-cancel-dialog-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #262626 !important;
}

.call-dialog-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
}
</style>
