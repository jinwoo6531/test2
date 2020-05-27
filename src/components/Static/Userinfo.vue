<template>
<div id="userinfo">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 pt-8 pb-5" xs12 sm12 md12 style="width: 100%; height: 100%;">
                <v-card class="pa-0 userwrap" flat tile>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            이름
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            현유진
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: center;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            이메일
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            yjhyeon@aspringcloud.com
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: center;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            성별
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            여자
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: center;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            생일
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            970702
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: center;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            전화번호
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            010-1234-5678
                        </v-col>
                    </v-row>
                </v-card>
                <v-divider color="#BDBDBD"></v-divider>
            </v-flex>

            <v-flex xs12 sm12 md12 class="pa-0" style="border-top: 1px solid #BDBDBD; border-bottom: 0.5px solid #BDBDBD;">
                <v-btn class="pa-3 signout" color="#FFF" block tile depressed @click.prevent="signOut">로그아웃</v-btn>
            </v-flex>

            <v-flex xs12 sm12 md12 class="pr-6 d-flex justify-end bye-tasio">
                <span>회원탈퇴</span>
            </v-flex>

            <v-footer absolute class="pa-0 ma-0">
                <v-btn block depressed tile color="#E61773" height="50px" class="save-update">변경사항 저장하기</v-btn>
            </v-footer>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
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

<style scoped>
.userwrap {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #262626;
}

.usertitle {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #555555;
}

.signout {
    height: 46px !important;
    text-align: center;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #555555;
}

.bye-tasio {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #BDBDBD;
    padding-top: 10px !important;
}

.save-update {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #FFFFFF;
}
</style>
