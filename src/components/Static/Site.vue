<template>
<div id="site">
    <v-container fluid v-if="loading == true" style="display: flex; position: absolute; margin-top: -57px; background: rgba(0, 0, 0, 0.5); height: 100%; pointer-events: inherit !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card color="transparent" flat>
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate size="50" color="#2E3990"></v-progress-circular>
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
                    <v-progress-circular indeterminate size="50" color="#2E3990"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-center" style="color: #2E3990;">
                    위치 받아오는 중...
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>

    <v-container fluid v-if="can == true" color="transparent" style="background: rgba(0, 0, 0, 0.7); display: flex; position: absolute; height: 100%; margin-top: -57px; pointer-events: inherit !important; z-index: 20;">
        <v-row align="center" justify="center">
            <v-card style="margin-top: -57px; width: 100%; background: rgba(255, 255, 255, 0.7); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);" flat tile>
                <v-card-text class="text-center pa-0">
                    <img src="../../assets/warning.svg" style="padding-top: 20px;">
                    <p style="letter-spacing: -1px; margin: 0; padding-top: 6px; padding-bottom: 24px; font-size: 18px; font-weight: 500; color: #262626;">이 곳은 운행지역에서 너무 멀어요!</p>
                    <p class="warningmsg" style="margin: 0;">셔틀이 출발지에 도착한 뒤 탑승이 완료되지 않으면</p>
                    <p class="warningmsg" style="margin: 0;"><span style="color: #EB5757 !important;">호출이 자동 취소</span>됩니다.</p>
                    <v-btn color="#2E3990" tile depressed class="pa-0 pl-3 pr-3 goReturn" :ripple="false" @click.native="goBackSite">운행지역 지도로 돌아가기</v-btn>
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
                                <v-btn icon @click.native="closePersonDialog">
                                    <v-icon color="#262626">mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>

                            <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="position: absolute; background: transparent;">
                                <v-row align="center" justify="center" class="ma-0">
                                    <v-card-text style="position: absolute; top: 158px; text-align: center; font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">탑승인원 선택</v-card-text>
                                    <v-card class="d-flex justify-space-around" flat>
                                        <v-card :ripple="false" flat tile>
                                            <v-btn :class="{ 'is-disabled1': isDisabled1 }" :ripple="false" @click.native="decrement" outlined color="#2E3990" fab>
                                                <v-icon dark>mdi-minus</v-icon>
                                            </v-btn>
                                        </v-card>
                                        <v-card flat tile>
                                            <v-card-text class="count">{{ count }}</v-card-text>
                                        </v-card>
                                        <v-card flat tile :ripple="false">
                                            <v-btn :class="{ 'is-disabled2': isDisabled2 }" :ripple="false" @click.native="increment" outlined color="#2E3990" fab>
                                                <v-icon dark>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-card>
                                    </v-card>
                                    <v-card-text class="select-max mt-9">탑승인원은 최대 14명까지 선택 가능합니다.</v-card-text>
                                </v-row>
                            </v-container>

                            <v-btn class="select-person-btn" @click.native="rideCount" depressed tile>선택완료</v-btn>
                        </v-card>
                    </v-dialog>

                    <span v-if="callBtn" style="display: inline-block; width: 70%;">
                        <v-flex class="mb-3" style="background: #2E3990; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 3px; display: inline-block;">
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
                                    <v-list-item-group color="#2E3990">
                                        <v-list-item class="pa-0" v-for="(item, index) in start_options" @click="clk(item, 'start')" :key="index">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.name" style="color: #333;"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #2E3990; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #2E3990; box-sizing: border-box; letter-spacing: 0;" @click.native="overlay1 = false; onCancel('start');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#2E3990" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px; letter-spacing: 0;" @click.native="overlay1 = false; onChange();">
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
                                    <v-list-item-group color="#2E3990">
                                        <v-list-item class="pa-0" v-for="(item2, index) in end_options" @click="clk(item2, 'end')" :key="index">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item2.name" style="color: #333;"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #2E3990; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #2E3990; box-sizing: border-box; letter-spacing: 0;" @click.native="overlay2 = false; onCancel('end');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#2E3990" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px; letter-spacing: 0;" @click.native="overlay2 = false; onChange();">
                                    선택하기
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-overlay>

                    <v-flex class="selectStationWrap" xs12>
                        <v-layout class="align-center ma-0" fill-height xs12 sm12>
                            <v-flex class="pa-0">
                                <img src="../../assets/arrow-icon.svg">
                            </v-flex>
                            <v-flex class="pa-0 flex-wrap" style="width: 220px;">
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
                            <v-flex class="pa-0" @click="switchDestination">
                                <img src="../../assets/switch-icon.svg">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>

                <!-- 타시오 호출 Dialog -->
                <v-flex class="pa-0 mt-1" v-if="callBtn">
                    <v-btn style="height: 50px;" color="#2E3990" class="callShuttle" @click.native="requestCallBtn">호출하기</v-btn>
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
        global_options: [],
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
        zoomScale: {},

        ok: false,

        clickmarker: false,
        startBtn: '<button onclick="hello()"></button>'
    }),

    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    created() {
        console.log('')
        this.getStation();
        this.getVehicle();

        this.start = parseInt(this.start);
        this.end = parseInt(this.end);
    },

    mounted() {
        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false,
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

        this.zoomEnd();
    },

    updated() {
        if (this.temp >= 1 && this.start >= 0 && this.end >= 0) {
            this.callBtn = true;
        } else {
            this.callBtn = false;
        }
    },

    methods: {
        zoomEnd() {
            var marker = new Array();

            this.map.on('zoomend', async e => {
                this.zoomScale = await e.sourceTarget._zoom;

                for (let i in this.stationList) {
                    let zoomStatus = await this.$utils.map.createDiv({
                        iconUrl: require("../../assets/station_icon.svg"),
                        iconAnchor: [-10, 10],
                        html: `<p style="font-family: Noto Sans KR; font-style: normal; white-space: nowrap; font-weight: 500; color: #E61773 !important; text-shadow: 2px 0 0 #FFF, -2px 0 0 #FFF, 0 2px 0 #FFF, 0 -2px 0 #FFF, 1px 1px #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF;">${this.stationList[i].name}</p>`,
                        className: 'dummy'
                    });

                    if (this.zoomScale > 16) {
                        var LamMarker = this.$utils.map.createMaker([this.waypoints3[i].lat, this.waypoints3[i].lng], {
                            icon: zoomStatus
                        });
                        marker.push(LamMarker);
                        this.map.addLayer(marker[i]);
                    }

                    if (this.zoomScale <= 16) {
                        for (let i in marker) {
                            this.map.removeLayer(marker[i]);
                        }
                    }
                }
            });
        },

        addMarker() {
            this.zoomStatus = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            // Station Marker와 이름을 표시해주기 위한 waypoints
            for (let i in this.stationList) {
                this.waypoints3.push({
                    lat: this.stationList[i].lat,
                    lng: this.stationList[i].lon
                })

                var markersLayer = this.$utils.map.createMakerByXY(this.map, [this.waypoints3[i].lat, this.waypoints3[i].lng], {
                    icon: this.zoomStatus,
                    name: this.stationList[i].name,
                    value: i
                });

                markersLayer.on('click', this.layerClickHandler);
            }
        },

        layerClickHandler(e) {
            // console.log('layerClickHandler global_options: ', this.global_options);
            // console.log('layerClickHandler options: ', this.options);
            // console.log('layerClickHandler start_options: ', this.start_options);
            // console.log('layerClickHandler end_options: ', this.end_options);

            // REMOVE Default Routing
            // if (this.waypoints.length > 0) {
            //     control.spliceWaypoints(0, 6);
            // }
            // this.waypoints = [];

            var marker = e.target;
            var marker_lat = marker._latlng.lat;
            var marker_lng = marker._latlng.lng;

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

            // eslint-disable-next-line no-prototype-builtins
            if (marker.hasOwnProperty('_popup')) {
                marker.unbindPopup();
            }

            // <img src='../../assets/click_start_btn.png' />
            var template =
                `<p id="stationName" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 14px; margin: 14px 0 7px 0 !important;"></p>
                 <form>
                    <button id="startBtn" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px; padding-bottom: 2px;">출발지로 설정</button> <br>
                    <button id="endBtn" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px;">도착지로 설정</button>
                </form>`;

            marker.bindPopup(template);
            marker.openPopup();

            this.$utils.map.getDomUtil('stationName').textContent = marker.options.name;

            var startSubmit = this.$utils.map.getDomUtil('startBtn');

            this.$utils.map.createDomEvent.addListener(startSubmit, 'click', () => {
                this.map.removeLayer(this.start_icon);
                this.start_icon = this.$utils.map.createMakerByXY(this.map, [marker_lat, marker_lng], {
                    icon: startIcon
                });

                // 중복 방지
                this.start = -1;
                this.start_point = {
                    name: '출발지 선택하기',
                    value: -1
                };

                this.start = Number(marker.options.value);
                this.start_point.name = marker.options.name;
                this.start_point.value = marker.options.value;

                this.startName = marker.options.name;
                this.station_startId = this.stationList[this.start].id;

                marker.closePopup();

                // console.log('layerClickHandler options: ', this.options, 'Start name: ', this.start_point);
                this.end_options = this.options.filter(opt => opt.value != this.start_point.value);
                this.options = this.global_options;
                console.log('layerClickHandler end_options click: ', this.end_options);

                // this.clk(this.start_point, 'start');
                this.onCancel('start');

                if (this.waypoints.length > 0) {
                    control.spliceWaypoints(0, 6);
                }
                this.waypoints = [];

                if (this.start >= 0 && this.end >= 0) {
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
                }
                this.addRouting(this.waypoints, '#E51973', 'transparent');
            });

            var endSubmit = this.$utils.map.getDomUtil('endBtn');
            this.$utils.map.createDomEvent.addListener(endSubmit, 'click', () => {
                this.map.removeLayer(this.end_icon);
                this.end_icon = this.$utils.map.createMakerByXY(this.map, [marker_lat, marker_lng], {
                    icon: endIcon
                });

                // 중복 방지
                this.end = -1;
                this.end_point = {
                    name: '도착지 선택하기',
                    value: -1
                };

                this.end = Number(marker.options.value);
                this.end_point.name = marker.options.name;
                this.end_point.value = marker.options.value;

                this.endName = marker.options.name;
                this.station_endId = this.stationList[this.end].id;

                marker.closePopup();
                // console.log('layerClickHandler start_options: ', this.start_options);
                // console.log('layerClickHandler options: ', this.options, 'End name: ', this.end_point);
                this.start_options = this.options.filter(opt => opt.value != this.end_point.value);
                this.options = this.global_options;
                console.log('layerClickHandler start_options: ', this.start_options);

                // this.clk(this.end_point, 'end');
                this.onCancel('end');

                if (this.waypoints.length > 0) {
                    control.spliceWaypoints(0, 6);
                }
                this.waypoints = [];

                if (this.start >= 0 && this.end >= 0) {
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
                }
                this.addRouting(this.waypoints, '#E51973', 'transparent');
            });
        },

        addRouting(waypoints, borderColor, fullColor) {
            control = this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
                serviceUrl: 'https://osrm.springgo.io:900/route/v1',
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
                serviceUrl: 'https://osrm.springgo.io:900/route/v1',
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
            console.log('Station API request');
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
                        console.log('Station API Response');
                        /* this.loading1 = false;
                        if (this.loading1 == false && this.loading2 == false) {
                            this.loading = false;
                            console.log('Station loading False');
                        } */
                        this.loading = false;
                    }

                    // 서비스 중인 경로 그려주기 위한 waypoints
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
                        this.global_options.push({
                            name: arr2.name,
                            value: i
                        });

                        this.options.push({
                            name: arr2.name,
                            value: i
                        });
                    }

                    // console.log('global_options: ', this.global_options);

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
            console.log('Vehicle API request');
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

                            console.log('Vehicle API Response');

                            /* this.loading2 = false;
                            if (this.loading1 == false && this.loading2 == false) {
                                this.loading = false;
                                console.log('Vehicle loading False');
                            } */
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
            console.log('clk mode: ', mode);
            console.log('clk itme: ', item);
        },

        onCancel(state) {
            state == 'start' ? this.start_point = this.start_options.find(i => i.value === this.start) : this.end_point = this.end_options.find(i => i.value === this.end);
            console.log(this.start_point.name)
            console.log(this.end_point.name)
        },

        onChange() {
            // REMOVE Default Routing
            if (this.waypoints.length > 0) {
                control.spliceWaypoints(0, 6);
            }
            this.waypoints = [];

            this.start = this.start_point.value;
            this.end = this.end_point.value;

            this.startName = this.start_point.name;
            this.endName = this.end_point.name;

            // console.log('onChange global_options: ', this.global_options);
            // console.log('onChange options: ', this.options, 'End name: ', this.end_point.name)
            this.start_options = this.options.filter(opt => opt.value != this.end_point.value)
            this.options = this.global_options;
            console.log('onChange start_options: ', this.start_options)

            // console.log('onChange global_options: ', this.global_options);
            // console.log('onChange end_options: ', this.end_options)
            // console.log('onChange options: ', this.options, 'Start name: ', this.start_point.name)
            this.end_options = this.options.filter(opt => opt.value != this.start_point.value)
            this.options = this.global_options;
            console.log('onChange end_options: ', this.end_options)

            // for webSocket
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

            this.map.removeLayer(this.start_icon);
            this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[this.start].lat, this.stationList[this.start].lon], {
                icon: startIcon
            });
            this.map.removeLayer(this.end_icon);
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

            if (this.start_point.value == -1 && this.end_point.value == -1) {
                change = this.start_point;
                this.start_point = this.end_point;
                this.end_point = change;
            } else {
                change = this.start_point;
                this.start_point = this.end_point;
                this.end_point = change;

                if (this.start !== -1 && this.end !== -1) {
                    let temp = this.start;
                    this.start = this.end;
                    this.end = temp;

                    this.onChange();
                } else if (this.start === -1) { // 도착지만 선택된 경우
                    let temp = this.end;
                    this.end = this.start;
                    this.start = temp;

                    this.map.removeLayer(this.end_icon); // 도착지 아이콘 지워주고 출발지 아이콘으로 바꿔주기
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[this.start].lat, this.stationList[this.start].lon], {
                        icon: startIcon
                    });
                } else if (this.end === -1) {
                    let temp = this.start;
                    this.start = this.end;
                    this.end = temp;

                    this.map.removeLayer(this.start_icon);
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.stationList[this.end].lat, this.stationList[this.end].lon], {
                        icon: endIcon
                    });
                }
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

    /* watch: {
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
    } */

}
</script>

<style>
.leaflet-popup-content-wrapper {
    width: 130px;
    height: 100px;
    text-align: center;
}

.leaflet-popup-content {
    width: 100% !important;
    padding: 4px 0px 10px;
    margin: 0 !important;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background: #515151;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
    color: #FFFFFF;
}

.leaflet-container a.leaflet-popup-close-button {
    padding: 1px 5px 0 0 !important;
    text-align: center;
    width: 20px !important;
    height: 20px !important;
    font: 20px/20px Noto Sans !important;
    color: #FFFFFF !important;
    font-weight: 100 !important;
}
</style><style scoped>
.v-list .v-list-item--active {
    background-color: #EBF3FE !important;
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
    background: #2E3990;
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
    border: 1.5px solid #2E3990 !important;
    box-sizing: border-box !important;
    background: transparent !important;
    border-radius: 8px !important;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #2E3990 !important;
    letter-spacing: -0.1px;
}

.v-btn:before {
    background-color: transparent !important;
}
</style>
