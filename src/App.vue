<template>
<v-app id="inspire">
    <Home></Home>
</v-app>
</template>

<script>
import Home from './views/Home'

export default {
    name: 'App',

    data: () => ({
        drawer: null,
    }),

    components: {
        Home
    },
};
</script>

<style>
.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}
</style>
