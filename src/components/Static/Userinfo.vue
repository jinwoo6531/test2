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
                            <img src="../../assets/modify-icon.svg" @click="namedialog = true" width="14px" height="14px">
                        </v-col>
                        <v-dialog v-model="namedialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card flat tile>
                                <v-toolbar flat tile dense color="transparent">
                                    <v-btn icon @click="nochangeDisplayName" color="#262626">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn text class="pa-0" @click="showNameDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>

                                <v-container class="pa-0 ma-0 flex-wrap" style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0">
                                        <v-card flat tile>
                                            <v-card-title class="pl-0 modify-title">이름</v-card-title>
                                            <v-text-field v-model="displayName" required filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0">{{ rules }}</v-card-text>
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
                            <img src="../../assets/modify-icon.svg" @click="emaildialog = true" width="14px" height="14px">
                        </v-col>
                        <v-dialog v-model="emaildialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card flat tile>
                                <v-toolbar flat tile dense color="transparent">
                                    <v-btn icon @click="nochangeEmail" color="#262626">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn text class="pa-0" @click="showEmailDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0">
                                        <v-card flat tile>
                                            <v-card-title class="pl-0 modify-title">이메일</v-card-title>
                                            <v-text-field v-model="email" filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0">{{ rules }}</v-card-text>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
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
                            <img src="../../assets/modify-icon.svg" @click="genderdialog = true" width="14px" height="14px">
                        </v-col>
                        <v-dialog v-model="genderdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card flat tile>
                                <v-toolbar flat tile dense color="transparent">
                                    <v-btn icon @click="nochangeGender" color="#262626">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn text class="pa-0" @click="showGenderDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0">
                                        <v-card flat tile>
                                            <v-card-title class="pl-0 modify-title">성별</v-card-title>
                                            <v-radio-group v-model="gender">
                                                <v-radio label="남자" value="남자" color="#E61773"></v-radio>
                                                <v-radio label="여자" value="여자" color="#E61773"></v-radio>
                                            </v-radio-group>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
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
                            <img src="../../assets/modify-icon.svg" @click="birthdialog = true" width="14px" height="14px">
                        </v-col>
                        <v-dialog v-model="birthdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card flat tile>
                                <v-toolbar flat tile dense color="transparent">
                                    <v-btn icon @click="nochangeBirth" color="#262626">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-toolbar-items>
                                        <v-btn text class="pa-0" @click="showBirthdialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0">
                                        <v-card flat tile>
                                            <v-card-title class="pl-0 modify-title">생일</v-card-title>
                                            <v-text-field type="number" v-model="birth" filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0">{{ rules }}</v-card-text>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
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
                <v-btn class="pa-3 signout" color="#FFF" block tile depressed @click="signoutdialog = true">로그아웃</v-btn>
                <v-dialog v-model="signoutdialog" width="268px" height="170px">
                    <v-card flat tile>
                        <v-card-text class="signout-text">로그아웃 하시겠습니까?</v-card-text>
                        <v-card-actions class="pa-0" style="height: 50px">
                            <v-row no-gutters style="height: 100%;">
                                <v-col style="height: 100%;">
                                    <v-btn color="#FAFAFA" tile depressed class="pa-0 logout-btn" style="color: #262626 !important;" @click="signoutdialog = false">취소하기</v-btn>
                                </v-col>
                                <v-col style="height: 100%;">
                                    <v-btn color="#E61773" tile depressed class="pa-0 logout-btn" style="color: #FFFFFF !important;" @click.prevent="signOut">로그아웃</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>

            <v-flex xs12 sm12 md12 class="pr-6 d-flex justify-end bye-tasio" @click="deleteUser">
                <span>회원탈퇴</span>
            </v-flex>
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
        namedialog: false,
        emaildialog: false,
        genderdialog: false,
        birthdialog: false,
        displayName: '',
        email: '',
        gender: '',
        birth: '',
        phoneNumber: '',
        rules: '',

        signoutdialog: false
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
        showNameDialog() {
            if (this.displayName == null) {
                this.rules = '이름은 필수 항목입니다.'
                this.namedialog = true
            } else {
                // 변경된 이름 저장
                var uid = this.user.data.uid
                this.$firebase.firestore().collection('users').doc(uid).update({
                    displayName: this.displayName
                })

                this.rules = ''
                this.namedialog = false
            }
        },

        showEmailDialog() {
            var check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if (!check.test(this.email)) {
                this.rules = '이메일 형식을 지켜주세요.'
                this.emaildialog = true
            } else if (this.email == null) {
                this.rules = '이메일은 필수 항목입니다.'
                this.emaildialog = true
            } else {
                // 변경된 이메일 저장
                var uid = this.user.data.uid
                this.$firebase.firestore().collection('users').doc(uid).update({
                    email: this.email
                })

                this.rules = ''
                this.emaildialog = false
            }
        },

        showGenderDialog() {
            // 변경된 성별 저장
            var uid = this.user.data.uid
            this.$firebase.firestore().collection('users').doc(uid).update({
                gender: this.gender
            })
            this.genderdialog = false
        },

        showBirthdialog() {
            if (this.birth == null) {
                this.rules = '생일은 필수 항목입니다.'
                this.birthdialog = true
            } else if (this.birth.length > 7) {
                this.rules = '6자로 입력해주세요.'
                this.birthdialog = true
            } else {
                // 변경된 이름 저장
                var uid = this.user.data.uid
                this.$firebase.firestore().collection('users').doc(uid).update({
                    birth: this.birth
                })

                this.rules = ''
                this.birthdialog = false
            }
        },

        nochangeDisplayName() {
            axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.displayName = response.data.displayName
                    this.namedialog = false
                })
        },

        nochangeEmail() {
            axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.email = response.data.email
                    this.emaildialog = false
                })
        },

        nochangeGender() {
            axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.gender = response.data.gender
                    this.genderdialog = false
                })
        },

        nochangeBirth() {
            axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.birth = response.data.birth
                    this.birthdialog = false
                })
        },

        signOut() {
            this.$firebase.auth().signOut()
                .then(() => {
                    alert('로그아웃 되었습니다.')
                    this.$router.replace('AccessPhone')
                });
        },

        deleteUser() {
            axios.get('http://service.tasio.io:1994/tasio-fcef3/us-central1/app/api/delete/' + this.user.data.uid)
                .then(() => {
                    alert('회원 탈퇴 완료!')
                    this.$router.push('/accessagree')

                })
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
    border-radius: 2px !important;
    height: 46px !important;
    text-align: center;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #555555;
}

.signout-text {
    padding: 47px 0 !important;
    text-align: center;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px !important;
    color: #262626 !important;

}

.logout-btn {
    width: 100%;
    height: 100% !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
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

/* Modify Dialog */
.modify-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px !important;
    color: #333333 !important;
}
</style>
