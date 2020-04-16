const state = {
    user: {
        loggedIn: false,
        data: {}
    }
}

const getters = {
    user(state) {
        return state.user
    }
}

const mutations = {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },

    SET_USER(state, data) {
        state.user.data = data;
    }
}

const actions = {
    fetchUser({commit}, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
            commit("SET_USER", {
                uid: user.uid,
                phoneNumber: user.phoneNumber
            })
        } else {
            commit("SET_USER", null);
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}