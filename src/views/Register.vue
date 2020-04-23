<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-5" xs12 sm12 md12>
            <h3 class="RegisterTitle">이제 마지막 단계예요.</h3>
            <p class="RegisterSubTitle">제가 모시게 될 고객님은 어떤 분인가요?</p>
            <form @submit.prevent="submit">
                <v-flex xs12 sm12 md12>
                    <p>uid</p>
                    <input type="text" id="uid" name="uid" v-model="this.form.uid">
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <p>이름</p>
                    <input type="text" id="name" name="name" value required autofocus v-model="form.name" />
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <p>이메일</p>
                    <input type="email" id="email" name="email" value required autofocus v-model="form.email" />
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <p>성별</p>
                    <input type="radio" id="man" name="gender" value required v-model="form.gender" />
                    <label for="man"> 남성</label>
                    <input type="radio" id="woman" name="gender" value required v-model="form.gender" />
                    <label for="woman"> 여성</label>
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <p>생년월일</p>
                    <input type="number" id="birth" name="birth" required autofocus placeholder="YYMMDD (예: 940701)" v-model="form.birth" />
                </v-flex>
                <p v-if="error">{{ error }}</p>
                <button type="submit">가입 완료하기</button>
            </form>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'
// import axios from 'axios'

export default {
    data() {
        return {
            form: {
                uid: "",
                name: "",
                email: "",
                gender: "",
                birth: ""
            },
            error: null,
            items: []
        };
    },

    mounted() {
        this.form.uid = this.user.data
        console.log(this.user)
    },

    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    methods: {
        async submit(uid) {
            uid = this.form.uid
            await this.$firebase.firestore().collection('users').doc(uid).set({
                uid: this.form.uid,
                displayName: this.form.name,
                email: this.form.email,
                gender: this.form.gender,
                level: 1,
                birth: this.form.birth
            })

            this.form.name = ''
            this.form.email = ''
            this.form.gender = ''
            this.form.birth = ''

            this.$router.push('/')
            await this.get()
            // await axios.get('http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/read/' + this.form.uid)
        },

        async get() {
            const snapshot = await this.$firebase.firestore().collection('users').get()
            this.items = []
            snapshot.forEach(v => {
                const {
                    uid,
                    name,
                    email,
                    gender,
                    birth
                } = v.data()
                this.items.push({
                    uid,
                    name,
                    email,
                    gender,
                    birth,
                    id: v.id
                })
            })
            console.log("items: ", this.items)
            console.log('snapshot: ', snapshot)
        }
    }
};
</script>

<style scoped>
.RegisterTitle {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #262626;
}

.RegisterSubTitle {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #828282;
}

input {
    width: 100%;
    height: 40px;
    background: #FFF;
    color: #E0E0E0;
    font-size: 13px;
    font-style: normal;
    font-weight: normal;
    border-bottom: 0.5px solid #828282;
    padding: 14px 0 11px 10px;
}
</style>