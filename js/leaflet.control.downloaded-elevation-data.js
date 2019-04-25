L.Control.DownloadedElevationData = L.Control.extend({
    options: {
        position: 'topleft'
    },

    _container: null,
    _downloadUrlContainer: null,

    _urls: null,

    visible: false,

    initialize: function (overlays, options) {
        L.Control.prototype.initialize.call(this, options);
    },

    _onClosedHandlers: null,

    addOnClosedHandler: function (handler) {
        if (this._onClosedHandlers === null) {
            this._onClosedHandlers = [];
        }
        this._onClosedHandlers.push(handler);
    },

    onAdd: function (map) {
        this.visible = true;

        this._container = L.DomUtil.create('div', 'leaflet-touch leaflet-control leaflet-control-downloaded-elevation-data');
        this._container.innerHTML = '<a class="leaflet-popup-close-button" href="#close" style="">&times;</a>'

        $('a.leaflet-popup-close-button', this._container).on('click', { control: this }, function (e) {
            if (e.data.control._onClosedHandlers !== null) {
                $.each(e.data.control._onClosedHandlers, function () {
                    this.call(e.data.control);
                });
            }
            e.data.control.remove();
        });

        this._downloadUrlContainer = L.DomUtil.create('div', null, this._container);
        this._urls = [];

        return this._container;
    },

    onRemove: function (map) {
        this._container = null;
        this._downloadUrlContainer = null;
        this._urls = null;
        this.visible = false;
    },

    addDownloadUrl: function (url) {
        if (this._urls.includes(url)) {
            return;
        }
        this._urls.push(url);
        L.DomUtil.create('div', null, this._downloadUrlContainer).innerHTML = '<a href="' + url + '" target="_blank">' + url + '</a>';
    }

});

//constructor registration
L.control.downloadedElevationData = function (options) {
    return new L.Control.DownloadedElevationData(options);
};