<script>
if (self.start == 0) {
    if (self.end == 6) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        })
    } else if (self.end == 1) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        })
    } else if (self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        })
    } else if (self.end == 4) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 2 || self.end == 5) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    }
}
if (self.start == 6) {
    if (self.end == 1) {
        this.waypoints.push({
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        })
    } else if (self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        })
    } else if (self.end == 4) {
        this.waypoints.push({
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 2 || self.end == 5 || self.end == 0) {
        this.waypoints.push({
            lat: this.stationList[6].lat,
            lng: this.stationList[6].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    }
}
if (self.start == 1) {
    if (self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        })
    } else if (self.end == 4 || self.end == 2 || self.end == 5) {
        this.waypoints.push({
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 0 || self.end == 6) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[1].lat,
            lng: this.stationList[1].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    }
}
if (self.start == 3) {
    if (self.end == 4) {
        this.waypoints.push({
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 2) {
        this.waypoints.push({
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 5) {
        this.waypoints.push({
            lat: this.stationList[5].lat,
            lng: this.stationList[5].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    } else if (self.end == 0 || self.end == 6 || self.end == 1) {
        this.waypoints.push({
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        })
    }
}

if (self.start == 4) {
    if (self.end == 2) {
        this.waypoints.push({
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        })
    } else if (self.end == 5) {
        this.waypoints.push({
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[5].lat,
            lng: this.stationList[5].lon
        })
    } else if (self.end == 0 || self.end == 6 || self.end == 1 || self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    }
}
if (self.start == 2) {
    if (self.end == 5) {
        this.waypoints.push({
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[5].lat,
            lng: this.stationList[5].lon
        })
    } else if (self.end == 0 || self.end == 6 || self.end == 1) {
        this.waypoints.push({
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    } else if (self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    } else if (self.end == 4) {
        this.waypoints.push({
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[2].lat,
            lng: this.stationList[2].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    }
}

if (self.start == 5) {
    if (self.end == 0 || self.end == 6 || self.end == 1) {
        this.waypoints.push({
            lat: this.stationList[5].lat,
            lng: this.stationList[5].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    } else if (self.end == 3) {
        this.waypoints.push({
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    } else if (self.end == 4 || self.end == 2) {
        this.waypoints.push({
            lat: this.stationList[4].lat,
            lng: this.stationList[4].lon
        }, {
            lat: this.stationList[3].lat,
            lng: this.stationList[3].lon
        }, {
            lat: this.stationList[0].lat,
            lng: this.stationList[0].lon
        })
    }
}
</script>
