<template>
<div id="service-info">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout wrap class="ma-0 pt-5">
            <v-flex class="pa-0 pl-6 pr-6" xs12 sm12 md12 style="width: 100%;">
                <v-card flat tile color="transparent">
                    <v-card-text class="pa-0 service-title">애플리케이션 버전</v-card-text>
                    <!-- <v-card-text class="pa-0 pb-1 service-content">v 0.3.00</v-card-text> -->
                    <v-card-text class="pa-0 pb-1 service-content">v {{ currentVersion }}</v-card-text>
                    <!-- <v-card-text class="pa-0 pb-8 service-content">현재 최신 버전을 사용하고 있습니다.</v-card-text> -->
                </v-card>
            </v-flex>
            <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%;">
                <v-card flat tile color="transparent">
                    <v-card-text class="pa-0 service-title pl-6 pr-6">서비스 정보</v-card-text>
                    <v-card-text class="pa-0 pt-4 pb-3 service-content" style="border-bottom: 0.5px solid #E0E0E0;">
                        <v-sheet class="pl-6 pr-6" color="transparent">서비스 이용약관</v-sheet>
                    </v-card-text>
                    <v-card-text class="pa-0 pb-3 service-content" style="border-bottom: 0.5px solid #E0E0E0; padding-top: 10px !important;">
                      <v-sheet class="pl-6 pr-6" color="transparent">개인정보 처리방침</v-sheet>
                    </v-card-text>
                    <v-card-text class="pa-0 pt-3 service-content" style="padding-bottom: 30px !important;">
                      <v-sheet class="pl-6 pr-6" color="transparent">위치기반서비스 이용약관</v-sheet>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%;">
                <v-card flat tile color="transparent">
                    <v-card-text class="pa-0 service-title pl-6 pr-6">회사 정보</v-card-text>
                    <table style="width: 100%; border-bottom: 0.5px solid #E0E0E0;">
                        <tr class="service-table-title">
                            <td style="padding-top: 9px; padding-left: 24px;">회사명</td>
                            <td style="text-align: right; padding-right: 24px;">대표</td>
                        </tr>
                        <tr class="service-content">
                            <td style="padding-bottom: 13px; padding-left: 24px;">(주)스프링클라우드</td>
                            <td style="text-align: right; padding-bottom: 13px; padding-right: 24px;">송영기</td>
                        </tr>
                    </table>

                    <table style="width: 100%; border-bottom: 0.5px solid #E0E0E0;">
                        <tr class="service-table-title">
                            <td style="padding-top: 9px; padding-left: 24px;">사업자등록번호</td>
                            <td style="text-align: right; padding-right: 24px;">통신판매업신고</td>
                        </tr>
                        <tr class="service-content">
                            <td style="padding-bottom: 13px; padding-left: 24px;">155-88-00685</td>
                            <td style="text-align: right; padding-bottom: 13px; padding-right: 24px;">155-88-00685</td>
                        </tr>
                    </table>

                    <table style="width: 100%; border-bottom: 0.5px solid #E0E0E0;">
                        <tr class="service-table-title">
                            <td style="padding-top: 9px; padding-left: 24px;">주소</td>
                        </tr>
                        <tr class="service-content">
                            <td style="padding-bottom: 13px; padding-left: 24px;">
                                대구광역시 수성구 알파시티1로 160, 3층 307호 <br>
                                (대흥동, SW융합테크비즈센터)
                            </td>
                        </tr>
                    </table>

                    <table style="width: 100%;">
                        <tr class="service-table-title">
                            <td style="padding-top: 9px; padding-left: 24px;">전화</td>
                        </tr>
                        <tr class="service-content">
                            <td style="padding-bottom: 13px; padding-left: 24px;">031 778 8328</td>
                        </tr>
                    </table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';

export default {
    computed: {
        ...mapGetters({
            pushAlarmMode: 'GE_PUSH_ALARM_MODE',
            currentVersion: 'GE_CURRENT_VERSION',
            updateVersion: 'GE_UPDATE_VERSION'
        }),
    },

    created() {
        console.log('pushAlarmMode Cal: ', this.pushAlarmMode);
        console.log('currentVersion Cal: ', this.currentVersion);
        console.log('updateVersion Cal: ', this.updateVersion);
    },

}
</script>

<style scoped>
.service-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    color: #828282 !important;
}

.service-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #262626 !important;
}

.service-table-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px !important;
    color: #262626 !important;
}
</style>
