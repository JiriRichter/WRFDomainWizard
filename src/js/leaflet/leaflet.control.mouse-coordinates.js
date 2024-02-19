export var MouseCoordinates = L.Control.extend({
    options: {
        position: 'bottomleft',
        precision: 4,
        contextMenu: false
    },

    initialize: function (options) {
        L.Control.prototype.initialize.call(this, options);
    },

    onAdd: function (map) {

        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-touch leaflet-control leaflet-control-coordinates');
        this.latElement = L.DomUtil.create('div', null, container);
        this.lngElement = L.DomUtil.create('div', null, container);

        var self = this;
        map.on('mousemove', function (event) {
            self.setCoordinates(event.latlng);
        });

        if (this.options.contextMenu === true) {
            map.on('contextmenu', function (event) {

                if (self.popup && self.popup.isOpen()) {
                    self.popup.remove();
                }

                self.popup = L.popup()
                    .setLatLng(event.latlng)
                    .setContent("lat/lon: " + event.latlng.lat.toFixed(self.options.precision) + ', ' + event.latlng.lng.toFixed(self.options.precision))
                    .openOn(map);
            });
        }

        self.setCoordinates(map.getCenter());
        return container;
    },

    _addText: function (container, context) {


        return container;
    },

    setCoordinates: function (latlng) {
        L.DomUtil.get(this.latElement).innerHTML = '<span>lat: </span>' + latlng.lat.toFixed(this.options.precision);
        L.DomUtil.get(this.lngElement).innerHTML = '<span>lon: </span>' + latlng.lng.toFixed(this.options.precision);
    }
});

//constructor registration
export function mouseCoordinates(options) {
    return new MouseCoordinates(options);
};