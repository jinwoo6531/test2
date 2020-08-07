<template>
<div id="site">
    <v-container fluid v-if="loading == true" style="display: flex; position: absolute; margin-top: -57px; background: rgba(0, 0, 0, 0.5); height: 100%; pointer-events: inherit !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card color="transparent" flat>
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate size="50" color="#E61773"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-center" style="color: #FFF;">
                    페이지 불러오는 중...
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>

    <v-container fluid v-if="loading3 == true" style="display: flex; position: absolute; margin-top: -57px; height: 100%; pointer-events: inherit !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card color="#FFF" flat>
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate size="50" color="#E61773"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-center" style="color: #E61773;">
                    위치 받아오는 중...
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>

    <v-container fluid v-if="can == true" color="transparent" style="display: flex; position: absolute; height: 100%; margin-top: -57px; pointer-events: inherit !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card style="margin-top: -57px; width: 100%; background: rgba(255, 255, 255, 0.7); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);" flat tile>
                <v-card-text class="text-center pa-0">
                    <img src="../../assets/warning.svg" style="padding-top: 20px;">
                    <p style="letter-spacing: -1px; margin: 0; padding-top: 6px; padding-bottom: 24px; font-size: 18px; font-weight: 500; color: #262626;">이 곳은 타시오 운행지역에서 너무 멀어요!</p>
                    <p class="warningmsg" style="margin: 0;">셔틀이 출발지에 도착한 시점부터</p>
                    <p class="warningmsg" style="margin: 0;"><span style="color: #EB5757 !important;">5분 내</span> 탑승이 완료되지 않으면</p>
                    <p class="warningmsg" style="margin: 0;"><span style="color: #EB5757 !important;">호출이 자동 취소</span>되며 <span style="color: #EB5757 !important;">위약금이 발생</span>합니다.</p>
                    <v-btn color="#E61773" tile depressed class="pa-0 pl-3 pr-3 goReturn" :ripple="false" @click="goBackSite">운행지역 지도로 돌아가기</v-btn>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>

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
                                    <span v-if="temp >= 1" style="padding-left: 12px;" @click="selectPerson">탑승인원 {{ temp }}명</span>
                                    <span v-else @click="beforeSelectPerson" style="color: #262626; padding-left: 12px; letter-spacing: 0.5px;">탑승인원 선택</span>
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
                        <v-card style="width: 290px; height: 376px;" color="#FFF">
                            <v-card-text class="pa-0" style="color: #333; height: 37px;">
                                <span style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 14px;display: inline-block; padding: 9px 0 8px 14px;">출발지</span>
                            </v-card-text>
                            <v-divider style="width: 262px; margin: 0 auto; border-color: #E0E0E0;"></v-divider>
                            <v-card class="pa-0" color="#FFF" style="width: 100%; height: 289px; overflow: scroll; text-align: center;" tile flat>
                                <v-list light tile style="padding: 8px 0 22px 0;">
                                    <v-list-item-group color="#E61773">
                                        <v-list-item class="pa-0" v-for="item in start_options" @click="clk(item,'start')" :key="item.value">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.name" style="color: #333;"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #E61773; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #E61773; box-sizing: border-box; letter-spacing: 0;" @click="overlay1 = false; onCancel('start');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#E61773" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px; letter-spacing: 0;" @click="overlay1 = false; onChange();">
                                    선택하기
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-overlay>
                    <v-overlay :z-index="zIndex" :value="overlay2">
                        <v-card style="width: 290px; height: 376px;" color="#FFF">
                            <v-card-text class="pa-0" style="color: #333; height: 37px;">
                                <span style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 14px;display: inline-block; padding: 9px 0 8px 14px;">도착지</span>
                            </v-card-text>
                            <v-divider style="width: 262px; margin: 0 auto; border-color: #E0E0E0;"></v-divider>
                            <v-card class="pa-0" color="#FFF" style="width: 100%; height: 289px; overflow: scroll; text-align: center;" tile flat>
                                <v-list light tile style="padding: 8px 0 22px 0;">
                                    <v-list-item-group color="#E61773">
                                        <v-list-item class="pa-0" v-for="item2 in end_options" @click="clk(item2, 'end')" :key="item2.value">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item2.name" style="color: #333;"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #E61773; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #E61773; box-sizing: border-box; letter-spacing: 0;" @click="overlay2 = false; onCancel('end');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#E61773" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px; letter-spacing: 0;" @click="overlay2 = false; onChange();">
                                    선택하기
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
                                        <span v-if="start < 0 || start_point.name==startTemp" class="select_station">{{ startTemp }}</span>
                                        <span v-else class="sel_station">{{ start_point.name }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" :ripple="false" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end < 0 || end_point.name==endTemp" class="select_station">{{ endTemp }}</span>
                                        <span v-else class="sel_station">{{ end_point.name }}</span>
                                    </v-card>
                                </div>
                            </v-flex>
                            <v-flex class="pa-0" xs2 sm2 md2 @click="switchDestination">
                                <img src="../../assets/switch-icon.svg">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>

                <!-- 타시오 호출 Dialog -->
                <v-flex class="pa-0 mt-1" v-if="callBtn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="calldialog = true">호출하기</v-btn>
                    <v-dialog v-model="calldialog" max-width="280">
                        <v-card style="width: 280px; background-color: transparent;">
                            <v-card flat class="dialog-background" style="background-color: transparent;">
                                <v-card-text class="pa-3 text-center">
                                    <v-card-text class="pa-0 call-dialog-title">타시오를 호출할게요.</v-card-text>
                                </v-card-text>

                                <v-card flat class="pa-0 d-flex align-self-end" style="padding-top: 7px !important;">
                                    <v-container class="pa-0">
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-btn color="#FAFAFA" tile depressed class="pa-0 call-cancel-dialog-btn" width="100%" height="50px" @click="cancelCallDialog">취소</v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn color="#E61773" tile depressed class="pa-0 call-dialog-btn" width="100%" height="50px" @click="requestCallBtn">호출하기</v-btn>
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
function calcDistance(lat1, lon1, lat2, lon2) {
    var theta = lon1 - lon2;
    var dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return Number(dist * 1000).toFixed(2);
}

function deg2rad(deg) {
    return (deg * Math.PI / 180);
}

function rad2deg(rad) {
    return (rad * 180 / Math.PI);
}
import {
    mapGetters
} from 'vuex'
import axios from 'axios';
var control;

export default {
    data: () => ({
        map: null,
        OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        currentlocation: {
            lat: '',
            lon: ''
        },
        // loading
        loading: true,
        loading1: true,
        loading2: true,
        loading3: false,
        // station
        stationList: [],
        waypoints3: [],
        waypoints2: [],
        waypoints: [],
        // vehicle
        vehicle: [],
        vehicle_id: 0,
        // 탑승인원
        dialog: false,
        callBtn: false,
        temp: 0,
        count: 1,
        isDisabled1: true,
        isDisabled2: false,
        // overlay
        zIndex: 10,
        overlay1: false,
        overlay2: false,
        // options
        startTemp: '출발지 선택하기',
        endTemp: '도착지 선택하기',
        start: -1,
        end: -1,
        start_point: {
            name: '출발지 선택하기',
            value: -1
        },
        end_point: {
            name: '도착지 선택하기',
            value: -1
        },
        options: [],
        start_options: [],
        end_options: [],
        start_icon: {},
        end_icon: {},
        // Location
        can: false,
        res: true,
        usermarker: '',
        success: true,
        // ETA
        minutes: 0,
        // 타시오 호출
        calldialog: false,
        meth: '191029079116',
        pay_method: 'card',
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),

        totalPayment() {
            let num = 1000 * this.count;
            num = parseInt(num, 10);
            return num.toLocaleString();
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
        this.map.setView([35.812484, 126.4101], 15);

        // current location
        this.map.locate({
            setView: false,
            enableHighAccuracy: true
        }).on("locationfound", e => {
            this.currentlocation = {
                lat: e.latitude,
                lon: e.longitude
            }
        });
    },

    updated() {
        if (this.temp >= 1 && this.start >= 0 && this.end >= 0) {
            this.callBtn = true;
        } else {
            this.callBtn = false;
        }
    },

    methods: {
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            this.waypoints3.push({
                lat: this.stationList[0].lat,
                lng: this.stationList[0].lon
            }, {
                lat: this.stationList[6].lat,
                lng: this.stationList[6].lon
            }, {
                lat: this.stationList[1].lat,
                lng: this.stationList[1].lon
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
            });

            for (let i = 0; i < this.waypoints3.length; i++) {
                this.$utils.map.createMakerByXY(this.map, [this.waypoints3[i].lat, this.waypoints3[i].lng], {
                    icon: gifIcon
                });
            }
        },

        addRouting(waypoints, borderColor, fullColor) {
            control = this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
                serviceUrl: 'https://osrm.aspringcloud.com/route/v1',
                addWaypoints: false,
                draggableWaypoints: false,
                showAlternatives: false,
                routeWhileDragging: false,
                fitSelectedRoutes: false,
                lineOptions: {
                    draggable: false,
                    styles: [{
                            color: borderColor,
                            weight: 5
                        },
                        {
                            color: fullColor,
                            weight: 2
                        }
                    ]
                },
                draggable: false,
                autoRoute: true,
                show: false,
                createMarker: function () {
                    return null;
                }
            });
        },

        addRouting2(waypoints, borderColor, fullColor) {
            this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
                serviceUrl: 'https://osrm.aspringcloud.com/route/v1',
                addWaypoints: false,
                draggableWaypoints: false,
                showAlternatives: false,
                routeWhileDragging: false,
                fitSelectedRoutes: false,
                lineOptions: {
                    draggable: false,
                    styles: [{
                            color: borderColor,
                            weight: 6
                        },
                        {
                            color: fullColor,
                            weight: 2
                        }
                    ]
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
                            if (station_result[i].site == 1) {
                                this.stationList.push(station_result[i]);
                                this.stationList = this.stationList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1;
                                });
                            }
                        }

                        this.loading1 = false;
                        if (this.loading1 == false && this.loading2 == false) {
                            this.loading = false;
                        }
                    }

                    this.waypoints2.push({
                            lat: this.stationList[0].lat,
                            lng: this.stationList[0].lon
                        }, {
                            lat: this.stationList[6].lat,
                            lng: this.stationList[6].lon
                        }, {
                            lat: this.stationList[1].lat,
                            lng: this.stationList[1].lon
                        },
                        /* {
                            lat: this.stationList[5].lat,
                            lng: this.stationList[5].lon
                        }, */
                        {
                            lat: this.stationList[2].lat,
                            lng: this.stationList[2].lon
                        }, {
                            lat: this.stationList[3].lat,
                            lng: this.stationList[3].lon
                        }, {
                            lat: this.stationList[4].lat,
                            lng: this.stationList[4].lon
                        });

                    for (var [i, arr2] of this.stationList.entries()) {
                        this.options.push({
                            name: arr2.name,
                            value: i
                        });
                    }

                    this.start_options = this.options;
                    this.end_options = this.options;

                    await this.addMarker();
                    await this.addRouting2(this.waypoints2, '#00CFFF', '#FFFFFF');
                }).catch(error => {
                    console.log('station (GET) error: ');
                    this.error = error;
                    console.log(error);
                })
        },

        getVehicle() {
            axios.get('/api/vehicles/')
                .then(async response => {
                    var vehicle_arr = [];
                    var vehicle_data = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    });
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
                            vehicle_arr.push(vehicle_data[i].id);
                            this.vehicle_id = vehicle_arr[0];

                            this.loading2 = false;
                            if (this.loading1 == false && this.loading2 == false) {
                                this.loading = false;
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

        // 탑승인원
        selectPerson() {
            if (this.count < 2) {
                this.isDisabled1 = true;
            } else {
                this.isDisabled1 = false;
            }

            if (this.count >= 14) {
                this.isDisabled2 = true;
            } else {
                this.isDisabled2 = false;
            }
        },

        async beforeSelectPerson() {
            if (this.count == 0) {
                this.count = 1;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
            }
        },

        closePersonDialog() {
            console.log('count: ', this.count);
            this.dialog = false;
            if (this.temp != 0) {
                this.count = this.temp;
            } else {
                this.count = 1;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
            }
        },

        decrement() {
            this.count -= 1;

            if (this.count < 2) {
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

        rideCount() {
            this.temp = this.count;
            this.dialog = false;
        },

        // options
        clk(item, mode) {
            mode == "start" ? this.start_point = item : this.end_point = item;
        },

        onCancel(state) {
            state == 'start' ? this.start_point = this.options.find(i => i.value === this.start) : this.end_point = this.options.find(i => i.value === this.end);
        },

        onChange() {
            // REMOVE Default Routing
            if (this.waypoints.length > 0) {
                control.spliceWaypoints(0, 6);
            }
            this.waypoints = [];

            this.start = this.start_point.value;
            this.end = this.end_point.value;

            console.log('start: ', this.start);
            console.log('end: ', this.end);

            this.startName = this.start_point.name;
            this.endName = this.end_point.name;

            this.start_options = this.options.filter(opt => opt.value != this.end_point.value);
            this.end_options = this.options.filter(opt => opt.value != this.start_point.value);

            this.station_startId = this.stationList[this.start].id;
            this.station_endId = this.stationList[this.end].id;

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

            // SET New Routing
            this.addRouting(this.waypoints, '#E51973', 'transparent');
            this.getStat2Sta();
        },

        switchDestination() {
            var change = 0;
            if (this.start_point.value == -1 && this.end_point.value == -1) {
                change = this.start_point;
                this.start_point = this.end_point;
                this.end_point = change;
            } else {
                change = this.start_point;
                this.start_point = this.end_point;
                this.end_point = change;
                this.onChange();
            }
        },

        // Location
        getLocation() {
            this.loading3 = true;
            var count = 0;

            this.map.locate({
                setView: true,
                watch: true,
                enableHighAccuracy: true
            }).on('locationfound', e => {
                this.currentlocation = {
                    lat: e.latitude,
                    lon: e.longitude
                };

                if (this.compareLocatoin() == true) {
                    count = 0;
                    this.can = false; // 운행지역 모달
                    this.res = false; // stopLocation()

                    if (!this.usermarker) {
                        this.loading3 = false;
                        e.target._locateOptions.setView = false;

                        let currentUser = this.$utils.map.createDiv({
                            html: "<div id='current_container'><div class='current_item'></div><div class='current_item2'></div><div class='current_circle' style='animation-delay: -3s'></div><div class='current_circle' style='animation-delay: -2s'></div><div class='current_circle' style='animation-delay: -1s'></div><div class='current_circle' style='animation-delay: 0s'></div></div>",
                            iconSize: [0, 0]
                        });

                        return this.usermarker = this.$utils.map.createMakerByXY(this.map, [e.latitude, e.longitude], {
                            icon: currentUser
                        });

                    } else {
                        return this.usermarker.setLatLng(e.latlng);
                    }
                } else {
                    count = 0;
                    this.can = true;
                    this.loading3 = false;
                    this.res = true;
                }
            }).on('locationerror', error => {
                console.log('Location error:', error);
                this.loading3 = false;

                if (count == 0) {
                    this.$toasted.error("사용자의 위치를 받아올 수 없습니다.", {
                        position: "top-center"
                    }).goAway(1000);
                }

                count = count + 1;

                if (this.usermarker) {
                    this.map.removeLayer(this.usermarker);
                    return this.usermarker = null;
                }
            });
        },

        stopLocation() {
            this.res = true; // getLocation()
            this.map.stopLocate();
            this.map.setView([35.812484, 126.4101], 15);

            if (this.usermarker != null || this.usermarker != undefined) {
                this.map.removeLayer(this.usermarker);
                this.usermarker = null;
            }
            console.log('stopLocation usermarker', this.usermarker);
        },

        compareLocatoin() {
            this.success = false;
            for (let i = 0; i < this.stationList.length; i++) { // 하나 정류장에라도 가까이 있으면 success true
                if (800 > calcDistance(this.stationList[i].lat, this.stationList[i].lon, this.currentlocation.lat, this.currentlocation.lon)) {
                    this.success = true;
                    break;
                } else {
                    this.success = false;
                    continue;
                }
            }
            return this.success;
        },

        goBackSite() {
            this.can = false;
            this.stopLocation();
        },

        // ETA
        getStat2Sta() {
            var stat = JSON.parse(this.stationList[this.start].stat2sta);
            var start_station = JSON.parse(this.stationList[this.start].id);
            var end_station = JSON.parse(this.stationList[this.end].id);
            this.minutes = stat[start_station][end_station];
        },

        // 타시오 호출
        requestCallBtn() {
            this.$router.replace({
                name: "CallingLayout",
                query: {
                    start: this.start,
                    end: this.end,
                    station_startId: this.station_startId,
                    station_endId: this.station_endId,
                    startName: this.startName,
                    endName: this.endName,
                    count: this.count,
                    minutes: this.minutes,
                    vehicle_id: this.vehicle_id
                }
            });
        },

        cancelCallDialog() {
            this.calldialog = false;
        }
    },

    watch: {
        currentlocation() {
            for (let i = 0; i < this.stationList.length; i++) {
                if (800 > calcDistance(this.stationList[i].lat, this.stationList[i].lon, this.currentlocation.lat, this.currentlocation.lon)) {
                    this.success = true;
                    this.can = false;
                    break;
                } else {
                    this.success = false;
                    this.can = true;
                    continue;
                }
            }

            return this.success;
        }
    },

}
</script>

<style scoped>
.v-list .v-list-item--active {
    background-color: rgba(230, 23, 115, 0.1) !important;
}

/* 탑승 인원 */
.is-disabled1 {
    color: #BDBDBD !important;
}

.is-disabled2 {
    color: #BDBDBD !important;
}

.v-dialog {
    border-radius: 0 !important;
    box-shadow: none !important;
}

.dialog-background {
    width: 2801px;
    background-image: url('~@/assets/call-dialog.png');
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

.select_station {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #BDBDBD;
}

.sel_station {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #262626;
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
    letter-spacing: 1px;
}

.call-dialog-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    letter-spacing: 1px;
}

.warningmsg {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    color: #262626;
    letter-spacing: -0.5px;
}

.goReturn {
    width: 196px;
    height: 41px !important;
    background: #E61773;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    border-radius: 0;
    margin-top: 15px !important;
    margin-bottom: 18px !important;
    letter-spacing: 0px;
}

.paymentMethod {
    position: relative;
    width: 154px !important;
    height: 65px !important;
    border: 1.5px solid #E61773 !important;
    box-sizing: border-box !important;
    background: transparent !important;
    border-radius: 8px !important;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #E61773 !important;
    letter-spacing: -0.1px;
}

.v-btn:before {
    background-color: transparent !important;
}
</style>
