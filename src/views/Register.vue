<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <h3>이제 마지막 단계에요</h3>
            <p>제가 모시게 될 고객님은 어떤 분인가요?</p>
            <form @submit.prevent="submit">
                <div style="display: none">
                    <label for="uid">uid</label>
                    <input type="text" id="uid" name="uid" v-model="user.data.uid" />
                </div>
                <div>
                    <label for="name">이름</label>
                    <input type="text" id="name" name="name" value required autofocus v-model="form.name" />
                </div>
                <div>
                    <label for="email">이메일</label>
                    <input type="email" id="email" name="email" value required autofocus v-model="form.email" />
                </div>
                <div>
                    <label for="birth">생년월일</label>
                    <input type="number" id="birth" name="birth" required autofocus placeholder="YYMMDD (예: 940701)" v-model="form.birth" />
                </div>
                <button type="submit">가입 완료하기</button>
            </form>
            <p v-if="error">{{ error }}</p>
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
                name: "",
                email: "",
                gender: "",
                birth: ""
            },
            error: null,
            items: []
        };
    },

    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    methods: {
        async submit() {
            // 만약 form을 모두 잘 작성했다면 firestore에 저장해주고 Dashboard로 넘겨주기
            // if (!this.error) {
                const r = await this.$firebase.firestore().collection('users').add({
                    uid: this.user.data.uid,
                    name: this.form.name,
                    email: this.form.email,
                    gender: this.form.gender,
                    birth: this.form.birth
                })

                this.form.name = ''
                this.form.email = ''
                this.form.gender = ''
                this.form.birth = ''

                await this.get()
                console.log(r)
            // } else {
            //     alert('')
            // }
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
