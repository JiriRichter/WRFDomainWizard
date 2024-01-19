export var Waypoints = L.FeatureGroup.extend({
    options: {
    },

    initialize: function (waypoints, options) {
        var layers = [],
            marker;
        if (waypoints) {
            waypoints.forEach(function (waypoint) {
                if (waypoint.latitude && waypoint.longitude) {
                    marker = L.marker(L.latLng(waypoint.latitude, waypoint.longitude));
                    marker.bindTooltip(waypoint.name);
                    layers.push(marker);
                }
            });
        }
        L.FeatureGroup.prototype.initialize.call(this, layers, options);
    },
});

export function waypoints(waypoints, options) {
    return new Waypoints(waypoints, options);
};

export var Waypoint = L.Class.extend({

    name: null,
    latitude: null,
    longitude: null,
    altitude: null,
    description: null,

    initialize: function (name, latitude, longitude, altitude, description) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.description = description;
    }
})

export function waypoint(name, latitude, longitude, altitude, description) {
    return new Waypoint(name, latitude, longitude, altitude, description);
}

Waypoints.Parser = L.Class.extend({
    initialize: function () {
        console.log();
    },
    parse: function () {
        console.log();
    },
    getFieldValue: function (field) {
        if (field === undefined) {
            return null;
        }
        return field.trim();
    },
    getFieldFloatValue: function (field) {
        var val = parseFloat(this.getFieldValue(field));
        if (isNaN(val)) {
            return null;
        }
        return val;
    },
    readLines: function (data, start, fn) {
        var i,
            lines = data.split('\n');

        for (i = start; i < lines.length; i++) {
            fn.call(this, lines[i].trim());
        }
    }
})

Waypoints.Parser.Ozi = Waypoints.Parser.extend({
    parse: function (data) {
        var waypoints = [];
        this.readLines(data, 4, function (line) {
            waypoints.push(this.parseLine(line));
        });
        return waypoints;
    },
    parseLine: function (line) {
        var fields = line.split(',');
        return waypoint(
            this.getFieldValue(fields[1]),
            this.getFieldFloatValue(fields[2]),
            this.getFieldFloatValue(fields[3]),
            this.getFieldFloatValue(fields[14]),
            this.getFieldValue(fields[10])
        );
    }
})

Waypoints.Parser.Geo = Waypoints.Parser.extend({
    parse: function (data) {
        var waypoints = [];
        this.readLines(data, 1, function (line) {
            waypoints.push(this.parseLine(line));
        });
    },
    parseLine: function (line) {
    }
})

Waypoints.getParser = function (data) {
    if (typeof data !== 'string') {
        return null;
    }

    if (data.startsWith('OziExplorer Waypoint File')) {
        return new Waypoints.Parser.Ozi();
    }

    throw "Unrecognized file format";
}


Waypoints.parse = function (data) {
    return Waypoints.getParser(data).parse(data);
}