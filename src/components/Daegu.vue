<template>
<div class="map-container">
    <v-container class="pa-0">
        <v-row no-gutters>
            <v-col cols="12" xs="12" sm="12">
                <v-card id="map-container" class="pa-0" height="236px" outlined tile></v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="pa-2">
        <v-row no-gutters>
            <v-col class="d-flex" cols="12" sm="12" style="border: 1px solid #ddd">
                <select v-model="start" @change="onChange()" style="display: inline-block; width: 100%; height: 100%;">
                    <option v-for="item in this.daeguList" :key="item.id" :value="item">{{ item.name }}</option>
                </select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="12" style="border: 1px solid #ddd">
                <select v-model="end" @change="onChange()" style="display: inline-block; width: 100%; height: 100%;">
                    <option v-for="item in this.daeguList" :key="item.id" :value="item">{{ item.name }}</option>
                </select>
            </v-col>
            <v-col>
                <p v-if="warn">승차지는 해당 노선 내에서 선택해주세요.</p>
                <p v-else>약 {{ km }}km (약 {{ minutes }}분 소요)</p>
            </v-col>
            <v-col v-if="callBtn" class="d-flex" cols="12" sm="12">
                <v-btn>호출하기</v-btn>
            </v-col>
        </v-row>
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
        station_arr: [],
        start: '출발지: ',
        end: '도착지: ',
        startId: [],
        endId: [],
        vehicle: 0,
        km: 0,
        minutes: 0,
        daeguList: [],
        warn: true,
        callBtn: false,
    }),

    created() {
        this.getStation()

        this.getVehicle()

        // setInterval(function () {
        //     axios.get('/api/vehicles/')
        //         .then(response => {
        //             this.$store.state.vehicleList = response.data.sort(function (a, b) {
        //                 return a.id < b.id ? -1 : 1
        //             })

        //             this.vehicleReady = true
        //             this.$store.state.vLat = this.$store.state.vehicleList[0].lat
        //             this.$store.state.vLng = this.$store.state.vehicleList[0].lon

        //             let vehicleIcon = this.$utils.map.createIcon({
        //                 iconUrl: require("../assets/vehicle1.svg"),
        //                 iconSize: [32, 32]
        //             })
        //             this.$utils.map.createMakerByXY(this.map, [this.$store.state.vLat, this.$store.state.vLng], {
        //                 icon: vehicleIcon
        //             })
        //         }).catch(error => {
        //             console.log('Error on Authentication')
        //             this.error = error
        //             console.log(error)
        //         })
        // }.bind(this), 1000)
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

            if (this.start.id != undefined && this.end.id != undefined) {
                // ADD Between Station
                if (this.start.id < this.end.id) {
                    this.waypoints.push({
                        lat: this.start.lat,
                        lng: this.start.lon
                    })
                    for (let i = this.start.id;
                        ((i - 1) % 4) + 1 != this.end.id; i++) {
                        this.waypoints.push({
                            lat: this.daeguList[((i - 1) % 4) + 1].lat,
                            lng: this.daeguList[((i - 1) % 4) + 1].lon
                        })
                    }
                } else if (this.start.id > this.end.id) {
                    this.waypoints.push({
                        lat: this.start.lat,
                        lng: this.start.lon
                    })
                    for (let i = this.start.id;
                        (i % 4) != this.end.id; i++) {
                        this.waypoints.push({
                            lat: this.daeguList[i % 4].lat,
                            lng: this.daeguList[i % 4].lon
                        })
                    }
                    // SAME Station Id
                } else if (this.start.id == this.end.id) {
                    switch (this.start.id) {
                        case 1:
                            this.waypoints.push({
                                lat: this.start.lat,
                                lng: this.start.lon
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
                                lat: this.end.lat,
                                lng: this.end.lon
                            })
                            break
                        case 2:
                            this.waypoints.push({
                                lat: this.start.lat,
                                lng: this.start.lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.end.lat,
                                lng: this.end.lon
                            })
                            break
                        case 3:
                            this.waypoints.push({
                                lat: this.start.lat,
                                lng: this.start.lon
                            }, {
                                lat: this.daeguList[3].lat,
                                lng: this.daeguList[3].lon
                            }, {
                                lat: this.daeguList[1].lat,
                                lng: this.daeguList[1].lon
                            }, {
                                lat: this.daeguList[2].lat,
                                lng: this.daeguList[2].lon
                            }, {
                                lat: this.end.lat,
                                lng: this.end.lon
                            })
                            break
                        default:
                            this.waypoints.push({
                                lat: this.start.lat,
                                lng: this.start.lon
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
                                lat: this.end.lat,
                                lng: this.end.lon
                            })
                    }
                }
                // SET New Routing
                this.addRouting(this.waypoints)

                control.on('routesfound', function (e) {
                    var routes = e.routes
                    var summary = routes[0].summary
                    this.km = summary.totalDistance / 1000
                    this.minutes = Math.round(summary.totalTime % 3600 / 60)
                    console.log('Total distance is ' + this.km + ' km and total time is ' + this.minutes + ' minutes')
                }).addTo(this.map)
                this.warn = false
                this.callBtn = true
            }
        },

        getVehicle() {
            // vehicle Icon 생성
            let vehicleIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/vehicle1.svg"),
                iconSize: [32, 32]
            })

            axios.get('/api/vehicles/')
                .then(response => {
                    this.$store.state.vehicleList = response.data.sort(function (a, b) {
                        return a.id < b.id ? -1 : 1
                    })

                    this.vehicle = this.$utils.map.createMakerByXY(this.map, [this.$store.state.vehicleList[0].lat, this.$store.state.vehicleList[0].lon], {
                        icon: vehicleIcon
                    })

                    // 얘네를 1초마다 업데이트
                    // 어떻게 해줘야할까...
                    console.log('Vehicle Lat: ', this.vehicle._latlng.lat)
                    console.log('Vehicle Lng: ', this.vehicle._latlng.lng)
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
}
</style>
