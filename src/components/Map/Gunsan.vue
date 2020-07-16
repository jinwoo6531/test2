<template>
<div id="gunsan">
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
                <v-card-text class="text-center">
                    <img src="../../assets/warning.svg">
                    <p style="margin: 0; padding-top: 8px; padding-bottom: 26px; font-size: 18px; font-weight: 500; color: #262626;">이 곳은 타시오 운행지역에서 너무 멀어요!</p>
                    <p class="warningmsg" style="margin: 0;">셔틀이 출발지에 도착한 시점부터</p>
                    <p class="warningmsg" style="margin: 0;"><span style="color: #EB5757 !important;">5분 내</span> 탑승이 완료되지 않으면</p>
                    <p class="warningmsg" style="margin: 0;"><span style="color: #EB5757 !important;">호출이 자동 취소</span>되며 <span style="color: #EB5757 !important;">위약금이 발생</span>합니다.</p>
                    <v-btn color="#E61773" tile depressed class="pa-0 pl-3 pr-3 goReturn" :ripple="false" @click="can = false">운행지역 지도로 돌아가기</v-btn>
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
                                    <span v-if="count >= 1" style="padding-left: 12px;" @click="selectPerson">탑승인원 {{ temp }}명</span>
                                    <span v-else @click="count = 1" style="color: #262626; padding-left: 12px;">탑승인원 선택</span>
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
                            <v-card class="pa-0" color="#FFF" style="width: 100%; height: 289px; overflow: scroll;" tile flat>
                                <v-list light tile>
                                    <v-list-item-group color="#E61773">
                                        <v-list-item v-for="item in start_options" @click="clk(item,'start')" :key="item.value">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #E61773; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #E61773; box-sizing: border-box;" @click="overlay1 = false; onCancel('start');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#E61773" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px;" @click="overlay1 = false; onChange();">
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
                            <v-card class="pa-0" color="#FFF" style="width: 100%; height: 289px; overflow: scroll;" tile flat>
                                <v-list light tile>
                                    <v-list-item-group color="#E61773">
                                        <v-list-item v-for="item2 in end_options" @click="clk(item2,'end')" :key="item2.value">
                                            <v-list-item-content>
                                                <v-list-item-title v-text="item2.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                            <v-card-actions class="pa-0" style="width: 100%; height: 50px;">
                                <v-btn class="pa-0 ma-0" tile depressed color="#FFF" style="width: 50%; height: 100%; color: #E61773; font-style: normal; font-weight: 500; font-size: 16px; border-top: 0.5px solid #E61773; box-sizing: border-box;" @click="overlay2=false; onCancel('end');">
                                    취소
                                </v-btn>
                                <v-btn class="pa-0 ma-0" tile depressed color="#E61773" style="width: 50%; height: 100%; font-style: normal; font-weight: 500; font-size: 16px;" @click="overlay2=false; onChange();">
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
                                        <span v-if="start < 0 || start_point.name==startTemp" style="color: #BDBDBD">{{ startTemp }}</span>
                                        <span v-else>{{ start_point.name }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" :ripple="false" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end < 0 || end_point.name==endTemp" style="color: #BDBDBD">{{ endTemp }}</span>
                                        <span v-else>{{ end_point.name }}</span>
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
                                        <v-btn tile depressed class="paymentMethod pa-0 mr-6" :class="{ red: isRed1 }" :ripple="false" @click="requestPay('191029079116', 'card')">신용카드 결제</v-btn>
                                        <span><img src="../../assets/check-state.svg" v-if="isRed1 == true" class="check-state"></span>
                                        <v-btn tile depressed class="paymentMethod pa-0" :class="{ red: isRed2 }" :ripple="false" @click="requestPay('170622040674', 'phone')">휴대폰 결제</v-btn>
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
import axios from 'axios'
var control

export default {
    name: 'Gunsan',

    data: () => ({
        loading: true,
        loading1: true,
        loading2: true,
        loading3: false,
        res: true,
        can: false,
        pageId: 1,
        siteName: 'gunsan',
        map: null,
        OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
        staticAnchor: [16, 37],
        vehicleReady: false,
        waypoints: [],
        data: null,
        options: [],
        station_arr: [],
        startTemp: '출발지 선택',
        endTemp: '도착지 선택',
        start: -1,
        end: -1,
        start_point: {
            name: '출발지 선택',
            value: -1
        },
        end_point: {
            name: '도착지 선택',
            value: -1
        },
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
        pay_method: '',
        isRed1: false,
        isRed2: false,
        start_options: [],
        end_options: [],
        currentlocation: {
            lat: '',
            lon: ''
        },
        success: true
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
        console.log('gunsan uid: ', this.user.data.uid);
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
        this.map.locate({
            setView: false,
            maxZoom: 18,
            enableHighAccuracy: true
        }).on("locationfound", e => {
            this.currentlocation = {
                lat: e.latitude,
                lon: e.longitude
            };
        })
    },

    watch: {
        currentlocation() {
            this.$toasted.show(`watch: ${this.currentlocation}`, {
                theme: "bubble",
                position: "top-center"
            }).goAway(2000);

            for (let i = 0; i < this.gunsanList.length; i++) { 
                if (1000 > calcDistance(this.gunsanList[i].lat, this.gunsanList[i].lon, this.currentlocation.lat, this.currentlocation.lon)) {
                    this.success = true;
                    break;
                } else {
                    this.success = false;
                    continue;
                }
            }

            return this.success;
        }
    },

    updated() {
        if (this.count >= 1 && this.start >= 0 && this.end >= 0) {
            this.callBtn = true;
        } else {
            this.callBtn = false;
        }
    },

    methods: {
        clk(item, mode) {
            mode == "start" ? this.start_point = item : this.end_point = item;
        },

        // 모든 정류장 기준으로 2km 이상 떨어져 있을 경우 경고문 띄워준다.
        getLocation() {
            console.log('suc??', this.compareLocatoin());
            if (this.compareLocatoin() == true) {
                this.loading3 = true;
                this.can = false;

                this.map.locate({
                    setView: true,
                    maxZoom: 18,
                    watch: true,
                    enableHighAccuracy: true
                }).on("locationfound", e => {
                    this.currentlocation = {
                        lat: e.latitude,
                        lon: e.longitude
                    };
                    console.log('Location found: ' + e.latitude + e.longitude);

                    if (!this.usermarker) {
                        this.loading3 = false;

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
                }).on("locationerror", error => {
                    this.loading3 = false;
                    this.$toasted.show("사용자의 위치를 받아올 수 없습니다", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(2000);

                    console.log('Location error:', error);
                    if (this.usermarker) {
                        this.map.removeLayer(this.usermarker);
                        this.usermarker = null;
                    }

                    console.log('현재 위치 다시? ', this.getLocation());
                })
                this.res = false;
            } else {
                this.can = true;
                this.res = true;
            }
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

        compareLocatoin() {
            this.success = false;
            for (let i = 0; i < this.gunsanList.length; i++) { // 하나 정류장에라도 가까이 있으면 success true
                if (1000 > calcDistance(this.gunsanList[i].lat, this.gunsanList[i].lon, this.currentlocation.lat, this.currentlocation.lon)) {
                    this.success = true;
                    break;
                } else {
                    this.success = false;
                    continue;
                }
            }

            return this.success;
        },

        increment() {
            console.log('increment: ', this.count);
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
            console.log('decrement: ', this.count);
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

        closePersonDialog() {
            console.log('count: ', this.count)
            this.dialog = false;
            this.count = this.temp;
            console.log('이게 진짜지롱!', this.temp);
        },

        rideCount() {
            this.temp = this.count;
            this.dialog = false;
        },

        switchDestination() {
            if (this.start >= 0 && this.end >= 0) {
                var change = this.start_point;
                this.start_point = this.end_point;
                this.end_point = change;
                this.onChange();
            }
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

                        this.loading1 = false;
                        if (this.loading1 == false && this.loading2 == false) {
                            this.loading = false;
                        }
                    }

                    console.log('gunsanList', this.gunsanList);
                    // 19 -> 10 -> 12 -> 13 -> 11 -> 18 -> 09 (다시) -> 19
                    // 상행선: 9 -> 19 -> 10 -> 12 -> 13
                    // 하행선: 13 -> 11 -> 18 -> 9
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                    /* this.waypoints.push({
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
                    }) */

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

        onCancel(state) {
            state == 'start' ? this.start_point = this.options.find(i => i.value === this.start) : this.end_point = this.options.find(i => i.value === this.end);
        },

        async onChange() {
            // REMOVE Default Routing
            control.spliceWaypoints(0, 6);
            this.waypoints = [];

            this.start = this.start_point.value;
            this.end = this.end_point.value;

            this.start_options = this.options.filter(opt => opt.value != this.end_point.value);
            this.end_options = this.options.filter(opt => opt.value != this.start_point.value);

            this.station_startId = this.gunsanList[this.start].id;
            this.station_endId = this.gunsanList[this.end].id;
            console.log(this.station_startId)
            console.log(this.station_endId)

            let startIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/start-icon.svg"),
                iconSize: [40, 40]
            });
            let endIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/end-icon.svg"),
                iconSize: [40, 40]
            });

            if (this.start == 0) {
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
                } else if (this.end == 3) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    })
                } else if (this.end == 4) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 2 || this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                }
            }
            if (this.start == 6) {
                if (this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    })
                } else if (this.end == 3) {
                    this.waypoints.push({
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    })
                } else if (this.end == 4) {
                    this.waypoints.push({
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 2 || this.end == 5 || this.end == 0) {
                    this.waypoints.push({
                        lat: this.gunsanList[6].lat,
                        lng: this.gunsanList[6].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                }
            }
            if (this.start == 1) {
                if (this.end == 3) {
                    this.waypoints.push({
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    })
                } else if (this.end == 4 || this.end == 2 || this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 0 || this.end == 6) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[1].lat,
                        lng: this.gunsanList[1].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                }
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
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 5) {
                    this.waypoints.push({
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                } else if (this.end == 0 || this.end == 6 || this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[2].lat,
                        lng: this.gunsanList[2].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    })
                }
            }

            if (this.start == 4) {
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
                } else if (this.end == 0 || this.end == 6 || this.end == 1 || this.end == 3) {
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
                } else if (this.end == 0 || this.end == 6 || this.end == 1) {
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
                } else if (this.end == 3) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
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
                } else if (this.end == 4) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
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
                }
            }

            if (this.start == 5) {
                if (this.end == 0 || this.end == 6 || this.end == 1) {
                    this.waypoints.push({
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 3) {
                    this.waypoints.push({
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                } else if (this.end == 4 || this.end == 2) {
                    this.waypoints.push({
                        lat: this.gunsanList[4].lat,
                        lng: this.gunsanList[4].lon
                    }, {
                        lat: this.gunsanList[3].lat,
                        lng: this.gunsanList[3].lon
                    }, {
                        lat: this.gunsanList[5].lat,
                        lng: this.gunsanList[5].lon
                    }, {
                        lat: this.gunsanList[0].lat,
                        lng: this.gunsanList[0].lon
                    })
                }
            }
            /* this.waypoints.push({
                lat: this.gunsanList[0].lat,
                lng: this.gunsanList[0].lon
            }, {
                lat: this.gunsanList[6].lat,
                lng: this.gunsanList[6].lon
            }, {
                lat: this.gunsanList[1].lat,
                lng: this.gunsanList[1].lon
            }, {
                lat: this.gunsanList[5].lat,
                lng: this.gunsanList[5].lon
            }, {
                lat: this.gunsanList[2].lat,
                lng: this.gunsanList[2].lon
            }, {
                lat: this.gunsanList[3].lat,
                lng: this.gunsanList[3].lon
            }, {
                lat: this.gunsanList[4].lat,
                lng: this.gunsanList[4].lon
            }) */

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
            this.getEta();
            // this.totalDistance();
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

        getEta() {
            console.log('stationList', this.gunsanList);
            var eta = JSON.parse(this.gunsanList[this.start].eta);
            var etaVehicle = 0;
            var etaTime = 0;
            console.log('eta', eta);
            for (let key in eta) {
                etaVehicle = key;
                etaTime = eta[key];
            }
            console.log('etaVehicle', etaVehicle);
            this.minutes = etaTime;
            console.log('minutes', this.minutes);

        },

        requestCallBtn() {
            var totalPayment = String('1000' * this.count).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

            const IMP = window.IMP;

            // 가맹점 식별코드
            IMP.init("imp19092456");

            // // 결제창 호출 코드
            IMP.request_pay({ // param
                pg: `mobilians.${this.meth}`, // PG사명
                pay_method: this.pay_method, // 결제수단
                merchant_uid: 'mid_' + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
                name: '타시오 결제', // 주문명
                amount: totalPayment, // 결제할 금액 (필수 항목)
                buyer_email: '', // 주문자 ID (선택 항목)
                buyer_name: '', // 주문자명 (선택항목)
                buyer_tel: '010-8433-9772', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
                buyer_addr: '', // 주문자 주소 (선택 항목)
                buyer_postcode: '', // 주문자 우편 번호 (선택 항목)
                custom_data: {
                    imp_uid: this.user.data.uid,
                    count: this.count
                }, // import에서 제공하는 커스텀 데이터 변수에 useruid 를 담아서 보냄
                // m_redirect_url: `https://connector.tasio.io/tasio-288c5/us-central1/app/api/payment/put?site=${this.pageId}&siteName=${this.siteName}&start=${this.start}&end=${this.end}&startName=${this.options[this.start].name}&endName=${this.options[this.end].name}&station_startId=${this.station_startId}&station_endId=${this.station_endId}&count=${this.count}&minutes=${this.minutes}`
                m_redirect_url: `http://service.tasio.io:1994/tasio-288c5/us-central1/app/api/payment/put?site=${this.pageId}&siteName=${this.siteName}&start=${this.start}&end=${this.end}&startName=${this.options[this.start].name}&endName=${this.options[this.end].name}&station_startId=${this.station_startId}&station_endId=${this.station_endId}&count=${this.count}&minutes=${this.minutes}`
            });
        },

        requestPay(meth, pay_method) {
            if (meth == '191029079116' && pay_method == 'card') {
                this.isRed1 = true;
                this.isRed2 = false;
                this.meth = meth;
                this.pay_method = pay_method;
            } else if (meth == '170622040674' && pay_method == 'phone') {
                this.isRed1 = false;
                this.isRed2 = true;
                this.meth = meth;
                this.pay_method = pay_method;
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

.warningmsg {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    color: #262626;
}

.goReturn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    border-radius: 0;
    margin-top: 15px !important;
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
