import Vue from 'vue';
import Vuex from 'vuex';

import vehicle from '@/store/modules/vehicle'
// import login from '@/store/modules/login'
import auth from '@/store/modules/auth'

// Vue.use(Vuex)를 호출합니다.
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        vehicle,
        // login,
        auth
    }
});

export default store