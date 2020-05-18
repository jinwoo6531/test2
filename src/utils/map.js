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
    var marker //, circle
    var location = new Promise(function (resolve, reject) {
            map.locate(options)
                .on("locationfound", function (e) {
                    if (e) {
                        let currentIcon = createIcon({
                            iconUrl: require("../assets/current.svg"),
                            iconSize: [17, 17]
                        })

                        //marker = createMakerByXY(map, [e.latitude, e.longitude], {
                        //    icon: currentIcon
                        //})
            
                        marker = $L.marker($L.latLng(e.latitude, e.longitude), {
                            icon: currentIcon
                        })
                        
                        // circle = $L.circle([e.latitude, e.longitude], e.accuracy / 2, {
                        //     weight: 1,
                        //     color: "blue",
                        //     fillOpacity: 0.1
                        // })

                        marker._leaflet_id = "current"

                        marker.addTo(map)
                        // circle.addTo(map)
                        resolve(marker)
                    } else {
                        reject('위치 가져오기 실패')
                    }
                })
                .on("locationerror", function (e) {
                    console.log(e);
                    alert("Location access denied.");
                })
        })
        .then(function (currentMarker) {
            console.log('currentMarker', currentMarker)
            return currentMarker
        }, function (error) {
            console.error(error)
        })

    console.log("location", location)
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