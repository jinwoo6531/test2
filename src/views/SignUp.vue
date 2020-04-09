<template>
<v-flex xs12 md7 offset-md1>
    <div class="sign-up">
        <p>Let's create a new account!</p>
        <v-form>
            <v-text-field type="text" v-model="email" placeholder="Email"></v-text-field>
            <v-text-field type="password" v-model="password" placeholder="Password"></v-text-field>
            <v-text-field type="password" v-model="password" placeholder="Password Check"></v-text-field>
            <v-text-field type="text" v-model="password" placeholder="Name"></v-text-field>
            <v-radio v-model="genter">남성</v-radio>
            <v-radio v-model="genter">여성</v-radio>
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
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
      email: '',
      password: ''
    }),

    methods: {
      signUp() {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            // eslint-disable-next-line no-unused-vars
            function(user) {
              alert('You account has been created!')
            },
            function(error) {
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
