import "leaflet/dist/leaflet.css"
import $L from "leaflet"

const createMap = (divId, options) => {
    let map = $L.map(divId, options)
    return map
};

const createTileLayer = async (map, url, options) => {
    let tileLayer = await $L.tileLayer(url, options)
    tileLayer.addTo(map)
    return tileLayer
}

// Icon과 Maker의 두 가지 생성 방법 추가
const createIcon = options => {
    return $L.icon(options)
}

/**
 *
 * @param {Object} map
 * @param {Object} latLng
 * @param {Object} options
 * 
 */

const createMakerByXY = (map, coordinate, options = {}) => {
    let marker = $L.marker($L.latLng(coordinate[0], coordinate[1]), options)
    marker.addTo(map)
    return marker
}

const updateMarkerByXY = (map, coordinate) => {
    let marker = $L.marker($L.latLng(coordinate[0], coordinate[1])).update(marker)
    marker.addTo(map)
    return marker
}

// Leaflet Default Maker를 표시 할 수없는 문제 해결
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
let DefaultIcon = $L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
})
$L.Marker.prototype.options.icon = DefaultIcon

const createRouting = (map, options = {}) => {
    let control = $L.Routing.control(options)
    control.addTo(map)
    return control
}

const getLocation = (map, options) => {
    var marker, circle
    var location =  map.locate(options)
        .on("locationfound", function (e) {
             marker = $L.marker($L.latLng(e.latitude, e.longitude))

             circle = $L.circle([e.latitude, e.longitude], e.accuracy / 2, {
                weight: 1,
                color: "blue",
                fillOpacity: 0.1
            })
            console.log('asdfasdfsd', circle)
            marker.addTo(map)
            circle.addTo(map)
        })
        .on("locationerror", function (e) {
            console.log(e);
            alert("Location access denied.");
        })
        
        console.log("location", location)
        console.log("marker", marker)
        console.log("circle", circle)
        return location
}

export default {
    createMap,
    createTileLayer,
    createIcon,
    createMakerByXY,
    createRouting,
    updateMarkerByXY,
    getLocation
}