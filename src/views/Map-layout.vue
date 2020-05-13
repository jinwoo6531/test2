<template>
<v-app class="map">
    <v-navigation-drawer temporary class="pa-5" style="z-index: 999" v-model="drawer" app>
        <v-list dense>
            <v-list-item>
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
                <v-list-item link @click.prevent="signOut">
                    <v-list-item-content v-if="ready">
                        <v-row class="ma-0" style="height: 30px;">
                            <v-col class="pa-0" cols="9">
                                <v-row class="ma-0">
                                    <v-col class="pa-0" cols="12" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">
                                        {{ displayName }}님
                                    </v-col>
                                </v-row>
                                <v-row class="ma-0">
                                    <v-col class="pa-0 pt-1" cols="12" style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 12px; color: #828282;">
                                        {{ phoneNumber }}
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col class="pa-0" cols="3" style="width: 100%; height: 100%; line-height: 34px; text-align: center;">
                                <img src="../assets/setting.svg" />
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

            <v-list-item link to="/">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: bold; font-size: 16px; color: #262626;">
                        타시오 소개
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="boldMenu">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: bold; font-size: 16px; color: #262626; margin-bottom: 15px;">
                        전체 노선
                    </v-list-item-title>

                    <v-list-item link to="/map/gunsan">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                고군산관광벨트
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/map/daegu">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                대구수성알파시티
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/map/sejong">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                세종호수공원
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/map/sangam">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                상암DMC홍보관
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="boldMenu" link to="/schedule">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: bold; font-size: 16px; color: #262626;">
                        운행 시간표
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item class="boldMenu" link to="/faq">
                <v-list-item-content class="pa-0">
                    <v-list-item-title style="font-style: normal; font-weight: bold; font-size: 16px; color: #262626;">
                        자주 묻는 질문
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
import {mapGetters} from "vuex"
import axios from 'axios'

export default {
    data: () => ({
        drawer: null,
        ready: false
    }),

    created() {
        axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
            .then(response => {
                this.displayName = response.data.displayName
                let start = this.user.data.phoneNumber.substring(3, 5)
                let mid = this.user.data.phoneNumber.substring(5, 9)
                let end = this.user.data.phoneNumber.substring(9, 13)
                this.phoneNumber = '0' + start + '-' + mid + '-' + end
                this.ready = true
            })
    },

    computed: {
        ...mapGetters({
            user: "user"
        }),

        getHeight() {
            return this.$vuetify.breakpoint.xs ? 57 : '70'
        }
    },

    methods: {
        signOut() {
            this.$firebase.auth().signOut()
                .then(() => {
                    alert('로그아웃 되었습니다.')
                    this.$router.replace('AccessPhone')
                });
        }
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
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
