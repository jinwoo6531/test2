<template>
    <v-container class="map-container pa-0 ma-0 flex-wrap" fluid grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 persentH" xs12 sm12 md12>
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
                                <v-list-item-subtitle class="desination-info-subtitle">{{ vehicle_name }}</v-list-item-subtitle>
                            </v-list-item-content>
    
                            <v-card class="ma-4" flat tile color="transparent">
                                <v-img src="../../assets/profile.svg"></v-img>
                            </v-card>
    
                            <v-list-item-content style="text-align: left;">
                                <v-list-item-title class="desination-info-title">담당자</v-list-item-title>
                                <v-list-item-subtitle class="desination-info-subtitle">{{ owner }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
    
                    <span class="arrive-time">약 {{ minutes }}분 후</span> 셔틀이 출발지에 도착합니다.
                    <v-card-actions class="pa-0 pt-5 call-cancel-btn">
                        <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="callCancel">호출 취소하기</v-btn>
                        <v-dialog v-model="callcanceldialog" max-width="280">
                            <v-card style="width: 280px; background-color: transparent;">
                                <v-card flat class="dialog-background" style="background-color: transparent;">
                                    <v-card-text class="pa-3 text-center">
                                        <v-card-text class="pa-0 pt-1 call-dialog-title">호출을 취소하세요?</v-card-text>
                                        <v-card-text class="pa-0 pt-1 call-dialog-subtitle">취소 위약금</v-card-text>
                                        <v-card-text class="pa-0 call-dialog-paymony">{{ payment }}<span style="font-size: 14px !important;">원</span></v-card-text>
                                    </v-card-text>
    
                                    <v-card-text class="pa-6 text-center" style="padding-top: 23px !important;">
                                        <v-card-text class="pa-0 call-dialog-content">탑승요금 {{ allPay }}원의 50%가<br>취소 위약금으로 결제됩니다.</v-card-text>
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
import {
    mapGetters,
    mapState
} from 'vuex'
import axios from 'axios'

export default {
    name: 'CallingShuttle',

    data: () => ({
        ready: false,
        map: null,
        OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        stationList: [],
        startName: '',
        endName: '',
        start_icon: {},
        end_icon: {},
        setLat: '',
        setLon: '',
        waypoints: [],
        callcanceldialog: false,
        webSocketData: {},
        webSocketData2: {},
        isrefund: '',
        latest_mid: '',
        minutes: 0,
        vehicle_site: 0,
        vehicle_name: '',
        vehicle_user: '',
        vehicle_lat: '',
        vehicle_lon: '',
        owner: '',
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),
        ...mapState(['uid']),

        // 전액 환불 (100%)
        allPay() {
            let pay = 1000 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        // 부분 환불 (50%)
        payment() {
            let pay = 500 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    created() {
        this.getStation();

        axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.uid)
            .then(response => {
                this.displayName = response.data.displayName;
                this.isrefund = response.data.isrefund;
                this.latest_mid = response.data.latest_mid;

                this.ready = true;
            }).catch(error => {
                console.log('User read: ', error);
            })
    },

    mounted() {
        this.socket = this.$route.params.socket;
        this.vehicle_id = parseInt(this.$route.params.vehicle_id);
        this.site = this.$route.params.site_id;
        this.start = this.$route.params.current_station_id;
        this.end = this.$route.params.target_station_id;
        this.count = this.$route.params.passenger;

        // 셔틀이 출발지에 도착한 경우 배차 완료 및 서비스 종료 페이지로 이동
        this.socket.onmessage = ({
            data
        }) => { // websocket에 있는 정보들을 받는다.
            this.webSocketData = JSON.parse(data);
            console.log('webSocketData: ', this.webSocketData.what);
            if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.type == 'ondemand' && this.webSocketData.how.function == 'arrived' && this.webSocketData.how.uid == this.uid) {
                this.socket.close();
                this.$router.replace({
                    name: 'Thanks',
                    params: {
                        site: this.site
                    }
                });
                // 탑승 미확인 및 취소 (cancel_call)
            } else if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.uid == this.uid && this.webSocketData.how.function == 'cancel_call' && this.webSocketData.how.vehicle_id == this.vehicle_id && this.webSocketData.how.site_id == this.site) {
                this.socket.close();
                this.$router.replace({
                    name: 'AutoCancel'
                });
            }
        };

        // 셔틀이 출발지에 도착했는데 5분이상 사용자가 탑승하지 않아 지연될 경우 자동취소 페이지로 진입
        // this.setTime();

        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        })

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {})
    },

    methods: {
        /* setTime() {
            let current = 0;
            let countUp = setInterval(() => {
                current++;

                if (current == 300) {
                    clearInterval(countUp);
                    this.cancleMessage();
                    this.disconnect();

                    this.$router.replace({
                        name: 'AutoCancel',
                        query: {
                            passenger_count: this.count
                        }
                    });
                }
            }, 1000);
        }, */

        // 정류장 마커 표시
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            for (let i = 0; i < this.waypoints.length; i++) {
                console.log(this.waypoints)
                this.$utils.map.createMakerByXY(this.map, [this.waypoints[i].lat, this.waypoints[i].lng], {
                    icon: gifIcon
                });
            }
        },

        // 정류장 API Request & Response
        getStation() {
            axios.get('/api/stations/')
                .then(response => {
                    if (response.status == 200) {
                        let station_result = response.data;
                        let station_count = Object.keys(station_result).length;
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == this.site) {
                                this.stationList.push(station_result[i]);
                                this.stationList = this.stationList.sort(function(a, b) {
                                    return a.id < b.id ? -1 : 1;
                                });
                            }
                        }

                        this.startName = this.stationList[this.start].name;
                        this.endName = this.stationList[this.end].name;

                        this.getVehicle();
                        this.getEta();

                        // Map View Center Load
                        if (this.site == 1) {
                            this.map.setView([35.809484, 126.4091], 15)
                        } else if (this.site == 2) {
                            this.map.setView([35.835153, 128.685620], 15)
                        // } else if (this.site == 3) {
                        //     this.map.setView([36.599351, 127.270606], 15)
                        } else if (this.site == 4) {
                            this.map.setView([37.579200, 126.888880], 15)
                        } else if (this.site == 18) {
                            this.map.setView([36.4945, 127.3274], 15);
                        }

                        this.getRouting()
                    }
                }).catch(error => {
                    console.log('station (GET) error: ')
                    this.error = error
                    console.log(error)
                })

            setInterval(async function() {
                axios.get('/api/stations/')
                    .then(response => {
                        if (response.status == 200) {
                            let station_result = response.data;
                            let station_count = Object.keys(station_result).length;
                            for (let i = 0; i < station_count; i++) {
                                if (station_result[i].site == this.site) {
                                    this.stationList.push(station_result[i]);
                                    this.stationList = this.stationList.sort(function(a, b) {
                                        return a.id < b.id ? -1 : 1;
                                    });
                                }
                            }
                            this.getEta();
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }.bind(this), 10000);
        },


        // ETA API
        getEta() {
            var eta = JSON.parse(this.stationList[this.start].eta);

            for (let [key, value] of Object.entries(eta)) {
                if (key == this.vehicle_id) { // 셔틀의 id와 ETA의 key 값이 같은 값의 value 가져오기
                    console.log(key, ', ', value);
                    this.minutes = parseInt(value); // value가 예상 도착 시간
                    break;
                }
            }
        },

        // 출발지 아이콘, 도착지 아이콘 및 요청 경로 표시
        async getRouting() {
            let startIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/start-icon.svg"),
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            })

            let endIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/end-icon.svg"),
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            })
            this.start = await parseInt(this.start);
            this.end = await parseInt(this.end);

            // Gunsan
            // 12 -> 13 -> 11 -> 18 -> 9 -> 19 -> 10
            // 3 -> 4 -> 2 -> 5 -> 0 -> 6 -> 1
            if (this.site == 1) {
                if (this.start == 0) {
                    if (this.end == 6) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        })
                    } else if (this.end == 1) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        })
                    } else if (this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        })
                    } else if (this.end == 4) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 2 || this.end == 5) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    }
                }
                if (this.start == 6) {
                    if (this.end == 1) {
                        this.waypoints.push({
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        })
                    } else if (this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        })
                    } else if (this.end == 4) {
                        this.waypoints.push({
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 2 || this.end == 5 || this.end == 0) {
                        this.waypoints.push({
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    }
                }
                if (this.start == 1) {
                    if (this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        })
                    } else if (this.end == 4 || this.end == 2 || this.end == 5) {
                        this.waypoints.push({
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 0 || this.end == 6) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    }
                }
                if (this.start == 3) {
                    if (this.end == 4) {
                        this.waypoints.push({
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 2) {
                        this.waypoints.push({
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 5) {
                        this.waypoints.push({
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    } else if (this.end == 0 || this.end == 6 || this.end == 1) {
                        this.waypoints.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        })
                    }
                }

                if (this.start == 4) {
                    if (this.end == 2) {
                        this.waypoints.push({
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        })
                    } else if (this.end == 5) {
                        this.waypoints.push({
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        })
                    } else if (this.end == 0 || this.end == 6 || this.end == 1 || this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    }
                }
                if (this.start == 2) {
                    if (this.end == 5) {
                        this.waypoints.push({
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        })
                    } else if (this.end == 0 || this.end == 6 || this.end == 1) {
                        this.waypoints.push({
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    } else if (this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    } else if (this.end == 4) {
                        this.waypoints.push({
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    }
                }

                if (this.start == 5) {
                    if (this.end == 0 || this.end == 6 || this.end == 1) {
                        this.waypoints.push({
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    } else if (this.end == 3) {
                        this.waypoints.push({
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    } else if (this.end == 4 || this.end == 2) {
                        this.waypoints.push({
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, {
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        })
                    }
                }

                this.map.removeLayer(this.start_icon)
                this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[this.start].lat, this.stationList[this.start].lon], {
                    icon: startIcon
                });
                this.map.removeLayer(this.end_icon)
                this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[this.end].lat, this.stationList[this.end].lon], {
                    icon: endIcon
                });
                this.map.removeLayer(endIcon);

            } else if (this.site == 2) {
                // Daegu
                if (this.start < this.end) {
                    for (let i = this.start; i <= this.end; i++) {
                        this.waypoints.push({
                            lat: this.stationList[i].lat,
                            lng: this.stationList[i].lon
                        });
                    }
                } else if (this.start > this.end) {
                    this.waypoints.push({
                        lat: this.stationList[this.start].lat,
                        lng: this.stationList[this.start].lon
                    });
                    for (let i = this.start;
                        (i % 3) != this.end; i++) {
                        this.waypoints.push({
                            lat: this.stationList[i % 3].lat,
                            lng: this.stationList[i % 3].lon
                        });
                    }
                    this.waypoints.push({
                        lat: this.stationList[this.end].lat,
                        lng: this.stationList[this.end].lon
                    });
                }

                if (this.start === 0) {
                    this.map.removeLayer(this.start_icon);
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                        icon: startIcon
                    });
                } else if (this.start === 1) {
                    this.map.removeLayer(this.start_icon);
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                        icon: startIcon
                    });
                } else if (this.start === 2) {
                    this.map.removeLayer(this.start_icon);
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                        icon: startIcon
                    });
                } else if (this.start === 3) {
                    this.map.removeLayer(this.start_icon);
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                        icon: startIcon
                    });
                }

                if (this.end === 0) {
                    this.map.removeLayer(this.end_icon);
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[0].lat, this.stationList[0].lon], {
                        icon: endIcon
                    });
                } else if (this.end === 1) {
                    this.map.removeLayer(this.end_icon);
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[1].lat, this.stationList[1].lon], {
                        icon: endIcon
                    });
                } else if (this.end === 2) {
                    this.map.removeLayer(this.end_icon);
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[2].lat, this.stationList[2].lon], {
                        icon: endIcon
                    });
                } else if (this.end === 3) {
                    this.map.removeLayer(this.end_icon);
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[3].lat, this.stationList[3].lon], {
                        icon: endIcon
                    });
                }
            }

            // 경로 표시하기
            this.$utils.map.createRouting(this.map, {
                waypoints: this.waypoints,
                serviceUrl: 'https://osrm.aspringcloud.com/route/v1',
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
                createMarker: function() {
                    return null;
                }
            })
            this.addMarker(); // 정류장 마커 표시
        },

        // 셔틀 API Request & Response
        getVehicle() { // 배차된 셔틀만 보여주면 된다.
            axios.get('/api/vehicles/')
                .then(async response => {
                    var vehicle_data = response.data.sort(function(a, b) {
                        return a.id < b.id ? -1 : 1
                    });
                    var vehicleIcon = this.$utils.map.createIcon({
                        iconUrl: require("../../assets/vehicle1.svg"),
                        iconSize: [32, 32]
                    });

                    for (var arr of vehicle_data) {
                        if (this.vehicle_id == arr.id) {
                            this.vehicle_name = arr.name;
                            this.vehicle_user = arr.user;
                            this.vehicle_site = arr.site;
                            this.vehicle_lat = arr.lat;
                            this.vehicle_lon = arr.lon;
                        }
                    }
                    if (this.vehicle_lat != null || this.vehicle_lon != null || this.vehicle_lat != undefined || this.vehicle_lon != undefined) {
                        this.vehicle = await this.$utils.map.createMakerByXY(this.map, [this.vehicle_lat, this.vehicle_lon], {
                            draggable: false,
                            icon: vehicleIcon
                        });
                    }
                    this.getVehicleUser(); // 셔틀의 안전요원 정보 요청
                }).catch(error => {
                    console.log('Vehicle Error: ', error);
                })
            setInterval(async function() { // 실시간 셔틀 위치 업데이트
                axios.get('/api/vehicles/')
                    .then(() => {
                        if (this.vehicle_site == this.site) {
                            if (this.vehicle_lat != null || this.vehicle_lon != null || this.vehicle_lat != undefined || this.vehicle_lon != undefined) {
                                this.vehicle.setLatLng([this.vehicle_lat, this.vehicle_lon]);
                            }
                        }
                    }).catch(error => {
                        console.log('SetInterval Error: ', error);
                    })
            }.bind(this), 1000);
        },

        getVehicleUser() {
            axios.get(`/api/users/${this.vehicle_user}`)
                .then(response => {
                    this.owner = response.data.username; // 안전요원의 이름 저장
                }).catch(error => {
                    console.log('/api/user/ Error: ', error);
                });
        },

        // 호출 취소하기 버튼 모달 표시
        callCancel() {
            this.callcanceldialog = true;
        },

        // 호출 취소를 할 경우 환불 정책
        callCancleBtn() {
            this.cancleMessage();
            this.disconnect();

            this.$router.replace('/');

            // if (this.isrefund == '0') {
            //     axios({
            //         url: "https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/payment/cancel",
            //         method: "post",
            //         headers: {
            //             'content-type': 'application/x-www-form-urlencoded'
            //         },
            //         data: {
            //             merchant_uid: this.latest_mid, // 주문번호 *
            //             reason: "타시오 호출 취소", // 환불 사유 *,
            //             cancel_request_amount: 500 * parseInt(this.count)
            //         }
            //     }).then((response) => {
            //         console.log(response)
            //         this.$toasted.show(`호출이 취소되었습니다.`, {
            //             theme: "bubble",
            //             position: "top-center"
            //         }).goAway(2000);
            //         this.$router.replace('/')
            //     }).catch(error => {
            //         console.log('환불 실패', error)
            //         this.$toasted.show(`환불을 실패하였습니다.`, {
            //             theme: "bubble",
            //             position: "top-center"
            //         }).goAway(2000);
            //         this.$router.replace('/')
            //     })
            // } else {
            //     this.$toasted.show(`결제하신 내역이 없습니다.`, {
            //         theme: "bubble",
            //         position: "top-center"
            //     }).goAway(2000);
            //     this.$router.replace('/')
            // }

        },

        // 호출 취소할 경우 안전요원에게 보내주는 메시지
        cancleMessage() {
            this.webSocketData2 = {
                where: '',
                who: 'tasio_id',
                what: 'EVENT',
                how: {
                    type: 'ondemand',
                    vehicle_id: this.vehicle_id,
                    function: 'cancel_call',
                    current_station_id: this.start,
                    target_station_id: this.end,
                    passenger: this.count,
                    passenger_name: this.displayName,
                    uid: this.uid
                }
            };

            this.socket.send(JSON.stringify(this.webSocketData2));
        },

        // Websocket 연결 끊기
        disconnect() {
            this.socket.close();
            this.status = "disconnected";
            console.log('socket', this.status);
        }
    }
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
    /* height: 242px; */
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
