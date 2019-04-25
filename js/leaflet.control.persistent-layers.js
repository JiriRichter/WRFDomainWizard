'use strict';

L.Control.PersistentLayers = L.Control.Layers.extend({

    _localStorageKey: '_leaflet_persistent_layers',
    _layers: null,
    _currentBaseLayer: null,
    _overlays: null,
    _map: null,

    getCurrentLayer: function () {
        if (this._currentBaseLayer) {
            return this._currentBaseLayer;
        }
        if (!this._layers) {
            return null;
        }
        var key = localStorage.getItem(this._localStorageKey + '_layer');
        if (key) {
            this._currentBaseLayer = this._layers[key];
        }
        if (!this._currentBaseLayer) {
            this._currentBaseLayer = this._getDefaultLayer();
        }
        return this._currentBaseLayer;
    },

    _getDefaultLayer: function () {
        var key;
        for (key in this._layers) {
            if (this._layers.hasOwnProperty(key)) {
                return this._layers[key];
            }
        }
        return null;
    },

    _configZoom: function () {
        if (!this._currentBaseLayer) {
            return;
        }

        var currentZoom = this._map.getZoom(),
            minZoom = this._currentBaseLayer.options.minZoom || 1,
            maxZoom = this._currentBaseLayer.options.maxZoom || 13;

        this._map.setMinZoom(minZoom);
        this._map.setMaxZoom(maxZoom);
        if (currentZoom < minZoom) {
            this._map.setZoom(minZoom);
        }
        else if (currentZoom > maxZoom) {
            this._map.setZoom(maxZoom);
        }
    },

    onAdd: function (map) {
        // remember selected tile provider
        var self = this;
        this._map = map;
        map.on('baselayerchange', function (e) {
            localStorage.setItem(self._localStorageKey + '_layer', e.name);
            self._currentBaseLayer = self._layers[e.name];
            self._configZoom();
        });
        this._configZoom();
        return L.Control.Layers.prototype.onAdd.call(this, map);
    },

    onRemove: function (map) {
        map.off('baselayerchange');
    },

    initialize: function (layers, overlays, options) {
        this._layers = layers;
        this._overlays = overlays;
        this._currentBaseLayer = this.getCurrentLayer();
        L.Control.Layers.prototype.initialize.call(this, layers, overlays, options);
    }

})

L.control.persistentLayers = function (layers, overlays, options) {
    return new L.Control.PersistentLayers(layers, overlays, options)
}