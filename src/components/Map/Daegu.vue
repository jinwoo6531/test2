<template>
<div id="daegu">
    <v-container class="map-container pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
            </v-flex>

            <v-flex class="pa-0 selectBox" xs12 sm12 md12 lg12 xl12>
                <div>
                    <v-card class="d-flex justify-end" color="transparent" flat>
                        <v-card class="pr-4" color="transparent" flat @click="res ? getLocation() : stopLocation()">
                            <v-btn fab small color="#FFF" style="0px 0px 4px rgba(0, 0, 0, 0.25); !important;">
                                <v-icon color="#666666">mdi-crosshairs-gps</v-icon>
                            </v-btn>
                        </v-card>
                    </v-card>
                </div>
                <v-flex class="pa-4 pt-0" xs12 sm12 md12 lg12 xl12>
                    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <template v-slot:activator="{ on }">
                            <v-btn class="person-modal" color="#fff" v-on="on">
                                <v-icon left>mdi-account-outline</v-icon>
                                <span v-if="count >= 1">탑승인원 {{ count }}명</span>
                                <span v-else @click="selectPerson">탑승인원 선택</span>
                            </v-btn>
                        </template>
                        <v-card style="position: absolute; width: 100%; height: 100%;">
                            <v-toolbar color="transparent" style="position: fixed; width: 100%; top: 0; z-index: 3;" flat>
                                <v-btn icon @click="dialog = false">
                                    <v-icon color="#262626">mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>

                            <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="position: absolute; background: transparent;">
                                <v-row align="center" justify="center" class="ma-0">
                                    <v-card-text style="position: absolute; top: 158px; text-align: center; font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">탑승인원 선택</v-card-text>
                                    <v-card class="d-flex justify-space-around" flat>
                                        <v-card flat tile>
                                            <v-btn :class="{ 'is-disabled1': isDisabled1 }" @click="decrement" outlined color="#E61773" fab>
                                                <v-icon dark>mdi-minus</v-icon>
                                            </v-btn>
                                        </v-card>
                                        <v-card flat tile>
                                            <v-card-text class="count">{{ count }}</v-card-text>
                                        </v-card>
                                        <v-card flat tile>
                                            <v-btn :class="{ 'is-disabled2': isDisabled2 }" @click="increment" outlined color="#E61773" fab>
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

                    <v-flex v-if="callBtn" class="mb-3" style="background: #E61773; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 3px;" xs8 sm8 md8>
                        <p class="ma-0" style="color: #FFF; height: 30px;">
                            <span style="display: inline-block; height: 100%;">
                                <img style="vertical-align: middle;" class="pl-3 pr-3" src="../../assets/time-icon.svg">
                                <span style="vertical-align: middle; font-style: normal; font-weight: normal; font-size: 14px; color: #FFF;">소요시간: <span style="color: #FFF; font-weight: 500; font-size: 18px;">약 {{ minutes }}분</span></span>
                            </span>
                        </p>
                    </v-flex>

                    <v-overlay :z-index="zIndex" :value="overlay1">
                        <v-card color="#FFF" style="width: 312px; height: 287px;">
                            <v-card-text style="color: #000; width: 100%; height: 237px;">
                                <scroll-picker style="top: 50%; margin-top: -70px; font-style: normal; font-weight: 500; font-size: 16px;" :options="options" v-model="start" />
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
                                <scroll-picker style="top: 50%; margin-top: -70px; font-style: normal; font-weight: 500; font-size: 16px;" :options="options" v-model="end" />
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
                                    <v-card style="text-align: left;" class="pl-2" color="transparent" @click="overlay1 = !overlay1" flat>
                                        <span v-if="start >= 1">{{ options[start - 1].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ start }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end >= 1">{{ options[end - 1].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ end }}</span>
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
                        <v-card style="width: 280px; height: 404px; background-color: transparent;">
                            <v-card flat class="dialog-background" style="background-color: transparent;">
                                <v-card-text class="pa-3 text-center">
                                    <v-card-text class="pa-0 call-dialog-title">타시오를 호출할게요.</v-card-text>
                                    <v-card-text class="pa-0 pt-1 call-dialog-subtitle">총 탑승요금</v-card-text>
                                    <v-card-text class="pa-0 call-dialog-paymony">2,000<span style="font-size: 14px !important;">원</span></v-card-text>
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
                                </v-card-text>

                                <v-card flat class="pa-0 pt-2 d-flex align-self-end">
                                    <v-container class="pa-0">
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-btn color="#FAFAFA" tile depressed class="pa-0 call-cancel-dialog-btn" width="100%" height="55.5px" @click="calldialog = false">취소</v-btn>
                                            </v-col>
                                            <v-col>
                                                <v-btn color="#E61773" tile depressed class="pa-0 call-dialog-btn" width="100%" height="55.5px" @click="requestCallBtn">호출하기</v-btn>
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
import axios from 'axios'
var control

export default {
    name: 'Daegu',

    data: () => ({
        res: true,
        pageId: 2,
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        staticAnchor: [16, 37],
        vehicleReady: false,
        waypoints: [{
                lat: 35.8363080000000000,
                lng: 128.6815470000000000
            },
            {
                lat: 35.8386730000000000,
                lng: 128.6878920000000000
            },
            {
                lat: 35.8370500000000000,
                lng: 128.6900440000000000
            },
            {
                lat: 35.8345900000000000,
                lng: 128.6865200000000000
            },
            {
                lat: 35.8363080000000000,
                lng: 128.6815470000000000
            }
        ],
        data: null,
        options: [],
        station_arr: [],
        start: '출발지 선택',
        end: '도착지 선택 ',
        startId: [],
        endId: [],
        vehicle: [],
        distanceKm: 0,
        minutes: 0,
        daeguList: [],
        callBtn: false,
        dialog: false,
        calldialog: false,
        count: 0,
        isDisabled1: true,
        isDisabled2: false,
        overlay1: false,
        overlay2: false,
        zIndex: 0,

        start_icon: {},
        end_icon: {},

        switch1: false,
        originStart: '',
        originEnd: '',
        changeStart: '',
        changeEnd: '',

        usermarker: ''
    }),

    created() {
        this.getStation()
        this.getVehicle()
    },

    mounted() {
        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        })

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {})

        // Map View Center Load
        this.map.setView([35.836673, 128.686520], 15)
 
        this.addMarker()
        this.addRouting(this.waypoints)
    },

    updated() {
        if (this.count >= 1 && this.start >= 1 && this.end >= 1) {
            this.callBtn = true
        }
    },

    methods: {
        getLocation() {
            this.map.locate({
                setView: true,
                maxZoom: 18,
                watch: true,
                enableHighAccuracy: true
            }).on("locationfound", e => {
                // var current_lat = 35.836673
                // var current_lng = 128.686520
                console.log('Location found: ' + e.latitude + e.longitude)
                // console.log(e.latitude - current_lat)
                // console.log(e.longitude - current_lng)
                // if (e.latitude - current_lat > 1 && e.longitude - current_lng < 1) {
                //     alert('거리가 멀어서 호출 불가!')
                // }
                if (!this.usermarker) {
                    let currentUser = this.$utils.map.createIcon({
                        iconUrl: require("../../assets/current.svg"),
                        iconSize: [17, 17]
                    })

                    this.usermarker = this.$utils.map.createMakerByXY(this.map, [e.latitude, e.longitude], {
                        icon: currentUser
                    })

                } else {
                    this.usermarker.setLatLng(e.latlng)
                }
            }).on("locationerror", error => {
                alert('사용자의 위치를 받아올 수 없습니다.')
                console.log('Location error:')
                console.log(error)
                if (this.usermarker) {
                    this.map.removeLayer(this.usermarker)
                    this.usermarker = null
                }
            })

            this.res = false
        },

        stopLocation() {
            if (this.usermarker != null || this.usermarker != undefined) {
                this.map.removeLayer(this.usermarker)
                this.usermarker = null
                this.map.stopLocate()
                this.map.setView([35.836673, 128.686520], 15)
                console.log('stopLocation usermarker', this.usermarker)
            }

            this.res = true
        },

        increment() {
            this.count += 1

            if (this.count >= 14) {
                this.isDisabled2 = true
                this.count = 14
            } else {
                this.isDisabled2 = false
            }

            if (this.count <= 1) {
                this.isDisabled1 = true
                this.count = 1
            } else {
                this.isDisabled1 = false
            }
        },

        decrement() {
            this.count -= 1

            if (this.count <= 1) {
                this.isDisabled1 = true
                this.count = 1
            } else {
                this.isDisabled1 = false
            }

            if (this.count >= 14) {
                this.isDisabled2 = true
                this.count = 14
            } else {
                this.isDisabled2 = false
            }
        },

        selectPerson() {
            this.count = 1
        },

        rideCount() {
            console.log(this.count)
            this.dialog = false
        },

        switchDestination() {
            var change = this.start
            this.start = this.end
            this.end = change
            this.onChange()
        },

        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            })

            this.$utils.map.createMakerByXY(this.map, [35.8363080000000000, 128.6815470000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8386730000000000, 128.6878920000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8370500000000000, 128.6900440000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8345900000000000, 128.6865200000000000], {
                icon: gifIcon
            })
        },

        addRouting(waypoints) {
            control = this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
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
        },

        getStation() {
            axios.get('/api/stations/')
                .then(response => {
                    if (response.status == 200) {
                        let station_result = response.data
                        let station_count = Object.keys(station_result).length
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == this.pageId) {
                                this.daeguList.push(station_result[i])
                                this.daeguList = this.daeguList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1
                                })
                            }
                        }
                    }

                    for (var arr of this.daeguList) {
                        this.options.push({
                            name: arr.name,
                            value: arr.id
                        })
                    }
                }).catch(error => {
                    console.log('station (GET) error: ')
                    this.error = error
                    console.log(error)
                })
        },

        onChange() {
            // REMOVE Default Routing
            control.spliceWaypoints(0, 6)
            this.waypoints = []

            if (this.start >= 1 && this.end >= 1) {
                // ADD Between Station
                if (this.start < this.end) {
                    for (let i = this.start; i <= this.end; i++) {
                        this.waypoints.push({
                            lat: this.daeguList[i - 1].lat,
                            lng: this.daeguList[i - 1].lon
                        })
                    }

                } else if (this.start > this.end) {
                    this.waypoints.push({
                        lat: this.daeguList[this.start - 1].lat,
                        lng: this.daeguList[this.start - 1].lon
                    })
                    for (let i = this.start;
                        (i % 4) != this.end; i++) {
                        this.waypoints.push({
                            lat: this.daeguList[i % 4].lat,
                            lng: this.daeguList[i % 4].lon
                        })
                    }
                    // SAME Station Id
                } else if (this.start == this.end) {
                    switch (this.start) {
                        case 1:
                            this.waypoints.push({
                                lat: this.daeguList[0].lat,
                                lng: this.daeguList[0].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[0].lat,
                                lng: this.daeguList[0].lon
                            })
                            break
                        case 2:
                            this.waypoints.push({
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[0].lat,
                                lng: this.daeguList[0].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            })
                            break
                        case 3:
                            this.waypoints.push({
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[0].lat,
                                lng: this.daeguList[0].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            })
                            break
                        default:
                            this.waypoints.push({
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[0].lat,
                                lng: this.daeguList[0].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            })
                    }

                }

                let startIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/start-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.start === 1) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[0].lat, this.daeguList[0].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 2) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[1].lat, this.daeguList[1].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 3) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[2].lat, this.daeguList[2].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 4) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[3].lat, this.daeguList[3].lon], {
                        icon: startIcon
                    })
                }

                let endIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/end-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.end === 1) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[0].lat, this.daeguList[0].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 2) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[1].lat, this.daeguList[1].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 3) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[2].lat, this.daeguList[2].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 4) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.daeguList[3].lat, this.daeguList[3].lon], {
                        icon: endIcon
                    })
                }

                this.map.removeLayer(endIcon)

                // SET New Routing
                this.addRouting(this.waypoints)
                this.totalDistance()
            }
        },

        totalDistance() {
            /* control.on('routesfound', (e) => {
                console.log(e)
                var summary = e.routes[0].summary
                // totalDistance: Meters -> Km
                this.distanceKm = (summary.totalDistance) / 1000
                // totalTime: seconds -> Minutes
                this.minutes = Math.round(summary.totalTime % 3600 / 60)
            }).addTo(this.map) */

            if (this.start == 1) {
                if (this.end == 2) {
                    this.minutes = "5"
                } else if (this.end == 3) {
                    this.minutes = "8"
                } else if (this.end == 4) {
                    this.minutes = "12"
                } else if (this.end == 1) {
                    this.minutes = "17"
                }
            } else if (this.start == 2) {
                if (this.end == 3) {
                    this.minutes = "2"
                } else if (this.end == 4) {
                    this.minutes = "6"
                } else if (this.end == 1) {
                    this.minutes = "11"
                } else if (this.end == 2) {
                    this.minutes = "17"
                }
            } else if (this.start == 3) {
                if (this.end == 4) {
                    this.minutes = "4"
                } else if (this.end == 1) {
                    this.minutes = "8"
                } else if (this.end == 2) {
                    this.minutes = "14"
                } else if (this.end == 3) {
                    this.minutes = "17"
                }
            } else if (this.start == 4) {
                if (this.end == 1) {
                    this.minutes = "4"
                } else if (this.end == 2) {
                    this.minutes = "10"
                } else if (this.end == 3) {
                    this.minutes = "12"
                } else if (this.end == 4) {
                    this.minutes = "17"
                }
            }
        },

        getVehicle() {
            axios.get('/api/vehicles/')
                .then(response => {
                    var vehicle_data = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    })
                    var vehicleCount = Object.keys(vehicle_data).length
                    for (let i = 0; i < vehicleCount; i++) {
                        if (vehicle_data[i].site == 2) {
                            var vehicleIcon = this.$utils.map.createIcon({
                                iconUrl: require("../../assets/vehicle1.svg"),
                                iconSize: [32, 32]
                            })
                            this.vehicle[i] = this.$utils.map.createMakerByXY(this.map, [vehicle_data[i].lat, vehicle_data[i].lon], {
                                draggable: false,
                                icon: vehicleIcon
                            })
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            setInterval(async function () {
                axios.get('/api/vehicles/')
                    .then(response => {
                        var vehicle_data = response.data.sort(function (a, b) {
                            return a.id < b.id ? -1 : 1
                        })
                        var vehicleCount = Object.keys(vehicle_data).length;
                        for (let i = 0; i < vehicleCount; i++) {
                            if (vehicle_data[i].site == 2) {
                                this.vehicle[i].setLatLng([vehicle_data[i].lat, vehicle_data[i].lon])
                                // console.log(i, "번", this.vehicle[i]._latlng.lat, this.vehicle[i]._latlng.lng)
                            }
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            }.bind(this), 1000)
        },

        requestCallBtn() {
            this.$router.push({
                name: "CallingLayout",
                params: {
                    site: this.pageId,
                    start: this.start,
                    end: this.end,
                    startName: this.options[this.start - 1].name,
                    endName: this.options[this.end - 1].name,
                    count: this.count,
                    minutes: this.minutes
                }
            })
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
    height: 330px;
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
</style>
