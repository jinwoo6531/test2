<template>
<v-app id="inspire">
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
