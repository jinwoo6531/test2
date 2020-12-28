<template>
  <v-container style="height: 100%">
    <v-layout wrap style="height: 100%">
      <v-flex class="pa-5" xs12 sm12 md12>
        <h3 class="auth-title">이제 마지막 단계예요.</h3>
        <p class="auth-content" style="margin-top: 12px">
          제가 모시게 될 고객님은 어떤 분인가요?
        </p>
        <form @submit.prevent="submit">
          <v-flex xs12 sm12 md12>
            <p>이름</p>
            <input
              type="text"
              id="name"
              name="name"
              v-model="form.name"
              @input="hangul"
              maxlength="25"
              autofocus
              placeholder="이름을 입력하세요."
            />
          </v-flex>
          <v-flex xs12 sm12 md12>
            <p style="margin-top: 22px">이메일</p>
            <input
              type="email"
              id="email"
              name="email"
              autofocus
              v-model="form.email"
              placeholder="이메일 주소를 입력하세요."
            />
          </v-flex>
          <v-flex xs12 sm12 md12>
            <p style="margin-top: 22px">성별</p>
            <v-radio-group v-model="form.gender" row>
              <v-radio
                label="남성"
                :ripple="false"
                color="#E61773"
                value="남자"
              ></v-radio>
              <v-radio
                label="여성"
                :ripple="false"
                color="#E61773"
                value="여자"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <p style="margin-top: 22px">생년월일</p>
            <input
              type="number"
              id="birth"
              name="birth"
              autofocus
              placeholder="YYMMDD (예: 940701)"
              v-model="form.birth"
            />
          </v-flex>
          <p class="error-message" style="margin-top: 15px">{{ error }}</p>
          <v-footer
            absolute
            style="margin-bottom: 24px; background: transparent"
          >
            <button class="signupBtn" type="submit">가입 완료하기</button>
          </v-footer>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    uid: "",
    phoneNumber: "",
    form: {
      name: "",
      email: "",
      gender: "",
      birth: "",
    },
    error: "",
    items: [],
  }),

  created() {
    this.get();
  },

  computed: {
    ...mapGetters({
      user: "user",
    }),

    ...mapGetters({
      pushalarmmode: "GE_PUSH_ALARM_MODE",
      currentversion: "GE_CURRENT_VERSION",
      updateversion: "GE_UPDATE_VERSION",
      token: "GE_ACCESS_TOKEN",
    }),
  },

  methods: {
    hangul() {
      let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
      var pattern_num = /[0-9]/;
      // eslint-disable-next-line no-useless-escape
      var pattern_char = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

      if (
        pattern_num.test(this.form.name) ||
        pattern_spc.test(this.form.name) ||
        pattern_char.test(this.form.name)
      ) {
        this.error = "이름은 한글 또는 영문만 가능합니다.";
        this.form.name = "";
      } else {
        this.error = "";
      }
    },

    submit(uid) {
      if (!this.form.name) {
        this.error = "이름은 필수 항목입니다.";
        return;
      }
      if (!this.form.email) {
        this.error = "이메일은 필수 항목입니다.";
        return;
      }
      var check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!check.test(this.form.email)) {
        this.error = "이메일 형식을 지켜주세요.";
        return;
      }

      if (!this.form.gender) {
        this.error = "성별은 필수 선택항목입니다.";
        return;
      }
      if (!this.form.birth) {
        this.error = "생일은 필수 선택항목입니다.";
        return;
      }

      if (this.form.birth.length > 6 || this.form.birth.length != 6) {
        this.error = "생일은 6자로 입력해주세요.";
        return;
      }

      uid = this.user.data.uid;
      this.$firebase.firestore().collection("users").doc(uid).set({
        uid: this.user.data.uid,
        phoneNumber: this.user.data.phoneNumber,
        displayName: this.form.name,
        email: this.form.email,
        gender: this.form.gender,
        level: 1,
        birth: this.form.birth,
      });

      this.user.data.displayName = this.form.name;

      this.form.name = "";
      this.form.email = "";
      this.form.gender = "";
      this.form.birth = "";

      // 환영합니다 페이지로 이동
      // Android에서 넘겨준 파라미터 값을 함께 전달해준다.
      this.$router.replace({
        name: "Welcome",
        query: {
          pushalarmmode: this.pushalarmmode,
          currentversion: this.currentversion,
          updateversion: this.updateversion,
          token: this.token,
        },
      });

      this.get();
    },

    async get() {
      await axios.get(
        "https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/" +
          this.user.data.uid
      );
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 40px;
  background: #fff;
  color: #262626;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  border-bottom: 0.5px solid #828282;
  padding: 14px 0 11px 10px;
}

input::placeholder {
  color: #e0e0e0;
}

.signupBtn {
  width: 100%;
  height: 50px;
  background: #e61773;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

.error-message {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  display: flex;
  align-items: flex-end;
  color: #eb5757;
}
</style>
