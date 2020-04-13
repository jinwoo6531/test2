import Vue from 'vue';
import Vuex from 'vuex';

import vehicle from '@/store/modules/vehicle'
import login from '@/store/modules/login'

// Vue.use(Vuex)를 호출합니다.
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        vehicle,
        login
    }
});

export default store