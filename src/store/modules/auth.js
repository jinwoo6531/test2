import * as firebase from "firebase/app"
import "firebase/auth"
import router from '../../router'

const state = {
  info: {
    phoneNumber: null,
    appVerifier: {}
  }
}
const getters = {
  info(state) {
    return state.info
  }
}
const mutations = {
  SET_DATA(state, data) {
    state.info = data;
  }
}
const actions = {
  async sendOtp({
    state
  }, payload) {
    await firebase
      .auth()
      .signInWithPhoneNumber(payload.phoneNumber, state.info.appVerifier)
      .then(confirmationResult => {
        // SMS 전송
        window.confirmationResult = confirmationResult;
        alert("메세지를 전송하였습니다!");

      })
      .catch(error => {
        // SMS 전송 실패
        alert(error + "메세지 전송에 실패하였습니다!");
      });
  },

  verifyOtp(_, { otp }) {
    window.confirmationResult
      .confirm(otp)
      .then(result => {
        console.log('로그인 정보: ', result)
        alert("로그인 성공.")

        router.push({
          name: "Register",
          params: {
            uid: result.user.uid
          }
        })
        
      })
      .catch(error => {
        alert(error + "인증코드가 잘못되었습니다.")
        router.replace('AccessPhone')
      });
  },

  initReCaptcha({
    commit
  }) {
    setTimeout(() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
          size: "invisible",
          callback: function (response) {
            console.log(response)
          },
          "expired-callback": function () {}
        }
      );
      commit("SET_DATA", {
        appVerifier: window.recaptchaVerifier
      });
    }, 1000);
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}