<template>
<v-flex xs12 md7 offset-md1>
    <div class="login">
        <h3>Login</h3>
        <v-form>
            <v-text-field type="text" placeholder="Email"></v-text-field>
            <v-text-field type="password" placeholder="Password"></v-text-field>
        </v-form>
        <v-btn @click="login">Connection</v-btn>
        <p>You don't have an account ? You can <router-link to="/signup">create one</router-link>
        </p>
    </div>
</v-flex>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',

    data: () => ({}),

    methods: {
        login() {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            // eslint-disable-next-line no-unused-vars
            (user) => {
              this.$router.replace('home')
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
