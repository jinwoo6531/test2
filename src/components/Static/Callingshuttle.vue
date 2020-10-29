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
                    <v-btn style="height: 50px;" color="#2E3990" class="callShuttle" @click.native="callCancel">호출 취소하기</v-btn>

                    <v-dialog v-model="callcanceldialog" persistent max-width="280">
                        <v-card style="width: 280px;">
                            <v-card-text class="text-center pa-0">
                                <v-card-text class="pa-0 call-dialog-content">
                                    셔틀 호출이 취소됩니다.
                                    정말 취소하시겠습니까?
                                </v-card-text>
                            </v-card-text>

                            <v-card flat class="pa-0 d-flex align-self-end">
                                <v-container class="pa-0">
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-btn color="#FAFAFA" tile depressed class="pa-0 call-cancel-dialog-btn" width="100%" height="56.5px" @click.native="callcanceldialog = false">호출 유지하기</v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn color="#2E3990" tile depressed class="pa-0 call-dialog-btn" width="100%" height="56.5px" @click.native="callCancleBtn">호출 취소하기</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="cancelCompleteDialog" persistent max-width="280">
                        <v-card style="width: 280px;">
                            <v-card-text class="text-center pa-0">
                                <v-card-text class="pa-0 call-dialog-content">
                                    호출이 취소되었습니다.
                                </v-card-text>
                            </v-card-text>

                            <v-card flat class="pa-0 d-flex align-self-end">
                                <v-container class="pa-0">
                                    <v-row no-gutters>
                                        <v-col>
                                            <v-btn color="#2E3990" tile depressed class="pa-0 call-dialog-btn" width="100%" height="56.5px" @click.native="goToMain">확인</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
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
        waypoints: [],
        callcanceldialog: false,
        webSocketData: {},
        webSocketData2: {},
        minutes: 0,
        vehicle_site: 0,
        vehicle_name: '',
        vehicle_user: '',
        vehicle_lat: '',
        vehicle_lon: '',
        owner: '',
        cancelCompleteDialog: false
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),
        ...mapState(['uid']),

        allPay() {
            let pay = 1000 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        payment() {
            let pay = 500 * parseInt(this.count);
            return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    created() {
        this.getStation();
        this.getVehicle();

        axios.get('https://ondemand.tasio.io:400/shuttle-9d5cb/us-central1/app/api/read/' + this.uid)
            .then(response => {
                console.log(response)
                this.displayName = response.data.displayName;

                this.ready = true;
            }).catch(error => {
                console.log('User read: ', error);
            })
    },

    mounted() {
        this.socket = this.$route.params.socket;
        this.vehicle_id = parseInt(this.$route.params.vehicle_id);
        this.start = this.$route.params.current_station_id;
        this.end = this.$route.params.target_station_id;
        this.count = this.$route.params.passenger;

        this.socket.onmessage = ({
            data
        }) => { // websocket에 있는 정보들을 받는다.
            this.webSocketData = JSON.parse(data);
            console.log('CallingShuttle: ', this.webSocketData.what, this.webSocketData);
            if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.type == 'ondemand' && this.webSocketData.how.function == 'arrived' && this.webSocketData.how.uid == this.uid) {
                this.socket.close();
                this.$router.replace({
                    name: 'Thanks'
                });
            } else if (this.webSocketData.what == 'EVENT' && this.webSocketData.how.uid == this.uid && this.webSocketData.how.function == 'cancel_call' && this.webSocketData.how.vehicle_id == this.vehicle_id && this.webSocketData.how.site_id == 1) {
                this.socket.close();
                this.$router.replace({
                    name: 'AutoCancel'
                });
            }
        };

        // 5분이상 지연될 경우 자동취소 페이지로 진입
        // this.setTime();

        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        });

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
    },

    methods: {
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

        getStation() {
            console.log('Request /api/stations/');
            axios.get('/api/stations/')
                .then(response => {
                    if (response.status == 200) {
                        let station_result = response.data;
                        let station_count = Object.keys(station_result).length;
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == 1) {
                                this.stationList.push(station_result[i]);
                                this.stationList = this.stationList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1;
                                });
                            }
                        }

                        this.startName = this.stationList[this.start].name;
                        this.endName = this.stationList[this.end].name;

                        // this.getVehicle();
                        // this.getEta();

                        console.log('Response /api/stations/');

                        // Map View Center Load
                        this.map.setView([35.809484, 126.4091], 15);
                        this.getRouting();
                    }
                }).catch(error => {
                    console.log('station (GET) error: ')
                    this.error = error
                    console.log(error)
                })

            // this.etaTime = 
            setInterval(async function () {
                axios.get('/api/stations/')
                    .then(response => {
                        if (response.status == 200) {
                            this.eta = JSON.parse(response.data[this.start].eta);
                            this.getEta();
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }.bind(this), 10000);
        },

        getEta() {
            for (let [key, value] of Object.entries(this.eta)) {
                if (key == this.vehicle_id) {
                    console.log(key, ', ', value);
                    this.minutes = parseInt(value);
                    break;
                }
            }
        },

        async getRouting() {
            let startIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/start-icon.svg"),
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            });
            let endIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/end-icon.svg"),
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });

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

            this.$utils.map.createRouting(this.map, {
                waypoints: this.waypoints,
                serviceUrl: 'https://osrmserver.springgo.io/route/v1',
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
            this.addMarker()
        },

        getVehicle() { // 배차된 셔틀만 보여주면 된다.
            console.log('Request /api/vehicles/');
            axios.get('/api/vehicles/')
                .then(async response => {
                    console.log('Response /api/vehicles/', response);

                    var vehicle_data = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    });
                    var vehicleIcon = this.$utils.map.createIcon({
                        iconUrl: require("../../assets/vehicle1.svg"),
                        iconSize: [32, 32]
                    });

                    console.log('vehicle_data: ', vehicle_data)
                    console.log('vehicle_id: ', this.vehicle_id)

                    for (var arr of vehicle_data) {
                        console.log(this.vehicle_id)
                        if (this.vehicle_id == arr.id) {
                            this.vehicle_name = arr.name;
                            this.vehicle_user = arr.user;
                            this.vehicle_site = arr.site;
                            this.vehicle_lat = arr.lat;
                            this.vehicle_lon = arr.lon;
                        }
                    }
                    this.getVehicleUser();

                    if (this.vehicle_lat != null || this.vehicle_lon != null || this.vehicle_lat != undefined || this.vehicle_lon != undefined) {
                        this.vehicle = await this.$utils.map.createMakerByXY(this.map, [this.vehicle_lat, this.vehicle_lon], {
                            draggable: false,
                            icon: vehicleIcon
                        });
                    }

                }).catch(error => {
                    console.log('Vehicle Error: ', error);
                })
            setInterval(async function () {
                axios.get('/api/vehicles/' + this.vehicle_id)
                    .then(response => {
                        var vehicle_data = response.data;
                        if (vehicle_data.lat != null || vehicle_data.lon != null || vehicle_data.lat != undefined || vehicle_data.lon != undefined) {
                            this.vehicle.setLatLng([vehicle_data.lat, vehicle_data.lon]);
                        }
                    }).catch(error => {
                        console.log('SetInterval Error: ', error);
                    })
            }.bind(this), 1000);
        },

        getVehicleUser() {
            console.log('Request /api/users/');
            axios.get(`/api/users/${this.vehicle_user}`)
                .then(response => {
                    console.log('Response /api/users/');
                    this.owner = response.data.username;
                    console.log('owner: ', this.owner);
                }).catch(error => {
                    console.log('/api/user/ Error: ', error);
                });
        },

        callCancel() {
            this.callcanceldialog = true;
        },

        callCancleBtn() {
            this.cancleMessage();
            this.disconnect();
            this.callcanceldialog = false;
            this.cancelCompleteDialog = true;
        },

        goToMain() {
            this.cancelCompleteDialog = false;
            this.$router.replace('/');
        },

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

        disconnect() {
            this.socket.close();
            this.status = "disconnected";
            console.log('socket', this.status);

            // clearInterval(this.etaTime);
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

.call-dialog-content {
    width: 162px;
    margin: 0 auto;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px !important;
    line-height: 17px;
    color: #262626 !important;
    padding: 39px 0 !important;
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
