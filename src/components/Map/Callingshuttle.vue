<template>
<v-container class="map-container pa-0 ma-0 flex-wrap" fluid grid-list-md fill-height>
    <v-layout row wrap class="ma-0">
        <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%; height: 100%;">
            <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
        </v-flex>
        <v-flex class="d-flex flex-column justify-start text-center pa-0 call-infomation color: #FFF" xs12 sm12 md12 v-if="ready">
            <v-card flat tile>
                <table class="desination">
                    <tr class="arrive-wrap">
                        <td>출발지</td>
                        <td rowspan="2"><img src="../../assets/arrow-icon2.svg" class="display: inline-block;"></td>
                        <td>도착지</td>
                        <td>탑승인원</td>
                    </tr>
                    <tr>
                        <td>{{ startName }}</td>
                        <td>{{ endName }}</td>
                        <td>{{}}</td>
                    </tr>
                </table>
                <v-divider class="ml-5 mr-5"></v-divider>
                <v-list class="pa-0" color="transparent">
                    <v-list-item color="transparent">
                        <v-list-item-content style="text-align: right;">
                            <v-list-item-title class="desination-info-title">셔틀 번호</v-list-item-title>
                            <v-list-item-subtitle class="desination-info-subtitle">SCN004</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar class="ma-4" width="56px" height="56px">
                            <v-img src="../../assets/profile.png"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content style="text-align: left;">
                            <v-list-item-title class="desination-info-title">담당자</v-list-item-title>
                            <v-list-item-subtitle class="desination-info-subtitle">주장혁</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <span class="arrive-time">약 {{ minutes }}분 후</span> 셔틀이 출발지에 도착합니다.
                <v-card-actions class="pa-0 pt-5 call-cancel-btn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle" @click="callCancelBtn">호출 취소하기</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CallingShuttle',

    data: () => ({
        ready: false,
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        stationList: [],
        setLat: "",
        setLng: ""
    }),

    mounted() {
        this.site = this.$route.params.site
        this.start = this.$route.params.start
        this.end = this.$route.params.end
        this.startName = this.$route.params.startName
        this.endName = this.$route.params.endName
        this.minutes = this.$route.params.minutes

        this.getStation()
        this.ready = true

        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        })

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {})
    },

    methods: {
        getStation() {
            axios.get('/api/stations/')
                .then(response => {
                    if (response.status == 200) {
                        let station_result = response.data
                        let station_count = Object.keys(station_result).length
                        for (let i = 0; i < station_count; i++) {
                            if (station_result[i].site == this.site) {
                                this.stationList.push(station_result[i])
                                this.stationList = this.stationList.sort(function (a, b) {
                                    return a.id < b.id ? -1 : 1
                                })
                            }
                        }
                        // Map View Center Load
                        this.map.setView([this.stationList[1].lat, this.stationList[1].lon], 15)
                    }
                }).catch(error => {
                    console.log('station (GET) error: ')
                    this.error = error
                    console.log(error)
                })
        },
        callCancelBtn() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.call-infomation {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #FFF;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 35px 35px 0px 0px;
    z-index: 9;
}

.desination {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #262626;
    width: 100%;
    padding: 17px;
    background: transparent !important;
    border: none;
}

.desination-info-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #828282;
}

.desination-info-subtitle {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #262626 !important;
}

.arrive-wrap {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    background: transparent !important;
    border: none;
    color: #828282;
}

.arrive-time {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #E61773;
}

.call-cancel-btn {
    width: 100%;
}
</style>
