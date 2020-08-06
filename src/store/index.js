import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
// import axios from 'axios'
// import router from '../router'

/* axios.interceptors.response.use(
    function (response) { // Http Success
        console.log('200 Status')
        return response
    },

    function (error) { // Http Error
        console.log('Http Error')
        router.replace({ name: 'NotFoundComponent' })
        return Promise.reject(error)
    }
) */

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth
    }
});

export default store