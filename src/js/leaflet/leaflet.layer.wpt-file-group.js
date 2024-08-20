import { FileGroup } from "./leaflet.layer.file-group";

// https://www.oziexplorer4.com/eng/help/fileformats.html
export var WptFileGroup = FileGroup.extend({

    initialize: function (options) {
        FileGroup.prototype.initialize.call(this, options);
    },

    loadDataAsync: async function(data) {
        const lines = this.toString(data).split('\n');

        for (let i = 4; i < lines.length; i++) {

            let line = lines[i].trim();

            if (line.length == 0) {
                continue;
            }

            const fields = line.split(',');

            if (fields.length < 4) {
                continue;
            }

            this.addWaypoint(
                this.getFieldValue(fields[1]),
                this.getFieldFloatValue(fields[2]),
                this.getFieldFloatValue(fields[3]),
                this.getFieldFloatValue(fields[14]),
                this.getFieldValue(fields[10]));
        }
    },

    getFieldValue: function (field) {
        if (field === undefined) {
            return null;
        }
        return field.trim();
    },

    getFieldFloatValue: function (field) {
        var val = parseFloat(this.getFieldValue(field));
        if (isNaN(val)) {
            return null;
        }
        return val;
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