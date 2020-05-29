<template>
<div id="gunsan">
    <v-container class="map-container pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
            </v-flex>

            <v-flex class="pa-0 selectBox" xs12 sm12 md12 lg12 xl12>
                <div>
                    <v-card class="d-flex justify-end" color="transparent" flat>
                        <v-card class="pr-4" color="transparent" flat @click="res ? getLocation() : stopLocation()">
                            <img style="diplay: inline-block;" src="../../assets/location-btn.svg">
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
                                        <span v-if="start >= 9">{{ options[start - 9].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ start }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end >= 9">{{ options[end - 9].name }}</span>
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
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="requestCallBtn">호출하기</v-btn>
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
    name: 'Gunsan',

    data: () => ({
        res: true,
        pageId: 1,
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        staticAnchor: [16, 37],
        vehicleReady: false,
        waypoints: [{
                lat: 35.8118970000000000,
                lng: 126.4048860000000000
            },
            {
                lat: 35.8141840000000000,
                lng: 126.4098450000000000
            },
            {
                lat: 35.8138460000000000,
                lng: 126.4132000000000000
            },
            {
                lat: 35.8136980000000000,
                lng: 126.4137440000000000
            },
            {
                lat: 35.8114720000000000,
                lng: 126.4164430000000000
            }
        ],
        data: null,
        options: [],
        station_arr: [],
        start: '출발지 선택',
        end: '도착지 선택 ',
        startId: [],
        endId: [],
        vehicle: 0,
        km: 0,
        minutes: 0,
        gunsanList: [],
        callBtn: false,
        dialog: false,
        count: 0,
        isDisabled1: true,
        isDisabled2: false,
        overlay1: false,
        overlay2: false,
        zIndex: 0,

        start_icon: {},
        end_icon: {},

        marker: {},
        switch1: false,
        originStart: '',
        originEnd: '',
        changeStart: '',
        changeEnd: ''
    }),

    created() {
        this.getStation()
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
        this.map.setView([35.812484, 126.4091], 15)

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
            console.log("GET!");
            this.$utils.map.getLocation(this.map, {
                setView: true,
                watch: true,
                setZoom: 25,
                drawMarker: true
            }).then(response => {
                this.marker = response
                console.log('getLocation marker', this.marker)
            })

            this.res = false
        },

        stopLocation() {
            // alert ("marker id: " + this.marker._leaflet_id)

            if (this.marker != null || this.marker != undefined) {
                this.map.removeLayer(this.marker)
                this.map.stopLocate()
                this.map.setView([35.836673, 128.686520], 15)
            }

            /* this.map.eachLayer(function (layer) {
                if (layer._leaflet_id == "current") {
                    this.map.removeLayer(layer)
                } else {
                    console.log("marker is not present")
                }
            }) */

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

            this.$utils.map.createMakerByXY(this.map, [35.8118970000000000, 126.4048860000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8141840000000000, 126.4098450000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8138460000000000, 126.4132000000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8136980000000000, 126.4137440000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8114720000000000, 126.4164430000000000], {
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
                                this.gunsanList.push(station_result[i])
                                this.gunsanList = this.gunsanList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1;
                                })
                            }
                        }
                    }

                    for (var arr of this.gunsanList) {
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

            if (this.start >= 9 && this.end >= 9) {
                // ADD Between Station
                if (this.start < this.end) {
                    for (let i = this.start; i <= this.end; i++) {
                        this.waypoints.push({
                            lat: this.gunsanList[i - 9].lat,
                            lng: this.gunsanList[i - 9].lon
                        })
                    }

                } else if (this.start > this.end) {
                    alert('지원하지 않습니다.')
                    // SAME Station Id
                } else if (this.start == this.end) {
                    alert('같은 정류장 선택 불가')
                }

                let startIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/start-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.start === 9) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[0].lat, this.gunsanList[0].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 10) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[1].lat, this.gunsanList[1].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 11) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[2].lat, this.gunsanList[2].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 12) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[3].lat, this.gunsanList[3].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 13) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[4].lat, this.gunsanList[4].lon], {
                        icon: startIcon
                    })
                }

                let endIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/end-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.end === 9) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[0].lat, this.gunsanList[0].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 10) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[1].lat, this.gunsanList[1].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 11) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[2].lat, this.gunsanList[2].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 12) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[3].lat, this.gunsanList[3].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 13) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.gunsanList[4].lat, this.gunsanList[4].lon], {
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
            control.on('routesfound', (e) => {
                // 출발지와 도착지의 totalDistance
                this.km = e.routes[0].summary.totalDistance / 1000
                this.minutes = Math.round(e.routes[0].summary.totalTime % 3600 / 60)
            }).addTo(this.map)
        },

        requestCallBtn() {
            this.$router.push({
                name: "CallingLayout",
                params: {
                    site: this.pageId,
                    start: this.start,
                    end: this.end,
                    startName: this.options[this.start - 9].name,
                    endName: this.options[this.end - 9].name,
                    count: this.count,
                    minutes: this.minutes
                }
            })
        }
    }
}
</script>

<style scoped>
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
</style>
