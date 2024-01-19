import { ElevationData } from './leaflet.elevation-data'

export var ElevationDataSRTMCSI = ElevationData.extend({

    attribution: 'Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT), available from <a href="http://srtm.csi.cgiar.org" target="_blank">http://srtm.csi.cgiar.org</a>.',

    downloadBaseUrl: "http://srtm.csi.cgiar.org/wp-content/uploads/files/",

    //jsonBaseUrl: "http://srtm.csi.cgiar.org/wp-content/themes/srtm_theme/json/",
    jsonBaseUrl: "json/srtm/csi/",

    jsonFileByTileSize: {
        '5': 'srtm30_5x5.json',
        '30': 'srtm30_30x30.json',
    },

    downloadFolderByTileSize: {
        '5': 'srtm_5x5',
        '30': 'srtm_30x30',
    },

    downloadFolderByType: {
        'TIFF': "TIFF",
        'ASCII': "ASCII",
    },

    getFeatureFilename: function (feature) {
        if (feature.properties.SUFF_NAME && feature.properties.SUFF_NAME[0] == '_') {
            return feature.properties.SUFF_NAME.substring(1);
        }
        return feature.properties.SUFF_NAME;
    },

    getDownloadUrl: function (feature, filename) {
        return this.downloadBaseUrl + filename;
    },

    initialize: function (type, tileSize, color) {
        var jsonUrl = this.jsonBaseUrl;

        type = type.toUpperCase().trim();

        if (this.jsonFileByTileSize[tileSize]) {
            jsonUrl += this.jsonFileByTileSize[tileSize]
        }
        else {
            throw "Invalid SRTM-CSI tile size";
        }

        if (this.downloadFolderByTileSize[tileSize]) {
            this.downloadBaseUrl += this.downloadFolderByTileSize[tileSize] + '/';
        }
        else {
            throw "Invalid SRTM-CSI tile size";
        }

        if (this.downloadFolderByType[type]) {
            this.downloadBaseUrl += this.downloadFolderByType[type] + '/';
        }
        else {
            throw "Invalid SRTM-CSI type";
        }

        L.setOptions(this, {
            'attribution': this.attribution
        })

        ElevationData.prototype.initialize.call(this, jsonUrl, color);
    }
});

export function elevationDataSRTMCSI (type, tileSize, color) {
    return new ElevationDataSRTMCSI(type, tileSize, color);
};