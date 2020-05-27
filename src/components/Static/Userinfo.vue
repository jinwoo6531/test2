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
                            {{ displayName }}
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: right; padding-right: 12px;">
                            <img src="../../assets/modify-icon.svg" @click="dialog = true" width="14px" height="14px">
                        </v-col>
                        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card flat tile>
                                <v-toolbar flat tile dense color="transparent">
                                    <v-btn icon @click="dialog = false" color="#262626">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn text class="pa-0" @click="dialog = false" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="position: absolute; background: transparent;">
                                    <v-row align="center" justify="center">
                                        <v-card class="d-flex justify-space-around" flat>
                                            <v-text-field filled="filled" clearable="clearable" dense="dense"></v-text-field>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            이메일
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            {{ email }}
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: right; padding-right: 12px;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            성별
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            {{ gender }}
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: right; padding-right: 12px;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            생일
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            {{ birth }}
                        </v-col>
                        <v-col cols="2" height="100%" style="text-align: right; padding-right: 12px;">
                            <img src="../../assets/modify-icon.svg" width="14px" height="14px">
                        </v-col>
                    </v-row>
                    <v-divider color="#BDBDBD"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6">
                        <v-col cols="2" height="100%" class="usertitle">
                            전화번호
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            {{ this.phoneNumber }}
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
import {
    mapGetters
} from 'vuex'
import axios from 'axios'

export default {
    name: 'Userinfo',

    data: () => ({
        dialog: false,
        displayName: '',
        email: '',
        gender: '',
        birth: '',
        phoneNumber: ''
    }),

    created() {
        axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
            .then(response => {
                console.log('userinfo', response.data)
                this.displayName = response.data.displayName
                this.email = response.data.email
                this.gender = response.data.gender
                this.birth = response.data.birth
                var start = "0" + response.data.phoneNumber.substring(3, 5)
                var mid = response.data.phoneNumber.substring(5, 9)
                var end = response.data.phoneNumber.substring(9, 13)
                this.phoneNumber = start + "-" + mid + "-" + end
            }).catch(error => {
                console.log('User read: ', error)
            })
    },

    computed: {
        ...mapGetters({
            user: "user"
        })
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
