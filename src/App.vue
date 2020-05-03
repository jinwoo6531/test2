<template>
<v-app id="tasio">
    <!-- 
        아마 이 파일에서 경우에 따라 나누어주어야 할 것 같다.
        처음 앱을 설치할 경우는 Infostep, 로그아웃된 경우, 회원이 아닌 경우는 휴대폰 인증 페이지, 로그인 된 경우는 홈페이지 
    -->

    <v-container grid-list-md class="pa-0 ma-0 text-center" progress>
        <v-layout row wrap align-center justify-center>
            <v-card color="transparent" flat v-if="!$isFirebaseAuth">
                <v-card-text class="text-center">
                    <v-progress-circular width="5" size="50" indeterminate color="purple"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-center">
                    인증 상태를 기다리는 중입니다.
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
    
    <v-content>
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

#tasio {
    background: #FAFAFA;
    position: relative;
}

.progress {
    position: absolute;
    top: 50%;
    transform: translateY(-90%);
}

.container {
    font-family: 'Noto Sans KR', sans-serif;
    background: #FAFAFA;
}

/* Navigation-drawer */
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
    display: flex;
    align-items: flex-end;
    color: #BDBDBD;
}
</style>
