import { FileGroup } from "./leaflet.layer.file-group";

export var GeoJsonFileGroup = FileGroup.extend({

    initialize: function (options) {
        FileGroup.prototype.initialize.call(this, options);
    },

    loadDataAsync: async function(data) {
        this.addData(JSON.parse(this.toString(data)));
    }
});