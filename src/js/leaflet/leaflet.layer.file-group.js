export var FileGroup = L.GeoJSON.extend({
    options: {
    },

    initialize: function (data, options) {
        L.GeoJSON.prototype.initialize.call(this, null, options);
        if (data) {
            this.parseData(data);
        }
    },

    parseData: function(data) {
    },

    addWaypoint: function(name, latitude, longitude, altitude, description) {

        if (latitude == null || latitude == undefined) {
            throw new Error("Waypoint latitude is missing");
        }

        if (longitude == null || longitude == undefined) {
            throw new Error("Waypoint longitude is missing");
        }

        const marker = L.marker(L.latLng(latitude, longitude));
        marker.bindTooltip(name);
        this.addLayer(marker);
    }
});