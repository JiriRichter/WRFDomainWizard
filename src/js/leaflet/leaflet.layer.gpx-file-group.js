import { parseGPX } from "@we-gold/gpxjs";
import { FileGroup } from "./leaflet.layer.file-group";

export var GpxFileGroup = FileGroup.extend({

    initialize: function (data, options) {
        FileGroup.prototype.initialize.call(this, data, options);
    },

    parseData: function(data) {
        const gpx = parseGPX(data);
        for(let i = 0; i < gpx.length; i++) {
            if (gpx[i] === null) {
                continue;
            }

            // waypoints
            if (Array.isArray(gpx[i].waypoints) && gpx[i].waypoints.length > 0) {
                gpx[i].waypoints.forEach((waypoint) => this.addWaypoint(waypoint.name, waypoint.latitude, waypoint.longitude, waypoint.altitude))
            }
        }
        return;
    }
});