<template>
<!-- 우편 접수 및 수령 완료 페이지 -->
<div style="height: 100%;">
    <v-col class="text-center" style="padding-bottom: 10px; padding-top: 77px;">
        <img src="../assets/check-icon.svg" width="46" />
    </v-col>
    <v-col class="text-center" >
        <p class="page-title" style="padding-bottom: 28px;" v-if="$route.name === 'CompleteReservation1'">우편 접수가 예약 되었습니다</p>
        <p class="page-title" style="padding-bottom: 28px;" v-else>우편 수령이 예약 되었습니다</p>
        <p class="complete-content">도착 10분 전 알람을 보내드립니다. <br>
            정류장에서 만나요!</p>
    </v-col>
    <v-col class="pa-4" style="position: absolute; bottom: 0;">
        <!-- <div class="text-right" style="margin-bottom: 10px;">
            <v-btn :ripple="false" @click="goToChkReservation" width="100%" height="50" rounded depressed color="#E0E0E0" style="font-weight: 500; font-size: 16px; color: #333333; box-shadow: -5px -5px 7px #FFFFFF, 5px 5px 5px rgba(225, 220, 212, 0.9) !important;">예약 현황보기</v-btn>
        </div> -->
        <div class="text-right">
            <v-btn :ripple="false" @click="goToHome" width="100%" height="50" rounded depressed color="#EFAF29" style="font-weight: 500; font-size: 16px; box-shadow: -5px -5px 7px #FFFFFF, 5px 5px 5px rgba(225, 220, 212, 0.9) !important;" dark>확인</v-btn>
        </div>
    </v-col>
</div>
</template>

<script>
export default {
    methods: {
        goToChkReservation() {

        },

        goToHome() {

        }
    }

}
</script>

<style scoped>
.complete-content {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #262626;
}
</style>
