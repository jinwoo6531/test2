<template>
<v-container fluid grid-list-md>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-card class="login">
                <v-form>
                    <v-text-field type="text" v-model="email" placeholder="Email"></v-text-field>
                    <v-text-field type="password" v-model="password" placeholder="Password"></v-text-field>
                    <v-btn style="width: 100%;" @click="login">Connection</v-btn>
                </v-form>
                <p>You don't have an account ? You can <router-link to="/signup">create one</router-link>
                </p>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',

    data: () => ({
        email: '',
        password: ''
    }),

    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                // eslint-disable-next-line no-unused-vars
                (user) => {
                    this.$router.replace('/')
                },
                (error) => {
                    alert('Oops. ' + error.message)
                }
            )
        }
    }
}
</script>

<style scoped>
.login {
    margin-top: 40px;
}

input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
}

button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
}

p {
    margin-top: 40px;
    font-size: 13px;
}

p a {
    text-decoration: underline;
    cursor: pointer;
}
</style>
