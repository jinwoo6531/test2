<template>
<v-container class="pa-0 gradient" fluid fill-height>
    <v-row no-gutters>
        <v-col xs="12" sm="12" md="12">
            <v-card color="transparent" flat>
                <v-card-title class="mb-3">{{ user.data.displayName }} 님 환영합니다!</v-card-title>
                <v-card-subtitle>이제 모든 준비가 끝났어요. </v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col xs="12" sm="12" md="12">
            <v-card class="pa-2 welcome-msg" color="transparent" flat>
                온리원 고군산 자율주행 셔틀과 함께 <br>
                즐거운 시간 보내세요!
            </v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col xs="12" sm="12" md="12">
            <v-card color="transparent" flat></v-card>
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col xs="12" sm="12" md="12">
            <v-card class="pa-2" color="transparent" flat></v-card>
        </v-col>
    </v-row>
    <v-footer absolute style="margin-bottom: 24px; background: transparent;">
        <v-btn block depressed :ripple="false" height="50px" color="#2E3990" class="start-tasio" @click="startTasio">타시오 시작하기</v-btn>
    </v-footer>
</v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data: () => ({
        drawer: null
    }),

    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    methods: {
        startTasio() {
            this.$router.replace('/')
        }
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

.welcome-msg {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #2E3990;
}

.start-tasio {
    font-family: Noto Sans KR;
    width: 100%;
    border-radius: 2px;
    color: #FFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
}
</style>
