<template>
  <div id="site">
    <!-- 모든 API가 response될 때까지 로딩 딤 처리 -->
    <v-container fluid v-if="loading" class="map-loading">
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
                      v-if="totalCount >= 1"
                      style="padding-left: 12px"
                      @click="selectPerson"
                      >탑승인원 {{ totalCount }}명</span
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
                    <v-card-text class="select-max-title mb-5"
                      >탑승인원은 최대 14명까지 선택 가능합니다.</v-card-text
                    >
                    <div class="tabs">
                      <!-- 1회권 -->

                      <!-- 일반  -->
                      <v-card class="d-flex justify-space-around mb-5" flat>
                        <v-card-text class="select-max"
                          >일반<br />(1회 1,500원)</v-card-text
                        >
                        <v-card :ripple="false" flat tile>
                          <v-btn
                            :disabled="isDisabled_adult_minus"
                            :ripple="false"
                            @click="adultDecrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </v-card>

                        <v-card flat tile>
                          <v-card-text class="count">{{
                            adultCount
                          }}</v-card-text>
                        </v-card>
                        <v-card flat tile :ripple="false">
                          <v-btn
                            :disabled="isDisabled_adult_plus"
                            :ripple="false"
                            @click="adultIncrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-card>
                      </v-card>

                      <!-- 청소년/어린이 -->
                      <v-card class="d-flex justify-space-around mb-5" flat>
                        <!-- mt-9 생략 -->
                        <v-card-text class="select-max"
                          >청소년/어린이<br />(1회 1,050원)</v-card-text
                        >
                        <v-card :ripple="false" flat tile>
                          <v-btn
                            :disabled="isDisabled_child_minus"
                            :ripple="false"
                            @click="childDecrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </v-card>

                        <v-card flat tile>
                          <v-card-text class="count">{{
                            childCount
                          }}</v-card-text>
                        </v-card>
                        <v-card flat tile :ripple="false">
                          <v-btn
                            :disabled="isDisabled_child_plus"
                            :ripple="false"
                            @click="childIncrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-card>
                      </v-card>

                      <!-- 유아 -->
                      <v-card class="d-flex justify-space-around mb-10" flat>
                        <v-card-text class="select-max"
                          >유아<br />(만6세 미만 무료)</v-card-text
                        >
                        <v-card :ripple="false" flat tile>
                          <v-btn
                            :disabled="isDisabled_baby_minus"
                            :ripple="false"
                            @click="babyDecrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </v-card>

                        <v-card flat tile>
                          <v-card-text class="count">{{
                            babyCount
                          }}</v-card-text>
                        </v-card>
                        <v-card flat tile :ripple="false">
                          <v-btn
                            :disabled="isDisabled_baby_plus"
                            :ripple="false"
                            @click="babyIncrement"
                            outlined
                            color="#E61773"
                            fab
                            width="34.83px"
                            height="34.83px"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-card>
                      </v-card>
                    </div>

                    <div class="total_payment">
                      <div class="payment-amount">
                        <span>결제 금액</span>
                        <p
                          class="
                            [totalPayment
                            ===
                            0
                            ?
                            {color:
                            '#E61773'}
                            :
                            {color:
                            '#555555'}]
                          "
                        >
                          {{ totalPayment }}원
                        </p>
                      </div>
                      <div
                        class="nonSelected"
                        v-if="!adultList && !childList && !babyList"
                      >
                        <span>수량</span>
                        <span>총{{ totalCount }}매 선택</span>
                      </div>
                      <div
                        class="selected"
                        v-if="
                          (adultList && true) ||
                          (childList && true) ||
                          (babyList && true)
                        "
                      >
                        <p class="sum">
                          수량
                          <span>총{{ totalCount }}매 선택</span>
                        </p>
                        <br />
                        <div>
                          <div class="sumList" v-if="adultList ? true : null">
                            <div>일반{{ adultCount }}</div>
                            <div>
                              <p>{{ adultCount * 1500 }}원</p>
                            </div>
                          </div>
                          <br />
                          <div class="sumList" v-if="childList ? true : null">
                            <div>청소년/어린이{{ childCount }}</div>
                            <div>
                              <p>{{ childCount * 1050 }}원</p>
                            </div>
                          </div>
                          <br />
                          <div class="sumList" v-if="babyList ? true : null">
                            <div>유아{{ babyCount }}</div>
                            <p>0원</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                  </v-row>
                </v-container>

                <v-btn
                  :disabled="!adultList && !childList && !babyList"
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
                          color: #ffffff;
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

            <!-- 시간 선택 모달 -->
            <v-overlay :z-index="zIndex" :value="daegu_timetable_popup">
              <v-card color="#FFF" class="stationModal-card-size">
                <v-card-text class="pa-0 stationModal-card-title">
                  <span class="select-modal-btn">시간표</span>
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
                        v-for="times in timeTable"
                        @click="selectRoundingBtn(times)"
                        :key="times.id"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="times"
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
                    v-if="rule"
                    color="#FFF"
                    @click="
                      daegu_timetable_popup = false;
                      pickedTime = '';
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    class="pa-0 ma-0 onChangeBtn"
                    tile
                    depressed
                    v-if="rule"
                    color="#E61773"
                    @click="start_station_popup = !start_station_popup"
                    >선택하기</v-btn
                  >
                   <v-btn
                    class="pa-2 ma-1"
                    tile
                    depressed
                    v-if="ok"
                    
                    style="color: #E61773; backgroundColor: #fff; border-top: 0.5px solid #e61773;"
                    
                    > 이미 지난 회차는 선택할 수 없습니다.<br />차량 출발
                      20분전에만 예약이 가능합니다.</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>

            <!-- 출발지 선택 모달 -->
            <v-overlay :z-index="zIndex" :value="start_station_popup">
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
                        :class="{
                          'v-list-item--active': pickedStation == station,
                        }"
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
                      start_station_popup = false;
                      pickedStation = '';
                    "
                    >이전</v-btn
                  >
                  <v-btn
                    class="pa-0 ma-0 onChangeBtn"
                    tile
                    depressed
                    color="#E61773"
                    @click="pickStation((isStart = true))"
                    >선택하기</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-overlay>

            <!-- 도착지 선택 모달 -->
            <v-overlay :z-index="zIndex" :value="destination_popup">
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
                        v-for="station in end_options"
                        @click="pickedStation = station"
                        :key="station.id"
                        :class="{
                          'v-list-item--active': pickedStation == station,
                        }"
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
                      destination_popup = false;
                      pickedStation = '';
                    "
                    >취소</v-btn
                  >
                  <v-btn
                    class="pa-0 ma-0 onChangeBtn"
                    tile
                    depressed
                    color="#E61773"
                    @click="pickStation((isStart = false))"
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
                      @click="daegu_timetable_popup = !daegu_timetable_popup"
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
                      @click="destination_popup = !destination_popup"
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
          <!-- <v-flex class="pa-0 mt-1" v-if="callBtn">
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
          </v-flex> -->
          <v-flex class="pa-0 mt-1" v-if="callBtn">
            <v-btn
              color="#E61773"
              tile
              depressed
              class="pa-0 call-dialog-btn"
              width="100%"
              height="50px"
              @click="requestPay"
              >{{ totalPayment }}원 결제하기</v-btn
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

