import { ElevationData } from './leaflet.elevation-data'

export var ElevationDataSRTMNASAV3 = ElevationData.extend({

    downloadBaseUrl: 'https://e4ftl01.cr.usgs.gov/MEASURES/',

    jsonBaseUrl: "json/srtm/nasa/",

    registrationUrl: 'https://urs.earthdata.nasa.gov/',

    getDownloadUrl: function (feature, filename) {
        return this.downloadBaseUrl + filename;
    },

    initialize: function (dim, color) {
        var jsonUrl = this.jsonBaseUrl,
            folderName;

        switch (dim) {
            case 1:
                folderName = 'SRTMGL1.003';
                L.setOptions(this, {
                    'attribution': 'NASA JPL.NASA Shuttle Radar Topography Mission Global 1 arc second. 2013, distributed by NASA EOSDIS Land Processes DAAC, <a href="https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL1.003" target="_blank">https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL1.003</a>.'
                });
                break;
            case 3:
                folderName = 'SRTMGL3.003';
                L.setOptions(this, {
                    'attribution': 'NASA JPL.NASA Shuttle Radar Topography Mission Global 3 arc second. 2013, distributed by NASA EOSDIS Land Processes DAAC, <a href="https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL3.003" target="_blank">https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL3.003</a>.'
                });
                break;
            default:
                throw "Invalid arc second dimension. Allowed values are 1 and 3"
        }

        jsonUrl += folderName + '.json';
        this.downloadBaseUrl = this.downloadBaseUrl + folderName + '/2000.02.11/';

        ElevationData.prototype.initialize.call(this, jsonUrl, color);
    }
});

export function elevationDataSRTMNASAV3(dim, color) {
    return new ElevationDataSRTMNASAV3(dim, color);
};