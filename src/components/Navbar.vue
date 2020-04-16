<template>
<nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
        <router-link to="/" class="navbar-brand">Home</router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">

                <template v-if="user.loggedIn">
                    <div class="nav-item">{{ user.data.phoneNumber }}</div>
                    <li class="nav-item">
                        <a @click.prevent="signOut">Sign out</a>
                    </li>
                </template>

                <template v-else>
                    <li>
                        <router-link to="/accessphone">Login</router-link>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import { mapGetters } from "vuex"

export default {
    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    methods: {
        signOut() {
            firebase.auth().signOut()
            .then(() => {
                alert('로그아웃 되었습니다.')
                this.$router.replace('AccessPhone')
            });
        }
    }
};
</script>
