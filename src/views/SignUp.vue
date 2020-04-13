<template>
<v-container class="map-container" fluid grid-list-md>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-form @submit.prevent="handleSubmit">
                <div>
                    <label for="email">Email</label>
                    <input type="email" v-model="user.email" v-validate="'required|email'" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">
                        {{ errors.first("email") }}
                    </div>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">
                        {{ errors.first("password") }}
                    </div>
                </div>
                <div>
                    <label for="name">Name</label>
                    <input type="text" v-model="user.name" v-validate="'required'" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                    <div v-if="submitted && errors.has('name')" class="invalid-feedback">
                        {{ errors.first("name") }}
                    </div>
                </div>
                <div>
                    <v-radio-group :disabled="disabled" :readonly="readonly" :mandatory="mandatory" :multiple="multiple" :row="row" :color="color">
                        <v-radio label="남성"></v-radio>
                        <v-radio label="여성"></v-radio>
                    </v-radio-group>
                </div>
                <div>
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
                </div>
                <!-- <v-btn @click="signUp">Sign Up</v-btn> -->
                <button>가입하기</button>
            </v-form>
            <span><router-link to="/login">로그인</router-link> 페이지로 돌아가기</span>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/auth'

export default {
    name: 'signUp',

    data: () => ({
        user: {
            name: "",
            lastName: "",
            email: "",
            password: ""
        },
        submitted: false,
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
        handleSubmit() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                }
            });
        }

        // signUp() {
        //     firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        //         // eslint-disable-next-line no-unused-vars
        //         function (user) {
        //             alert('You account has been created!')
        //         },
        //         function (error) {
        //             alert('Oops' + error.message)
        //         }
        //     )
        //     this.$router.replace('login')
        // }
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
