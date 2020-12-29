<template>
  <v-container class="pa-0 gradient pl-4 pr-4" fluid fill-height>
    <v-row no-gutters>
      <v-col xs="12" sm="12" md="12">
        <v-card color="transparent" flat>
          <v-card-title class="mb-3 pl-0"
            >{{ user.data.displayName }} 님 환영합니다!</v-card-title
          >
          <v-card-subtitle class="pl-0"
            >이제 모든 준비가 끝났어요.</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col xs="12" sm="12" md="12">
        <v-card class="pa-2 welcome-msg" color="transparent" flat>
          자율주행 셔틀 타시오가
          <br />편안하게 모실게요!
          <br />
          <br /><span style="color: #e61773; font-weight: 500"
            >준비 되셨나요?</span
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col xs="12" sm="12" md="12">
        <v-card color="transparent" flat></v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col xs="12" sm="12" md="12">
        <v-card class="pa-2" color="transparent" flat></v-card>
      </v-col>
    </v-row>
    <v-footer absolute style="margin-bottom: 24px; background: transparent">
      <v-btn
        block
        depressed
        :ripple="false"
        height="50px"
        color="#E61773"
        class="start-tasio"
        @click="startTasio"
        >타시오 시작하기</v-btn
      >
    </v-footer>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: null,
  }),

  computed: {
    ...mapGetters({
      user: "user",
    }),
  },

  mounted() {
    console.log("pushalarmmode: ", this.$route.query.pushalarmmode);
    console.log("현재 버전 정보: ", this.$route.query.currentversion);
    console.log("업데이트 버전: ", this.$route.query.updateversion);
    console.log("Token: ", this.$route.query.token);
  },

  methods: {
    startTasio() {
      this.$router.replace({
        name: "Main",
        query: {
          pushalarmmode: this.$route.query.pushalarmmode,
          currentversion: this.$route.query.currentversion,
          updateversion: this.$route.query.updateversion,
          token: this.$route.query.token,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");

.welcome-msg {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
}

.start-tasio {
  font-family: Noto Sans KR;
  width: 100%;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}
</style>
