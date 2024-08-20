import { stringToXml } from "../utils/data";

export var FileGroup = L.GeoJSON.extend({
    options: {
    },

    initialize: function (options) {
        L.GeoJSON.prototype.initialize.call(this, null, options);
    },

    loadDataAsync: async function(data) {
    },

    toXml(data) {
        return stringToXml(this.toString(data));
    },

    toString(data) {
        return new TextDecoder().decode(data);
    }
});