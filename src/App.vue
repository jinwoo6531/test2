<template>
<v-app id="tasio" style="width: 100%; height: 100%; background: #FAFAFA;">
    <!-- <v-content>
        <router-view v-if="isLoading == false"></router-view>
        <v-container fluid v-else style="display: flex; position: absolute; background: rgba(0, 0, 0, 0.5); height: 100%; pointer-events: none !important; z-index: 20;">
            <v-row align="center" justify="center">
                <v-card color="transparent" flat>
                    <v-card-text class="text-center">
                        <v-progress-circular indeterminate size="50" color="#E61773"></v-progress-circular>
                    </v-card-text>
                    <v-card-text class="text-center" style="color: #FFF;">
                        Loading..
                    </v-card-text>
                </v-card>
            </v-row>
        </v-container>
    </v-content> -->

    <v-content>
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'App',

    computed: {
        ...mapGetters(['isLoading']),
        ...mapGetters({
            user: "user"
        }),
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

#tasio {
    background: #FAFAFA !important;
    font-family: 'Noto Sans KR', sans-serif;
    position: relative;
}

.theme--light.v-application {
    background: #FAFAFA !important;
    font-family: 'Noto Sans KR', sans-serif;
}

.progress {
    position: absolute;
    top: 50%;
    transform: translateY(-90%);
}

/* Navigation-drawer */
.boldMenu {
    margin-top: 20px;
}

.nav-footer {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: flex-end;
    color: #BDBDBD;
}

.v-btn:hover:before,
.v-btn:focus:before {
    background-color: transparent;
}   

.v-card:hover:before,
.v-card:focus:before {
    background-color: transparent;
}

.v-checkbox:hover:before,
.v-checkbox:focus:before {
    background-color: transparent;
}
</style>
