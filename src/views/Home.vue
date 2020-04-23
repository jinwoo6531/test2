<template>
<v-app id="inspire">
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

    <v-app-bar style="box-shadow: none; border-bottom: 1px solid #DBDBDB; background: #FAFAFA;" app color="#FFF" dark>
        <v-app-bar-nav-icon color="#555" @click.stop="drawer = !drawer" />
        <v-toolbar-title class="d-inline-block pl-0 text-center" style='width: 100%'>
            <img src="../assets/tasio_logo.svg" align="center" justify="center" class="pr-3" />
        </v-toolbar-title>
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>

    <v-footer style="border-top: 1px solid #DBDBDB; background: #FAFAFA;" color="#FFF" app>
        <span class="text-center" style="width: 100%; color: #B7B7B7; font-size: 12px;">
            <p class="mb-0">&copy; Springcloud Ltd,.</p>
            <p class="mb-0">경기도 성남시 수정구 창업로 42, 경기기업성장센터 523, 524</p>
        </span>
    </v-footer>
</v-app>
</template>

<script>
import { mapGetters } from "vuex"

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
#inspire {
    background: #FAFAFA;
}

.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}
</style>