let start_icon = {};
let end_icon = {};

import { mapGetters } from "vuex";
import axios from "axios";
var control;
var marker;
// var qs = require("qs");

export default {
  data: () => ({
    map: null,
    OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    currentlocation: {
      lat: "",
      lon: "",
    },
    time_start: [],
    // loading
    loading: 2,
    getLocationLoading: false,
    //timeTable
    timeTable: [],
    // station
    stationList: [],
    waypoints2: [],
    waypoints: [],
    // 현재시간
    timestamp: new Date(),
    hour: "0",
    min: "0",
    timeTest: ["19:00", "20:00"],
    // 지난시간과 현재시간
    rule: false,
    ok: false,
    // vehicle
    vehicle: {},
    vehicle_id: 0,
    // 탑승인원
    dialog: false,
    callBtn: false,
    totalCount: 0,
    // count: 1,
    babyList: false,
    childList: false,
    adultList: false,
    test: 0,
    babyCount: 0,
    adultCount: 0,
    childCount: 0,
    isDisabled_adult_minus: true,
    isDisabled_adult_plus: false,
    isDisabled_child_minus: true,
    isDisabled_child_plus: false,
    isDisabled_baby_minus: true,
    isDisabled_baby_plus: false,
    // overlay
    zIndex: 10,
    start_station_popup: false,
    destination_popup: false,
    daegu_timetable_popup: false,
    // options
    start: {
      id: -1,
      name: "start",
      points_idx: -1,
      stat2sta: "",
    },
    end: {
      id: -1,
      name: "end",
      points_idx: -1,
      stat2sta: "",
    },
    pickedStation: "",
    pickedTime: "",
    startIcon: "",
    endIcon: "",
    options: [],
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
      18: {
        name: "sejong_Rfree",
        setPoints: [36.4945, 127.3274],
        zoom: 15,
      },
    },
    points: {
      //type:2 -> route, type:3 -> station, type:6 -> route&&station
      //군산
      1: [],
      // 대구
      2: [
        {
          lat: 35.836308,
          lon: 128.681547,
          type: 6,
        },
        {
          lat: 35.838673,
          lon: 128.687892,
          type: 6,
        },
        {
          lat: 35.83705,
          lon: 128.690044,
          type: 6,
        },
        {
          lat: 35.83459,
          lon: 128.68652,
          type: 6,
        },
        {
          lat: 35.836308,
          lon: 128.681547,
          type: 6,
        },
      ],
      // 세종호수공원
      3: [
        {
          lat: 36.499351,
          lon: 127.270606,
          type: 6,
        },
        {
          lat: 36.50169,
          lon: 127.272315,
          type: 6,
        },
      ],
      //??
      4: [
        {
          lat: 37.579333,
          lon: 126.889036,
          type: 6,
        },
        {
          lat: 37.57518,
          lon: 126.89837,
          type: 6,
        },
        {
          lat: 37.58299,
          lon: 126.88485,
          type: 6,
        },
        {
          lat: 37.581296,
          lon: 126.885693,
          type: 6,
        },
        {
          lat: 37.579333,
          lon: 126.889036,
          type: 6,
        },
      ],
      // 세종 규특
      18: [
        // {
        //   lat: 36.49911,
        //   lon: 127.32867,
        //   type: 2,
        // },
        {
          lat: 36.49791,
          lon: 127.33019,
          type: 3,
        },
        {
          lat: 36.495534,
          lon: 127.32989,
          type: 2,
        },
        {
          lat: 36.495534,
          lon: 127.330257,
          type: 3,
        },
        {
          lat: 36.49529,
          lon: 127.33077,
          type: 2,
        },
        {
          lat: 36.49456,
          lon: 127.32574,
          type: 2,
        },
        {
          lat: 36.49819,
          lon: 127.3258,
          type: 3,
        },
        {
          lat: 36.49918,
          lon: 127.3277,
          type: 6,
        },
      ],
    },
    movingVehicle: "",
    routePoints: [],
    markerData: "",
  }),

  computed: {
    ...mapGetters({
      user: "user",
    }),

    totalPayment() {
      let num =
        1500 * this.adultCount + 1050 * this.childCount + 0 * this.babyCount;
      // let num1 = 1500*this.adultCount
      // let num2 = 1050 *this.childCount
      // let num3 = 0*this.babyCount
      // let num = num1 + num2 + num3
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
  rideCount() {
    this.totalCount = this.babyCount + this.adultCount + this.childCount;
    this.dialog = false;
    if (this.totalCount > 14) {
      alert("초과입니다.");
      return;
    }
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
    //   window.onpopstate = function (e) {
    //     console.log("referrer", document.referrer);
    //     console.log("location", document.location);
    //     if (document.referrer.indexOf("map/") >= 0) {
    //       history.pushState(null, null, "/");
    //       console.log("map site", document.referrer.indexOf("map/"));
    //     } else {
    //       history.back();
    //       console.log(history);
    //     }
    //     console.log("change", e);
    //     // console.log(e.state);
    //     // console.log(document.location);
    //     // console.log(history);
    //     // console.log(document.referrer);
    //     // location.href = "/";
    //     // this.$router.replace("/");
    //   };
    // 사이트 id에 따라 다른 화면 표시
    this.siteId = this.$route.params.siteId;

    // 정류장, 셔틀, 스케쥴 API Request
    this.getStation();
    this.setVehicle();
    this.createPickerIcons();
    this.getTimeTable();
  },
  beforeDestroy() {
    clearInterval(this.movingVehicle);
  },
  updated() {
    // 출발지, 도착지, 인원수 선택에 따른 호출 버튼 표시 유무
    if (
      this.totalCount >= 1 &&
      this.start.points_idx >= 0 &&
      this.end.points_idx >= 0
    ) {
      this.callBtn = true;
    } else {
      this.callBtn = false;
    }
  },
  watch: {
    markerData() {
      console.log("here", this.markerData);
    },
    vehicle_id() {
      console.log("vehicle_id : ", this.vehicle_id);
      if (this.vehicle_id && !this.movingVehicle) {
        console.log("현재 운행 차량:", this.vehicle_id);
        this.movingVehicle = setInterval(this.realTimeVehicle, 1000);
      } else {
        console.log(`siteId ${this.siteId}에 현재 운행 차량 없음`);
        this.movingVehicle = null;
      }
    },
    start_station_popup() {
      if (this.start_station_popup && marker) {
        marker.closePopup();
        marker = false;
      }
    },
    destination_popup() {
      if (this.destination_popup && marker) {
        marker.closePopup();
        marker = false;
      }
    },
    daegu_timetable_popup() {
      if (this.daegu_timetable_popup && marker) {
        marker.closePopup();
        marker = false;
      }
    },
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
      start_icon = this.stationPicker(this.start, this.startIcon, start_icon);

      if (this.routePoints.length > 0) {
        control.spliceWaypoints(0, 6);
      }
      this.routePoints = [];
      if (this.end.id != -1 && this.start.id != -1) {
        //calc ETA
        this.minutes = this.start.stat2sta[this.start.id][this.end.id];
        if (this.end.points_idx > this.start.points_idx) {
          this.routePoints = this.points[this.siteId].slice(
            this.start.points_idx,
            this.end.points_idx + 1
          );
        } else {
          this.routePoints = this.points[this.siteId]
            .slice(this.start.points_idx)
            .concat(this.points[this.siteId].slice(0, this.end.points_idx + 1));
        }
        this.addRouting(this.routePoints, "#E51973", "transparent");
      }
    },
    end() {
      console.log("end changed", this.end);
      end_icon = this.stationPicker(this.end, this.endIcon, end_icon);

      if (this.routePoints.length > 0) {
        control.spliceWaypoints(0, 6);
      }
      this.routePoints = [];

      if (this.start.id != -1 && this.end.id != -1) {
        //calc ETA
        this.minutes = this.start.stat2sta[this.start.id][this.end.id];
        if (this.end.points_idx > this.start.points_idx) {
          this.routePoints = this.points[this.siteId].slice(
            this.start.points_idx,
            this.end.points_idx + 1
          );
        } else {
          this.routePoints = this.points[this.siteId]
            .slice(this.start.points_idx)
            .concat(this.points[this.siteId].slice(0, this.end.points_idx + 1));
        }
        this.addRouting(this.routePoints, "#E51973", "transparent");
      }
    },
  },
  methods: {
    //출발지,도착지 선택 모달 '선택하기'버튼 연결 함수
    pickStation(isStart) {
      //정류장 선택 안했으면 아무 반응 없게
      if (!this.pickedStation) return;
      //선택했으면
      else {
        let picked = {
          id: this.pickedStation.id,
          name: this.pickedStation.name,
          points_idx: this.pickedStation.points_idx,
          stat2sta: this.pickedStation.stat2sta,
        };
        this.pickedStation = "";
        //출발지 모달
        if (isStart) {
          this.start = picked;
          this.start_station_popup = false;
          this.daegu_timetable_popup = false;
        }
        //도착지 모달
        else {
          this.end = picked;
          this.destination_popup = false;
        }
      }
    },
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
            value: {
              name: station.name,
              points_idx: station.points_idx,
              stat2sta: station.stat2sta,
              id: station.id,
            },
          }
        );
        markersLayer.on("click", this.layerClickHandler);
      }
    },
    stationPicker(point, icon_source, icon_type) {
      this.map.removeLayer(icon_type);
      icon_type = this.$utils.map.createMakerByXY(
        this.map,
        [
          this.points[this.siteId][point.points_idx].lat,
          this.points[this.siteId][point.points_idx].lon,
        ],
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
    testclick() {
      alert("testClick");
      return false;
    },
    layerClickHandler(e) {
      if (marker) {
        console.log("exist", marker);
        marker.closePopup();
        marker.unbindPopup();
      }
      marker = e.target;

      //에러 발생
      // if (marker.hasOwnProperty("_popup")) {
      //   marker.closePopup();
      //   marker.unbindPopup();
      // }

      const markerVal = marker.options.value;

      // 지도상에서 같은 정류장을 선택했을 경우
      if (this.start.id == markerVal.id || this.end.id == markerVal.id) {
        console.log("같은 정류장은 선택이 불가능합니다.");
      } else {
        //   아닌 경우는 popup 창을 띄워준다.
        const template = `<p id="stationName" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 14px; margin: 14px 0 7px 0 !important;">${markerVal.name}</p>
                 <form>
                    <button id="startBtn${markerVal.id}" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px; padding-bottom: 2px;">출발지로 설정</button> <br>
                    <button id="endBtn${markerVal.id}" type="button" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 13px;">도착지로 설정</button>
                </form>`;
        marker.bindPopup(template).openPopup();

        const startSubmit = this.$utils.map.getDomUtil(
          `startBtn${markerVal.id}`
        );
        console.log("marker value: ", markerVal);

        // 지도상에서 정류장을 출발지로 선택했을 경우
        this.$utils.map.createDomEvent.addListener(startSubmit, "click", () => {
          this.start = markerVal;
          marker.closePopup();
          marker.unbindPopup();
        });

        var endSubmit = this.$utils.map.getDomUtil(`endBtn${markerVal.id}`);

        // 지도상에서 정류장을 도착지로 지정한 경우
        this.$utils.map.createDomEvent.addListener(endSubmit, "click", () => {
          this.end = markerVal;
          marker.closePopup();
          marker.unbindPopup();
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
            // let station_count = Object.keys(station_result).length;
            let points_idx = -1;
            for (let station of station_result) {
              if (station.site == this.siteId) {
                while (points_idx++ < this.points[this.siteId].length) {
                  if (
                    this.points[this.siteId][points_idx].lat == station.lat &&
                    this.points[this.siteId][points_idx].lon == station.lon
                  ) {
                    station.points_idx = Number(points_idx);
                    station.stat2sta = JSON.parse(station.stat2sta);
                    this.stationList.push(station);
                    break;
                  }
                }
              }
            }
            this.stationList = this.stationList.sort(function (a, b) {
              return a.sta_Order < b.sta_Order ? -1 : 1;
            });

            console.log("stationList :", this.stationList);

            // 정류장 API와 셔틀 API의 response가 완료된 경우
            this.loading -= 1; // 로딩 딤 화면 끝내기
            // }
          }

          for (let point of this.points[this.siteId]) {
            if (!(point.type % 2)) {
              this.waypoints2.push({
                lat: point.lat,
                lon: point.lon,
              });
            }
          }
          this.waypoints2.push(this.waypoints2[0]);

          await this.addMarker(); // 정류장 마커 표시
          await this.addRouting2(this.waypoints2, "#00CFFF", "#FFFFFF"); // 서비스 경로 표시
        })
        .catch((error) => {
          console.log("station (GET) error: ");
          this.error = error;
          console.log(error);
        });
    },

    //vehicle 위치 초기 셋팅
    async setVehicle() {
      var vehicleIcon = this.$utils.map.createIcon({
        // 셔틀 아이콘 생성
        iconUrl: require("../../assets/vehicle1.svg"),
        iconSize: [32, 32],
      });
      let vehicle_arr = await this.getVehicle();
      this.vehicle_id = vehicle_arr[0] ? vehicle_arr[0].id : null;
      vehicle_arr.forEach((vehicle) => {
        this.vehicle[vehicle.id] = this.$utils.map.createMakerByXY(
          this.map,
          [vehicle.lat, vehicle.lon],
          {
            draggable: false,
            icon: vehicleIcon,
          }
        );
      });
      this.loading -= 1; // 셔틀 API response가 완료되면 false
    },

    //vehicle 위치 반영
    async realTimeVehicle() {
      // console.log("realtimeVehicle");
      let vehicle_arr = await this.getVehicle();
      if (vehicle_arr.length) {
        vehicle_arr.forEach((vehicle) => {
          this.vehicle[vehicle.id].setLatLng([vehicle.lat, vehicle.lon]); // 위치 업데이트
        });
      }
    },

    //vehicle 정보 요청 API
    async getVehicle() {
      let vehicle_arr = [];
      await axios
        .get("/api/vehicles/")
        .then((res) => {
          vehicle_arr = res.data.filter(
            (vehicle) =>
              vehicle.site == this.siteId && vehicle.lat && vehicle.lon
          );
        })
        .catch((err) => console.log("getvehicle_err", err));
      return vehicle_arr;
    },

    //탑승인원
    selectPerson() {
      if (this.count < 0) {
        this.isDisabled_baby_plus = true;
      } else {
        this.isDisabled_baby_plus = false;
      }

      if (this.count >= 14) {
        this.isDisabled_baby_minus = true;
      } else {
        this.isDisabled_baby_minus = false;
      }
    },

    async beforeSelectPerson() {
      if (this.count == 0) {
        this.count = 0;
        this.isDisabled_baby_plus = true;
        this.isDisabled_baby_minus = false;
      }
    },

    // 인원수 선택 모달 창 닫기 버튼 기능
    closePersonDialog() {
      this.dialog = false;

      // 티켓 카운트 초기화
      this.babyCount = 0;
      this.adultCount = 0;
      this.childCount = 0;
      this.totalCount = 0;

      // 카운트 버튼 초기화
      this.isDisabled_adult_minus = true;
      this.isDisabled_adult_plus = false;
      this.isDisabled_child_minus = true;
      this.isDisabled_child_plus = false;
      this.isDisabled_baby_minus = true;
      this.isDisabled_baby_plus = false;
    },

    // 인원수 - 버튼

    // 유아 인원수 감소
    babyDecrement() {
      this.babyCount -= 1;

      if (this.babyCount < 1) {
        this.isDisabled_baby_minus = true;
        this.babyCount = 0;
        this.babyList = false;
      }

      if (this.babyCount != 14) {
        this.isDisabled_adult_plus = false;
        this.isDisabled_child_plus = false;
        this.isDisabled_baby_plus = false;
      }

      this.totalCount = this.babyCount + this.adultCount + this.childCount;
    },

    // 일반 인원수 감소
    adultDecrement() {
      this.adultCount -= 1;

      if (this.adultCount < 1) {
        this.isDisabled_adult_minus = true;
        this.adultCount = 0;
        this.adultList = false;
      }

      if (this.adultCount != 14) {
        this.isDisabled_adult_plus = false;
        this.isDisabled_child_plus = false;
        this.isDisabled_baby_plus = false;
      }

      this.totalCount = this.babyCount + this.adultCount + this.childCount;
    },

    //청소년/어린이 인원수 감소
    childDecrement() {
      this.childCount -= 1;

      if (this.childCount < 1) {
        this.isDisabled_child_minus = true;
        this.childCount = 0;
        this.childList = false;
      }

      if (this.childCount != 14) {
        this.isDisabled_adult_plus = false;
        this.isDisabled_child_plus = false;
        this.isDisabled_baby_plus = false;
      }

      this.totalCount = this.babyCount + this.adultCount + this.childCount;
    },

    // 인원수 + 버튼
    //유아 인원수 증가
    babyIncrement() {
      if (this.totalCount < 14) {
        this.babyCount += 1;
        this.babyList = true;

        this.totalCount = this.babyCount + this.adultCount + this.childCount;

        if (this.babyCount >= 14 || this.totalCount >= 14) {
          this.isDisabled_adult_plus = true;
          this.isDisabled_child_plus = true;
          this.isDisabled_baby_plus = true;
        }

        if (this.babyCount != 0) {
          this.isDisabled_baby_minus = false;
        }
      } else {
        this.isDisabled_adult_plus = true;
        this.isDisabled_child_plus = true;
        this.isDisabled_baby_plus = true;
      }
    },

    //일반 인원수 증가
    adultIncrement() {
      if (this.totalCount < 14) {
        this.adultList = true;
        this.adultCount += 1;

        this.totalCount = this.babyCount + this.adultCount + this.childCount;

        if (this.adultCount >= 14 || this.totalCount >= 14) {
          this.isDisabled_adult_plus = true;
          this.isDisabled_child_plus = true;
          this.isDisabled_baby_plus = true;
        }

        if (this.adultCount != 0) {
          this.isDisabled_adult_minus = false;
        }
      } else {
        this.isDisabled_adult_plus = true;
        this.isDisabled_child_plus = true;
        this.isDisabled_baby_plus = true;
      }
    },

    //청소년/어린이 인원수 증가
    childIncrement() {
      if (this.totalCount < 14) {
        this.childList = true;
        this.childCount += 1;

        this.totalCount = this.babyCount + this.adultCount + this.childCount;

        if (this.childCount >= 14 || this.totalCount >= 14) {
          this.isDisabled_adult_plus = true;
          this.isDisabled_child_plus = true;
          this.isDisabled_baby_plus = true;
        }

        if (this.childCount != 0) {
          this.isDisabled_child_minus = false;
        }
      } else {
        this.isDisabled_adult_plus = true;
        this.isDisabled_child_plus = true;
        this.isDisabled_baby_plus = true;
      }
    },

    // 탑승인원 선택완료 버튼
    rideCount() {
      this.totalCount = this.babyCount + this.adultCount + this.childCount;
      this.dialog = false;
      if (this.totalCount > 14) {
        alert("초과입니다.");
        return;
      }
    },

    //운행 스케쥴 정보 호출
    getTimeTable() {
      var username = "admin@aspringcloud.com";
      var password = "spring#007";

      this.hour = this.timestamp.getHours();
      this.min = this.timestamp.getMinutes();

      axios
        .get("https://sgapi.springgo.io/api/reservations/rounds/", {
          headers: {
            Authorization: "Basic " + btoa(username + ":" + password),
          },
        })
        .then((response) => {
          console.log("response :", response);
          let busTestTime = {
            id: 10,
            time_start: "19:00:00",
            ordinary_count: 10,
            site: 2,
          };
          let round_result = response.data.results;
          round_result.push(busTestTime);
          let round_count = round_result.length;

          round_result = round_result.sort(function (a, b) {
            return a.id < b.id ? -1 : 1;
          });

          for (let i = 0; i < round_count; i++) {
            this.timeTable.push(round_result[i].time_start.substring(0, 5));
          }
          console.log("timeTable:", this.timeTable);

          this.hour = this.hour.toString();
          this.min = this.min.toString();

          this.hour < 10 ? (this.hour = "0" + this.hour) : this.hour;
          this.min < 10 ? (this.min = "0" + this.min) : this.min;

          console.log("timeTablereplace:", this.timeTable[0].replace(":", ""));
          console.log("realTimereplace:", this.hour + this.min);
        })
        .catch((error) => console.log("error", error));
    },

    // 회차 선택
    selectRoundingBtn(item) {
      console.log("item :", item);

      if (item.replace(":", "") < this.hour + this.min) {
        console.log("운행 시간이 종료된 회차입니다!!!!!!");
        this.rule = false;
        this.ok = true;
      } else {
        console.log("운행 시간이 가능!!!!!!");
        this.rule = true;
        this.ok = false;
      }
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
                html: "<div id='current_container'><div class='current_item'></div><div class='current_item2'></div><div class='current_circle' style='animation-delay: -3s'></div><div class='current_circle' style='animation-delay: -2s'></div><div class='current_circle' style='animation-delay: -1s'></div><div class='current_circle' style='animation-delay: 0s'></div></div>",
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

    // 타시오 호출, 결제 창X 연결 -> views/calling-layout.vue
    requestCallBtn() {
      // this.$router.replace({
      //   name: "CallingLayout",
      //   query: {
      //     site: this.siteId,
      //     start: this.start,
      //     end: this.end,
      //     count: this.count,
      //     minutes: this.minutes,
      //     vehicle_id: this.vehicle_id,
      //   },
      // });
      // const totalPayment = String('1000' * this.count).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      // const IMP = window.IMP;
      // // 가맹점 식별코드
      // IMP.init("imp19092456");
      // // // 결제창 호출 코드
      // IMP.request_pay({ // param
      //     pg: `mobilians.${this.meth}`, // PG사명
      //     // pay_method: this.meth, // 결제수단
      //     merchant_uid: 'mid_' + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
      //     name: '타시오 결제', // 주문명
      //     amount: totalPayment, // 결제할 금액 (필수 항목)
      //     buyer_email: '', // 주문자 ID (선택 항목)
      //     buyer_name: '', // 주문자명 (선택항목)
      //     buyer_tel: '010-8433-9772', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
      //     buyer_addr: '', // 주문자 주소 (선택 항목)
      //     buyer_postcode: '', // 주문자 우편 번호 (선택 항목)
      //     custom_data: this.user.data.uid, // import에서 제공하는 커스텀 데이터 변수에 useruid 를 담아서 보냄
      //     m_redirect_url: `https://connector.tasio.io/tasio-288c5/us-central1/app/api/payment/put?site=${this.pageId}&start=${this.start}&end=${this.end}&startName=${this.options[this.start - 1].name}&endName=${this.options[this.end - 1].name}&count=${this.count}&minutes=${this.minutes}`
      // });
    },

    requestPay() {
      // 아임포트 객체
      const IMP = window.IMP;

      // 가맹점 식별코드
      IMP.init("imp80546815");

      // 결제창 호출 코드
      IMP.request_pay(
        {
          // param
          pg: "mobilians.617160000106", // PG사명
          pay_method: "card", // 결제수단
          merchant_uid: "mid_" + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
          name: "타시오 결제", // 주문명
          amount: 100, // 결제할 금액 (필수 항목)
          buyer_email: "", // 주문자 ID (선택 항목)
          buyer_name: "", // 주문자명 (선택항목)
          buyer_tel: "010-7791-1383", // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
          buyer_addr: "", // 주문자 주소 (선택 항목)
          buyer_postcode: "", // 주문자 우편 번호 (선택 항목)
          custom_data: {
            imp_uid: this.user.data.uid, // import에서 제공하는 커스텀 데이터 변수에 useruid 를 담아서 보냄
            adult_count: this.adultCount,
            child_count: this.childCount,
            baby_count: this.babyCount,
            stop_schedule: 0,
          },
          m_redirect_url: `https://sgsapp.springgo.io:200/tasio-288c5/us-central1/app/api/payment/put?site=${this.siteId}&start=${this.start}&end=${this.end}&passenger=${this.count}&vehicle_id=${this.vehicle_id}`,
        }
        // (rsp) => {
        //     // callback
        //     if (rsp.success) {
        //         console.log("결제 성공 success!!: ", rsp.success);
        //         axios({
        //             url:
        //                 "https://connector.tasio.io/tasio-288c5/us-central1/app/api/payment/put", // 가맹점 서버
        //             method: "post",
        //             headers: {
        //                 "content-type":
        //                     "application/x-www-form-urlencoded",
        //             },
        //             data: qs.stringify({
        //                 imp_uid: rsp.imp_uid,
        //                 merchant_uid: rsp.merchant_uid,
        //                 amount: rsp.paid_amount,
        //                 userid: this.user.data.uid,
        //             }),
        //         })
        //             .then((data) => {
        //                 // 가맹점 서버 결제 API 성공시 로직
        //                 console.log("가맹점 서버 결제 API 성공!", data);
        //                 switch (data.status) {
        //                     case "success":
        //                         break;
        //                     case "forgery":
        //                         break;
        //                 }
        //             })
        //             .catch((error) => {
        //                 // 가맹점 서버 결제 API 실패시 로직
        //                 console.log(
        //                     "가맹점 서버 결제 API 실패ㅠㅠ: ",
        //                     error
        //                 );
        //             });
        //     } else {
        //         // 결제 실패 시 로직
        //         // 돈이 안맞을 때?
        //         console.log("rsp.error_msg: ", rsp.error_msg);
        //     }
        // }
      );
    },

    cancelPay() {
      // Firestore에서 회원정보를 조회하고 isRefund가 0이면 환불을 진행할 수 있게 1이면 이미 환불이 된 상태라 불가능하게하기
      // merchant_uid에 last_merchant 담아서 보내주고 reason 담아서 보내주기
      if (this.isrefund == "0") {
        axios({
          url: "https://connector.tasio.io/tasio-288c5/us-central1/app/api/payment/cancel",
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          data: {
            merchant_uid: this.last_mid, // 주문번호 *
            reason: "타시오 호출 취소", // 환불 사유 *
            cancel_request_amount: 500,
          },
        })
          .then((response) => {
            alert("환불이 완료되었습니다.", response);
          })
          .catch((error) => {
            alert("환불을 실패하였습니다.", error);
          });

        this.$router.push("/");
      } else {
        alert("결제하신 내역이 없습니다.");
      }
    },

    // // payment added
    //  requestPay(meth) {
    //         if (meth == '191029079116') {
    //             this.isRed1 = true;
    //             this.isRed2 = false;
    //             console.log(this.isRed1);
    //             this.meth = meth;
    //         } else if (meth == '170622040674') {
    //             this.isRed1 = false;
    //             this.isRed2 = true;
    //             this.meth = meth;
    //         }
    //     },

    // cancelCallDialog() {
    //   this.calldialog = false;
    // },
  },
};
// };
</script>
<style>
.leaflet-popup-content-wrapper {
  min-width: 130px;
  width: max-content;
  min-height: 100px;
  height: max-content;
  text-align: center;
}

.leaflet-popup-content {
  width: 100% !important;
  padding: 4px 5px 10px 5px;
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
* {
  font-family: Noto Sans KR !important;
  color: #555;
}
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
.is-disabled3 {
  color: #bdbdbd !important;
}
.is-disabled4 {
  color: #bdbdbd !important;
}
.is-disabled5 {
  color: #bdbdbd !important;
}
.is-disabled6 {
  color: #bdbdbd !important;
}
.v-dialog {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.v-btn {
  margin-top: 0.5rem;
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
  top: 45px;
  text-align: center;
  font-size: 16px;
  color: #262626;
}
.select-max-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #bdbdbd;
  margin: -60px;
}

.select-max {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #bdbdbd;
  margin: -16px;
  margin-right: 40px;
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
  border-top: 0.5px solid #e61773 !important;
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

.payment-amount {
  /* margin-top: 15px; */
  display: flex;
  justify-content: space-between;
}
.payment-amount span,
.payment-amount p {
  font-weight: 500;
}
.total_payment {
  width: 90vw;
  height: 150px;
  border-top: 1px solid #dbdbdb;
  padding-top: 17px;
  box-sizing: border-box;
  font-size: 15px;
}
.nonSelected {
  width: 100%;
  height: 53px;
  border: 1px solid #c6c6c6;
  display: flex;
  justify-content: space-between;
  color: #c6c6c6;
  line-height: 53px;
  padding: 0 10px;
  box-sizing: border-box;
}
.nonSelected > span {
  letter-spacing: 1.5px;
  font-size: 14px;
}

.selected {
  width: 330px;
  height: 165px;
  border: 1px solid #dbdbdb;
  font-size: 14px;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.sum {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}
.sum:after {
  content: "";
  display: block;
  width: 320px;
  height: 1px;
  background-color: #bdbdbd;
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
}

.count {
  display: inline-block;
  width: 60px;
  font-size: 18px;
  line-height: 18px;
  margin: 0;
  text-align: center;
}
.defaultColor {
  color: #555555;
}
.pinkColor {
  color: #e61773;
}
.sumList {
  display: flex;
  justify-content: space-between;
  margin-bottom: -30px;
}
</style>
