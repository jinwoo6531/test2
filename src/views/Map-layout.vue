<template>
<v-app class="map">
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

            <template v-if="user.loggedIn">
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
                            <v-col class="pa-0" cols="2" style="width: 100%; height: 100%; line-height: 34px; text-align: center;">
                                <router-link to="/userinfo">
                                    <img src="../assets/setting.svg" />
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item link to="/auth/accessphone">
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

                    <v-list-item link to="/map/gunsan" class="ma-0">
                        <v-list-item-content class="pa-0">
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                고군산 관광벨트
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/map/daegu" class="ma-0">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                대구 수성알파시티
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
                                    세종 산학연클러스터 4-2
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

            <v-list-item class="boldMenu pa-0 mt-2" link to="/faq">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        자주 묻는 질문
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            
            <v-list-item class="boldMenu pa-0 mt-2" link to="/serviceinfo">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                        서비스 정보
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-footer class="nav-footer justify-left" style="background: transparent; margin-top: 65px;">
            <span style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 12px; line-height: 17px; display: flex; align-items: flex-end; color: #828282; margin-bottom: 15px;">개인정보보호정책</span>
            <span>COPYRIGHT@SPRINGCLOUD INC. <br>
                ALL RIGHTS RESERVED.</span>
        </v-footer>
    </v-navigation-drawer>
    <v-content>
        <v-card style="background: transparent;" :height="getHeight" class="pa-0" flat>
            <v-row style="height: 100%;" no-gutters justify="start" xs12 sm12 md12>
                <v-col style="height: 100%;" cols="4">
                    <div style="height: 100%;" class="nav-icon">
                        <img src="../assets/nav-icon.svg" style="height: 100%; padding: 8px;" @click.stop="drawer = !drawer" />
                    </div>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <div class="nav-icon" style="height: 100%; text-align: center; line-height: 57px;">
                        <img src="../assets/tasio-logo.svg" style="width: 100%;  height: 100%; padding: 8px;" />
                    </div>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <div class="nav-icon" style="height: 100%; text-align: center;">

                    </div>
                </v-col>
            </v-row>
        </v-card>

        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    data: () => ({
        drawer: null
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}

.v-navigation-drawer__content::-webkit-scrollbar {
    display: none;
}

.v-badge__badge {
    border-radius: 7px !important;
}

.v-list-item {
    padding-right: 0 !important;
}

.nav-icon {
    position: relative;
    z-index: 9;
    width: 100%;
}

.map-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#map-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
}

.selectBox {
    width: 100%;
    position: fixed;
    z-index: 9;
    bottom: 0;
}

.selectStationWrap {
    width: 100%;
    height: 90px;
    background: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    text-align: center;
}

.divide-bar {
    display: inline-block;
    width: 100%;
    border: 0.8px dashed #E0E0E0;
}

.callShuttle {
    width: 100%;
    border-radius: 0;
    color: #FFF !important;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
}

.person-modal {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 13px !important;
    color: #E61773 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom: 10px;
}

.count {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    color: #262626 !important;
    margin: 0 29px;
}

.select-person-btn {
    width: 100%;
    height: 50px;
    background: #E61773 !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    position: absolute;
    bottom: 0;
}
</style>
