// credit: https://github.com/FacilMap/Leaflet.AutoGraticule

export var AutoGraticule = L.LayerGroup.extend({

    options: {
        redraw: 'moveend',
        minDistance: 100, // Minimum distance between two lines in pixels
        verticalLabelOffset: 200
    },

    lineStyle: {
        stroke: true,
        color: '#111',
        opacity: 0.6,
        weight: 1,
        interactive: false
    },

    _bounds: null,

    initialize: function(options) {
        L.LayerGroup.prototype.initialize.call(this, options);
        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        this._map = map;

        this.redraw();
        this._map.on('viewreset ' + this.options.redraw, this.redraw, this);

        this.eachLayer(map.addLayer, map);

        return this;
    },

    onRemove: function(map) {
        map.off('viewreset '+ this.options.redraw, this.redraw, this);
        this.eachLayer(this.removeLayer, this);
        return this;
    },

    redraw: function() {
        this._bounds = this._map.getBounds().pad(0.5);

        this.clearLayers();

        this.constructLines();

        return this;
    },

    constructLines: function() {
        const bounds = this._map.getBounds();
        const zoom = this._map.getZoom();

        // Fix drawing of lines outside of bounds
        this._bounds = AutoGraticule.bboxIntersect(bounds, [[-85, -180], [85, 180]]);

        // Fix drawing of labels outside of bounds
        const getBoundsBkp = this._map.getBounds;
        try {
            this._map.getBounds = function() {
                return AutoGraticule.bboxIntersect(getBoundsBkp.apply(this), [[-85, -180], [85, 180]])
            };

            // Longitude: Draw vartical lines with a fixed distance between each other
            const center = this._map.project(bounds.getCenter(), zoom);
            const divisor = AutoGraticule.getGridDivisor(this._map.unproject(center.add([ this.options.minDistance / 2, 0 ]), zoom).lng - this._map.unproject(center.subtract([ this.options.minDistance / 2, 0 ]), zoom).lng, false);
            const west = Math.max(bounds.getWest(), -180);
            const east = Math.min(bounds.getEast(), 180);
            for (let lng = AutoGraticule.fixFloatingPoint(Math.ceil(west/divisor)*divisor); lng <= east; lng+=divisor) {
                this.addLayer(this.buildXLine(lng));
                this.addLayer(this.buildLabel('gridlabel-horiz', AutoGraticule.fixFloatingPoint(lng)));
            }

            // Latitude: Draw horizontal lines with a variable distance between each other (as in Mercator projection, the distance
            // between latitudes gets bigger towards the poles). Calculate a divisor that all latitude line coordinates must be
            // dividable by, but then only draw those coordinates that keep the minimum distance to their neighbour lines.
            // Draw lines north of the equator separately from lines south of the equator (to keep the grid symmetical in
            // relation to the equator).
            if(bounds.getNorth() > 0) {
                let lat = Math.max(0, bounds.getSouth());
                let first = true;
                while(lat < bounds.getNorth() && lat < 85) {
                    const point = this._map.project([ lat, bounds.getCenter().lng ], zoom);
                    const point2LatLng = this._map.unproject(point.subtract([ 0, this.options.minDistance ]), zoom);

                    const divisor = AutoGraticule.getGridDivisor(point2LatLng.lat - lat, true);
                    lat = AutoGraticule.fixFloatingPoint(first ? Math.ceil(lat/divisor)*divisor : Math.ceil(point2LatLng.lat/divisor)*divisor);

                    first = false;

                    this.addLayer(this.buildYLine(lat));
                    this.addLayer(this.buildLabel('gridlabel-vert', lat));
                }
            }
            if(bounds.getSouth() < 0) {
                let lat = Math.min(0, bounds.getNorth());
                let first = true;
                while(lat > bounds.getSouth() && lat > -85) {
                    const point = this._map.project([ lat, bounds.getCenter().lng ], zoom);
                    const point2LatLng = this._map.unproject(point.add([ 0, this.options.minDistance ]), zoom);

                    const divisor = AutoGraticule.getGridDivisor(AutoGraticule.fixFloatingPoint(lat - point2LatLng.lat), true);
                    lat = AutoGraticule.fixFloatingPoint(first ? Math.floor(lat/divisor)*divisor : Math.floor(point2LatLng.lat/divisor)*divisor);

                    first = false;

                    this.addLayer(this.buildYLine(lat));
                    this.addLayer(this.buildLabel('gridlabel-vert', lat));
                }
            }
        } finally {
            this._map.getBounds = getBoundsBkp;
        }
    },

    buildXLine: function(x) {
        const bottomLL = new L.LatLng(this._bounds.getSouth(), x);
        const topLL = new L.LatLng(this._bounds.getNorth(), x);

        return new L.Polyline([bottomLL, topLL], this.lineStyle);
    },

    buildYLine: function(y) {
        const leftLL = new L.LatLng(y, this._bounds.getWest());
        const rightLL = new L.LatLng(y, this._bounds.getEast());

        return new L.Polyline([leftLL, rightLL], this.lineStyle);
    },

    buildLabel: function(axis, val) {
        const bounds = this._map.getBounds().pad(-0.003);
        let latLng;
        const styles = [];

        if (axis == 'gridlabel-horiz') {
            latLng = new L.LatLng(bounds.getNorth(), val);
        } else {
            latLng = new L.LatLng(val, bounds.getWest());
            if (this.options.verticalLabelOffset != null) {

                const swPoint = this._map.latLngToContainerPoint(this._bounds.getSouthWest());
                const leftMargin = Math.max(0, this.options.verticalLabelOffset - swPoint.x);

                styles.push(`margin-left: ${leftMargin}px`);
            }
        }

        let html = `<div class="${axis}"`;

        if (styles.length > 0) {
            html = html +  ` style="${styles.join(';')}"`;
        }

        html = html +  '>' + val + '&#8239;°</div>';

        return L.marker(latLng, {
            interactive: false,
            icon: L.divIcon({
                iconSize: [0, 0],
                className: 'leaflet-grid-label',
                html: html
            })
        });
    }
});

