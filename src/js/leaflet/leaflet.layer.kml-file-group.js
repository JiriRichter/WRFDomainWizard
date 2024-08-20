import { kml } from "@tmcw/togeojson";
import { FileGroup } from "./leaflet.layer.file-group";

export var KmlFileGroup = FileGroup.extend({

    initialize: function (options) {
        FileGroup.prototype.initialize.call(this, options);
    },

    loadDataAsync: async function(data) {
        this.addKmlData(this.toXml(data));
    },

    addKmlData(xml){
        this.addData(kml(xml));
    }
});