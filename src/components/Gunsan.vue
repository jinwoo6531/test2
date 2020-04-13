<template>
<v-container class="map-container" fluid grid-list-md>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-card id="map-container" class="pa-0" height="236px" outlined tile></v-card>
        </v-flex>
    </v-layout>
</v-container>
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
      this.map.setView([35.812484, 126.4110], 15)

      this.addMarker()
      this.addRouting()
    },

    methods: {
      addMarker() {
            let gifIcon = this.$utils.map.createIcon({
                iconUrl: require("../assets/station_icon.svg"),
                iconSize: [12, 12]
            });

            this.$utils.map.createMakerByXY(this.map, [35.8118970000000000, 126.4048860000000000], {
                icon: gifIcon
            })
            this.$utils.map.createMakerByXY(this.map, [35.8141840000000000, 126.4098450000000000], {
                icon: gifIcon
            });
            this.$utils.map.createMakerByXY(this.map, [35.8138460000000000, 126.4132000000000000], {
                icon: gifIcon
            });
            this.$utils.map.createMakerByXY(this.map, [35.8136980000000000, 126.4137440000000000], {
                icon: gifIcon
            });
            this.$utils.map.createMakerByXY(this.map, [35.8114720000000000, 126.4164430000000000], {
                icon: gifIcon
            });
        },

        addRouting() {
            const waypoints = [{
                    lat: 35.8118970000000000,
                    lng: 126.4048860000000000
                },
                {
                    lat: 35.8141840000000000,
                    lng: 126.4098450000000000
                },
                {
                    lat: 35.8138460000000000,
                    lng: 126.4132000000000000
                },
                {
                    lat: 35.8136980000000000,
                    lng: 126.4137440000000000
                },
                {
                    lat: 35.8114720000000000,
                    lng: 126.4164430000000000
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