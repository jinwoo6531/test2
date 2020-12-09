<template>
  <!-- 개인정보 입력 페이지 -->
  <v-container
    class="pt-0 pb-6 pl-6 pr-6 ma-0 flex-wrap"
    fluid
    grid-list-md
    fill-height
  >
    <v-layout wrap style="height: 100%">
      <v-flex xs12 class="pa-0 d-flex flex-column">
        <div class="back-to-auth-code pb-6 pt-10" @click="goToBack">
          <img src="../../assets/back-icon.svg" />
        </div>

        <h3 class="RegisterTitle">이제 마지막 단계예요.</h3>
        <p class="RegisterSubTitle">제가 모시게 될 고객님은 어떤 분인가요?</p>
        <form @submit.prevent="submit" style="height: 100%">
          <v-flex xs12 style="height: 20%">
            <p>이름</p>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="50"
              v-model="form.name"
              @input="hangul"
              autofocus
              placeholder="이름을 입력하세요."
            />
          </v-flex>
          <v-flex xs12 style="height: 20%">
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
          <v-flex xs12 style="height: 20%">
            <p style="margin-top: 22px">성별</p>
            <v-radio-group v-model="form.gender" row>
              <v-radio
                label="남성"
                :ripple="false"
                color="#2E3990"
                value="남자"
              ></v-radio>
              <v-radio
                label="여성"
                :ripple="false"
                color="#2E3990"
                value="여자"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 style="height: 20%">
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
          <v-flex xs12 class="d-flex align-end pb-0" style="height: 20%">
            <v-flex xs12 class="pa-0 justify-space-between">
              <p class="error-message" style="margin-top: 15px">{{ error }}</p>
              <v-card
                class="pa-0"
                color="transparent"
                style="width: 100%"
                flat
                tile
              >
                <button class="signupBtn" type="submit">가입 완료하기</button>
              </v-card>
            </v-flex>
          </v-flex>
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
  },

  methods: {
    goToBack() {
      this.$router.replace("/auth/agreecheck");
    },

    // 이름의 한글 및 영문 확인 - 다른 숫자나 기호 입력은 불가능
    hangul(e) {
      let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
      var pattern_num = /[0-9]/;
      // eslint-disable-next-line no-useless-escape
      var pattern_char = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
      let one_char = "";
      // const maxLength = 50;
      let charLength = 0;

      for (let i = 0; i < e.target.value.length; i++) {
        one_char = e.target.value.charAt(i);

        if (escape(one_char).length > 4) {
          charLength += 2; // 한글은 길이 2씩 증가 (25자 내외)
        } else {
          charLength += 1; // 영문은 길이가 1씩 증가 (50자 내외)
        }
      }

      if (
        pattern_num.test(this.form.name) ||
        pattern_spc.test(this.form.name) ||
        pattern_char.test(this.form.name)
      ) {
        this.form.name = "";
        this.error = "이름은 한글 또는 영문만 가능합니다.";
      } else {
        if (charLength > 50) {
          this.form.name = this.form.name.substring(0, 50);
        } else {
          this.error = "";
        }
      }
    },

    // 정보 입력 완료 후 제출
    submit(uid) {
      // 이름을 입력하지 않은 경우 (필수)
      if (!this.form.name) {
        this.error = "이름을 입력해주세요.";
        return;
      }
      //   이메일을 입력하지 않은 경우 (필수)
      if (!this.form.email) {
        this.error = "이메일을 입력해주세요.";
        return;
      }
      //   이메일 형식 체크 (validation)
      var check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!check.test(this.form.email)) {
        this.error = "이메일 형식을 지켜주세요.";
        return;
      }

      // 성별을 입력하지 않은 경우
      if (!this.form.gender) {
        this.error = "성별을 선택해주세요.";
        return;
      }

      //   생년월일을 입력하지 않은 경우
      if (!this.form.birth) {
        this.error = "생년월일을 입력해주세요.";
        return;
      }

      // 생년월일 길이 체크
      if (this.form.birth.length > 6 || this.form.birth.length != 6) {
        this.error = "생년월일은 6자리 숫자로 입력해주세요.";
        return;
      }

      // firestore에 개인 정보 저장
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

      this.$router.replace("/welcome");
      this.get();
    },

    async get() {
      await axios.get(
        "https://ondemand.tasio.io:400/shuttle-9d5cb/us-central1/app/api/read/" +
          this.user.data.uid
      );
    },
  },
};
</script>

<style scoped>
.RegisterTitle {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #262626;
}

.RegisterSubTitle {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-top: 12px;
  color: #828282;
}

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
  background: #2e3990;
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
