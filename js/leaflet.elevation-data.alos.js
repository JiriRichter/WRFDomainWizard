'use strict';

L.GeoJSON.ALOS = L.GeoJSON.ElevationData.extend({

    attribution: 'Provided by Japan Aerospace Exploration Agency (JAXA), product <a href="https://www.eorc.jaxa.jp/ALOS/en/aw3d30/" target="_blank">aw3d30</a>.',

    downloadBaseUrl: "ftp://ftp.eorc.jaxa.jp/",

    registrationUrl: 'https://www.eorc.jaxa.jp/ALOS/en/aw3d30/registration.htm',

    jsonUrl: "json/srtm/alos/AW3D30.json",

    getFeatureFilename: function (feature) {
        return feature.properties.filename;
    },

    getDownloadUrl: function (feature, filename) {
        return this.downloadBaseUrl + feature.properties.path + '/' + filename;
    },

    initialize: function (color) {

        L.setOptions(this, {
            'attribution': this.attribution
        })

        L.GeoJSON.ElevationData.prototype.initialize.call(this, this.jsonUrl, color);
    }
});

L.alos = function (color) {
    return new L.GeoJSON.ALOS(color);
};