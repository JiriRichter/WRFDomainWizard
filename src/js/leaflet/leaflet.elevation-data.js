export var ElevationData = L.GeoJSON.extend({

    getFeatureFilename: function (feature) {
        return feature.properties.filename;
    },

    getDownloadUrl: function (feature, filename) {
        return filename;
    },

    data: null,

    _downloadedLayers: null,

    clearDownloaded: function () {
        if (this._downloadedLayers != null) {
            $.each(this._downloadedLayers, function () {
                this.feature.downloaded = false;
                this.setStyle({
                    'fillColor': null,
                    'fillOpacity': ElevationData.FillOpacity
                });
            });
            this._downloadedLayers = null;
        }
    },

    onAdd: function (map) {
        if (map.spin == undefined) {
            this.addData(this.data);
        }
        else {
            map.spin(true);

            setTimeout((function (self, map) {
                return function () {
                    self.addData(self.data);
                    map.spin(false);
                };
            })(this, map), 1);
        }
    },

    onRemove: function (map) {
        this.clearLayers(this.data);
    },

    initialize: function (jsonUrl, color) {
        var self = this;

        if (color == undefined) {
            if (ElevationData.CurrentColor >= ElevationData.Colors.length) {
                ElevationData.CurrentColor = 0;
            }
            color = ElevationData.Colors[ElevationData.CurrentColor];
            ElevationData.CurrentColor++;
        }

        L.setOptions(this, {
            'style': {
                'weight': ElevationData.Weight,
                'fillOpacity': ElevationData.FillOpacity,
                'color': color
            },

            'onEachFeature': function (feature, layer) {
                var popupContent, filename, downloadUrl;
                //feature.downloaded = false;

                layer.on('mouseover', function (e) {
                    if (feature.downloaded) {
                        layer.setStyle({
                            'weight': ElevationData.Weight * 3
                        });
                    }
                    else {
                        layer.setStyle({
                            'weight': ElevationData.Weight * 3,
                            'fillOpacity': ElevationData.FillOpacity * 3
                        });
                    }
                });

                layer.on('mouseout', function (e) {
                    if (feature.downloaded) {
                        layer.setStyle({
                            weight: ElevationData.Weight,
                        });
                    }
                    else {
                        layer.setStyle({
                            weight: ElevationData.Weight,
                            fillOpacity: ElevationData.FillOpacity
                        });
                    }
                });

                if (feature.downloaded) {
                    layer.setStyle({
                        'fillColor': ElevationData.ColorDownloaded,
                        'fillOpacity': ElevationData.FillOpacity * 3
                    });
                }

                filename = self.getFeatureFilename(feature);
                if (filename) {
                    downloadUrl = self.getDownloadUrl(feature, filename);

                    layer.bindTooltip(
                        filename,
                        {
                            'sticky': true,
                            'className': 'tooltip-srtm'
                        });

                    popupContent = '<div class="popup-elevation-data"><table>';
                    if (self.options['attribution'] != undefined) {
                        popupContent += '<tr><td>Source:</td><td>' + self.options['attribution'] + '</td></tr>';
                    }
                    if (self.registrationUrl !== undefined) {
                        popupContent += '<tr><td>Registration:</td><td><i class="fas fa-shield-alt text-danger"></i> <a href="' + self.registrationUrl + '" target="_blank">' + self.registrationUrl + '</a></td></tr>';
                    }
                    popupContent += '<tr><td>Filename:</td><td>' + filename + '</td></tr>';
                    popupContent += '</table>' +
                        '<a class="btn btn-outline-secondary btn-sm" role="button" href="' + downloadUrl + '" target="_blank">Download</a>' +
                        '</div>';

                    layer.bindPopup(popupContent);

                    layer.on('popupopen', function (e) {
                        $('div.popup-elevation-data a', e.popup.getElement()).on('click', { popup: e.popup, layer: e.sourceTarget, downloadUrl: downloadUrl, feature: feature }, function (e) {
                            e.data.feature.downloaded = true;
                            e.data.layer.setStyle({
                                'fillColor': ElevationData.ColorDownloaded,
                                'fillOpacity': ElevationData.FillOpacity * 3
                            });
                            if (self._downloadedLayers == null) {
                                self._downloadedLayers = [];
                            }
                            e.data.layer.feature = e.data.feature;
                            self._downloadedLayers.push(e.data.layer);
                            e.data.layer.closePopup();
                            e.data.layer.fire('elevationDataDownload', {
                                downloadUrl: downloadUrl,
                                filename: filename,
                                feature: e.data.feature,
                                layer: e.data.layer,
                                source: self
                            }, true);
                        });
                    });
                }
            }
        });

        L.GeoJSON.prototype.initialize.call(this, null, this.options);

        $.getJSON(jsonUrl, function (data) {
            self.data = data;
        });
    }
});

ElevationData.Colors = ['#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
ElevationData.ColorDownloaded = '#e41a1c';
ElevationData.CurrentColor = 0;
ElevationData.Weight = 1;
ElevationData.FillOpacity = 0.1;

export function elevationData (jsonUrl, color) {
    return new ElevationData(jsonUrl, color);
};