/**
 * Rounds the given number to a fixed number of decimals in order to avoid floating point inaccuracies
 * (for example to make 0.1 + 0.2 = 0.3 instead of 0.30000000000000004).
 */
AutoGraticule.fixFloatingPoint = function(number) {
    return AutoGraticule.round(number, 12);
}

/**
 * Rounds the given number to the given number of decimals.
 */
AutoGraticule.round = function(number, digits) {
    const fac = Math.pow(10, digits);
    return Math.round(number*fac)/fac;
}

/**
 * Given the distance between two coordinates, floors this distance to 90, 60, 45, 30 or
 * 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, ...
 * This will define the distance between two grid lines.
 * @param variableDistance This should be true when the distance between the grid lines will be variable, that is for the latitude
 *     lines (because in Meractor projection the distance between two latitutes gets larger towards the poles, but the distance
 *     between two longitudes is constant throughout the globe).
 *     For constant distance lines (longitude), a line should be shown for every coordinate dividable by the result of this
 *     function. For example, if the result is 45, a line should be shown for longitudes -180, -135, -90, -45, 0, 45, 90, 135, 180.
 *     For variable distance lines (latitude), a line should be shown for coordinates dividable by a result of this function, but
 *     not for every single coordinate but only those that have a minimum distance towards their neighbour coordinate line. For
 *     variable distance lines, the maximum number returned by this function is 5, meaning at low zoom levels, all latitude lines
 *     are dividable by 5 (but not every latitude dividable by 5 will get a line).
 */
AutoGraticule.getGridDivisor = function(number, variableDistance) {
    if(number <= 0 || !isFinite(number))
        throw new Error("Invalid number " + number);
    else {
        if(variableDistance && number >= 5)
            return 5;
        if(number <= 10) {
            let fac = 1;
            while(number>1) { fac*=10; number/=10; }
            while(number<=0.1) { fac/=10; number*=10; }

            // Dist is now some number between 0.1 and 1, so we can round it conveniently and then multiply it again by fac to get back to the original dist

            if(number == 0.1)
                return AutoGraticule.fixFloatingPoint(0.1*fac);
            else if(number <= 0.2)
                return AutoGraticule.fixFloatingPoint(0.2*fac);
            else if(number <= 0.5)
                return AutoGraticule.fixFloatingPoint(0.5*fac);
            else
                return fac;
        } else if(number <= 30)
            return 30;
        else if(number <= 45)
            return 45;
        else if(number <= 60)
            return 60;
        else
            return 90;
    }
}
// Backwards compatibility
AutoGraticule.niceRound = AutoGraticule.getGridDivisor;

AutoGraticule.bboxIntersect = function(bbox1, bbox2) {
    const bounds1 = bbox1 instanceof L.LatLngBounds ? bbox1 : L.latLngBounds(bbox1);
    const bounds2 = bbox2 instanceof L.LatLngBounds ? bbox2 : L.latLngBounds(bbox2);
    return L.latLngBounds([
        [ Math.max(bounds1.getSouth(), bounds2.getSouth()), Math.max(bounds1.getWest(), bounds2.getWest())],
        [ Math.min(bounds1.getNorth(), bounds2.getNorth()), Math.min(bounds1.getEast(), bounds2.getEast())]
    ]);
}