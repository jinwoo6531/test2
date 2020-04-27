<template>
<div id="daegu">
    <v-container class="map-container pa-0 ma-0" fluid justify-center grid-list-md fill-height>
        <v-layout column>
            <v-flex class="pa-0">
                <v-layout row wrap style="width: 100%; height: 100%; margin: 0;">
                    <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%; height: 100%;">
                        <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
                    </v-flex>
                </v-layout>

                <v-flex class="pa-0 selectBox" xs12 sm12 md12>
                    <v-layout row wrap class="pa-4" xs12 sm12 md12>
                        <v-flex class="mb-3" style="background: #FFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 3px;" xs6 sm6 md6>
                            <p class="ma-0" style="color: #828282">총 소요시간: <span style="color: #E61773">약 {{ minutes }}분</span></p>
                        </v-flex>

                        <!-- <v-flex class="selectStationWrap" x12 sm12 md12 lg12 xl12>
                            <select style="width: 100%" v-model="start" @change="onChange()">
                                <option v-for="item in this.daeguList" :key="item.id" :value="item">{{ item.name }}</option>
                            </select>
                            <span class="divide-bar"></span>
                            <select style="width: 100%" v-model="end" @change="onChange()">
                                <option v-for="item in this.daeguList" :key="item.id" :value="item">{{ item.name }}</option>
                            </select>
                        </v-flex> -->

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

                        <!-- 아직 선택하기 전(처음에 페이지 로드 될 때): 출발지 선택, 도착지 선택 -->
                        <v-flex class="selectStationWrap" x12 sm12 md12>
                            <v-sheet color="transparent" @click="overlay1 = !overlay1" v-model="start">
                                {{ start }}
                                <!-- {{ options[start - 1] }} -->
                            </v-sheet>
                            <span class="divide-bar"></span>
                            <v-sheet color="transparent" @click="overlay2 = !overlay2" v-model="end">
                                {{ end }}
                                <!-- {{ options[end - 1] }} -->
                            </v-sheet>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap xs12 sm12 md12>
                        <v-flex class="pa-0" v-if="callBtn">
                            <v-btn style="height: 50px;" color="#E61773" class="callShuttle">호출하기</v-btn>
                        </v-flex>
                    </v-layout>
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
        options: [

        ],
        station_arr: [],
        start: '출발지 선택',
        end: '도착지 선택 ',
        startId: [],
        endId: [],
        vehicle: 0,
        km: 0,
        minutes: 0,
        daeguList: [],
        callBtn: false,

        overlay1: false,
        overlay2: false,
        zIndex: 0
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

    methods: {
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/station_icon.svg"),
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
                        weight: 3
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

            if (this.start != undefined && this.end != undefined) {
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
        },

        /*getVehicle() {
            var request_count = 0
            setInterval(function () {
                request_count++
                axios.get('/api/vehicles/')
                    .then(response => {
                        var vehicle_data = response.data.sort(function (a, b) {
                            return a.id < b.id ? -1 : 1
                        })
                        var vehicleCount = Object.keys(vehicle_data).length;
                        for (let i = 0; i < vehicleCount; i++) {
                            if (vehicle_data[i].site == 2) {
                                if (request_count <= 1) {
                                    var vehicleIcon = this.$utils.map.createIcon({
                                        iconUrl: require("../assets/vehicle1.svg"),
                                        iconSize: [32, 32]
                                    })
                                    this.vehicle = this.$utils.map.createMakerByXY(this.map, [vehicle_data[i].lat, vehicle_data[i].lon], {
                                        draggable: false,
                                        icon: vehicleIcon
                                    })
                                    console.log("Vehicle location: " + vehicle_data[i].lat + "," + vehicle_data[i].lon);
                                } else {
                                    var newLatLng = new L.LatLng(vehicle_data[i].lat, vehicle_data[i].lon);
                                    this.vehicle.setLatLng(newLatLng)
                                }
                            }
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            }.bind(this), 1000)
        }*/

        async getVehicle() {
            // vehicle Icon 생성
            let vehicleIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/vehicle1.svg"),
                iconSize: [32, 32]
            })

            await axios.get('/api/vehicles/')
                .then(response => {
                    this.$store.state.vehicleList = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    })

                    this.vLat = this.$store.state.vehicleList[0].lat
                    this.vLng = this.$store.state.vehicleList[0].lon
                    this.vehicle = this.$utils.map.createMakerByXY(this.map, [this.vLat, this.vLng], {
                        draggable: false,
                        icon: vehicleIcon
                    })

                    // update function
                    setInterval(function () {
                        axios.get('/api/vehicles/')
                            .then((response) => {
                                var ourVehicle = response.data.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1
                                })
                                this.vehicle.setLatLng([ourVehicle[0].lat, ourVehicle[0].lon]);

                            }).catch(error => {
                                console.log(error)
                            })
                    }.bind(this), 1000)

                }).catch(error => {
                    console.log('Error on Authentication')
                    this.error = error
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
.map-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#map-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
}

.selectBox {
    width: 100%;
    position: fixed;
    z-index: 9;
    bottom: 0;
}

.selectStationWrap {
    width: 100%;
    height: 90px;
    background: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    text-align: center;
}

.divide-bar {
    display: inline-block;
    width: 90%;
    border: 0.8px dashed #E0E0E0;
}

.callShuttle {
    width: 100%;
    border-radius: 0;
    color: #FFF;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
}
</style>
