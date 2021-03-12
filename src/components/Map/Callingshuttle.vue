<template>
  <!-- 배차 완료 및 모니터링 페이지 -->
  <v-container
    class="map-container pa-0 ma-0 flex-wrap"
    fluid
    grid-list-md
    fill-height
  >
    <v-layout row wrap class="ma-0">
      <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%; height: 100%">
        <v-card
          id="map-container"
          class="pa-0 ma-0"
          style="width: 100% height: 100%"
          outlined
          tile
        ></v-card>
      </v-flex>
      <v-flex
        class="d-flex flex-column justify-start text-center pa-0 call-infomation color: #FFF"
        xs12
        sm12
        md12
        v-if="ready"
      >
        <v-card flat tile color="transparent">
          <v-card-text class="pa-6 pr-3">
            <v-row no-gutters>
              <v-col cols="9">
                <v-card class="pa-0 text-left" tile flat>
                  <v-card-text class="pa-0 pl-1 pb-3 desination"
                    ><span
                      style="
                        padding-right: 15px;
                        font-size: 13px;
                        color: #27ae60;
                      "
                      >출발지</span
                    >{{ start.name }}</v-card-text
                  >
                  <v-card-text class="pa-0 pl-1 pb-2 desination"
                    ><span
                      style="
                        padding-right: 15px;
                        font-size: 13px;
                        color: #eb5757;
                      "
                      >도착지</span
                    >{{ end.name }}</v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card class="pa-0 text-center" tile flat>
                  <v-card-text class="pa-0 pb-3 arrive-wrap"
                    >탑승인원</v-card-text
                  >
                  <v-card-text
                    class="pa-0 desination"
                    style="font-size: 18px !important"
                    >{{ count }}명</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="ml-5 mr-5"></v-divider>
          <v-list class="pa-0" color="transparent">
            <v-list-item color="transparent">
              <v-list-item-content style="text-align: right">
                <v-list-item-title class="desination-info-title"
                  >셔틀 번호</v-list-item-title
                >
                <v-list-item-subtitle class="desination-info-subtitle">{{
                  vehicle_name
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-card class="ma-4" flat tile color="transparent">
                <v-img src="../../assets/profile.svg"></v-img>
              </v-card>

              <v-list-item-content style="text-align: left">
                <v-list-item-title class="desination-info-title"
                  >담당자</v-list-item-title
                >
                <v-list-item-subtitle class="desination-info-subtitle">{{
                  owner
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <span class="arrive-time">{{
            minutes || minutes === 0 ? `약 ${minutes}분 후` : "시간계산 중"
          }}</span
          ><span v-if="minutes || minutes === 0" style="color: #828282">
            셔틀이 출발지에 도착합니다.</span
          >
          <v-card-actions class="pa-0 pt-5 call-cancel-btn">
            <v-btn
              style="height: 50px"
              color="#E61773"
              class="callShuttle"
              @click.native="callCancel"
              >호출 취소하기</v-btn
            >

            <v-dialog v-model="callcanceldialog" persistent max-width="280">
              <v-card style="width: 280px">
                <v-card-text class="text-center pa-0">
                  <v-card-text class="pa-0 call-dialog-content">
                    셔틀 호출이 취소됩니다. 정말 취소하시겠습니까?
                  </v-card-text>
                </v-card-text>

                <v-card flat class="pa-0 d-flex align-self-end">
                  <v-container class="pa-0">
                    <v-row no-gutters>
                      <v-col>
                        <v-btn
                          color="#FAFAFA"
                          tile
                          depressed
                          class="pa-0 call-cancel-dialog-btn"
                          width="100%"
                          height="56.5px"
                          @click.native="callcanceldialog = false"
                          >호출 유지하기</v-btn
                        >
                      </v-col>
                      <v-col>
                        <v-btn
                          color="#E61773"
                          tile
                          depressed
                          class="pa-0 call-dialog-btn"
                          width="100%"
                          height="56.5px"
                          @click.native="callCancleBtn"
                          >호출 취소하기</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-card>
            </v-dialog>

            <v-dialog v-model="cancelCompleteDialog" persistent max-width="280">
              <v-card style="width: 280px">
                <v-card-text class="text-center pa-0">
                  <v-card-text class="pa-0 call-dialog-content">
                    호출이 취소되었습니다.
                  </v-card-text>
                </v-card-text>

                <v-card flat class="pa-0 d-flex align-self-end">
                  <v-container class="pa-0">
                    <v-row no-gutters>
                      <v-col>
                        <v-btn
                          color="#E61773"
                          tile
                          depressed
                          class="pa-0 call-dialog-btn"
                          width="100%"
                          height="56.5px"
                          @click.native="goToMain"
                          >확인</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  name: "CallingShuttle",

  data: () => ({
    ready: false,
    map: null,
    OSMUrl: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    siteId: "",
    // Station
    stationList: [],
    start: "",
    end: "",
    start_icon: {},
    end_icon: {},
    waypoints: [],

    callcanceldialog: false,

    // web socket
    webSocketData: {},
    webSocketData2: {},

    eta: "",

    // Vehicle
    vehicle_site: 0,
    vehicle_name: "",
    vehicle_user: "",
    vehicle_lat: "",
    vehicle_lon: "",
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

    owner: "",
    cancelCompleteDialog: false,

    realTimeVehicle: "",
    realTimeETA: "",
  }),

  computed: {
    ...mapGetters({
      user: "user",
    }),
    ...mapState(["uid"]),
    minutes() {
      if (this.eta) return parseInt(this.eta[this.vehicle_id]);
      else return "";
    },
  },

  created() {
    this.getStation();
    this.getVehicle();

    axios
      .get(
        "https://ondemand.tasio.io:400/shuttle-9d5cb/us-central1/app/api/read/" +
          this.uid
      )
      .then((response) => {
        this.displayName = response.data.displayName;

        this.ready = true;
      })
      .catch((error) => {
        console.log("User read: ", error);
      });
  },

  mounted() {
    this.socket = this.$route.params.socket;
    this.vehicle_id = parseInt(this.$route.params.vehicle_id);
    this.start = this.$route.params.start;
    this.end = this.$route.params.end;
    this.count = this.$route.params.passenger;
    this.siteId = this.$route.params.site_id;

    // websocket에 있는 정보들을 받는다.
    this.socket.onmessage = ({ data }) => {
      this.webSocketData = JSON.parse(data);
      console.log("CallingShuttle: ", this.webSocketData.what);
      // 탑승 확인 (arrived)
      if (
        this.webSocketData.what == "EVENT" &&
        this.webSocketData.how.type == "ondemand" &&
        this.webSocketData.how.function == "arrived" &&
        this.webSocketData.how.uid == this.uid
      ) {
        this.socket.close();
        this.$router.replace({
          name: "Thanks",
        });
        // 탑승 미확인 및 취소 (cancel_call)
      } else if (
        this.webSocketData.what == "EVENT" &&
        this.webSocketData.how.uid == this.uid &&
        this.webSocketData.how.function == "cancel_call"
      ) {
        this.socket.close();
        this.$router.replace({
          name: "AutoCancel",
          query: { siteId: this.siteId },
        });
      }
    };

    this.map = this.$utils.map.createMap("map-container", {
      zoomControl: false,
      routeWhileDragging: false,
      attributionControl: false,
    });

    // Open Street Map Layer Service Load
    this.$utils.map.createTileLayer(this.map, this.OSMUrl, {});
  },

  beforeDestroy() {
    clearInterval(this.realTimeETA);
    clearInterval(this.realTimeVehicle);
  },
  methods: {
    addMarker() {
      let gifIcon = this.$utils.map.createIcon({
        iconUrl: require("../../assets/station_icon.svg"),
        iconSize: [12, 12],
      });

      for (let station of this.stationList) {
        this.$utils.map.createMakerByXY(this.map, [station.lat, station.lon], {
          icon: gifIcon,
        });
      }
    },

    getStation() {
      console.log("Request /api/stations/");
      axios
        .get("/api/stations/")
        .then((response) => {
          if (response.status == 200) {
            let station_result = response.data;
            let points_idx = -1;
            for (let station of station_result) {
              if (station.site == this.siteId) {
                if (station.id == this.start.id)
                  this.eta = JSON.parse(station.eta);
                console.log(this.eta);
                while (points_idx++ < this.points[this.siteId].length) {
                  if (
                    this.points[this.siteId][points_idx].lat == station.lat &&
                    this.points[this.siteId][points_idx].lon == station.lon
                  ) {
                    station.points_idx = Number(points_idx);
                    this.stationList.push(station);
                    break;
                  }
                }
              }
            }
            this.stationList = this.stationList.sort(function (a, b) {
              return a.sta_Order < b.sta_Order ? -1 : 1;
            });

            console.log("Response /api/stations/");

            // Map View Center Load
            this.map.setView(
              this.mapInfo[this.vehicle_site].setPoints,
              this.mapInfo[this.vehicle_site].zoom
            );
            this.getRouting();
          }
        })
        .catch((error) => {
          console.log("station (GET) error: ");
          this.error = error;
          console.log(error);
        });

      this.realTimeETA = setInterval(
        async function () {
          axios
            .get(`/api/stations/${this.start.id}/`)
            .then((response) => {
              if (response.status == 200) {
                this.eta = JSON.parse(response.data.eta);
                console.log("realTimeETA", this.eta);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }.bind(this),
        10000
      );
    },

    async getRouting() {
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

      if (this.end.points_idx > this.start.points_idx) {
        this.waypoints = this.points[this.vehicle_site].slice(
          this.start.points_idx,
          this.end.points_idx + 1
        );
      } else {
        this.waypoints = this.points[this.vehicle_site]
          .slice(this.start.points_idx)
          .concat(
            this.points[this.vehicle_site].slice(0, this.end.points_idx + 1)
          );
      }

      this.map.removeLayer(this.start_icon);
      this.start_icon = this.$utils.map.createMakerByXY(
        this.map,
        [
          this.points[this.vehicle_site][this.start.points_idx].lat,
          this.points[this.vehicle_site][this.start.points_idx].lon,
        ],
        {
          icon: startIcon,
        }
      );
      this.map.removeLayer(this.end_icon);
      this.end_icon = this.$utils.map.createMakerByXY(
        this.map,
        [
          this.points[this.vehicle_site][this.end.points_idx].lat,
          this.points[this.vehicle_site][this.end.points_idx].lon,
        ],
        {
          icon: endIcon,
        }
      );
      this.map.removeLayer(endIcon);

      this.$utils.map.createRouting(this.map, {
        waypoints: this.waypoints,
        serviceUrl: "https://osrmserver.springgo.io/route/v1",
        addWaypoints: false,
        draggableWaypoints: false,
        showAlternatives: false,
        routeWhileDragging: false,
        fitSelectedRoutes: false,
        lineOptions: {
          draggable: false,
          styles: [
            {
              color: "#E51973",
              weight: 5,
            },
            {
              color: "transparent",
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
      this.addMarker();
    },

    // 배차된 셔틀만 보여준다.
    getVehicle() {
      console.log("Request /api/vehicles/");
      axios
        .get("/api/vehicles/")
        .then(async (response) => {
          console.log("Response /api/vehicles/", response);

          var vehicle_data = response.data.sort(function (a, b) {
            return a.id < b.id ? -1 : 1;
          });
          var vehicleIcon = this.$utils.map.createIcon({
            iconUrl: require("../../assets/vehicle1.svg"),
            iconSize: [32, 32],
          });

          console.log("vehicle_data: ", vehicle_data);
          console.log("vehicle_id: ", this.vehicle_id);

          for (var arr of vehicle_data) {
            if (this.vehicle_id == arr.id) {
              this.vehicle_name = arr.name;
              this.vehicle_user = arr.user;
              this.vehicle_site = arr.site;
              this.vehicle_lat = arr.lat;
              this.vehicle_lon = arr.lon;
            }
          }
          this.getVehicleUser();

          if (
            this.vehicle_lat != null ||
            this.vehicle_lon != null ||
            this.vehicle_lat != undefined ||
            this.vehicle_lon != undefined
          ) {
            this.vehicle = await this.$utils.map.createMakerByXY(
              this.map,
              [this.vehicle_lat, this.vehicle_lon],
              {
                draggable: false,
                icon: vehicleIcon,
              }
            );
          }
        })
        .catch((error) => {
          console.log("Vehicle Error: ", error);
        });
      // 셔틀의 위치는 1초마다 업데이트 해준다.
      this.realTimeVehicle = setInterval(
        async function () {
          axios
            .get(`/api/vehicles/${this.vehicle_id}`)
            .then((response) => {
              var vehicle_data = response.data;
              if (
                vehicle_data.lat != null ||
                vehicle_data.lon != null ||
                vehicle_data.lat != undefined ||
                vehicle_data.lon != undefined
              ) {
                this.vehicle.setLatLng([vehicle_data.lat, vehicle_data.lon]);
              }
            })
            .catch((error) => {
              console.log("SetInterval Error: ", error);
            });
        }.bind(this),
        1000
      );
    },

    // 셔틀의 안전요원의 정보를 보여주기 위한 API
    getVehicleUser() {
      axios
        .get(`/api/users/${this.vehicle_user}`)
        .then((response) => {
          this.owner = response.data.username;
        })
        .catch((error) => {
          console.log("/api/user/ Error: ", error);
        });
    },

    callCancel() {
      this.callcanceldialog = true;
    },

    callCancleBtn() {
      this.cancleMessage();
      this.disconnect();
      this.callcanceldialog = false;
      this.cancelCompleteDialog = true;
    },

    goToMain() {
      this.cancelCompleteDialog = false;
      this.$router.replace(`/map/${this.siteId}`);
    },

    // 배차가 완료된 상태에서 호출 취소를 할 경우
    // 안전요원에 보내는 메시지
    cancleMessage() {
      this.webSocketData2 = {
        where: "",
        who: "tasio_id",
        what: "EVENT",
        how: {
          type: "ondemand",
          vehicle_id: this.vehicle_id,
          function: "cancel_call",
          current_station_id: this.start.id,
          target_station_id: this.end.id,
          passenger: this.count,
          passenger_name: this.displayName,
          uid: this.uid,
        },
      };
      //   this.webSocketData2 = {
      //     where: "",
      //     who: "tasio_id",
      //     what: "EVENT",
      //     how: {
      //       type: "ondemand",
      //       vehicle_id: this.vehicle_id,
      //       function: "cancel_call",
      //       current_station_id: 5,
      //       target_station_id: 20,
      //       passenger: this.count,
      //       passenger_name: this.displayName,
      //       uid: this.uid,
      //       site_id: 3,
      //     },
      //   };

      this.socket.send(JSON.stringify(this.webSocketData2));
    },

    disconnect() {
      this.socket.close();
      this.status = "disconnected";
      console.log("socket", this.status);

      // clearInterval(this.etaTime);
    },
  },
};
</script>

<style scoped>
.call-infomation {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 35px 35px 0px 0px;
  z-index: 9;
}

.arrive-wrap {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  border: none;
  color: #bdbdbd;
}

.desination {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  color: #262626 !important;
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

.arrive-time {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #e61773;
}

.call-cancel-btn {
  width: 100%;
}

.v-dialog {
  border-radius: 0 !important;
  box-shadow: none !important;
}

.call-dialog-content {
  width: 162px;
  margin: 0 auto;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 16px !important;
  line-height: 17px;
  color: #262626 !important;
  padding: 39px 0 !important;
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
  color: #ffffff !important;
}
</style>
