<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <h3>이제 마지막 단계에요</h3>
            <p>제가 모시게 될 고객님은 어떤 분인가요?</p>
            <form @submit.prevent="submit">
                <div>
                    <p>uid</p>
                    <input type="text" id="uid" name="uid" v-model="this.form.uid">
                </div>
                <div>
                    <p>이름</p>
                    <input type="text" id="name" name="name" value required autofocus v-model="form.name" />
                </div>
                <div>
                    <p>이메일</p>
                    <input type="email" id="email" name="email" value required autofocus v-model="form.email" />
                </div>
                <div>
                    <p>성별</p>
                    <input type="radio" id="gender" name="man" value required autofocus v-model="form.gender" />
                    <label for="man"> 남성</label>
                    <input type="radio" id="gender" name="woman" value required autofocus v-model="form.gender" />
                    <label for="woman"> 여성</label>
                </div>
                <div>
                    <p>생년월일</p>
                    <input type="number" id="birth" name="birth" required autofocus placeholder="YYMMDD (예: 940701)" v-model="form.birth" />
                </div>
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
        this.form.uid = this.user.data.uid
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
