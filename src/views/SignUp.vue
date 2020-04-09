<template>
<v-flex xs12 md7 offset-md1>
    <div class="sign-up">
        <p>Let's create a new account!</p>
        <v-form v-model="vaild">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field type="text" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field type="password" v-model="password_chk" :rules="passwordRules" label="Password Check" required></v-text-field>
                    </v-col>
                    <v-col col="12" md="4">
                        <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
                    </v-col>
                    <v-col col="12" md="4">
                        <v-radio-group :disabled="disabled" :readonly="readonly" :mandatory="mandatory" :multiple="multiple" :row="row" :color="color">
                            <v-radio label="남성"></v-radio>
                            <v-radio label="여성"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model="date" label="생년월일" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">취소</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(date)">확인</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-btn @click="signUp">Sign Up</v-btn>
        <span>or go back to <router-link to="/login">login</router-link></span>
    </div>
</v-flex>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'signUp',

    data: () => ({
        vaild: false,
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail은 필수 입니다.'
        ],
        password: '',
        password_chk: '',
        passwordRules: [
            v => !!v || '비밀번호는 필수 입니다.',
            v => (v && v.length >= 6) || '비밀번호는 6글자 이상으로 설정해주세요.',
        ],
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        gender: '성별',
        disabled: false,
        readonly: false,
        mandatory: false,
        multiple: false,
        row: false,
        color: 'accent',
        date: new Date().toISOString().substring(0, 10),
        menu: false
    }),

    methods: {
        signUp() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                // eslint-disable-next-line no-unused-vars
                function (user) {
                    alert('You account has been created!')
                },
                function (error) {
                    alert('Oops' + error.message)
                }
            )
            this.$router.replace('login')
        }
    }
}
</script>

<style scoped>
.signUp {
    margin-top: 40px;
}

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
}

span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>
