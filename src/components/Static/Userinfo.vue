<template>
<div id="userinfo">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 pt-8 pb-5 persentH" xs12 sm12 md12>
                <v-card class="pa-0 userwrap" flat tile>
                    <v-divider color="#E0E0E0"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6" width="100%">
                        <v-col cols="2" width="100%" height="100%" class="usertitle">
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
                                        <v-btn text class="pa-0" v-if="watch == false" disabled color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                        <v-btn text class="pa-0" v-else @click="showNameDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>

                                <v-container class="pa-0 ma-0 flex-wrap" style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0" width="100%">
                                        <v-card flat tile width="100%" class="pa-6" style="margin-top: 110px;">
                                            <v-card-title class="pl-0 modify-title">이름</v-card-title>
                                            <v-text-field v-model="displayName" required filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0" style="color: #EB5757;">{{ rules }}</v-card-text>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-divider color="#E0E0E0"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6" width="100%">
                        <v-col cols="2" width="100%" height="100%" class="usertitle">
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
                                        <v-btn text class="pa-0" v-if="watch1 == false" disabled color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                        <v-btn text class="pa-0" v-else @click="showEmailDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0" width="100%">
                                        <v-card flat tile width="100%" class="pa-6" style="margin-top: 110px;">
                                            <v-card-title class="pl-0 modify-title">이메일</v-card-title>
                                            <v-text-field v-model="email" filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0" style="color: #EB5757;">{{ rules }}</v-card-text>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-divider color="#E0E0E0"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6" width="100%">
                        <v-col cols="2" width="100%" height="100%" class="usertitle">
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
                                        <v-btn text class="pa-0" v-if="watch3 == false" disabled color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                        <v-btn text class="pa-0" v-else @click="showGenderDialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0" width="100%">
                                        <v-card flat tile width="100%" class="pa-6" style="margin-top: 110px;">
                                            <v-card-title class="pl-0 modify-title" style="padding-bottom: 52px !important;">성별</v-card-title>
                                            <div style="width: 100%">
                                                <label class="box-radio-input">
                                                    <input type="radio" name="gender" value="남자" v-model="gender">
                                                    <span>남자</span>
                                                </label>
                                                <label class="box-radio-input">
                                                    <input type="radio" name="gender" value="여자" v-model="gender">
                                                    <span>여자</span>
                                                </label>
                                            </div>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-divider color="#E0E0E0"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6" width="100%">
                        <v-col cols="2" width="100%" height="100%" class="usertitle">
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
                                        <v-btn text class="pa-0" v-if="watch2 == false" disabled color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                        <v-btn text class="pa-0" v-else @click="showBirthdialog" color="#E61773" style="font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 18px;">저장</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <v-container class="pa-0 ma-0 flex-wrap" style="background: transparent;">
                                    <v-row align="center" justify="center" class="pb-8 ma-0" width="100%">
                                        <v-card flat tile width="100%" class="pa-6" style="margin-top: 110px;">
                                            <v-card-title class="pl-0 modify-title">생일</v-card-title>
                                            <v-text-field type="number" v-model="birth" filled clearable autofocus background-color="rgba(230, 23, 115, 0.1)" color="#E61773"></v-text-field>
                                            <v-card-text class="pa-0" style="color: #EB5757;">{{ rules }}</v-card-text>
                                        </v-card>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-row>
                    <v-divider color="#E0E0E0"></v-divider>
                    <v-row no-gutters class="pa-3 pl-6" width="100%">
                        <v-col cols="2" width="100%" height="100%" class="usertitle">
                            전화번호
                        </v-col>
                        <v-col cols="8" height="100%" class="pl-4">
                            {{ getPhoneNumber }}
                        </v-col>
                    </v-row>
                </v-card>
                <v-divider color="#E0E0E0"></v-divider>
            </v-flex>

            <v-flex xs12 sm12 md12 class="pa-0" style="border-top: 0.5px solid #E0E0E0; border-bottom: 0.5px solid #E0E0E0;">
                <v-btn class="pa-3 signout" color="#FFF" block tile depressed @click="signoutdialog = true">로그아웃</v-btn>
                <v-dialog v-model="signoutdialog" width="268px" height="170px">
                    <v-card flat tile>
                        <v-card-text class="signout-text">로그아웃 하시겠습니까?</v-card-text>
                        <v-card-actions class="pa-0" style="height: 50px">
                            <v-row no-gutters style="height: 100%;">
                                <v-col style="height: 100%;">
                                    <v-btn color="#FAFAFA" tile depressed class="pa-0 logout-btn" style="color: #262626 !important;" @click="signoutdialog = false">취소</v-btn>
                                </v-col>
                                <v-col style="height: 100%;">
                                    <v-btn color="#E61773" tile depressed class="pa-0 logout-btn" style="color: #FFFFFF !important;" @click.prevent="signOut">로그아웃</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>

            <v-flex xs12 sm12 md12 class="pr-6 d-flex justify-end bye-tasio" @click="deleteUserdialog = true">
                <span>회원탈퇴</span>
            </v-flex>

            <v-dialog v-model="deleteUserdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card flat tile>
                    <v-toolbar flat tile dense color="transparent">
                        <v-btn icon @click="deleteUserdialog = false" color="#262626">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-container class="pa-0 ma-0" fluid fill-height style="background: transparent;">
                        <v-layout wrap class="pa-6">
                            <v-flex xs12 sm12 md12 class="d-flex justify-left align-start">
                                <v-card color="transparent" flat tile class="pb-6 bye-title">
                                    타시오와 작별인가요...?
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm12 md12 class="d-flex justify-left align-center">
                                <v-card class="text-left" color="transparent" flat tile>
                                    <v-card-text class="pa-0 bye-content">
                                        이렇게 떠나시다니 너무 슬프네요. <br>
                                        왜 떠나는지 알려주신다면 <br>
                                        서비스 개선을 위해 더욱 힘쓸게요!
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm12 md12 class="d-flex justify-left align-top">
                                <v-card class="text-left" color="transparent" flat tile width="100%">
                                    <v-card-text class="pa-0 pt-8 pb-2 bye-subcontent">
                                        본인 확인을 위해 <br>
                                        회원가입 시 사용한 휴대전화번호를 입력해주세요.
                                    </v-card-text>
                                    <v-text-field type="number" v-model="inputPhoneNumber" label="휴대전화 번호를 입력해주세요" color="#828282" class="pb-2 bye-check-field" single-line outlined flat full-width hide-details></v-text-field>
                                    <v-card-text class="pa-0 pb-4 error-rule" v-if="errorRule1 == true">휴대전화번호를 입력해주세요.</v-card-text>
                                    <v-select v-model="byeReason" :items="secession" item-text="title" item-value="value" label="탈퇴 사유를 선택해주세요" color="#828282" class="bye-check-field" item-color="#828282" return-object single-line outlined flat full-width hide-details></v-select>
                                    <v-text-field v-model="byeEtcReason" label="기타 사유를 입력해주세요." color="#828282" class="bye-check-field pt-2" v-if="etc == true" single-line outlined flat full-width hide-details></v-text-field>
                                    <v-card-text class="pa-0 pt-2 error-rule" v-if="errorRule2 == true">탈퇴 사유를 선택해주세요.</v-card-text>
                                    <v-card-text class="pa-0 pt-2 error-rule" v-if="errorRule3 == true">기타 사유를 입력해주세요.</v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm12 md12 class="d-flex justify-center align-end">
                                <v-footer padless absolute>
                                    <v-btn color="#E0E0E0" block depressed tile height="50px" class="pa-0" v-if="inputPhoneNumber.length == 0 || byeReason.value == undefined">탈퇴하기</v-btn>
                                    <v-btn color="#E61773" style="color: #FFF !important;" block depressed tile height="50px" class="pa-0" @click="deleteUser" v-else>탈퇴하기</v-btn>
                                </v-footer>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-dialog>
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
        watch: false,
        watch1: false,
        watch2: false,
        watch3: false,
        namedialog: false,
        emaildialog: false,
        genderdialog: false,
        birthdialog: false,
        displayName: '',
        email: '',
        gender: '',
        birth: '',
        phone: '',
        rules: '',

        displayNameTemp: '',
        emailTemp: '',
        birthTemp: '',
        genderTemp: '',

        signoutdialog: false,
        deleteUserdialog: false,
        etc: false,
        secession: [{
                title: '사용 빈도가 낮습니다.',
                value: '1'
            },
            {
                title: '이용이 불편하고 장애가 많습니다.',
                value: '2'
            },
            {
                title: '휴대전화번호가 변경됩니다.',
                value: '3'
            },
            {
                title: '걷는 것을 선호합니다.',
                value: '4'
            },
            {
                title: '자율주행 셔틀 속도가 너무 느립니다.',
                value: '5'
            },
            {
                title: '특별한 이유가 없습니다.',
                value: '6'
            },
            {
                title: '기타',
                value: '7'
            }
        ],
        inputPhoneNumber: '',
        byeReason: {},
        byeEtcReason: '',
        errorRule1: true,
        errorRule2: true,
        errorRule3: false
    }),

    created() {
        this.getUser();
    },

    computed: {
        ...mapGetters({
            user: "user"
        }),

        getPhoneNumber() {
            let start = String(this.user.data.phoneNumber).substring(3, 5);
            let mid = String(this.user.data.phoneNumber).substring(5, 9);
            let end = String(this.user.data.phoneNumber).substring(9, 13);
            return '0' + start + '-' + mid + '-' + end;
        },

        deletePhoneNumber() {
            let start = String(this.user.data.phoneNumber).substring(3, 13);
            return '0' + start;
        }
    },

    watch: {
        displayName(newval) {
            if (newval != this.displayNameTemp) {
                this.watch = true;
            } else {
                this.watch = false;
            }
        },

        email(newval) {
            if (newval != this.emailTemp) {
                this.watch1 = true;
            } else {
                this.watch1 = false;
            }
        },

        birth(newval) {
            if (newval != this.birthTemp) {
                this.watch2 = true;
            } else {
                this.watch2 = false;
            }
        },

        gender(newval) {
            if (newval != this.genderTemp) {
                this.watch3 = true;
            } else {
                this.watch3 = false;
            }
        }
    },

    updated() {
        if (this.byeReason.value == 7) { // 기타 사유를 선택한 경우
            this.etc = true;
            this.errorRule2 = false;
            if (this.byeEtcReason.length == 0) {
                this.errorRule3 = true;
            } else {
                this.errorRule3 = false;
            }
        } else if (this.byeReason.value == undefined) {
            this.etc = false;
            this.errorRule2 = true;
            this.errorRule3 = false;
        } else {
            this.etc = false;
            this.errorRule2 = false;
            this.errorRule3 = false;
        }

        if (this.inputPhoneNumber.length >= 1) {
            this.errorRule1 = false;
        } else {
            this.errorRule1 = true;
        }
    },

    methods: {
        async getUser() {
            await axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
                .then(async response => {
                    this.displayName = response.data.displayName;
                    this.email = response.data.email;
                    this.gender = response.data.gender;
                    this.birth = response.data.birth;

                    this.displayNameTemp = this.displayName;
                    this.emailTemp = this.email;
                    this.birthTemp = this.birth;
                    this.genderTemp = response.data.gender;

                    this.user.data.displayName = this.displayName;
                }).catch(error => {
                    console.log('User read: ', error);
                })
        },

        async showNameDialog() {
            this.watch = false;

            if (this.displayName == null) {
                this.rules = '이름은 필수 항목입니다.';
                this.namedialog = true;
            } else {
                // 변경된 이름 저장
                var uid = this.user.data.uid;
                await this.$firebase.firestore().collection('users').doc(uid).update({
                    displayName: this.displayName
                })

                this.rules = await '';
                this.namedialog = await false;
            }

            await this.getUser();
        },

        async showEmailDialog() {
            this.watch1 = false;

            var check = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!check.test(this.email)) {
                this.rules = '이메일 형식을 지켜주세요.'
                this.emaildialog = true;
            } else if (this.email == null) {
                this.rules = '이메일은 필수 항목입니다.'
                this.emaildialog = true;
            } else {
                // 변경된 이메일 저장
                var uid = this.user.data.uid
                await this.$firebase.firestore().collection('users').doc(uid).update({
                    email: this.email
                });

                this.rules = await '';
                this.emaildialog = await false;
            }
            await this.getUser();
        },

        async showGenderDialog() {
            this.watch3 = false;
            // 변경된 성별 저장
            var uid = this.user.data.uid;
            await this.$firebase.firestore().collection('users').doc(uid).update({
                gender: this.gender
            });

            this.genderdialog = await false;

            await this.getUser();
        },

        async showBirthdialog() {
            this.watch2 = false;

            if (this.birth == null) {
                this.rules = '생일은 필수 항목입니다.'
                this.birthdialog = true;
            } else if (this.birth.length > 7) {
                this.rules = '6자로 입력해주세요.'
                this.birthdialog = true;
            } else {
                // 변경된 생일 저장
                var uid = this.user.data.uid;
                await this.$firebase.firestore().collection('users').doc(uid).update({
                    birth: this.birth
                });

                this.rules = await '';
                this.birthdialog = await false;
            }

            await this.getUser();
        },

        nochangeDisplayName() {
            axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.displayName = response.data.displayName;
                    this.namedialog = false;
                });
            this.rules = '';
            this.watch = false;
        },

        nochangeEmail() {
            axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.email = response.data.email;
                    this.emaildialog = false;
                });
            this.rules = '';
            this.watch = false;
        },

        nochangeGender() {
            axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.gender = response.data.gender;
                    this.genderdialog = false;
                });
            this.rules = '';
            this.watch = false;
        },

        nochangeBirth() {
            axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/read/' + this.user.data.uid)
                .then(response => {
                    this.birth = response.data.birth;
                    this.birthdialog = false;
                });
            this.rules = '';
            this.watch = false;
        },

        signOut() {
            this.$firebase.auth().signOut()
                .then(() => {
                    this.$toasted.show("로그아웃 되었습니다.", {
                        theme: "bubble",
                        position: "top-center"
                    }).goAway(2000);
                });
        },

        deleteUser() {
            if (this.inputPhoneNumber == this.deletePhoneNumber) {
                console.log(this.user.data.uid)
                axios.get('https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/delete/' + this.user.data.uid)
                    .then(() => {
                        this.$router.replace('/goodbye');
                    })
            } else {
                this.$toasted.show("휴대폰 번호를 확인해주세요!", {
                    theme: "bubble",
                    position: "top-center"
                }).goAway(2000);
            }
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
    font-size: 16px !important;
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

/* Bye tasio */
.bye-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: bold;
    font-size: 20px !important;
    color: #262626 !important;
}

.bye-content {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #555555 !important;
}

.bye-subcontent {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px !important;
    color: #262626 !important;
}

.bye-check-field {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    color: #BDBDBD !important;
}

.error-rule {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 13px !important;
    color: #EB5757 !important;
}

/* radio */
.box-radio-input {
    display: inline-block;
    width: 50%;
}

.box-radio-input input[type="radio"] {
    display: none;
}

.box-radio-input input[type="radio"]+span {
    display: inline-block;
    background: none;
    border: 1px solid #FDE8F1;
    text-align: center;
    width: 100%;
    height: 56px;
    line-height: 56px;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
}

.box-radio-input input[type="radio"]:checked+span {
    border: 1px solid #E61773;
    background: #E61773;
    color: #fff;
}
</style>
