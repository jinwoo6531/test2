<template>
<v-app id="tasio" style="width: 100%; height: 100%; background: #FAFAFA;">
    <v-content>
        <router-view v-if="!$store.state.loading"></router-view>
        <v-progress-circular :size="70" :width="7" v-else color="purple" indeterminate></v-progress-circular>
    </v-content>
</v-app>
</template>

<script>
export default {
    name: 'App',
    
    
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
</style>
