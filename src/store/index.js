import Vue from 'vue';
import Vuex from 'vuex';

import vehicle from '@/store/modules/vehicle'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        vehicle,
        auth
    }
});

export default store