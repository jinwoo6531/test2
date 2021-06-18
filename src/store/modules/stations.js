import axios from 'axios'

// State(상태): 여기에 상태를 저장한다.
const state = {
    station_arr: []
}

// Getters: 상태의 값을 확인한다. 연산 작업이 있으면 이를 캐싱하여 효율적이다.
const getters = {

}

// Mutations(변이): State를 동기적으로 변화시킨다. commit을 통해 접근한다.
const mutations = {

}

// Actions(액션): 변이들을 비동기적으로 변화시킨다.
// HTTP get 요청이나 setTimeout과 같은 비동기 처리 로직들은 여기에 선언해준다.
// Dispatch를 통해 접근한다.
const actions = {
    getStation: function () {
        return axios.get('/api/stations/')
            .then(response => {
                let station_length = (response.data).length
                for (let i = 0; i < station_length; i++) {
                    if (response.data[i].site === this.pageId) {
                        this.station_arr.push(response.data[i])
                    }
                }
                console.log(this.station_arr)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}