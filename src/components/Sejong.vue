<template>
<v-container class="map-container pa-0 ma-0" fluid grid-list-md>
    <v-layout row wrap class="pa-0 ma-0" style="width: 100%; height: 100%;">
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2 style="width: 100%; height: 100%;">
            <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
        </v-flex>
        <v-flex class="pa-5 selectBox" xs12 sm12 md12 lg12 xl2>
            <v-flex style="border: 1px solid #ddd" x12 sm12 md12 lg12 xl12>
                <select v-model="start" @change="onChange()" style="display: inline-block; width: 100%; height: 100%;">
                    <option v-for="item in this.sejongList" :key="item.id" :value="item">{{ item.name }}</option>
                </select>
            </v-flex>
            <v-flex style="border: 1px solid #ddd" x12 sm12 md12 lg12 xl12>
                <select v-model="end" @change="onChange()" style="display: inline-block; width: 100%; height: 100%;">
                    <option v-for="item in this.sejongList" :key="item.id" :value="item">{{ item.name }}</option>
                </select>
            </v-flex>
            <v-flex class="text-center" x12 sm12 md12 lg12 xl12>
                <p>약 {{ km }}km (약 {{ minutes }}분 소요)</p>
            </v-flex>
            <v-flex v-if="callBtn" x12 sm12 md12 lg12 xl12>
                <v-btn style="width: 100%;">호출하기</v-btn>
            </v-flex>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'
var control

export default {
    name: 'Sejong',

    data: () => ({
        pageId: 2,
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
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
        station_arr: [],
        start: '출발지: ',
        end: '도착지: ',
        startId: [],
        endId: [],
        vehicle: 0,
        km: 0,
        minutes: 0,
        sejongList: [],
        callBtn: false
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
        this.map.setView([36.5100510000000000, 127.2706060000000000], 16)

        this.addMarker()
        this.addRouting(this.waypoints)
    },

    methods: {
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            this.$utils.map.createMakerByXY(this.map, [36.4993510000000000, 127.2706060000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [36.5016900000000000, 127.2723150000000000], {
                icon: gifIcon
            });
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
                                this.sejongList.push(station_result[i])
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
                            lat: this.sejongList[((i - 1) % 4) + 1].lat,
                            lng: this.sejongList[((i - 1) % 4) + 1].lon
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
                            lat: this.sejongList[i % 4].lat,
                            lng: this.sejongList[i % 4].lon
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
                                lat: this.sejongList[1].lat,
                                lng: this.sejongList[1].lon
                            }, {
                                lat: this.sejongList[2].lat,
                                lng: this.sejongList[2].lon
                            }, {
                                lat: this.sejongList[3].lat,
                                lng: this.sejongList[3].lon
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
                                lat: this.sejongList[2].lat,
                                lng: this.sejongList[2].lon
                            }, {
                                lat: this.sejongList[3].lat,
                                lng: this.sejongList[3].lon
                            }, {
                                lat: this.sejongList[1].lat,
                                lng: this.sejongList[1].lon
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
                                lat: this.sejongList[3].lat,
                                lng: this.sejongList[3].lon
                            }, {
                                lat: this.sejongList[1].lat,
                                lng: this.sejongList[1].lon
                            }, {
                                lat: this.sejongList[2].lat,
                                lng: this.sejongList[2].lon
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
                                lat: this.sejongList[1].lat,
                                lng: this.sejongList[1].lon
                            }, {
                                lat: this.sejongList[2].lat,
                                lng: this.sejongList[2].lon
                            }, {
                                lat: this.sejongList[3].lat,
                                lng: this.sejongList[3].lon
                            }, {
                                lat: this.end.lat,
                                lng: this.end.lon
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
</style>
