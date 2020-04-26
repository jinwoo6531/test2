<template>
<v-app class="home">
    <v-navigation-drawer style="z-index: 999" v-model="drawer" app>
        <v-list dense>
            <v-list-item link to="/">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/gunsan">
                <v-list-item-content>
                    <v-list-item-title>
                        고군산관광벨트
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/daegu">
                <v-list-item-content>
                    <v-list-item-title>
                        대구수성알파시티
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/sejong">
                <v-list-item-content>
                    <v-list-item-title>
                        세종호수공원
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/sangam">
                <v-list-item-content>
                    <v-list-item-title>
                        상암DMC홍보관
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/schedule">
                <v-list-item-content>
                    <v-list-item-title>
                        운행 시간표
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/introduction">
                <v-list-item-content>
                    <v-list-item-title>
                        타시오 소개
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/faq">
                <v-list-item-content>
                    <v-list-item-title>
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
    </v-navigation-drawer>

    <v-content>
        <v-container class="grey lighten-5">
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
    name: 'home',

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
.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}

.nav-icon {
    position: fixed;
    z-index: 9;
}
</style>
