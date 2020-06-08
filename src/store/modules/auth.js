import Vue from 'vue'
import axios from 'axios'
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

  timer: 180
}

const getters = {
  info(state) {
    return state.info
  },
  user(state) {
    return state.user
  },
  timer(state) {
    return state.timer
  }
}

const mutations = {
  SET_DATA(state, data) {
    state.info = data
  },
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value
  },
  SET_USER(state, data) {
    state.user.data = data
  },
  SET_TIMER(state, payload){
    state.timer = payload
  }
}
const actions = {
  async sendOtp({state, commit}, payload) {
    await Vue.prototype.$firebase
      .auth()
      .signInWithPhoneNumber(payload.phoneNumber, state.info.appVerifier)
      .then(confirmationResult => {
        // SMS 전송
        window.confirmationResult = confirmationResult
        alert("메세지를 전송하였습니다!")
        commit('SET_TIMER', new Date())
      })
      .catch(error => {
        // SMS 전송 실패
        console.error(error.message)
      })
  },

  verifyOtp(_, {otp}) {
    window.confirmationResult
      .confirm(otp)
      .then(result => {
        axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + result.user.uid)
        .then(response => {
          console.log('rere', response.data)
          alert('인증이 완료되었습니다.')
          if (response.data.level == 1) {
            router.push('/')
          } else {
            router.push('/auth/agreecheck')
          }
        }).catch(error => {
          console.log('User read: ', error)
        })
      })
      .catch(error => {
        alert("인증코드가 잘못되었습니다.")
        console.log(error)
      })
  },

  fetchUser({commit}, user) {
    commit("SET_LOGGED_IN", user !== null)
        if (user) {
            commit("SET_USER", {
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              displayName: user.displayName
            })
        } else {
            commit("SET_USER", null);
        }
  },

  initReCaptcha({commit}) {
    setTimeout(() => {
      window.recaptchaVerifier = new Vue.prototype.$firebase.auth.RecaptchaVerifier("recaptcha-container", {
          size: "invisible",
          callback: function (response) {
            console.log(response)
            // dispatch('sendOtp')
          },
          "expired-callback": function () {
            console.log('Recaptcha Error')
          }
        }
      );
      commit("SET_DATA", {
        appVerifier: window.recaptchaVerifier
      })
    }, 1000)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}