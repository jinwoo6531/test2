<template>
  <!-- 승차권 결제 체크 페이지 -->
  <div style="height: 100%">
    <v-col class="text-center" style="padding-bottom: 10px; padding-top: 77px">
      <img
        src="../assets/check-icon.svg"
        width="46"
        v-if="$route.query.paystate === '1'"
      />
      <img src="../assets/warning.svg" width="46" v-else />
    </v-col>
    <v-col class="text-center">
      <p
        class="page-title"
        style="padding-top: 30px; font-size: 20px"
        v-if="paystate === '1'"
      >
        승차권 결제가 완료 되었습니다!
      </p>
      <p class="page-title" style="padding-top: 30px; font-size: 20px" v-else>
        승차권 결제가 취소 되었습니다
      </p>
      <p class="complete-content" style="padding-top: 30px; font-size: 16px">
        승차권 확인은 메뉴의<br />
        <b>[내 승차권 확인]</b>에서 가능합니다.
      </p>
    </v-col>
    <v-col class="pa-4" style="position: absolute; bottom: 0">
      <!-- <div class="text-right" style="margin-bottom: 10px;">
            <v-btn :ripple="false" @click="goToChkReservation" width="100%" height="50" rounded depressed color="#E0E0E0" style="font-weight: 500; font-size: 16px; color: #333333; box-shadow: -5px -5px 7px #FFFFFF, 5px 5px 5px rgba(225, 220, 212, 0.9) !important;">예약 현황보기</v-btn>
        </div> -->
      <div class="text-right">
        <v-btn
          :ripple="false"
          @click="goToChkReservation"
          width="100%"
          height="50"
          depressed
          color="#E61773"
          style="
            font-weight: 500;
            font-size: 16px;
            box-shadow: -5px -5px 7px #ffffff,
              5px 5px 5px rgba(225, 220, 212, 0.9) !important;
          "
          dark
          >확인</v-btn
        >
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    paystate: 1,
    site: 0,
    start: 0,
    end: 0,
    startName: "",
    endName: "",
    station_startId: 0,
    station_endId: 0,
    count: 0,
    minutes: 0,
    vehicle_id: 0,
  }),

  mounted() {
      (this.paystate = this.$route.query.paystate),
      (this.site = this.$route.query.site),
      (this.start = this.$route.query.start),
      (this.end = this.$route.query.end),
      (this.startName = this.$route.query.end),
      (this.endName = this.$route.query.end),
      (this.station_startId = this.$route.query.station_startId),
      (this.station_endId = this.$route.query.station_endId),
      (this.count = this.$route.query.count),
      (this.minutes = this.$route.query.minutes),
      (this.vehicle_id = this.$route.query.vehicle_id);
  },

  methods: {
    goToChkReservation() {
      if (this.paystate === "1") {
        this.$router.replace({
          name: "Ticket",
          query: {
            site: this.site,
            start: this.start,
            end: this.end,
            count: this.count,
            minutes: this.minutes,
            vehicle_id: this.$route.query.vehicle_id,
          },
        });
      } else {
        this.$router.replace(`/map/${this.site}`);
      }
    },

    goToHome() {},
  },
};
</script>

<style scoped>
.complete-content {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #262626;
}
</style>
