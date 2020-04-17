<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <navbar></navbar>
                <div class="card-header">TASIO TEST</div>
                <div class="card-body">
                    <div v-if="user.loggedIn">로그인 상태!</div>
                    <div v-else>로그아웃 상태!</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import navbar from "../components/Navbar";
import {
    mapGetters
} from "vuex";
export default {
    components: {
        navbar
    },
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: "user"
        })
    }
};
</script>
