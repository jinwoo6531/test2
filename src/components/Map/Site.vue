<template>
  <div id="site">
    <!-- 모든 API가 response될 때까지 로딩 딤 처리 -->
    <v-container fluid v-if="loading == true" class="map-loading">
      <v-row align="center" justify="center">
        <v-card color="transparent" flat>
          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              size="50"
              color="#E61773"
            ></v-progress-circular>
          </v-card-text>
          <v-card-text class="text-center" style="color: #fff"
            >페이지 불러오는 중...</v-card-text
          >
        </v-card>
      </v-row>
    </v-container>

    <!-- 현재 위치를 가지고올 때의 로딩 -->
    <v-container fluid v-if="getLocationLoading == true" class="locat-loading">
      <v-row align="center" justify="center">
        <v-card color="#FFF" flat>
          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              size="50"
              color="#E61773"
            ></v-progress-circular>
          </v-card-text>
          <v-card-text class="text-center" style="color: #e61773"
            >위치 받아오는 중...</v-card-text
          >
        </v-card>
      </v-row>
    </v-container>

    <!-- 현재 위치가 모든 정류장으로부터 800km보다 멀리 위치할 때의 모달 -->
    <!-- 기획서 변경으로 인해 숨김 처리 -->
    <v-container
      fluid
      v-if="can == true"
      class="cantServiceModal"
      color="transparent"
    >
      <v-row align="center" justify="center">
        <v-card flat tile class="cantServiceCard">
          <v-card-text class="text-center pa-0">
            <img src="../../assets/warning.svg" style="padding-top: 20px" />
            <p class="soFarMsg">이 곳은 타시오 운행지역에서 너무 멀어요!</p>
            <p class="warningmsg">
              셔틀이 출발지에 도착한 뒤 탑승이 완료되지 않으면
            </p>
            <p class="warningmsg">
              <span class="warningmsg-font">호출이 자동 취소</span>됩니다.
            </p>
            <v-btn
              tile
              depressed
              class="pa-0 pl-3 pr-3 goReturn"
              color="#E61773"
              :ripple="false"
              @click="goBackSite"
              >운행지역 지도로 돌아가기</v-btn
            >
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <!-- Map container -->
    <v-container
      class="map-container pa-0 ma-0 flex-wrap"
      fluid
      justify-center
      grid-list-md
      fill-height
    >
      <v-layout row wrap class="ma-0">
        <v-flex class="pa-0 persentH">
          <v-card
            id="map-container"
            class="pa-0 ma-0"
            style="width: 100% height: 100%"
            outlined
            tile
          ></v-card>
        </v-flex>

        <!-- 탑승인원 선택 모달창 -->
        <v-flex class="pa-0 selectBox" xs12 sm12 md12>
          <v-flex class="pa-4 pt-0" xs12 sm12 md12>
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on }">
                <span style="display: inline-block; width: 70%">
                  <v-btn
                    class="pa-0 person-modal"
                    color="#fff"
                    v-on="on"
                    :ripple="false"
                  >
                    <img src="../../assets/person-count.svg" />
                    <span
                      v-if="temp >= 1"
                      style="padding-left: 12px"
                      @click="selectPerson"
                      >탑승인원 {{ temp }}명</span
                    >
                    <span
                      v-else
                      @click="beforeSelectPerson"
                      style="
                        color: #262626;
                        padding-left: 12px;
                        letter-spacing: 0.5px;
                      "
                      >탑승인원 선택</span
                    >
                  </v-btn>
                </span>
              </template>

              <v-card class="persentH" style="position: absolute">
                <v-toolbar
                  color="transparent"
                  style="position: fixed; width: 100%; top: 0; z-index: 3"
                  flat
                >
                  <v-btn icon @click="closePersonDialog">
                    <v-icon color="#262626">mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-container
                  class="pa-0 ma-0 flex-wrap"
                  fluid
                  fill-height
                  style="position: absolute; background: transparent"
                >
                  <v-row align="center" justify="center" class="ma-0">
                    <v-card-text class="select-person-title"
                      >탑승인원 선택</v-card-text
                    >
                    <v-card class="d-flex justify-space-around" flat>
                      <v-card :ripple="false" flat tile>
                        <v-btn
                          :class="{ 'is-disabled1': isDisabled1 }"
                          :ripple="false"
                          @click="decrement"
                          outlined
                          color="#E61773"
                          fab
                        >
                          <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                      </v-card>
                      <v-card flat tile>
                        <v-card-text class="count">{{ count }}</v-card-text>
                      </v-card>
                      <v-card flat tile :ripple="false">
                        <v-btn
                          :class="{ 'is-disabled2': isDisabled2 }"
                          :ripple="false"
                          @click="increment"
                          outlined
                          color="#E61773"
                          fab
                        >
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-card>
                    </v-card>
                    <v-card-text class="select-max mt-9"
                      >탑승인원은 최대 14명까지 선택 가능합니다.</v-card-text
                    >
                  </v-row>
                </v-container>

                <v-btn
                  class="select-person-btn"
                  @click="rideCount"
                  depressed
                  tile
                  >선택완료</v-btn
                >
              </v-card>
            </v-dialog>

            <span v-if="callBtn" style="display: inline-block; width: 70%">
              <v-flex class="mb-3 spendTime-wrap">
                <p class="ma-0" style="color: #fff; height: 30px">
                  <span style="display: inline-block; height: 100%">
                    <img
                      style="vertical-align: middle"
                      class="pl-3 pr-3"
                      src="../../assets/time-icon.svg"
                    />
                    <span class="spendTime">
                      소요시간:
                      <span
                        style="
                          font-weight: 500;
                          font-size: 18px;
                          padding-right: 12px;
                        "
                        >약 {{ minutes }}분</span
                      >
                    </span>
                  </span>
                </p>
              </v-flex>
            </span>

            <!-- 현재 위치 확인 버튼 -->
            <v-card
              :ripple="false"
              color="transparent"
              flat
              style="display: inline-block; float: right"
            >
              <v-card
                :ripple="false"
                color="transparent"
                flat
                @click="res ? getLocation() : stopLocation()"
              >
                <v-btn
                  :ripple="false"
                  fab
                  small
                  color="#FFF"
                  style="0px 0px 4px rgba(0, 0, 0, 0.25); !important;"
                >
                  <v-icon color="#666666">mdi-crosshairs-gps</v-icon>
                </v-btn>
              </v-card>
            </v-card>

            <!-- 출발지 선택 모달 -->
            <v-overlay :z-index="zIndex" :value="overlay1">
              <v-card color="#FFF" class="stationModal-card-size">
                <v-card-text class="pa-0 stationModal-card-title">
                  <span class="select-modal-btn">출발지</span>
                </v-card-text>
                <v-divider class="divider-style"></v-divider>
                <v-card
                  class="pa-0 stationModal-card-content"
                  color="#FFF"
                  tile
                  flat
                >
                  <v-list light tile style="padding: 8px 0 22px 0">
                    <v-list-item-group color="#E61773">
                      <v-list-item
                        class="pa-0"
                        v-for="station in start_options"
                        @click="pickedStation = station"
                        :key="station.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="station.name"
                            style="color: #333"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <v-card-actions class="pa-0" style="width: 100%; height: 50px">
                  <v-btn
                    class="pa-0 ma-0 onCancelBtn"
                    tile
                    depressed
                    color="#FFF"
                    @click="
                      overlay1 = false;
                      pickedStation = -1;
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    class="pa-0 ma-0 onChangeBtn"
                    tile
                    depressed
                    color="#E61773"
                    @click="
                      overlay1 = false;
                      start = {
                        id: pickedStation.id,
                        name: pickedStation.name,
                      };
                    "
                    >선택하기</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>

            <!-- 도착지 선택 모달 -->
            <v-overlay :z-index="zIndex" :value="overlay2">
              <v-card class="stationModal-card-wrap" color="#FFF">
                <v-card-text class="pa-0 stationModal-card-title">
                  <span class="select-modal-btn">도착지</span>
                </v-card-text>
                <v-divider class="divider-style"></v-divider>
                <v-card
                  class="pa-0 stationModal-card-content"
                  color="#FFF"
                  tile
                  flat
                >
                  <v-list light tile style="padding: 8px 0 22px 0">
                    <v-list-item-group color="#E61773">
                      <v-list-item
                        class="pa-0"
                        v-for="(station, idx) in end_options"
                        @click="pickedStationIdx = idx"
                        :key="idx"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="station.name"
                            style="color: #333"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
                <v-card-actions class="pa-0" style="width: 100%; height: 50px">
                  <v-btn
                    class="pa-0 ma-0 onCancelBtn"
                    tile
                    depressed
                    color="#FFF"
                    @click="
                      overlay2 = false;
                      pickedStationIdx = -1;
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    class="pa-0 ma-0 onChangeBtn"
                    tile
                    depressed
                    color="#E61773"
                    @click="
                      overlay2 = false;
                      end = {
                        id: stationList[pickedStationIdx].id,
                        name: stationList[pickedStationIdx].name,
                        idx: pickedStationIdx,
                      };
                    "
                    >선택하기</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>

            <!-- 출발지, 도착지 표시 필드 -->
            <v-flex class="selectStationWrap" xs12 sm12 md12>
              <v-layout class="d-flex align-center ma-0" fill-height xs12 sm12>
                <v-flex class="pa-0" xs2 sm2 md2>
                  <img src="../../assets/arrow-icon.svg" />
                </v-flex>
                <v-flex class="pa-0 flex-wrap" xs8 sm8 md8>
                  <div class="d-flex flex-column">
                    <v-card
                      style="text-align: left"
                      class="pl-2"
                      :ripple="false"
                      color="transparent"
                      @click="overlay1 = !overlay1"
                      flat
                    >
                      <span v-if="start.id < 0" class="select_station"
                        >출발지 선택하기</span
                      >
                      <span v-else class="sel_station">{{ start.name }}</span>
                    </v-card>
                    <span class="divide-bar mt-2 mb-2"></span>
                    <v-card
                      style="text-align: left"
                      class="pl-2"
                      :ripple="false"
                      color="transparent"
                      @click="overlay2 = !overlay2"
                      flat
                    >
                      <span v-if="end.id < 0" class="select_station"
                        >도착지 선택하기</span
                      >
                      <span v-else class="sel_station">{{ end.name }}</span>
                    </v-card>
                  </div>
                </v-flex>
                <v-flex class="pa-0" xs2 sm2 md2 @click="swapDestination">
                  <img src="../../assets/switch-icon.svg" />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-flex>

          <!-- 타시오 호출 Dialog -->
          <v-flex class="pa-0 mt-1" v-if="callBtn">
            <v-btn
              color="#E61773"
              tile
              depressed
              class="pa-0 call-dialog-btn"
              width="100%"
              height="50px"
              @click="requestCallBtn"
              >호출하기</v-btn
            >
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// 정류장과 현재 위치 계산 함수
function calcDistance(lat1, lon1, lat2, lon2) {
  var theta = lon1 - lon2;
  var dist =
    Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return Number(dist * 1000).toFixed(2);
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad) {
  return (rad * 180) / Math.PI;
}

