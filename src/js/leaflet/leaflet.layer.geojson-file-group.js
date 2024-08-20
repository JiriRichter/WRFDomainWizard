import { FileGroup } from "./leaflet.layer.file-group";

export var GeoJsonFileGroup = FileGroup.extend({

    initialize: function (data, options) {
        FileGroup.prototype.initialize.call(this, data, options);
    },

    parseData: function(data) {
        this.addData(JSON.parse(data));
    }
});