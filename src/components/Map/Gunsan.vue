<template>
<div id="gunsan">
    <v-container class="map-container pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
            </v-flex>

            <v-flex class="pa-0 selectBox" xs12 sm12 md12 lg12 xl12>
                <v-flex class="pa-4 pt-0" xs12 sm12 md12 lg12 xl12>
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on }">
                            <span style="display: inline-block; width: 70%;">
                                <v-btn class="pa-0 person-modal" color="#fff" v-on="on" :ripple="false">
                                    <img src="../../assets/person-count.svg">
                                    <span v-if="count >= 1" style="padding-left: 12px;">탑승인원 {{ temp }}명</span>
                                    <span v-else @click="selectPerson" style="color: #262626; padding-left: 12px;">탑승인원 선택</span>
                                </v-btn>
                            </span>
                        </template>

                        <v-card style="position: absolute; width: 100%; height: 100%;">
                            <v-toolbar color="transparent" style="position: fixed; width: 100%; top: 0; z-index: 3;" flat>
                                <v-btn icon @click="closePersonDialog">
                                    <v-icon color="#262626">mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>

                            <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="position: absolute; background: transparent;">
                                <v-row align="center" justify="center" class="ma-0">
                                    <v-card-text style="position: absolute; top: 158px; text-align: center; font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">탑승인원 선택</v-card-text>
                                    <v-card class="d-flex justify-space-around" flat>
                                        <v-card :ripple="false" flat tile>
                                            <v-btn :class="{ 'is-disabled1': isDisabled1 }" :ripple="false" @click="decrement" outlined color="#E61773" fab>
                                                <v-icon dark>mdi-minus</v-icon>
                                            </v-btn>
                                        </v-card>
                                        <v-card flat tile>
                                            <v-card-text class="count">{{ count }}</v-card-text>
                                        </v-card>
                                        <v-card flat tile :ripple="false">
                                            <v-btn :class="{ 'is-disabled2': isDisabled2 }" :ripple="false" @click="increment" outlined color="#E61773" fab>
                                                <v-icon dark>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                    <v-card-text class="select-max mt-9">탑승인원은 최대 14명까지 선택 가능합니다.</v-card-text>
                                </v-row>
                            </v-container>

                            <v-btn class="select-person-btn" @click="rideCount" depressed tile>선택완료</v-btn>
                        </v-card>
                    </v-dialog>

                    <span v-if="callBtn" style="display: inline-block; width: 70%;">
                        <v-flex class="mb-3" style="background: #E61773; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 3px; display: inline-block;">
                            <p class="ma-0" style="color: #FFF; height: 30px;">
                                <span style="display: inline-block; height: 100%;">
                                    <img style="vertical-align: middle;" class="pl-3 pr-3" src="../../assets/time-icon.svg">
                                    <span style="vertical-align: middle; font-style: normal; font-weight: normal; font-size: 14px; color: #FFF;">소요시간: <span style="color: #FFF; font-weight: 500; font-size: 18px; padding-right: 12px;">약 {{ minutes }}분</span></span>
                                </span>
                            </p>
                        </v-flex>
                    </span>
                    <v-card :ripple="false" color="transparent" flat style="display: inline-block; float: right;">
                        <v-card :ripple="false" color="transparent" flat @click="res ? getLocation() : stopLocation()">
                            <v-btn :ripple="false" fab small color="#FFF" style="0px 0px 4px rgba(0, 0, 0, 0.25); !important;">
                                <v-icon color="#666666">mdi-crosshairs-gps</v-icon>
                            </v-btn>
                        </v-card>
                    </v-card>

                    <v-overlay :z-index="zIndex" :value="overlay1">
                        <v-card color="#FFF" style="width: 312px; height: 287px;">
                            <v-card-text style="color: #000; width: 100%; height: 237px;">
                                <scroll-picker style="top: 50%; margin-top: -70px; font-style: normal; font-weight: 500; font-size: 16px;" :options="start_options" v-model="start" />
                            </v-card-text>
                            <v-card-actions class="pa-0">
                                <v-btn tile block depressed color="#E61773" style="height: 50px; font-style: normal; font-weight: 500; font-size: 16px;" @click="overlay1=false; onChange();">
                                    출발지 적용하기
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-overlay>
                    <v-overlay :z-index="zIndex" :value="overlay2">
                        <v-card color="#FFF" style="width: 312px; height: 287px;">
                            <v-card-text style="color: #000; width: 100%; height: 237px;">
                                <scroll-picker style="top: 50%; margin-top: -70px; font-style: normal; font-weight: 500; font-size: 16px;" :options="end_options" v-model="end" />
                            </v-card-text>
                            <v-card-actions class="pa-0">
                                <v-btn tile block depressed color="#E61773" style="height: 50px; font-style: normal; font-weight: 500; font-size: 16px;" @click="overlay2=false; onChange();">
                                    도착지 적용하기
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-overlay>

                    <v-flex class="selectStationWrap" xs12 sm12 md12 lg12 xl12>
                        <v-layout class="d-flex align-center ma-0" fill-height xs12 sm12>
                            <v-flex class="pa-0" xs2 sm2 md2>
                                <img src="../../assets/arrow-icon.svg">
                            </v-flex>
                            <v-flex class="pa-0 flex-wrap" xs8 sm8 md8>
                                <div class="d-flex flex-column">
                                    <v-card style="text-align: left;" class="pl-2" :ripple="false" color="transparent" @click="overlay1 = !overlay1" flat>
                                        <span v-if="start >= 0">{{ options[start].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ startTemp }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" :ripple="false" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end >= 0">{{ options[end].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ endTemp }}</span>
                                    </v-card>
                                </div>
                            </v-flex>
                            <v-flex class="pa-0" xs2 sm2 md2 @click="switchDestination">
                                <img src="../../assets/switch-icon.svg">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>

                <v-flex class="pa-0 mt-1" v-if="callBtn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="calldialog = true">호출하기</v-btn>
                    <v-dialog v-model="calldialog" max-width="280">
                        <v-card style="width: 280px; background-color: transparent;">
                            <v-card flat class="dialog-background" style="background-color: transparent;">
                                <v-card-text class="pa-3 text-center">
                                    <v-card-text class="pa-0 call-dialog-title">타시오를 호출할게요.</v-card-text>
                                    <v-card-text class="pa-0 pt-1 call-dialog-subtitle">총 탑승요금</v-card-text>
                                    <v-card-text class="pa-0 call-dialog-paymony">{{ totalPayment }}<span style="font-size: 14px !important;">원</span></v-card-text>
                                </v-card-text>

                                <v-card-text class="pa-3 text-center" style="padding-top: 13px !important;">
                                    <v-card-text class="pl-3 pr-3 pb-3 pt-2 text-center">
                                        <table style="width: 100%; border: none !important;">
                                            <tr>
                                                <td style="width: 40%;" rowspan="2" class="call-dialog-subtitle">요금<p style="margin: 0" class="price-people">1000원</p>
                                                </td>
                                                <td style="width: 20%;" rowspan="2"><img src="../../assets/x-icon.svg" class="display: inline-block;"></td>
                                                <td style="width: 40%;" rowspan="2" class="call-dialog-subtitle">탑승인원<p style="margin: 0" class="price-people">{{ count }}명</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </v-card-text>
                                    <v-card-text class="pa-0 pt-3 call-dialog-content">배차가 완료된 이후에는 호출 취소 시<br>위약금 50%가 발생합니다.</v-card-text>
                                    <v-card-text class="pa-0 pb-2 pt-1 call-dialog-subcontent">(배차 전에는 위약금이 발생하지 않습니다.)</v-card-text>
                                    <v-card flat tile class="pa-0 ma-0 mt-6">
                                        <v-btn tile depressed class="paymentMethod pa-0 mr-6" :class="{ red: isRed1 }" :ripple="false" @click="requestPay('191029079116')">신용카드 결제</v-btn>
                                        <span><img src="../../assets/check-state.svg" v-if="isRed1 == true" class="check-state"></span>
                                        <v-btn tile depressed class="paymentMethod pa-0" :class="{ red: isRed2 }" :ripple="false" @click="requestPay('170622040674')">휴대폰 결제</v-btn>
                                        <span><img src="../../assets/check-state.svg" v-if="isRed2 == true" class="check-state2"></span>
                                    </v-card>
                                </v-card-text>

                                <v-card flat class="pa-0 pt-2 d-flex align-self-end">
                                    <v-container class="pa-0">
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-btn color="#FAFAFA" tile depressed class="pa-0 call-cancel-dialog-btn" width="100%" height="50px" @click="calldialog = false">취소</v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn color="#E61773" tile depressed class="pa-0 call-dialog-btn" width="100%" height="50px" v-if="meth == '191029079116' || meth == '170622040674'" @click="requestCallBtn">호출하기</v-btn>
                                                <v-btn color="#E0E0E0" style="color: #000;" tile depressed disabled class="pa-0 call-dialog-btn" width="100%" height="50px" v-else>호출하기</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card>
                            </v-card>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import axios from 'axios'
var control

export default {
    name: 'Gunsan',

    data: () => ({
        res: true,
        pageId: 1,
        map: null,
        OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        staticAnchor: [16, 37],
        vehicleReady: false,
        waypoints: [],
        data: null,
        options: [],
        station_arr: [],
        startTemp: '출발지 선택',
        endTemp: '도착지 선택 ',
        start: '',
        end: '',
        startId: [],
        endId: [],
        vehicle: [],
        distanceKm: 0,
        minutes: 0,
        gunsanList: [],
        callBtn: false,
        dialog: false,
        calldialog: false,
        count: 0,
        temp: 0,
        isDisabled1: true,
        isDisabled2: false,
        overlay1: false,
        overlay2: false,
        zIndex: 10,
        start_icon: {},
        end_icon: {},
        switch1: false,
        originStart: '',
        originEnd: '',
        changeStart: '',
        changeEnd: '',
        usermarker: '',
        meth: '',
        isRed1: false,
        isRed2: false,
        start_options: [],
        end_options: [],
        stationMarker: []
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),

        totalPayment() {
            return String('1000' * this.count).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        }
    },

    created() {
        this.getStation();
        this.getVehicle();

        this.start = parseInt(this.start);
        this.end = parseInt(this.end);
    },

    mounted() {
        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        });

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});

        // Map View Center Load
        this.map.setView([35.812484, 126.4091], 15);
    },

    updated() {
        if (this.count >= 1 && this.start >= 0 && this.end >= 0) {
            this.callBtn = true;
        } else {
            this.callBtn = false;
        }
    },

    methods: {
        // 모든 정류장 기준으로 2km 이상 떨어져 있을 경우 경고문 띄워준다.
        getLocation() {
            this.map.locate({
                setView: true,
                maxZoom: 18,
                watch: true,
                enableHighAccuracy: true
            }).on("locationfound", e => {
                console.log('Location found: ' + e.latitude + e.longitude);
                console.log('stationMarker: ', this.stationMarker);

                if (!this.usermarker) {
                    let currentUser = this.$utils.map.createIcon({
                        iconUrl: require("../../assets/current.svg"),
                        iconSize: [17, 17]
                    });

                    return this.usermarker = this.$utils.map.createMakerByXY(this.map, [e.latitude, e.longitude], {
                        icon: currentUser
                    });

                } else {
                    return this.usermarker.setLatLng(e.latlng);
                }
            }).on("locationerror", error => {
                this.$toasted.show("사용자의 위치를 받아올 수 없습니다", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);

                console.log('Location error:', error);
                if (this.usermarker) {
                    this.map.removeLayer(this.usermarker);
                    this.usermarker = null;
                }
            })
            this.res = false;
        },

        stopLocation() {
            if (this.usermarker != null || this.usermarker != undefined) {
                this.map.removeLayer(this.usermarker);
                this.usermarker = null;
                this.map.stopLocate();
                this.map.setView([35.812484, 126.4091], 15);
                console.log('stopLocation usermarker', this.usermarker);
            }

            this.res = true;
        },

        increment() {
            this.count += 1;

            if (this.count >= 14) {
                this.isDisabled2 = true;
                this.count = 14;
            } else {
                this.isDisabled2 = false;
            }

            if (this.count <= 1) {
                this.isDisabled1 = true;
                this.count = 1;
            } else {
                this.isDisabled1 = false;
            }
        },

        decrement() {
            this.count -= 1;

            if (this.count <= 1) {
                this.isDisabled1 = true;
                this.count = 1;
            } else {
                this.isDisabled1 = false;
            }

            if (this.count >= 14) {
                this.isDisabled2 = true;
                this.count = 14;
            } else {
                this.isDisabled2 = false;
            }
        },

        selectPerson() {
            this.count = 1;
        },

        closePersonDialog() {
            this.dialog = false;
            this.count = this.temp;
        },

        rideCount() {
            this.temp = this.count;
            this.dialog = false;
        },

        switchDestination() {
            /* if (this.start >= 0 && this.end >= 0 && this.start > this.end && this.start != this.end) {
                var change = this.start;
                this.start = this.end;
                this.end = change;
                this.onChange();
            } else {
                this.$toasted.show("지원하지 않는 경로입니다...", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(800);

                this.callBtn = false;
            } */
        },

        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            for (let i = 0; i < this.waypoints.length; i++) {
                this.$utils.map.createMakerByXY(this.map, [this.waypoints[i].lat, this.waypoints[i].lng], {
                    icon: gifIcon
                });
            }

            for (var arr of this.waypoints) {
                this.stationMarker.push({
                    stationLat: arr.lat,
                    stationLng: arr.lng
                });
            }
        },

        addRouting(waypoints) {
            control = this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
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
                createMarker: function () {
                    return null;
                }
            });
        },

        async getStation() {
            await axios.get('/api/stations/')
                .then(async response => {
                    if (response.status == 200) {
                        let station_result = response.data;
                        let station_count = Object.keys(station_result).length;
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == this.pageId) {
                                this.gunsanList.push(station_result[i]);
                                this.gunsanList = this.gunsanList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1;
                                });
                            }
                        }
                    }

                    console.log('gunsanList', this.gunsanList);
                    // 12 -> 13 -> 11 -> 18 -> 9 -> 19 -> 10
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })

                    // for (var arr of this.gunsanList) {
                    //     this.waypoints.push({
                    //         lat: arr.lat,
                    //         lng: arr.lon
                    //     });
                    // }

                    for (var [i, arr2] of this.gunsanList.entries()) {
                        this.options.push({
                            name: arr2.name,
                            value: i
                        });
                    }

                    this.start_options = this.options;
                    this.end_options = this.options;

                    await this.addMarker();
                    await this.addRouting(this.waypoints);
                }).catch(error => {
                    console.log('station (GET) error: ');
                    this.error = error;
                    console.log(error);
                })
        },

        async onChange() {
            // REMOVE Default Routing
            control.spliceWaypoints(0, 6);
            this.waypoints = [];

            this.start_options = this.options.filter(opt => opt.value != this.end);
            this.end_options = this.options.filter(opt => opt.value != this.start);

            let startIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/start-icon.svg"),
                iconSize: [40, 40]
            });
            let endIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/end-icon.svg"),
                iconSize: [40, 40]
            });

            // [0: 9, 1: 10, 2: 11, 3: 12, 4: 13, 5: 18, 6: 19]
            // 12 -> 13 -> 11 -> 18 -> 9 -> 19 -> 10
            // 3 -> 4 -> 2 -> 5 -> 0 -> 6 -> 1
            if (this.end == 3 || this.start == 1) {
                this.$toasted.show("지원하지 않는 경로입니다...", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(800);

                this.waypoints.push({
                    lat: this.gunsanList[3].lat,
                    lng: this.gunsanList[3].lon
                }, {
                    lat: this.gunsanList[4].lat,
                    lng: this.gunsanList[4].lon
                }, {
                    lat: this.gunsanList[2].lat,
                    lng: this.gunsanList[2].lon
                }, {
                    lat: this.gunsanList[5].lat,
                    lng: this.gunsanList[5].lon
                }, {
                    lat: this.gunsanList[0].lat,
                    lng: this.gunsanList[0].lon
                }, {
                    lat: this.gunsanList[6].lat,
                    lng: this.gunsanList[6].lon
                }, {
                    lat: this.gunsanList[1].lat,
                    lng: this.gunsanList[1].lon
                })

                this.start = -1;
                this.end = -1;

                this.map.removeLayer(this.start_icon);
                this.map.removeLayer(this.end_icon);
            }
            if (this.start == 3) {
                if (this.end == 4) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 2) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    })
                } else if (this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    })
                } else if (this.end == 0) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    })
                } else if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                }
            }
            if (this.start == 4) {
                console.log(this.start)
                if (this.end == 2) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    })
                } else if (this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    })
                } else if (this.end == 0) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    })
                } else if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                } else if (this.end == 3) {
                    this.$toasted.show("지원하지 않는 경로입니다...", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(800);

                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })

                    this.start = -1;
                    this.end = -1;

                    this.map.removeLayer(this.start_icon);
                    this.map.removeLayer(this.end_icon);
                }
            }
            if (this.start == 2) {
                if (this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    })
                } else if (this.end == 0) {
                    this.waypoints.push({
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    })
                } else if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                } else if (this.end == 3 || this.end == 4) {
                    this.$toasted.show("지원하지 않는 경로입니다...", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(800);

                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })

                    this.start = -1;
                    this.end = -1;

                    this.map.removeLayer(this.start_icon);
                    this.map.removeLayer(this.end_icon);
                }
            }
            if (this.start == 5) {
                console.log(this.start)
                if (this.end == 0) {
                    this.waypoints.push({
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    })
                } else if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                } else if (this.end == 3 || this.end == 4 || this.end == 2) {
                    this.$toasted.show("지원하지 않는 경로입니다...", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(800);

                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })

                    this.start = -1;
                    this.end = -1;

                    this.map.removeLayer(this.start_icon);
                    this.map.removeLayer(this.end_icon);
                }
            }
            if (this.start == 0) {
                console.log(this.start)
                if (this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    })
                } else if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                } else if (this.end == 3 || this.end == 4 || this.end == 2 || this.end == 5) {
                    this.$toasted.show("지원하지 않는 경로입니다...", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(800);

                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })

                    this.start = -1;
                    this.end = -1;

                    this.map.removeLayer(this.start_icon);
                    this.map.removeLayer(this.end_icon);
                }
            }

            this.map.removeLayer(this.start_icon)
            this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[this.start].lat, this.gunsanList[this.start].lon], {
                icon: startIcon
            });
            this.map.removeLayer(this.end_icon)
            this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[this.end].lat, this.gunsanList[this.end].lon], {
                icon: endIcon
            });
            this.map.removeLayer(endIcon);

            // SET New Routing
            this.addRouting(this.waypoints);
            this.totalDistance();
        },

        // async onChange() {
        //     // REMOVE Default Routing
        //     control.spliceWaypoints(0, 6);
        //     this.waypoints = [];

        //     this.start_options = this.options.filter(opt => opt.value != this.end);
        //     this.end_options = this.options.filter(opt => opt.value != this.start);

        //     let startIcon = this.$utils.map.createIcon({
        //         iconUrl: require("../../assets/start-icon.svg"),
        //         iconSize: [40, 40]
        //     });
        //     let endIcon = this.$utils.map.createIcon({
        //         iconUrl: require("../../assets/end-icon.svg"),
        //         iconSize: [40, 40]
        //     });

        //     if (this.start >= 0 && this.end >= 0) {
        //         if (this.start < this.end) {
        //             for (let i = this.start; i <= this.end; i++) {
        //                 await this.waypoints.push({
        //                     lat: this.gunsanList[i].lat,
        //                     lng: this.gunsanList[i].lon
        //                 })
        //             }

        //             this.map.removeLayer(this.start_icon)
        //             this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[this.start].lat, this.gunsanList[this.start].lon], {
        //                 icon: startIcon
        //             })
        //             this.map.removeLayer(this.end_icon)
        //             this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[this.end].lat, this.gunsanList[this.end].lon], {
        //                 icon: endIcon
        //             })
        //             this.map.removeLayer(endIcon)

        //         } else if (this.start > this.end || this.start == this.end) {
        //             this.$toasted.show("지원하지 않는 경로입니다...", {
        //                 theme: "bubble",
        //                 position: "top-center"
        //             }).goAway(800);

        //             for (var arr of this.gunsanList) {
        //                 await this.waypoints.push({
        //                     lat: arr.lat,
        //                     lng: arr.lon
        //                 });
        //             }

        //             this.start = -1;
        //             this.end = -1;

        //             this.map.removeLayer(this.start_icon);
        //             this.map.removeLayer(this.end_icon);
        //         }

        //         // SET New Routing
        //         this.addRouting(this.waypoints);
        //         this.totalDistance();
        //     }
        // },

        totalDistance() {
            control.on('routesfound', (e) => {
                // 출발지와 도착지의 totalDistance
                this.distanceKm = e.routes[0].summary.totalDistance / 1000;
                this.minutes = Math.round(e.routes[0].summary.totalTime % 3600 / 60);
            }).addTo(this.map)
        },

        getVehicle() {
            axios.get('/api/vehicles/')
                .then(async response => {
                    var vehicle_data = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    });
                    console.log(vehicle_data)
                    var vehicleCount = Object.keys(vehicle_data).length;
                    for (let i = 0; i < vehicleCount; i++) {
                        if (vehicle_data[i].site == 1) {
                            var vehicleIcon = this.$utils.map.createIcon({
                                iconUrl: require("../../assets/vehicle1.svg"),
                                iconSize: [32, 32]
                            });
                            if (vehicle_data[i].lat != null || vehicle_data[i].lon != null || vehicle_data[i].lat != undefined || vehicle_data[i].lon != undefined) {
                                this.vehicle[i] = await this.$utils.map.createMakerByXY(this.map, [vehicle_data[i].lat, vehicle_data[i].lon], {
                                    draggable: false,
                                    icon: vehicleIcon
                                });
                            }
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            setInterval(async function () {
                axios.get('/api/vehicles/')
                    .then(response => {
                        var vehicle_data = response.data.sort(function (a, b) {
                            return a.id < b.id ? -1 : 1;
                        })
                        var vehicleCount = Object.keys(vehicle_data).length;
                        for (let i = 0; i < vehicleCount; i++) {
                            if (vehicle_data[i].site == 1) {
                                if (vehicle_data[i].lat != null || vehicle_data[i].lon != null || vehicle_data[i].lat != undefined || vehicle_data[i].lon != undefined) {
                                    this.vehicle[i].setLatLng([vehicle_data[i].lat, vehicle_data[i].lon]);
                                }
                            }
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            }.bind(this), 1000);
        },

        requestCallBtn() {
            var totalPayment = String('1000' * this.count).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

            const IMP = window.IMP;

            // 가맹점 식별코드
            IMP.init("imp19092456");

            // // 결제창 호출 코드
            IMP.request_pay({ // param
                pg: `mobilians.${this.meth}`, // PG사명
                // pay_method: this.meth, // 결제수단
                merchant_uid: 'mid_' + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
                name: '타시오 결제', // 주문명
                amount: totalPayment, // 결제할 금액 (필수 항목)
                buyer_email: '', // 주문자 ID (선택 항목)
                buyer_name: '', // 주문자명 (선택항목)
                buyer_tel: '010-8433-9772', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
                buyer_addr: '', // 주문자 주소 (선택 항목)
                buyer_postcode: '', // 주문자 우편 번호 (선택 항목)
                custom_data: this.user.data.uid, // import에서 제공하는 커스텀 데이터 변수에 useruid 를 담아서 보냄
                m_redirect_url: `https://connector.tasio.io/tasio-288c5/us-central1/app/api/payment/put?site=${this.pageId}&start=${this.start}&end=${this.end}&startName=${this.options[this.start].name}&endName=${this.options[this.end].name}&count=${this.count}&minutes=${this.minutes}`
            });
        },

        requestPay(meth) {
            if (meth == '191029079116') {
                this.isRed1 = true;
                this.isRed2 = false;
                console.log(this.isRed1);
                this.meth = meth;
            } else if (meth == '170622040674') {
                this.isRed1 = false;
                this.isRed2 = true;
                this.meth = meth;
            }
        }
    }
}
</script>

<style scoped>
.is-disabled1 {
    color: #BDBDBD !important;
}

.is-disabled2 {
    color: #BDBDBD !important;
}

.select-max {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    color: #BDBDBD;
}

.select-person-btn {
    height: 50px !important;
}

.v-dialog {
    border-radius: 0 !important;
    box-shadow: none !important;
}

.dialog-background {
    width: 2801px;
    background-image: url('~@/assets/call-dialog.png');
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

.price-people {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #262626;
}

.call-dialog-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    line-height: 19px;
    color: #4F4F4F !important;
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

.paymentMethod {
    position: relative;

    width: 116px !important;
    height: 49px !important;
    border: 1px solid #BDBDBD !important;
    box-sizing: border-box !important;
    background: transparent !important;
    border-radius: 8px !important;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #262626 !important;
    letter-spacing: -0.1px;
}

.red {
    border: 1px solid #E61773 !important;
    background: #FFF;
}

.check-state {
    position: absolute;
    right: 140px;
}

.check-state2 {
    position: absolute;
    right: 0;
}

.v-btn:before {
    background-color: transparent !important;
}

.person-modal {
    font-family: Noto Sans KR !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13px !important;
    line-height: 19px;
    padding-left: 12px !important;
    padding-right: 14px !important;
}
</style>
