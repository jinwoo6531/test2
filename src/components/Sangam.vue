<template>
<div class="map-container">
    <v-container class="grey lighten-5 pa-0">
        <v-row no-gutters>
            <v-col cols="12" xs="12" sm="12">
                <v-card id="map-container" class="pa-0" height="236px" outlined tile></v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'Gunsan',

    data: () => ({
        map: null,
        OSMUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    }),

    mounted() {
        this.map = this.$utils.map.createMap('map-container', {
            zoomControl: false,
            routeWhileDragging: false,
            attributionControl: false
        })

        // Open Street Map Layer Service Load
        this.$utils.map.createTileLayer(this.map, this.OSMUrl, {})

        // Map View Center Load
        this.map.setView([37.579200, 126.988880], 14)

        this.addMarker()
        this.addRouting()
    },

    methods: {
        addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            this.$utils.map.createMakerByXY(this.map, [37.5793330000000000, 126.8890360000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [37.5812960000000000, 126.8856930000000000], {
                icon: gifIcon
            });
        },

        addRouting() {
            const waypoints = [{
                    lat: 37.5793330000000000,
                    lng: 126.8890360000000000
                },
                {
                    lat: 37.57518,
                    lng: 126.89837
                },
                {
                    lat: 37.58299,
                    lng: 126.88485
                },
                {
                    lat: 37.5812960000000000,
                    lng: 126.8856930000000000
                },
                {
                    lat: 37.5793330000000000,
                    lng: 126.8890360000000000
                }
            ]
            this.$utils.map.createRouting(this.map, {
                waypoints: waypoints,
                serviceUrl: 'http://115.93.143.2:8104/route/v1',
                addWaypoints: false,
                draggableWaypoints: false,
                showAlternatives: false,
                routeWhileDragging: false,
                lineOptions: {
                    draggable: false,
                    styles: [{
                        color: '#E51973',
                        weight: 3
                    }]
                },
                draggable: false,
                autoRoute: true,
                show: false,
                createMarker: function() { return null; }
            })
        }
    }

}
</script>

<style scoped>
.map-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#map-container {
    width: 100%;
    height: 100%;
}
</style>
