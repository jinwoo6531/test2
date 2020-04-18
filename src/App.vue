<template>
<v-app id="inspire">
    <vue-progress-bar></vue-progress-bar>
    <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
            <v-card color="transparent" flat v-if="!$isFirebaseAuth">
                <v-card-text class="text-xs-center">
                    <v-progress-circular indeterminate color="purple"></v-progress-circular>
                </v-card-text>
                <v-card-text class="text-xs-center">인증 상태를 기다리는 중입니다.</v-card-text>
            </v-card>
        </v-layout>
    </v-container>
    <router-view></router-view>
</v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        drawer: null,
    })
};
</script>

<style>
.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}
</style>
