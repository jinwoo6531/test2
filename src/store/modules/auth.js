import Vue from 'vue'
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
  async sendOtp({ state }, payload) {
    await Vue.prototype.$firebase
      .auth()
      .signInWithPhoneNumber(payload.phoneNumber, state.info.appVerifier)
      .then(confirmationResult => {
        // SMS 전송
        window.confirmationResult = confirmationResult
        alert("메세지를 전송하였습니다!");

      })
      .catch(error => {
        // SMS 전송 실패
        console.error(error.message)
      });
  },

  verifyOtp(_, {
    otp
  }) {
    window.confirmationResult
      .confirm(otp)
      .then(result => {
        console.log('회원 level: ', result)
        alert("로그인 성공.")
        Vue.prototype.$firebase.firestore().collection('users').get().then(function (querySnapshot) { // Promise 이용해서 해결하기
          querySnapshot.forEach(function (doc) {
            // 만약 있는 회원이라면
            if (doc.id == result.user.uid) {
              console.log('1. Dashboard로 이동하자')
              router.replace('/dashboard').catch(e => {console.log('Go to Dashboard Error', e)})
            } else { // 없는 회원이라면
              console.log('2. Register로 이동하자')
              router.replace('/register').catch(e => {console.log('Go to Register Error', e)})
            }
          })
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
      window.recaptchaVerifier = new Vue.prototype.$firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
          size: "invisible",
          callback: function (response) {
            console.log(response)
          },
          "expired-callback": function () {
            alert('응답이 만료되었습니다.')
          }
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