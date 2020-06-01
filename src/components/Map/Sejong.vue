<template>
<div id="sejong">
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
                    <v-flex v-if="callBtn" class="mb-3" style="background: #FFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 3px;" xs8 sm8 md8>
                        <p class="ma-0" style="color: #828282; height: 30px;">
                            <span style="display: inline-block; height: 100%;">
                                <img style="vertical-align: middle;" class="pl-3 pr-3" src="../../assets/time-icon.svg">
                                <span style="vertical-align: middle; font-style: normal; font-weight: normal; font-size: 14px;color: #828282;">총 소요시간: <span style="color: #E61773; font-weight: 500; font-size: 18px;">약 {{ minutes }}분</span></span>
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
                                        <span v-if="start >= 5">{{ options[start - 5].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ start }}</span>
                                    </v-card>
                                    <span class="divide-bar mt-2 mb-2"></span>
                                    <v-card style="text-align: left;" class="pl-2" color="transparent" @click="overlay2 = !overlay2" flat>
                                        <span v-if="end >= 5">{{ options[end - 5].name }}</span>
                                        <span v-else style="color: #BDBDBD">{{ end }}</span>
                                    </v-card>
                                </div>
                            </v-flex>
                            <v-flex class="pa-0" xs2 sm2 md2>
                                <img src="../../assets/switch-icon.svg">
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>

                <v-flex class="pa-0 mt-1" v-if="callBtn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle">호출하기</v-btn>
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
    name: 'Sejong',

    data: () => ({
        pageId: 3,
        map: null,
        OSMUrl: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
        staticAnchor: [16, 37],
        vehicleReady: false,
        waypoints: [{
                lat: 36.4993510000000000,
                lng: 127.2706060000000000
            },
            {
                lat: 36.5016900000000000,
                lng: 127.2723150000000000
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
        sejongList: [],
        callBtn: false,

        overlay1: false,
        overlay2: false,
        zIndex: 0,

        start_icon: {},
        end_icon: {}
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
        this.map.setView([36.599351, 127.270606], 15)

        this.addMarker()
        this.addRouting(this.waypoints)
    },

    methods: {
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../../assets/station_icon.svg"),
                iconSize: [12, 12]
            })

            this.$utils.map.createMakerByXY(this.map, [36.4993510000000000, 127.2706060000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [36.5016900000000000, 127.2723150000000000], {
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
                                this.sejongList.push(station_result[i])
                                this.sejongList = this.sejongList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1;
                                })
                            }
                        }
                    }

                    for (var arr of this.sejongList) {
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

            console.log('this.start', this.start)
            console.log('this.end', this.end)

            if (this.start >= 5 && this.end >= 5) {
                // ADD Between Station
                if (this.start < this.end) {
                    for (let i = this.start; i <= this.end; i++) {
                        this.waypoints.push({
                            lat: this.sejongList[i - 5].lat,
                            lng: this.sejongList[i - 5].lon
                        })
                    }

                } else if (this.start > this.end) {
                    alert('이건 안된다.')
                    // SAME Station Id
                } else if (this.start == this.end) {
                    alert('같은 정류장 선택 불가')
                }

                let startIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/start-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.start === 5) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.sejongList[0].lat, this.sejongList[0].lon], {
                        icon: startIcon
                    })
                } else if (this.start === 6) {
                    this.map.removeLayer(this.start_icon)
                    this.start_icon = this.$utils.map.createMakerByXY(this.map, [this.sejongList[1].lat, this.sejongList[1].lon], {
                        icon: startIcon
                    })
                }

                let endIcon = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/end-icon.svg"),
                    iconSize: [40, 40]
                })

                if (this.end === 5) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.sejongList[0].lat, this.sejongList[0].lon], {
                        icon: endIcon
                    })
                } else if (this.end === 6) {
                    this.map.removeLayer(this.end_icon)
                    this.end_icon = this.$utils.map.createMakerByXY(this.map, [this.sejongList[1].lat, this.sejongList[1].lon], {
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

            this.callBtn = true
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
