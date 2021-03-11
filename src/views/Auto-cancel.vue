<template>
  <v-container
    class="pa-0 ma-0 flex-wrap text-center"
    style="background-color: #fff"
    fluid
    grid-list-md
    fill-height
  >
    <v-layout wrap class="ma-0">
      <v-flex
        xs12
        sm12
        md12
        class="d-flex justify-center align-end text-center pa-6 pb-4 pt-10"
      >
        <v-card color="transparent" flat tile>
          <img src="../assets/access-logo.svg" style="margin-top: 19px" />
        </v-card>
      </v-flex>
      <v-flex
        xs12
        sm12
        md12
        class="d-flex justify-center align-end text-center"
      >
        <v-card color="transparent" flat tile>
          <img src="../assets/kiosk-icon.svg" />
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 class="justify-center text-center pb-0">
        <v-card class="text-center" color="transparent" flat tile>
          <v-card-text class="auto-cancel pa-0">
            호출이 자동취소 되었습니다.
          </v-card-text>
          <v-card-text class="why-not-ride pt-8 pb-0">
            셔틀이 출발지에 도착했지만 <br />
            탑승이 확인되지 않았어요.
          </v-card-text>
          <v-card-text class="why-not-ride pa-0 pt-4">
            다음에 다시 이용해주세요.
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 class="justify-center text-center pt-0">
        <v-card class="text-center" color="transparent" flat tile> </v-card>
      </v-flex>
      <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pa-6">
        <v-btn
          block
          depressed
          tile
          color="#E61773"
          height="50px"
          class="ok-btn"
          replace
          :to="`/map/${$route.query.siteId}`"
          >확인</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AutoCancel",

  data: () => ({
    count: 0,
    siteId: 0,
  }),

  computed: {
    allPay() {
      let pay = 1000 * parseInt(this.count);
      return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    payment() {
      let pay = 500 * parseInt(this.count);
      return pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  mounted() {
    this.count = this.$route.query.passenger_count;
    this.siteId = this.$route.query.siteId;
  },
};
</script>

<style scoped>
.cancel-info1 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  color: #828282 !important;
}

.cancel-info2 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  line-height: 20px;
  color: #828282 !important;
  text-align: left;
}

.cancel-info3 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  color: #262626 !important;
  text-align: right;
}

.cancel-info4 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  color: #eb5757 !important;
  text-align: right;
}

.cancel-info5 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  color: #262626 !important;
}

.cancel-info6 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 24px !important;
  color: #eb5757 !important;
}

.auto-cancel {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px !important;
  color: #262626 !important;
  margin-top: 36px !important;
}

.why-not-ride {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px !important;
  line-height: 20px;
  text-align: center;
  color: #262626 !important;
}

.ok-btn {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
}
</style>
