import { gpx } from "@tmcw/togeojson";
import { FileGroup } from "./leaflet.layer.file-group";

export var GpxFileGroup = FileGroup.extend({

    initialize: function (options) {
        FileGroup.prototype.initialize.call(this, options);
    },

    loadDataAsync: async function(data) {
        this.addData(gpx(this.toXml(data)));
    }
});