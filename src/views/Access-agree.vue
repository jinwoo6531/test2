<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" style="background-color: #FFF;" fluid grid-list-md fill-height>
    <v-layout wrap class="pa-6 ma-0">
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-center text-center">
            <v-card xs12 sm12 md12 color="transparent" width="100%" flat tile>
                <img src="../assets/access-logo.svg">
                <v-card-text class="pt-7 pb-8 access-title">
                    타시오 서비스 이용시 필요한 접근 권한 안내
                </v-card-text>
                <v-divider color="#828282"></v-divider>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="justify-start align-top text-left">
            <v-card class="text-left pb-4" color="transparent" flat tile>
                <v-card-text class="pa-0 pb-2 auth-access-title">필수적 접근 권한</v-card-text>
                <v-card flat tile color="#F0F0F0" class="auth-access-content pa-1 pl-4">없음</v-card>
            </v-card>
            <v-card class="text-left" color="transparent" flat tile>
                <v-card-text class="pa-0 pb-2 auth-access-title">선택적 접근 권한</v-card-text>
                <v-card flat tile color="#F0F0F0" class="mb-3">
                    <v-list color="#F0F0F0">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img src="../assets/location-access-icon.svg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="auth-access-content pb-1 ma-0">위치정보</v-list-item-title>
                                <v-list-item-subtitle class="auth-access-subcontent">스프링카 호출 시 탑승자 위치 확인</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-img src="../assets/storage-access-icon.svg"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="auth-access-content pb-1 ma-0">저장공간</v-list-item-title>
                                <v-list-item-subtitle class="auth-access-subcontent">호출한 서비스 상태 저장</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-card-text class="pa-0">
                    <v-card-text class="pa-0 auth-access-message">해당 기능 이용 시 동의를 받고 있으며,</v-card-text>
                    <v-card-text class="pa-0 auth-access-message" style="padding-top: 2px !important;">허용하지 않아도 해당 기능 외 서비스 이용이 가능합니다.</v-card-text>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pb-0">
            <v-btn block depressed tile color="#E61773" height="50px" class="next-btn" @click="agreeOk">확인</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    methods: {
        agreeOk() {
            this.$router.replace('/walkthrough')
        }
    }
}
</script>

<style scoped>
.access-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #4F4F4F !important;
}

.auth-access-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    color: #262626 !important;
}

.auth-access-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #262626 !important;
}

.auth-access-subcontent {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #686868 !important;
}

.auth-access-message {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    line-height: 140%;
    letter-spacing: -0.035em;
    color: #A7A7A7 !important;
}

.next-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    border-radius: 2px;
}
</style>
