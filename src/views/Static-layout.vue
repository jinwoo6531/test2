<template>
<v-app class="static">
    <v-navigation-drawer temporary class="pa-5" style="z-index: 999" v-model="drawer" app>
        <v-list dense>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        <img src="../assets/side-logo.svg">
                    </v-list-item-title>
                    <v-list-item-subtitle style="font-style: normal; font-weight: bold; font-size: 12px; color: #333333; margin-top: 9px;">
                        스프링클라우드 자율주행 셔틀
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

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

            <template v-if="user.loggedIn">
                <v-list-item link @click.prevent="signOut">
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ user.data.uid }}
                        </v-list-item-title>
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
        </v-list>

        <v-footer class="nav-footer justify-left" style="background: transparent; margin-top: 65px;">
            <span style="font-family: Noto Sans KR; font-style: normal; font-weight: normal; font-size: 12px; line-height: 17px; display: flex; align-items: flex-end; color: #828282; margin-bottom: 15px;">개인정보보호정책</span>
            <span>COPYRIGHT@SPRINGCLOUD INC. <br>
                ALL RIGHTS RESERVED.</span>
        </v-footer>
    </v-navigation-drawer>

    <v-content>
        <v-container style="background: transparent;" class="pa-0" fluid>
            <v-row style="height: 100%;" no-gutters justify="start" xs12 sm12 md12>
                <v-col style="height: 100%;" cols="4">
                    <v-card style="height: 100%;" class="pa-2 nav-icon" color="transparent" flat>
                        <img src="../assets/nav-icon.svg" style="height: 100%;" @click.stop="drawer = !drawer" />
                    </v-card>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <v-card style="height: 100%; text-align: center;" class="pa-2 nav-icon" color="transparent" flat>
                        <v-card flat v-if="this.$route.fullPath == '/'" class="pa-0 static-title">타시오 소개</v-card>
                        <v-card flat v-if="this.$route.fullPath == '/schedule'" class="pa-0 static-title">운행 시간표</v-card>
                        <v-card flat v-if="this.$route.fullPath == '/faq'" class="pa-0 static-title">자주 묻는 질문</v-card>
                    </v-card>
                </v-col>
                <v-col style="height: 100%;" cols="4">
                    <v-card style="height: 100%;" class="pa-2 nav-icon" color="transparent" flat>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
import {
    mapGetters
} from "vuex"

export default {
    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    data: () => ({
        drawer: null
    }),

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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

.static-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #262626 !important;
}
</style>
