<template>
<v-app class="home">
    <v-navigation-drawer class="pa-5" style="z-index: 999" v-model="drawer" app>
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

                    <v-list-item link to="/gunsan">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                고군산관광벨트
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/daegu">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                대구수성알파시티
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/sejong">
                        <v-list-item-content>
                            <v-list-item-title style="font-style: normal; font-weight: normal; font-size: 14px; color: #828282;">
                                세종호수공원
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link to="/sangam">
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
                            로그아웃
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item link to="/accessphone">
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
        <v-container style="background: transparent;">
            <v-row no-gutters justify="start">
                <v-col xs="4">
                    <v-card class="pa-2 nav-icon" color="transparent" outlined tile>
                        <img src="../assets/nav-icon.svg" @click.stop="drawer = !drawer" />
                    </v-card>
                </v-col>
                <v-col xs="4">
                    <v-card class="pa-2 nav-icon" color="transparent" outlined tile>
                        <img src="../assets/tasio-logo.svg" />
                    </v-card>
                </v-col>
                <v-col xs="4">
                    <v-card class="pa-2 nav-icon" color="transparent" outlined tile>

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
        drawer: null,
    }),

    methods: {
        signOut() {
            this.$firebase.auth().signOut()
                .then(() => {
                    alert('로그아웃 되었습니다.')
                    this.$router.replace('AccessPhone')
                    this.$Progress.start()
                });
        }
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}

.boldMenu {
    margin-top: 20px;
}

.nav-icon {
    position: fixed;
    z-index: 9;
}

.nav-footer {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    /* or 140% */

    display: flex;
    align-items: flex-end;

    /* Gray 4 */

    color: #BDBDBD;
}
</style>
