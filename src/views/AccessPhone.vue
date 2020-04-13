<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <form>
                <input type="text" v-model="number" placeholder="+82">
                <button type="button" @click="phoneAuth">보내기</button>
            </form>
            <br>
            <form>
                <input type="text" v-model="verficationCode" placeholder="인증번호를 입력해주세요.">
                <button type="button" @click="codeverify"></button>
            </form>
        </v-flex>
    </v-layout>
</v-container>
</template>


<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'AccessPhone',

    data: () => ({
        number: 0,
        verficationCode: 0,
        coderesult: 0
    }),

    methods: {
        phoneAuth() {
            firebase.auth().signInWithPhoneNumber(this.number).then(confirmationResult => {
                window.confirmationResult = confirmationResult
                this.coderesult = confirmationResult;
                console.log(this.coderesult)
                alert("메세지를 전송하였습니다.")
            }).catch(error => {
                console.log(error)
            })
        },

        codeverify() {
            this.coderesult.confirm()
            .then(result => {
                alert('인증이 완료되었습니다.')
                var user = result.user;
                console.log(user)
            }).catch(error => {
                console.log(error.message)
            })
        }
    }
}
</script>

<style>

</style>