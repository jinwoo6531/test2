<template>
<nav>
    <div>
        <router-link to="/" class="navbar-brand">Home</router-link>
        <div>
            <ul>
                <template v-if="user.loggedIn">
                    <div>{{ user.data.phoneNumber }}</div>
                    <li><a @click.prevent="signOut">Sign out</a></li>
                </template>
                <template v-else>
                    <li><router-link to="/accessphone">Login</router-link></li>
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
