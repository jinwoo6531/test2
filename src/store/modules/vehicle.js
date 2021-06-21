// State(상태): 여기에 상태를 저장한다.
const state = {
    vehicleList: [],
    vLat: 0,
    vLng: 0
}

// Getters: 상태의 값을 확인한다. 연산 작업이 있으면 이를 캐싱하여 효율적이다.
const getters = {
    vLat(state) {
        return state.vLat
    },
    vLng(state) {
        return state.vLng
    }

}

// Mutations(변이): State를 동기적으로 변화시킨다. commit을 통해 접근한다.
const mutations = {

}

// Actions(액션): 변이들을 비동기적으로 변화시킨다.
// HTTP get 요청이나 setTimeout과 같은 비동기 처리 로직들은 여기에 선언해준다.
// Dispatch를 통해 접근한다.
const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}