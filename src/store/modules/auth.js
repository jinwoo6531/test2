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

  timer: 180,
  uid: '',
  pushAlarmMode: null,
  currentVersion: null,
  updateVersion: null,
  token: null,
  isLoading: false
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
  },
  GE_PUSH_ALARM_MODE(state) {
    return state.pushAlarmMode;
  },
  GE_CURRENT_VERSION(state) {
    return state.currentVersion;
  },
  GE_UPDATE_VERSION(state) {
    return state.updateVersion;
  },
  GE_ACCESS_TOKEN(state) {
    return state.token;
  },
  isLoading(state) {
    return state.isLoading
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
  SET_TIMER(state, payload) {
    state.timer = payload
  },
  MU_PUSH_ALARM_MODE(state, payload) {
    state.pushAlarmMode = payload;
    localStorage.pushAlarmMode = payload;
    console.log('MU_PUSH_ALARM_MODE: ', payload);
  },
  MU_CURRENT_VERSION(state, payload) {
    state.currentVersion = payload;
    localStorage.currentVersion = payload;
    console.log('MU_CURRENT_VERSION: ', payload);
  },
  MU_UPDATE_VERSION(state, payload) {
    state.updateVersion = payload;
    localStorage.updateVersion = payload;
    console.log('MU_UPDATE_VERSION: ', payload);
  },
  MU_ACCESS_TOKEN(state, payload) {
    state.token = payload;
    localStorage.token = payload;
    console.log('MU_ACCESS_TOKEN: ', payload);
  },
  MU_DELETE_TOKEN(state) {
    state.token = null;
  },
  loading(state, isLoading) {
    if (isLoading) {
      return state.isLoading = true
    } else {
      return state.isLoading = false
    }
  }
}
const actions = {
  async sendOtp({
    state,
    commit
  }, payload) {
    commit('loading', true)
    await Vue.prototype.$firebase.auth().signInWithPhoneNumber(payload.phoneNumber, state.info.appVerifier)
      .then(confirmationResult => {
        // SMS 전송
        window.confirmationResult = confirmationResult
        Vue.toasted.show("메세지를 전송하였습니다.", {
          theme: "bubble",
          position: "top-center"
        }).goAway(2000);

        commit('SET_TIMER', new Date())
        commit('loading', false)
      })
      .catch(error => {
        // SMS 전송 실패
        console.error(error.message)
        Vue.toasted.show("메세지 전송에 실패하였습니다.", {
          theme: "bubble",
          position: "top-center"
        }).goAway(2000);

        commit('loading', false)
      })
  },

  verifyOtp({ commit }, { otp }) {
    commit('loading', true)
    window.confirmationResult.confirm(otp)
      .then(result => {
        axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + result.user.uid)
          .then(response => {
            Vue.toasted.show("인증이 완료되었습니다.", {
              theme: "bubble",
              position: "top-center"
            }).goAway(2000);
            // alert('인증이 완료되었습니다.')
            if (response.data.level == 1) {
              router.replace({
                name: "Main",
                query: {
                  pushalarmmode: state.pushAlarmMode,
                  currentversion: state.currentVersion,
                  updateversion: state.updateVersion,
                  token: state.token
                }
              });
            } else {
              router.replace('/auth/agreecheck')
            }
          }).catch(error => {
            console.log('User read: ', error)
          })
      })
      .catch(error => {
        Vue.toasted.show("인증코드가 잘못되었습니다.", {
          theme: "bubble",
          position: "top-center"
        }).goAway(2000);
        
        console.log(error)
        commit('loading', false)
      })
  },

  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null)
    if (user) {
      this.state.uid = user.uid;
      axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + user.uid)
        .then(async response => {
          await commit("SET_USER", {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            displayName: response.data.displayName,
            email: response.data.email,
            level: response.data.level,
            birth: response.data.birth,
            gender: response.data.gender
          })
        })
    } else {
      commit("SET_USER", null);
    }
  },

  // fetchUser({
  //   commit
  // }, user) {
  //   commit("SET_LOGGED_IN", user !== null)
  //   if (user) {
  //     commit("SET_USER", {
  //       uid: user.uid,
  //       phoneNumber: user.phoneNumber,
  //       displayName: user.displayName
  //     })
  //   } else {
  //     commit("SET_USER", null);
  //   }
  // },

  initReCaptcha({
    commit
  }) {
    setTimeout(() => {
      window.recaptchaVerifier = new Vue.prototype.$firebase.auth.RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: function (response) {
          console.log(response)
          // this.dispatch('sendOtp')
        },
        "expired-callback": function () {
          console.log('Recaptcha Error')
        }
      });
      commit("SET_DATA", {
        appVerifier: window.recaptchaVerifier
      })
    }, 1000)
  }

  // AC_PUSH_ALARM_MODE({ commit }, payload) {
  //   commit('MU_PUSH_ALARM_MODE', payload)
  // },
  
  // AC_CURRENT_VERSION({ commit }, payload) {
  //   commit('MU_CURRENT_VERSION', payload)
  // },
  
  // AC_UPDATE_VERSION({ commit }, payload) {
  //   commit('MU_UPDATE_VERSION', payload)
  // },
  
  // AC_ACCESS_TOKEN({ commit }, payload) {
  //   commit('MU_ACCESS_TOKEN', payload)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}