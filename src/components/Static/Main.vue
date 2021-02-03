<template>
  <div id="main">
    <v-container
      class="pa-0 ma-0 flex-wrap"
      fluid
      justify-center
      grid-list-md
      fill-height
    >
      <v-layout row wrap class="ma-0">
        <v-flex class="pa-0 mt-12 mb-12 main-title persentH" xs12 sm12 md12>
          탑승하실 지역을 선택하세요
        </v-flex>
        <v-flex>
          <v-container fluid>
            <v-row dense no-gutters align="center" justify="center">
              <v-col
                v-for="card in cards"
                :key="card.title"
                cols="6"
                class="mb-5"
                align="center"
                justify="center"
              >
                <v-badge
                  color="#E61773"
                  content="준비중"
                  left
                  offset-x="-30px"
                  offset-y="20px"
                  style="z-index: 10; padding: 1px 5px 3px 5px"
                  :hidden="card.hidden"
                ></v-badge>
                <v-card
                  :ripple="false"
                  link
                  :to="card.to"
                  flat
                  width="128px"
                  height="128px"
                  :disabled="card.disabled"
                  :color="card.color"
                  style="
                    margin: 0;
                    text-align: center;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    border-radius: 20px;
                  "
                >
                  <v-img
                    :src="card.src"
                    :gradient="card.gradient"
                    class="align-center"
                  >
                    <v-card-text
                      v-html="card.title"
                      class="site-btn pa-0 mb-9"
                      style="padding: 3px"
                    ></v-card-text>
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="6" class="mb-5" align="center" justify="center">
                <v-badge color="transparent"></v-badge>
                <v-card
                  flat
                  width="128px"
                  height="128px"
                  color="#F2F2F2"
                  style="
                    margin: 0;
                    text-align: center;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    border-radius: 20px;
                  "
                >
                  <v-avatar class="ma-0 pa-0 mt-5" size="50" tile>
                    <img
                      class="align-center"
                      width="100%"
                      src="../../assets/next-site.svg"
                    />
                  </v-avatar>
                  <v-card-text class="site-btn-none pa-0 pt-2"
                    >다음 운행 지역은 <br />
                    어디가 될까?</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    cards: [
      {
        title:
          '<span style="width: 100%; text-align: center;">대구<br>수성 알파시티</span>',
        src: require("../../assets/daegu-btn.png"),
        to: "/map/2",
        disabled: false,
        gradient: undefined,
        color: "transparent",
        hidden: true,
      },
      {
        title:
          '<span style="width: 100%; text-align: center;">세종<br>산학연클러스터4-2</span>',
        src: require("../../assets/sejong2-btn.png"),
        to: "/map/18",
        disabled: false,
        gradient: undefined,
        color: "#transparent",
        hidden: true,
      },
      {
        title:
          '<span style="width: 100%; text-align: center;">세종<br>호수공원</span>',
        src: require("../../assets/sejong1-btn.png"),
        to: "/map/3",
        disabled: true,
        gradient:
          "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
        color: "#F2F2F2",
        hidden: false,
      },
      {
        title:
          '<span style="width: 100%; text-align: center;">고군산<br>관광벨트</span>',
        src: require("../../assets/gunsan-btn.png"),
        to: "/map/1",
        disabled: true,
        gradient: 
          "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
        color: "#F2F2F2",
        hidden: false,
      },
      {
        title:
          '<span style="width: 100%; text-align: center;">상암<br>DMC홍보관</span>',
        src: require("../../assets/sangam-btn.png"),
        to: "/map/4",
        disabled: true,
        gradient:
          "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
        color: "#F2F2F2",
        hidden: false,
      },
    ],
  }),

  computed: {
    ...mapState(["uid"]),
  },

  mounted() {
    console.log("pushalarmmode: ", this.pushalarmmode);
    console.log("현재 버전 정보: ", this.currentversion);
    console.log("업데이트 버전: ", this.updateversion);

    // Notification 푸쉬 알림 pushalarmmode 파라미터
    if (this.$route.query.pushalarmmode !== undefined) {
      // 값은 alarmtenminutes, alarmsurveysend, alarmsurveyrecv 총 3개가 있다.
      this.pushalarmmode = this.$route.query.pushalarmmode;
      this.$store.commit("MU_PUSH_ALARM_MODE", this.pushalarmmode);
      console.log("pushalarmmode: ", this.pushalarmmode);
    }

    // 현재 버전 정보 파라미터를 currentversion에 저장
    if (this.$route.query.currentversion !== undefined) {
      this.currentversion = this.$route.query.currentversion;
      // vuex store에 변경된 값 변이
      this.$store.commit("MU_CURRENT_VERSION", this, this.currentversion);
      console.log("현재 버전 정보: ", this.currentversion);
    }
    // 업데이트 버전의 파라미터 값이 있을 경우 updateversion에 저장
    if (this.$route.query.updateversion !== undefined) {
      this.updateversion = this.$route.query.updateversion;
      // vuex store에 변경된 값 변이
      this.$store.commit("MU_UPDATE_VERSION", this.updateversion);
      console.log("업데이트 버전: ", this.updateversion);
    }

    // 기기의 토근 값을 token에 저장
    if (
      this.$route.query.token !== undefined &&
      this.$route.query.token !== null &&
      this.$route.query.token.length > 0 &&
      this.$route.query.token !== ""
    ) {
      this.token = this.$route.query.token;
      // 변경된 토큰 값을 저장
      this.$store.commit("MU_ACCESS_TOKEN", this.token);

      // Firebase Token Update
      this.$firebase.firestore().collection("users").doc(this.uid).update({
        token: this.token,
      });

      // Django Token Update
      //   axios({
      //     url: "/api/appusers/" + this.uid + "/",
      //     method: "patch",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     data: {
      //       firebase_tk: this.token,
      //     },
      //   });
    }
  },

  /* beforeCreate() {
        // 페이지 진입시history.pushState 인터페이스를 통해 새로운 history state를 추가하여 바로 이전 페이지로 갈 수 없도록 한다.
        history.pushState(null, null, location.href); // history.pushState(state, title, url);

        // // 이후 페이지가 뒤로가면서 생기는 history의 변경을 popstate 이벤트로 캐치하여 처리한다.
        window.onpopstate = ((event) => {
            history.go(event.currentTarget.length);
        });
    }, */
};
</script>

<style scoped>
.main-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: #262626;
}

.site-btn {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  color: #262626;
}

.site-btn-none {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px !important;
  line-height: 17px;
  text-align: center;
  color: #4f4f4f !important;
}
</style>