let start_icon = "";
let end_icon = "";

import { mapGetters } from "vuex";
import axios from "axios";
var control;

export default {
  data: () => ({
    map: null,
    OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    currentlocation: {
      lat: "",
      lon: "",
    },
    // loading
    loading: true,
    loading1: true,
    loading2: true,
    getLocationLoading: false,
    // station
    stationList: [],
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
    start: {
      id: -1,
      name: "start",
      idx: -1,
    },
    end: {
      id: -1,
      name: "end",
      idx: -1,
    },
    pickedStation: "",
    startIcon: "",
    endIcon: "",
    // start_point: {
    //   name: "출발지 선택하기",
    //   value: -1,
    // },
    // end_point: {
    //   name: "도착지 선택하기",
    //   value: -1,
    // },
    global_options: [],
    options: [],
    // start_options: [],
    // end_options: [],
    // start_icon: {},
    // end_icon: {},
    // Location
    can: false,
    res: true,
    usermarker: "",
    success: true,
    // ETA
    minutes: 0,
    // 타시오 호출
    calldialog: false,
    meth: "191029079116",
    pay_method: "card",
    mapInfo: {
      1: { name: "gunsan", setPoints: [35.812484, 126.4101], zoom: 15 },
      2: { name: "daegu", setPoints: [35.836673, 128.68652], zoom: 15 },
      3: { name: "sejong", setPoints: [36.599351, 127.270606], zoom: 15 },
      4: { name: "sangam", setPoints: [37.5792, 126.8917], zoom: 15 },
      18: { name: "sejong_Rfree", setPoints: [36.4945, 127.3274], zoom: 15 },
    },
    points: {
      //type:2 -> route, type:3 -> station, type:6 -> route&&station
      //군산
      1: [],
      // 대구
      2: [
        {
          lat: 35.836308,
          lng: 128.681547,
          type: 6,
        },
        {
          lat: 35.838673,
          lng: 128.687892,
          type: 6,
        },
        {
          lat: 35.83705,
          lng: 128.690044,
          type: 6,
        },
        {
          lat: 35.83459,
          lng: 128.68652,
          type: 6,
        },
        {
          lat: 35.836308,
          lng: 128.681547,
          type: 6,
        },
      ],
      // 세종호수공원
      3: [
        {
          lat: 36.499351,
          lng: 127.270606,
          type: 6,
        },
        {
          lat: 36.50169,
          lng: 127.272315,
          type: 6,
        },
      ],
      //??
      4: [
        {
          lat: 37.579333,
          lng: 126.889036,
          type: 6,
        },
        {
          lat: 37.57518,
          lng: 126.89837,
          type: 6,
        },
        {
          lat: 37.58299,
          lng: 126.88485,
          type: 6,
        },
        {
          lat: 37.581296,
          lng: 126.885693,
          type: 6,
        },
        {
          lat: 37.579333,
          lng: 126.889036,
          type: 6,
        },
      ],
      // 세종 규특
      18: [
        {
          lat: 36.49911,
          lng: 127.32867,
          type: 2,
        },
        {
          lat: 36.49892,
          lng: 127.32886,
          type: 3,
        },
        {
          lat: 36.49671,
          lng: 127.32989,
          type: 2,
        },
        {
          lat: 36.495534,
          lng: 127.330257,
          type: 3,
        },
        {
          lat: 36.49529,
          lng: 127.33077,
          type: 2,
        },
        {
          lat: 36.49471,
          lng: 127.32834,
          type: 3,
        },
        {
          lat: 36.49533,
          lng: 127.32832,
          type: 3,
        },
        {
          lat: 36.49456,
          lng: 127.32574,
          type: 2,
        },
        {
          lat: 36.49815,
          lng: 127.32564,
          type: 2,
        },
      ],
    },
  }),

  computed: {
    ...mapGetters({
      user: "user",
    }),

    totalPayment() {
      let num = 1000 * this.count;
      num = parseInt(num, 10);
      return num.toLocaleString();
    },
    start_options() {
      return this.stationList.filter((station) => station.id != this.end.id);
    },
    end_options() {
      return this.stationList.filter((station) => station.id != this.start.id);
    },
  },
  mounted() {
    // map container에 map을 그려준다.
    this.map = this.$utils.map.createMap("map-container", {
      zoomControl: false,
      routeWhileDragging: false,
      attributionControl: false,
    });

    // Open Street Map Layer Service Load
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});

    // Map View Center Load
    this.map.setView(
      this.mapInfo[this.siteId].setPoints,
      this.mapInfo[this.siteId].zoom
    );

    this.map
      .locate({
        setView: false,
        enableHighAccuracy: true,
      })
      .on("locationfound", (e) => {
        this.currentlocation = {
          lat: e.latitude,
          lon: e.longitude,
        };
      });
  },
  created() {
    // 사이트 id에 따라 다른 화면 표시
    this.siteId = this.$route.params.siteId;

    // 정류장, 셔틀 API Request
    this.getStation();
    this.getVehicle();

    this.createPickerIcons();
    // this.start = parseInt(this.start);
    // this.end = parseInt(this.end);
  },
  updated() {
    // 출발지, 도착지, 인원수 선택에 따른 호출 버튼 표시 유무
    if (this.temp >= 1 && this.start >= 0 && this.end >= 0) {
      this.callBtn = true;
    } else {
      this.callBtn = false;
    }
  },
  watch: {
    //  서비스 가능 지역 내에 위치하는지 실시간 확인
    currentlocation() {
      for (let i = 0; i < this.stationList.length; i++) {
        if (
          800 >
          calcDistance(
            this.stationList[i].lat,
            this.stationList[i].lon,
            this.currentlocation.lat,
            this.currentlocation.lon
          )
        ) {
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
    },
    start() {
      console.log("start changed", this.start);
    },
    end() {
      console.log("end changed", this.end);
    },
  },
  methods: {
    // 정류장 위치에 따른 마커 표시
    addMarker() {
      // 사용 마커 정의
      this.zoomStatus = this.$utils.map.createIcon({
        iconUrl: require("../../assets/station_icon.svg"),
        iconSize: [12, 12],
      });
      for (let station of this.stationList) {
        var markersLayer = this.$utils.map.createMakerByXY(
          this.map,
          [station.lat, station.lon],
          {
            icon: this.zoomStatus,
            name: station.name,
            value: station.idx,
          }
        );
        markersLayer.on("click", this.layerClickHandler);
      }
    },
    stationPicker(station, icon_source, icon_type) {
      this.map.removeLayer(icon_type);
      icon_type = this.$utils.map.createMakerByXY(
        this.map,
        [this.stationList[station.idx].lat, this.stationList[station.idx].lon],
        {
          icon: icon_source,
        }
      );
      return icon_type;
    },
    createPickerIcons() {
      this.startIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/start-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // 도착지 아이콘 생성
      this.endIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/end-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
    },
    layerClickHandler(e) {
      // console.log('global_options: ', this.global_options);
      // console.log('options: ', this.options);
      // console.log('start_options: ', this.start_options);
      // console.log('end_options: ', this.end_options);

      var marker = e.target;
      var marker_lat = marker._latlng.lat;
      var marker_lng = marker._latlng.lng;

      // console.log('select_start: ', select_start);
      // console.log('select_end: ', select_end);

      // 출발지 아이콘 생성
      // let startIcon = this.$utils.map.createIcon({
      //   iconUrl: require("../../assets/start-icon.svg"),
      //   iconSize: [40, 40],
      //   iconAnchor: [20, 40],
      // });

      // // 도착지 아이콘 생성
      // let endIcon = this.$utils.map.createIcon({
      //   iconUrl: require("../../assets/end-icon.svg"),
      //   iconSize: [40, 40],
      //   iconAnchor: [20, 40],
      // });

      // eslint-disable-next-line no-prototype-builtins
      if (marker.hasOwnProperty("_popup")) {
        marker.unbindPopup();
      }

      // 지도상에서 같은 정류장을 선택했을 경우
      if (
        this.start.id == marker.options.value ||
        this.end.id == marker.options.value
      ) {
        console.log("같은 정류장은 선택이 불가능합니다.");
      } else {
        //   아닌 경우는 popup 창을 띄워준다.
        var template = `<p id="stationName" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 14px; margin: 14px 0 7px 0 !important;"></p>
                 <form>
                    <button id="startBtn" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px; padding-bottom: 2px;">출발지로 설정</button> <br>
                    <button id="endBtn" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px;">도착지로 설정</button>
                </form>`;

        marker.bindPopup(template);
        marker.openPopup();

        this.$utils.map.getDomUtil("stationName").textContent =
          marker.options.value;

        var startSubmit = this.$utils.map.getDomUtil("startBtn");

        // 지도상에서 정류장을 출발지로 선택했을 경우
        this.$utils.map.createDomEvent.addListener(startSubmit, "click", () => {
          this.start.id = marker.options.value;
          this.map.removeLayer(start_icon);
          start_icon = this.$utils.map.createMakerByXY(
            this.map,
            [marker_lat, marker_lng],
            {
              icon: this.startIcon,
            }
          );

          // 중복 방지
          // this.start.id = -1;
          // this.start_point = {
          //   name: "출발지 선택하기",
          //   value: -1,
          // };

          this.start.id = Number(marker.options.value);
          this.start.name = marker.options.name;
          // this.start.value = marker.options.value;

          this.start.name = marker.options.name;
          this.station_startId = this.stationList[this.start].id;

          marker.closePopup();

          // console.log('layerClickHandler options: ', this.options, 'Start name: ', this.start_point);

          //   출발지에서 선택한 값은 도착지에서 선택할 수 없다.
          this.end_options = this.options.filter(
            (opt) => opt.value != this.start.id
          );
          this.options = this.global_options;

          this.onCancel("start");

          if (this.waypoints.length > 0) {
            control.spliceWaypoints(0, 6);
          }
          this.waypoints = [];

          // 선택한 정류장에 따라 경로 표시
          // leaflet-routing-machine에서 올바른 서비스 경로 표시를 할 수 없어서 static하게 지정해주었다. -> 개선 필요

          this.addRouting(this.waypoints, "#E51973", "transparent");
        });

        var endSubmit = this.$utils.map.getDomUtil("endBtn");

        // 지도상에서 정류장을 도착지로 지정한 경우
        this.$utils.map.createDomEvent.addListener(endSubmit, "click", () => {
          // select_end = marker.options.name;
          this.map.removeLayer(end_icon);
          end_icon = this.$utils.map.createMakerByXY(
            this.map,
            [marker_lat, marker_lng],
            {
              icon: this.endIcon,
            }
          );

          // 중복 방지
          this.end = -1;
          this.end_point = {
            name: "도착지 선택하기",
            value: -1,
          };

          this.end = Number(marker.options.value);
          this.end_point.name = marker.options.name;
          this.end_point.value = marker.options.value;

          this.endName = marker.options.name;
          this.station_endId = this.stationList[this.end].id;

          marker.closePopup();
          // console.log('layerClickHandler start_options: ', this.start_options);
          // console.log('layerClickHandler options: ', this.options, 'End name: ', this.end_point);

          //   도착지에서 선택한 정류장은 출발지에서 선택할 수 없다.
          // this.start_options = this.options.filter(
          //   (opt) => opt.value != this.end_point.value
          // );
          // this.options = this.global_options;

          this.onCancel("end");

          if (this.waypoints.length > 0) {
            control.spliceWaypoints(0, 6);
          }
          this.waypoints = [];

          // 선택한 정류장에 따라 경로 표시
          // leaflet-routing-machine에서 올바른 서비스 경로 표시를 할 수 없어서 static하게 지정해주었다. -> 개선 필요

          this.addRouting(this.waypoints, "#E51973", "transparent");
        });
      }
    },

    // 전체 경로 Routing 정의 함수
    addRouting(waypoints, borderColor, fullColor) {
      // 파라미터 값: waypoints[Array], 테두리선[String], 경로색상[String]
      control = this.$utils.map.createRouting(this.map, {
        waypoints: waypoints,
        serviceUrl: "https://osrmserver.springgo.io/route/v1", // 회사 serviceUrl - Routing error가 발생할 경우 Backend에도 확인 요청하기
        addWaypoints: false,
        draggableWaypoints: false,
        showAlternatives: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        lineOptions: {
          // 경로 스타일
          draggable: false,
          styles: [
            {
              color: borderColor,
              weight: 5,
            },
            {
              color: fullColor,
              weight: 2,
            },
          ],
        },
        draggable: false,
        autoRoute: true,
        show: false,
        createMarker: function () {
          return null;
        },
      });
    },

    // 선택한 경로 Routing 정의
    addRouting2(waypoints, borderColor, fullColor) {
      // 파라미터 값: waypoints[Array], 테두리선[String], 경로색상[String]
      this.$utils.map.createRouting(this.map, {
        waypoints: waypoints,
        serviceUrl: "https://osrmserver.springgo.io/route/v1",
        addWaypoints: false,
        draggableWaypoints: false,
        showAlternatives: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        lineOptions: {
          draggable: false,
          styles: [
            // 경로 스타일
            {
              color: borderColor,
              weight: 6,
            },
            {
              color: fullColor,
              weight: 2,
            },
          ],
        },
        draggable: false,
        autoRoute: true,
        show: false,
        createMarker: function () {
          return null;
        },
      });
    },

    // 정류장 API Request & Response
    async getStation() {
      await axios
        .get("/api/stations/")
        .then(async (response) => {
          if (response.status == 200) {
            let station_result = response.data;
            let station_count = Object.keys(station_result).length;
            for (let i = 0; i < station_count; i++) {
              if (station_result[i].site == this.siteId) {
                // siteId와 같은 번호의 data만 가져오기
                this.stationList.push(station_result[i]);
                this.stationList = this.stationList.sort(function (a, b) {
                  return a.id < b.id ? -1 : 1;
                });
              }
            }

            // this.loading1 = false; // 정류장 API의 response가 완료되면 false로 변경
            // if (this.loading1 == false && this.loading2 == false) {
            // 정류장 API와 셔틀 API의 response가 완료된 경우
            this.loading = false; // 로딩 딤 화면 끝내기
            // }
          }

          for (let point of this.points[this.siteId]) {
            if (!(point.type % 2)) {
              this.waypoints2.push({ lat: point.lat, lng: point.lng });
            }
          }
          this.waypoints2.push(this.waypoints2[0]);

          // for (var [i, arr2] of this.stationList.entries()) {
          //   this.global_options.push({
          //     name: arr2.name,
          //     value: i,
          //   });

          //   this.options.push({
          //     name: arr2.name,
          //     value: i,
          //   });
          // }

          // this.start_options = this.options;
          // this.end_options = this.options;

          await this.addMarker(); // 정류장 마커 표시
          await this.addRouting2(this.waypoints2, "#00CFFF", "#FFFFFF"); // 서비스 경로 표시
        })
        .catch((error) => {
          console.log("station (GET) error: ");
          this.error = error;
          console.log(error);
        });
    },

    // 셔틀 API Request & Response
    getVehicle() {
      axios
        .get("/api/vehicles/")
        .then(async (response) => {
          var vehicle_arr = [];
          var vehicle_data = response.data.sort(function (a, b) {
            return a.id < b.id ? -1 : 1;
          });
          var vehicleCount = Object.keys(vehicle_data).length;
          for (let i = 0; i < vehicleCount; i++) {
            if (vehicle_data[i].site == this.siteId) {
              // siteId와 같은 번호의 data만 가져오기
              var vehicleIcon = this.$utils.map.createIcon({
                // 셔틀 아이콘 생성
                iconUrl: require("../../assets/vehicle1.svg"),
                iconSize: [32, 32],
              });
              if (
                vehicle_data[i].lat != null ||
                vehicle_data[i].lon != null ||
                vehicle_data[i].lat != undefined ||
                vehicle_data[i].lon != undefined
              ) {
                // 위도 경도 값 모두 정상적으로 받아올 경우
                this.vehicle[i] = await this.$utils.map.createMakerByXY(
                  this.map,
                  [vehicle_data[i].lat, vehicle_data[i].lon],
                  {
                    draggable: false,
                    icon: vehicleIcon,
                  }
                ); // 셔틀 위치에 따른 아이콘 표시
              }
              vehicle_arr.push(vehicle_data[i].id);
              this.vehicle_id = vehicle_arr[0];

              this.loading2 = false; // 셔틀 API response가 완료되면 false
              if (this.loading1 == false && this.loading2 == false) {
                // 정류장 API, 셔틀 API 모두 response가 완료되면
                this.loading = false; // 로딩 딤 종료
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setInterval(
        async function () {
          // 셔틀의 위치는 1초마다 업데이트 해주어야 한다.
          // async-await 비동기 처리
          axios
            .get("/api/vehicles/")
            .then((response) => {
              var vehicle_data = response.data.sort(function (a, b) {
                return a.id < b.id ? -1 : 1;
              });
              var vehicleCount = Object.keys(vehicle_data).length;
              for (let i = 0; i < vehicleCount; i++) {
                if (vehicle_data[i].site == this.siteId) {
                  if (
                    vehicle_data[i].lat != null ||
                    vehicle_data[i].lon != null ||
                    vehicle_data[i].lat != undefined ||
                    vehicle_data[i].lon != undefined
                  ) {
                    this.vehicle[i].setLatLng([
                      vehicle_data[i].lat,
                      vehicle_data[i].lon,
                    ]); // 위치 업데이트
                  }
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }.bind(this),
        1000
      );
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

    // 인원수 선택 모달 창 닫기 버튼 기능
    closePersonDialog() {
      this.dialog = false;

      if (this.temp != 0) {
        this.count = this.temp;
      } else {
        this.count = 1;
        this.isDisabled1 = true;
        this.isDisabled2 = false;
      }
    },

    // 인원수 - 버튼
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

    // 인원수 + 버튼
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

    // 탑승인원 선택완료 버튼
    rideCount() {
      this.temp = this.count;
      this.dialog = false;
    },

    // 정류장 list 선택 버튼
    clk(item, mode) {
      // mode == "start" ? this.start_point = item : this.end_point = item;
      let startIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/start-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      let endIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/end-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      if (mode === "start") {
        let start_point = item;
        // select_start = this.start_point.name;

        this.map.removeLayer(start_icon);
        start_icon = this.$utils.map.createMakerByXY(
          this.map,
          [
            this.stationList[start_point.value].lat,
            this.stationList[start_point.value].lon,
          ],
          {
            icon: startIcon,
          }
        );
      } else {
        let end_point = item;
        // select_end = this.end_point.name;

        this.map.removeLayer(end_icon);
        end_icon = this.$utils.map.createMakerByXY(
          this.map,
          [
            this.stationList[end_point.value].lat,
            this.stationList[end_point.value].lon,
          ],
          {
            icon: endIcon,
          }
        );
      }
    },

    // 출발지, 도착지 선택 완료 버튼
    onChange() {
      // REMOVE Default Routing
      if (this.waypoints.length > 0) {
        control.spliceWaypoints(0, 6);
      }
      this.waypoints = [];

      // 출발지, 도착지 value[Number] 저장
      this.start = this.start_point.value;
      this.start.name = this.start_point.name;
      this.end = this.end_point.value;
      this.end.name = this.end_point.name;

      // 출발지에서 선택한 항목은 도착지에서 선택할 수 없다.
      // this.start_options = this.options.filter(
      //   (opt) => opt.value != this.end_point.value
      // );

      // this.options = this.global_options; // global_options는 값을 변경하지 않는다. 오로직 해당 지역의 정류장 전체를 가지고 있는 배열

      // // 도착지에서 선택한 항목은 출발지에서 선택할 수 없다.
      // this.end_options = this.options.filter(
      //   (opt) => opt.value != this.start_point.value
      // );
      // this.options = this.global_options; // global_options는 값을 변경하지 않는다. 오로직 해당 지역의 정류장 전체를 가지고 있는 배열

      // for webSocket
      if (this.start !== -1) {
        this.station_startId = this.stationList[this.start].id;
      }
      if (this.end !== -1) {
        this.station_endId = this.stationList[this.end].id;
      }

      // 결제시 넘겨줄 파라미터 값 저장 - 출발지, 도착지 표시
      //   this.station_startId = this.stationList[this.start].id;
      //   this.station_endId = this.stationList[this.end].id;

      // 출발지 표시 아이콘
      let startIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/start-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      // 도착지 표시 아이콘
      let endIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/end-icon.svg"),
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      //  군산의 경우는 자동 경로 표시가 서비스 경로와 다르게 표시되기 때문에 Static하게 작업하였습니다.
      // start는 출발지 index, end는 도착지 index
      // 그 외
      if (this.start > -1 && this.end > -1) {
        let l = this.global_options.length - 1;
        if (this.start < this.end) {
          for (let i = this.start; i <= this.end; i++) {
            this.waypoints.push({
              lat: this.stationList[i].lat,
              lng: this.stationList[i].lon,
            });
          }
        } else if (this.start > this.end) {
          this.waypoints.push({
            lat: this.stationList[this.start].lat,
            lng: this.stationList[this.start].lon,
          });
          for (let i = this.start; i % l != this.end; i++) {
            this.waypoints.push({
              lat: this.stationList[i % l].lat,
              lng: this.stationList[i % l].lon,
            });
          }
          this.waypoints.push({
            lat: this.stationList[this.end].lat,
            lng: this.stationList[this.end].lon,
          });
        }
      }

      // 출발지 아이콘 지우기
      this.map.removeLayer(start_icon);
      if (this.start !== -1) {
        start_icon = this.$utils.map.createMakerByXY(
          this.map,
          [this.stationList[this.start].lat, this.stationList[this.start].lon],
          {
            icon: startIcon,
          }
        );
      }
      this.map.removeLayer(end_icon);
      if (this.end !== -1) {
        end_icon = this.$utils.map.createMakerByXY(
          this.map,
          [this.stationList[this.end].lat, this.stationList[this.end].lon],
          {
            icon: endIcon,
          }
        );
      }
      this.map.removeLayer(endIcon);

      // SET New Routing
      this.addRouting(this.waypoints, "#E51973", "transparent");
    },

    // 출발지와 도착지 swap 버튼
    swapDestination() {
      if (this.start.id == -1 && this.end.id == -1) return;
      [this.start, this.end] = [this.end, this.start];
    },

    // 현재 위치 받아오는 함수
    getLocation() {
      this.getLocationLoading = true;
      var count = 0;

      this.map
        .locate({
          setView: true,
          watch: true,
          enableHighAccuracy: true,
        })
        .on("locationfound", (e) => {
          // 현재 위치 받아오기에 성공한 경우
          this.currentlocation = {
            // 현재 위치 저장[Object]
            lat: e.latitude,
            lon: e.longitude,
          };

          if (this.compareLocatoin() == true) {
            // 서비스 지역에서 800km 이내에 위치한 경우
            count = 0;
            this.can = false; // 운행지역 모달
            this.res = false; // stopLocation()

            if (!this.usermarker) {
              this.getLocationLoading = false;
              e.target._locateOptions.setView = false;

              // 현재 위치 아이콘 표시
              let currentUser = this.$utils.map.createDiv({
                html:
                  "<div id='current_container'><div class='current_item'></div><div class='current_item2'></div><div class='current_circle' style='animation-delay: -3s'></div><div class='current_circle' style='animation-delay: -2s'></div><div class='current_circle' style='animation-delay: -1s'></div><div class='current_circle' style='animation-delay: 0s'></div></div>",
                iconSize: [0, 0],
              });

              return (this.usermarker = this.$utils.map.createMakerByXY(
                this.map,
                [e.latitude, e.longitude],
                {
                  icon: currentUser,
                }
              ));
            } else {
              return this.usermarker.setLatLng(e.latlng);
            }
          } else {
            count = 0;
            this.can = true;
            this.getLocationLoading = false;
            this.res = true;
          }
        })
        .on("locationerror", (error) => {
          // 현재 위치 받아오기에 실패한 경우
          console.log("Location error:", error);
          this.getLocationLoading = false;

          if (count == 0) {
            this.$toasted
              .error("사용자의 위치를 받아올 수 없습니다.", {
                position: "top-center",
              })
              .goAway(1000);
          }

          count = count + 1; // Toasted popup의 누적을 막기 위한 처리

          if (this.usermarker) {
            this.map.removeLayer(this.usermarker);
            return (this.usermarker = null);
          }
        });
    },

    // 위치 받아오기 중지
    stopLocation() {
      this.res = true; // getLocation()
      this.map.stopLocate();
      this.map.setView(
        this.mapInfo[this.siteId].setPoints,
        this.mapInfo[this.siteId].zoom
      );

      if (this.usermarker != null || this.usermarker != undefined) {
        this.map.removeLayer(this.usermarker);
        this.usermarker = null;
      }
      console.log("stopLocation usermarker", this.usermarker);
    },

    // 서비스 지역 내에 위치하는지 확인하는 함수
    compareLocatoin() {
      this.success = false;
      for (let i = 0; i < this.stationList.length; i++) {
        // 하나 정류장에라도 가까이 있으면 success true
        if (
          800 >
          calcDistance(
            this.stationList[i].lat,
            this.stationList[i].lon,
            this.currentlocation.lat,
            this.currentlocation.lon
          )
        ) {
          this.success = true;
          break;
        } else {
          this.success = false;
          continue;
        }
      }
      return this.success;
    },

    // 운행 지역으로 돌아가기
    goBackSite() {
      this.can = false;
      this.stopLocation();
    },

    // ETA
    getStat2Sta() {
      if (this.start !== -1)
        var stat = JSON.parse(this.stationList[this.start].stat2sta);
      if (this.start !== -1)
        var start_station = JSON.parse(this.stationList[this.start].id);
      if (this.end !== -1)
        var end_station = JSON.parse(this.stationList[this.end].id);
      this.minutes = stat[start_station][end_station];
    },

    // 타시오 호출, 결제 창 연결
    // requestCallBtn() {
    //     var totalPayment = String("1000" * this.count).replace(
    //         /(\d)(?=(?:\d{3})+(?!\d))/g,
    //         "$1,"
    //     );

    //     const IMP = window.IMP;
    //     IMP.init("imp19092456"); // 가맹점 식별코드
    //     IMP.request_pay({
    //         // 결제창 호출 코드
    //         pg: `mobilians.${this.meth}`, // PG사명
    //         pay_method: this.pay_method, // 결제수단
    //         merchant_uid: "mid_" + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
    //         name: "타시오 결제", // 주문명
    //         amount: totalPayment, // 결제할 금액 (필수 항목)
    //         buyer_email: "", // 주문자 ID (선택 항목)
    //         buyer_name: "", // 주문자명 (선택항목)
    //         buyer_tel: "010-8433-9772", // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
    //         buyer_addr: "", // 주문자 주소 (선택 항목)
    //         buyer_postcode: "", // 주문자 우편 번호 (선택 항목)
    //         custom_data: {
    //             imp_uid: this.user.data.uid,
    //             count: this.count
    //         },
    //         m_redirect_url: `https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/payment/put?site=${
    //   this.pageId
    // }&siteName=${this.mapInfo[this.siteId].name}&start=${this.start}&end=${
    //   this.end
    // }&startName=${this.options[this.start].name}&endName=${
    //   this.options[this.end].name
    // }&station_startId=${this.station_startId}&station_endId=${
    //   this.station_endId
    // }&count=${this.count}&minutes=${this.minutes}&vehicle_id=${
    //   this.vehicle_id
    // }`
    //     });
    // },

    // 타시오 호출, 결제 창 연결
    requestCallBtn() {
      this.$router.replace({
        name: "CallingLayout",
        query: {
          site: this.siteId,
          start: this.start.idx,
          end: this.end.idx,
          station_startId: this.station_startId,
          station_endId: this.station_endId,
          startName: this.start.name,
          endName: this.end.name,
          count: this.count,
          minutes: this.minutes,
          vehicle_id: this.vehicle_id,
        },
      });
    },

    cancelCallDialog() {
      this.calldialog = false;
    },
  },
};
// };
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
  color: #ffffff;
}

.leaflet-container a.leaflet-popup-close-button {
  padding: 1px 5px 0 0 !important;
  text-align: center;
  width: 20px !important;
  height: 20px !important;
  font: 20px/20px Noto Sans !important;
  color: #ffffff !important;
  font-weight: 100 !important;
}
</style>
<style scoped>
.v-list .v-list-item--active {
  background-color: rgba(230, 23, 115, 0.1) !important;
}

.map-loading {
  display: flex;
  position: absolute;
  margin-top: -57px;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  pointer-events: inherit !important;
  z-index: 20;
}

.locat-loading {
  display: flex;
  position: absolute;
  margin-top: -57px;
  height: 100%;
  pointer-events: inherit !important;
  z-index: 20;
}

.cantServiceModal {
  position: absolute;
  height: 100%;
  display: flex;
  margin-top: -57px;
  pointer-events: inherit !important;
  z-index: 20;
}

.cantServiceCard {
  margin-top: -57px;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.soFarMsg {
  letter-spacing: -1px;
  margin: 0;
  padding-top: 6px;
  padding-bottom: 24px;
  font-size: 18px;
  font-weight: 500;
  color: #262626;
}

.spendTime-wrap {
  background: #e61773;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  display: inline-block;
}

.spendTime {
  vertical-align: middle;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
}

/* 탑승 인원 */

.is-disabled1 {
  color: #bdbdbd !important;
}

.is-disabled2 {
  color: #bdbdbd !important;
}

.v-dialog {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.dialog-background {
  width: 2801px;
  background-image: url("~@/assets/call-dialog.png");
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

.select-person-title {
  font-style: normal;
  font-weight: 500;
  position: absolute;
  top: 158px;
  text-align: center;
  font-size: 16px;
  color: #262626;
}

.select-max {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #bdbdbd;
}

.select-person-btn {
  height: 50px !important;
}

.select-modal-btn {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  padding: 9px 0 8px 14px;
}

.stationModal-card-size {
  width: 290px;
  height: 376px;
}

.stationModal-card-title {
  color: #333 !important;
  height: 37px;
}

.divider-style {
  width: 262px;
  margin: 0 auto;
  border-color: #e0e0e0 !important;
}

.stationModal-card-content {
  width: 100%;
  height: 289px;
  overflow: scroll;
  text-align: center;
}

.onCancelBtn {
  width: 50% !important;
  height: 100% !important;
  color: #e61773 !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  border-top: 0.5px solid #e61773 !important;
  box-sizing: border-box !important;
  letter-spacing: 0 !important;
}

.onChangeBtn {
  width: 50% !important;
  height: 100% !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 16px !important;
  letter-spacing: 0 !important;
}

.select_station {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #bdbdbd;
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
  color: #4f4f4f !important;
}

.call-dialog-subtitle {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px !important;
  color: #bdbdbd !important;
}

.call-dialog-paymony {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 24px !important;
  color: #eb5757 !important;
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
  color: #4f4f4f !important;
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
  color: #ffffff !important;
  letter-spacing: 1px;
}

.warningmsg {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  color: #262626;
  letter-spacing: -0.5px;
  margin: 0 !important;
}

.warningmsg-font {
  color: #eb5757 !important;
}

.goReturn {
  width: 196px;
  height: 41px !important;
  background: #e61773;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  color: #ffffff !important;
  border-radius: 0;
  margin-top: 15px !important;
  margin-bottom: 18px !important;
  letter-spacing: 0px;
}

.paymentMethod {
  position: relative;
  width: 154px !important;
  height: 65px !important;
  border: 1.5px solid #e61773 !important;
  box-sizing: border-box !important;
  background: transparent !important;
  border-radius: 8px !important;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  color: #e61773 !important;
  letter-spacing: -0.1px;
}

.v-btn:before {
  background-color: transparent !important;
}
</style>
