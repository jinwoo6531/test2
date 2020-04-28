<template>
<v-app id="tasio">
    <v-container class="pa-0 ma-0 text-center progress">
        <v-layout row wrap align-center justify-center>
            <v-card color="transparent" flat v-if="!$isFirebaseAuth">
                <v-card-text>
                    <v-progress-circular width="5" size="50" indeterminate color="purple"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>

    <v-content>
        <router-view></router-view>
    </v-content>
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

#tasio {
    background: #FAFAFA;
    position: relative;
}

.progress {
    position: absolute;
    top: 50%;
    transform: translateY(-90%);
}

.container {
    font-family: 'Noto Sans KR', sans-serif;
    background: #FAFAFA;
}

.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}
</style>
