import Vue from 'vue'
import router from '../../router'

const state = {
  info: {
    phoneNumber: null,
    appVerifier: {}
  },
  user: {
    loggedIn: false,
    data: {}
  },
  token: '',
  claims: null,
}

const getters = {
  info(state) {
    return state.info
  },
  user(state) {
    return state.user
  }
}

const mutations = {
  SET_DATA(state, data) {
    state.info = data;
  },
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value
  },
  SET_USER(state, data) {
    state.user.data = data
  },
  setToken(state, token) {
    state.token = token
  },
  setClaims(state, claims) {
    state.claims = claims
  },
}
const actions = {
  async sendOtp({
    state
  }, payload) {
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

  verifyOtp({
    dispatch, commit
  }, {
    otp
  }) {
    window.confirmationResult
      .confirm(otp)
      .then(async result => {
        console.log('회원 result ', result)
        alert("로그인 성공.")
        // state.user = result.user
        await commit('SET_USER', result.user)
        await dispatch('fetchUser')

        // if (!state.user) false
        // await dispatch('getToken')
      })
      .catch(error => {
        alert(error + "인증코드가 잘못되었습니다.")
        router.replace('AccessPhone')
      });
  },

  async fetchUser({commit, dispatch}, user) {
    commit("SET_LOGGED_IN", user !== null)
        if (user) {
            await commit("SET_USER", user)
            await dispatch('getToken')
        } else {
            commit("SET_USER", null);
        }
  },

  async getToken({
    commit,
    state
  }) {
    const token = await state.user.data.getIdToken(true)
    console.log('token: ', token)
    commit('setToken', token)
    const {
      claims
    } = await state.user.data.getIdTokenResult()
    commit('setClaims', claims)
    console.log('claims: ', claims)
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