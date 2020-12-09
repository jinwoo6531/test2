<template>
  <!-- 인증 코드 입력 페이지 -->
  <v-app style="position: relative">
    <!-- 인증 상태일 때 나타는 로딩 딤 -->
    <v-container
      fluid
      v-if="isLoading == true"
      style="
        display: flex;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
        pointer-events: none !important;
        z-index: 20;
      "
    >
      <v-row align="center" justify="center">
        <v-card color="transparent" flat>
          <v-card-text class="text-center">
            <v-progress-circular
              indeterminate
              size="50"
              color="#2E3990"
            ></v-progress-circular>
          </v-card-text>
          <v-card-text class="text-center" style="color: #fff">
            인증 상태를 기다리는 중입니다.
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <v-container
      class="pt-0 pb-6 pl-5 pr-5 ma-0 flex-wrap text-center"
      fluid
      grid-list-md
      fill-height
    >
      <v-layout row wrap>
        <v-flex
          xs12
          sm12
          md12
          class="d-flex flex-column justify-start align-center text-left"
        >
          <div class="back-to-auth-code pb-6 pt-10" @click="goToBack">
            <img src="../../assets/back-icon.svg" />
          </div>
          <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
            <v-card-title class="pa-0 pb-2 auth-code-title"
              >인증번호를 입력해주세요.</v-card-title
            >
            <v-card-text class="pa-0 auth-code-content"
              >인증번호가 수신되지 않는 경우 스팸메시지 차단 기능을 확인하시기
              바랍니다.</v-card-text
            >
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm12
          md12
          class="d-flex flex-column justify-start align-center text-left"
        >
          <v-card class="auth-code-wrap pa-0" color="transparent" flat tile>
            <v-card
              class="pa-0 d-flex flex-column justify-center align-center"
              width="100%"
              color="transparent"
              flat
              tile
            >
              <v-card class="pa-0" color="transparent" width="100%" flat tile>
                <v-otp-input
                  ref="otpInput"
                  id="otpInput"
                  input-classes="otp-input"
                  separator=" "
                  :num-inputs="6"
                  :is-input-num="false"
                  v-if="isLoading == true"
                />
                <v-otp-input
                  ref="otpInput"
                  id="otpInput"
                  input-classes="otp-input"
                  separator=" "
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
                  v-else
                />
              </v-card>
            </v-card>
            <v-flex
              class="pa-0 pt-4 d-flex justify-space-between"
              xs12
              sm12
              md12
            >
              <p v-if="timeout == false" class="SendInfo">
                {{ this.doneTime }}
              </p>
              <p v-else class="SendAgain">{{ this.doneTime }}</p>
              <p class="RemainTime">{{ remainTime }}</p>
            </v-flex>
            <v-flex class="pa-0" xs12 sm12 md12>
              <p
                class="AgainBtn"
                text
                @click="sendOtp"
                v-if="isLoading == false"
              >
                인증번호 다시 받기
              </p>
              <p class="AgainBtn" text v-else>인증번호 다시 받기</p>
            </v-flex>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex align-end pb-0">
          <v-flex xs12 sm12 md12 class="pa-0 justify-space-between">
            <v-card class="text-left pa-0" color="transparent" flat tile>
              <v-btn
                depressed
                tile
                color="#2E3990"
                width="100%"
                height="50px"
                class="auth-next"
                disabled
                v-if="!ready || isLoading == true || tryAgain == true"
                >다음</v-btn
              >
              <v-btn
                depressed
                tile
                color="#2E3990"
                width="100%"
                height="50px"
                class="auth-next"
                disabled
                v-else-if="minutes <= 0 && seconds <= 0"
                >다음</v-btn
              >
              <v-btn
                depressed
                tile
                color="#2E3990"
                width="100%"
                height="50px"
                class="auth-next"
                @click.native="verifyOtp"
                v-else
                >다음</v-btn
              >
            </v-card>
          </v-flex>
        </v-flex>
        <div style="display: none" id="recaptcha-container"></div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    otp: null,
    phoneN: "",
    remainTime: 0,
    ready: 0,
    tryAgain: false,
    timeout: false,
    doneTime: "",
  }),

  computed: {
    ...mapGetters(["isLoading"]),
  },

  created() {
    //   init reCaptcha
    this.$store.dispatch("initReCaptcha");
    // 유효 시간
    this.timeStart();
  },

  mounted() {
    //   +8212345678 형태로 받은 전화번호 '-'가 붙은 형태로 변경해서 phoneN에 저장
    let start = this.$route.params.phoneNumber.substring(3, 6);
    let mid = this.$route.params.phoneNumber.substring(6, 10);
    let end = this.$route.params.phoneNumber.substring(10, 14);
    this.phoneN = start + "-" + mid + "-" + end;

    this.doneTime = this.phoneN + "로 SMS를 보냈습니다.";

    this.timeOut();
  },

  watch: {
    //   '-'가 유효시간에 포함된 경우 이전페이지로 이동 (에러처리)
    remainTime(val) {
      if (val.indexOf("-") == -1) {
        console.log("Check - no", val);
      } else {
        // console.log('Check - yes', val);
        this.$router.go(-1);
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.polling);
    this.remainTime;
  },

  methods: {
    goToBack() {
      this.$router.go(-1);
    },

    // 입력이 완료된 경우
    handleOnComplete(value) {
      this.ready = value;
      this.tryAgain = false;
    },

    // 값이 변경될 때마다
    handleOnChange() {
      this.ready = 0;
      this.tryAgain = false;
    },

    // 유효시간 타이머
    timeStart() {
      this.polling = setInterval(() => {
        this.timeOut();
      }, 1000);
    },

    timeOut() {
      var a = new Date() - this.$store.getters.timer;
      let second = 180 - parseInt(a / 1000);
      this.minutes = parseInt(second / 60);
      this.seconds = second % 60;

      // 숫자가 한자리 수인 경우 '0'이 붙는다.
      if (this.minutes < 10) this.minutes = "0" + this.minutes;
      if (this.seconds < 10) this.seconds = "0" + this.seconds;

      this.remainTime = this.minutes + ":" + this.seconds;
      if (this.minutes <= 0 && this.seconds <= 0) {
        this.timeStop();
        this.timeout = true;
        this.doneTime = "인증번호 유효시간이 만료 됐습니다.";
        this.ready = "";
      }
    },

    // 유효시간이 만료된 경우 타이머 종료
    timeStop() {
      clearInterval(this.polling);
    },

    // 인증코드 확인
    verifyOtp() {
      this.$store.dispatch("verifyOtp", {
        otp: this.ready,
      });
    },

    // 인증코드 재전송
    async sendOtp() {
      await this.$store.dispatch("sendOtp", {
        phoneNumber: this.$route.params.phoneNumber,
      });

      // otp에 입력된 값을 모두 지워준다.
      this.$refs.otpInput.otp = [];
      this.tryAgain = true;
      this.doneTime = "인증번호를 재발송하였습니다.";
      clearInterval(this.polling);
      this.timeOut();
      this.timeStart();
    },
  },
};
</script>

<style lang="less">
.otp-input {
  width: 47px;
  height: 47px;
  padding: 5px;
  justify-content: space-around;
  margin-right: 8px;
  font-size: 20px !important;
  border-radius: 2px;
  background: #ffffff;
  border: 0.5px solid #c4c4c4;
  text-align: center;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  color: #262626;

  &.error {
    border: 1px solid red !important;
  }
}

.otp-input:last-child {
  margin: 0;
}
</style><style scoped>
#otpInput {
  justify-content: space-between;
}

.back-to-auth-code {
  width: 100%;
  text-align: left;
}

.auth-code-wrap {
  width: 100%;
}

.auth-code-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #262626;
}

.auth-code-content {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #828282;
}

.AccessCode {
  width: 47px;
  height: 47px;
  background: red;
  border: 0.5px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 2px;
  text-align: center;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  color: #262626;
}

.SendInfo {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #bdbdbd;
}

.SendAgain {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #eb5757;
}

.RemainTime {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #2e3990;
}

.AgainBtn {
  width: 100%;
  text-align: right;
  text-decoration-line: underline;
  color: #e61773;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
}

.auth-next {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  border-radius: 2px !important;
  color: #ffffff !important;
}
</style>
