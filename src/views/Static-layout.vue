<template>
    <v-app class="static">
        <v-navigation-drawer temporary class="pa-5" style="width: 275px !important; z-index: 999;" v-model="drawer" app>
            <v-list dense>
                <v-list-item class="pl-0">
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            <img src="../assets/side-logo.svg">
                        </v-list-item-title>
                        <v-list-item-subtitle style="font-style: normal; font-weight: bold; font-size: 12px; color: #E61773; margin-top: 10px;">
                            스프링클라우드 자율주행 셔틀
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
    
                <template v-if="user.data">
                    <v-list-item class="pa-0">
                        <v-list-item-content>
                            <v-row class="ma-0" style="height: 30px;">
                                <v-col class="pa-0" cols="10">
                                    <v-row class="ma-0">
                                        <v-col class="pa-0" cols="12" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                                            {{ user.data.displayName }}님
                                        </v-col>
                                    </v-row>
                                    <v-row class="ma-0">
                                        <v-col class="pa-0 pt-1" cols="12" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 12px; color: #828282;">
                                            {{ getPhoneNumber }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col class="pa-0 persentH" cols="2" style="line-height: 34px; text-align: center;">
                                    <router-link to="/userinfo">
                                        <img src="../assets/setting.svg" />
                                    </router-link>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <template v-else>
                    <v-list-item link to="/auth/accessphone" class="pa-0">
                        <v-list-item-content>
                            <v-list-item-title>
                                로그인
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

            <v-divider class="mt-3 mb-4"></v-divider>

            <v-list-item link to="/introduction" class="pa-0">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        타시오 소개
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="boldMenu pa-0 mt-4">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        <v-list-item link to="/" class="pa-0">
                            <v-list-item-content class="pa-0">
                                <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                                    전체 지역보기
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-title>

                    <v-list-item link :to="{ name: 'Site', params: { siteId: 2 }}" class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                <!-- <v-badge color="#E61773" content="준비중" offset-x="-2" offset-y="10px" style="z-index: 15;"> -->
                                    대구 수성알파시티
                                <!-- </v-badge> -->
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item link :to="{ name: 'Site', params: { siteId: 18 }}" class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                    세종 산학연클러스터 4-2
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #BDBDBD;">
                                <v-badge color="#E61773" content="준비중" offset-x="-2" offset-y="10px" style="z-index: 15;">
                                    세종 호수공원
                                </v-badge>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #BDBDBD;">
                                <v-badge color="#E61773" content="준비중" offset-x="-2" offset-y="10px" style="z-index: 15;">
                                    고군산 관광벨트
                                </v-badge>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    
                    <v-list-item class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #BDBDBD;">
                                <v-badge color="#E61773" content="준비중" offset-x="-2" offset-y="10px" style="z-index: 15;">
                                    상암DMC홍보관
                                </v-badge>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="boldMenu pa-0 mt-4" link to="/schedule">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        운행 시간표
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- <v-list-item class="boldMenu pa-0 mt-2" link to="/faq">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        자주 묻는 질문
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->

            <v-list-item class="boldMenu pa-0 mt-2" link to="/serviceinfo">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        서비스 정보
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-footer class="copyrightStyle nav-footer justify-left pa-0">
            <span>COPYRIGHT@SPRINGCLOUD INC. <br>
                ALL RIGHTS RESERVED.</span>
        </v-footer>
    </v-navigation-drawer>

    <v-content>
        <v-card style="width: 100%; position: fixed; z-index: 9; background: #FAFAFA;" :height="getHeight" class="pa-0" tile flat>
            <v-row style="height: 100%;" no-gutters justify="start" xs12 sm12 md12>
                <v-col style="height: 100%;" cols="4">
                    <div style="height: 100%;">
                        <img src="../assets/static-nav-icon.svg" style="height: 100%;  text-align: center; padding: 8px;" @click.stop="drawer = !drawer" />
                    </div>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <div style="height: 100%; text-align: center; line-height: 57px;">
                        <span flat v-if="this.$route.name == 'Main'" class="pa-0 static-title"><img src="../assets/main-logo.svg" class="persentH" style="padding-top: 10px;" /></span>
                        <span flat v-if="this.$route.name == 'Introduction'" class="pa-0 static-title">타시오 소개</span>
                        <span flat v-if="this.$route.name == 'Schedule'" class="pa-0 static-title">운행 시간표</span>
                        <span flat v-if="this.$route.name == 'FAQ'" class="pa-0 static-title">자주 묻는 질문</span>
                        <span flat v-if="this.$route.name == 'Userinfo'" class="pa-0 static-title">내정보</span>
                        <span flat v-if="this.$route.name == 'Serviceinfo'" class="pa-0 static-title">서비스 정보</span>
                    </div>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <div style="height: 100%; text-align: center;">

                    </div>
                </v-col>
            </v-row>

            <v-divider v-if="this.$route.name == 'Introduction'"></v-divider>
            <v-divider v-if="this.$route.name == 'Schedule'"></v-divider>
            <v-divider v-if="this.$route.name == 'FAQ'"></v-divider>
            <v-divider v-if="this.$route.name == 'Userinfo'"></v-divider>
            <v-divider v-if="this.$route.name == 'Serviceinfo'"></v-divider>
        </v-card>

        <router-view style="margin-top: 57px;" :key="$route.fullPath"></router-view>
    </v-content>
</v-app>
</template>

<script>
import {
    mapGetters
} from "vuex"

export default {
    data: () => ({
        drawer: null,
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),

        getHeight() {
            return this.$vuetify.breakpoint.xs ? 57 : '70'
        },

        getPhoneNumber() {
            let start = String(this.user.data.phoneNumber).substring(3, 5)
            let mid = String(this.user.data.phoneNumber).substring(5, 9)
            let end = String(this.user.data.phoneNumber).substring(9, 13)
            return '0' + start + '-' + mid + '-' + end
        }
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');
.v-badge__badge {
    border-radius: 7px !important;
}

.v-navigation-drawer__content {
    position: relative !important;
}

.v-navigation-drawer__content::-webkit-scrollbar {
    display: none;
}

.v-list-item {
    padding-right: 0 !important;
}

.v-list .v-list-item--active {
    color: transparent;
}

.v-ripple__container {
    display: none !important;
}

.theme--light.v-list-item:hover::before {
    opacity: 0 !important;
}

.static-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #262626 !important;
    width: 100%;
    height: 100%;
}

.copyrightStyle {
    font-family: Roboto !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 10px !important;
    line-height: 14px;
    color: #BDBDBD !important;
    background: transparent !important;
    position: absolute;
    bottom: 0;
}
</style>
