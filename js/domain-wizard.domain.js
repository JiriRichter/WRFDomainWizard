/**
 * 
 * @name WRFDomain
 * @class 
 * @property {WRFDomainGrid} grid
 * @property {boolean} needsUpdate 
 * 
 * 
 */

 /**
 * @constructor
 */
var WRFDomain = L.Layer.extend({

    options: {

    },

    _map: null,

    // main grid
    _mainGrid: null,

    _selectedGrid: null,
    setSelectedGrid: function (grid) {
        this._selectedGrid = grid;
    },

    // domain parameters
    map_proj: null,
    truelat1: null,
    truelat2: null,
    stand_lon: null,
    ref_lat: null,
    ref_lon: null,
    dx: null,
    dy: null,

    // domain center marker
    _centerMarker: null,

    // depth structure of all grids for grid sorting
    _gridsByDepth: null,

    _orderGrids: function (force) {
        if (!this._gridsByDepth || force) {
            this._gridsByDepth = [];
            this._walkGrids(this._mainGrid, function (grid) {
                if (this._gridsByDepth[grid.depth]) {
                    this._gridsByDepth[grid.depth].push(grid);
                }
                else {
                    this._gridsByDepth[grid.depth] = [grid];
                }
            }, this);
        }
        var i, j;
        for (i = 0; i < this._gridsByDepth.length; i++) {
            for (j = 0; j < this._gridsByDepth[i].length; j++) {
                this._gridsByDepth[i][j].bringToFront();
            }
        }
    },

    _walkGrids: function (grid, callback, context) {
        callback.call(context, grid);
        if (grid.nests && grid.nests.length > 0) {
            for (var i = 0; i < grid.nests.length; i++) {
                this._walkGrids(grid.nests[i], callback, context);
            }
        }
    },

    _dragContext: null,

    _onCenterMarkerDrag: function (e) {
        this.ref_lat = e.latlng.lat;
        this.ref_lon = e.latlng.lng;

        this.stand_lon = this.ref_lon + this._dragContext.stand_lon_delta;
        this.truelat1 = this.ref_lat + this._dragContext.truelat1_delta;
        this.truelat2 = this.ref_lat + this._dragContext.truelat2_delta;

        this.update();
    },

    onAdd: function (map) {
        this._map = map;

        this._map.on('click', function (e) {
            if (this._map.getContainer() == e.originalEvent.target && this._selectedGrid) {
                this._selectedGrid.unselect();
                this._selectedGrid = null;
            }
        }, this);

        this._centerMarker = L.marker([this.ref_lat, this.ref_lon], {
            draggable: true,
            title: 'Domain Center',
        }).addTo(map);

        this._mainGrid.addTo(map);
        this._orderGrids();

        this._centerMarker.on('dragstart', function (event) {
            this._dragContext = {
                stand_lon_delta: this.stand_lon - this.ref_lon,
                truelat1_delta: this.truelat1 - this.ref_lat,
                truelat2_delta: this.truelat2 - this.ref_lat
            };

            this._mainGrid.unbindTooltip();
            if (this._selectedGrid) {
                this._selectedGrid.hideGridLines();
            }
        }, this);

        this._centerMarker.on('drag', this._onCenterMarkerDrag, this);
        this._centerMarker.on('dragend', function (e) {
            e.latlng = this._centerMarker.getLatLng();
            this._onCenterMarkerDrag(e);
            this._mainGrid.bindTooltip();
            if (this._selectedGrid) {
                this._selectedGrid.showGridLines();
            }
        }, this);
    },

    onRemove: function (map) {
        this._centerMarker.off();
        this._centerMarker.remove();
        this._mainGrid.remove();
    },

    _getProjection: function () {
        return new WRFProjection(this.map_proj, this.ref_lat, this.ref_lon, this.truelat1, this.truelat2, this.stand_lon, this.dx, this.dy, this._mainGrid.e_we, this._mainGrid.e_sn);
    },

    update: function () {
        this._centerMarker.setLatLng(L.latLng(this.ref_lat, this.ref_lon));
        this._mainGrid.update();
        this.fire('wps:change');
    },

    initialize: function (wpsNamelist, options) {

        if (wpsNamelist !== undefined) {
            this.map_proj = wpsNamelist.geogrid.map_proj;
            this.truelat1 = wpsNamelist.geogrid.truelat1;
            this.truelat2 = wpsNamelist.geogrid.truelat2;
            this.stand_lon = wpsNamelist.geogrid.stand_lon;
            this.ref_lat = wpsNamelist.geogrid.ref_lat;
            this.ref_lon = wpsNamelist.geogrid.ref_lon;
            this.dx = wpsNamelist.geogrid.dy;
            this.dy = wpsNamelist.geogrid.dy;

            this._mainGrid = new WRFDomainGrid(this, null, 1, wpsNamelist);
        }

        L.Util.setOptions(this, options);
    },

    getWPSNamelist: function () {
        var wpsNamelist = new WPSNamelist();
        wpsNamelist.share.max_dom = this.max_dom;
        wpsNamelist.geogrid.map_proj = this.map_proj;
        wpsNamelist.geogrid.truelat1 = this.truelat1;
        wpsNamelist.geogrid.truelat2 = this.truelat2;
        wpsNamelist.geogrid.stand_lon = this.stand_lon;
        wpsNamelist.geogrid.ref_lat = this.ref_lat;
        wpsNamelist.geogrid.ref_lon = this.ref_lon;
        wpsNamelist.geogrid.dx = this.dx;
        wpsNamelist.geogrid.dy = this.dy;

        wpsNamelist.geogrid.parent_id = [];
        wpsNamelist.geogrid.parent_grid_ratio = [];
        wpsNamelist.geogrid.i_parent_start = [];
        wpsNamelist.geogrid.j_parent_start = [];
        wpsNamelist.geogrid.e_we = [];
        wpsNamelist.geogrid.e_sn = [];
        wpsNamelist.geogrid.geog_data_res = [];
        this.grid.addToNamelist(wpsNamelist);
        return wpsNamelist;
    },

    createMainGrid: function () {
        if (this._mainGrid) {
            this._mainGrid.remove();
        }
        this._mainGrid = new WRFDomainGrid(this, null, 1);
        this._mainGrid.parent_grid_ratio = 1;
        this._mainGrid.i_parent_start = 1;
        this._mainGrid.j_parent_start = 1;
        this._mainGrid.e_we = WRFDomainGrid.minGridSize;
        this._mainGrid.e_sn = WRFDomainGrid.minGridSize;
    }
});

Object.defineProperties(WRFDomain.prototype, {
    'grid': {
        get() {
            return this._mainGrid;
        }
    },
    'max_dom': {
        get() {
            var count = this._mainGrid.count;
            return count;
        }
    },
    // multiplicator to calculate resolution (pixels per grid point)
    'dxPixelsMul': {
        get() {
            return this.dx / 156543.03392 / Math.cos(this.ref_lat * Math.PI / 180);
        }
    },
});

WRFDomain.prototype.addMainGrid = /** @this {WRFDomainGrid} */ function () {
    var moad,
        mod_e_we,
        mod_e_sn,
        stand_lon_delta,
        truelat1_delta,
        truelat2_delta,
        center;

    // create new grid
    moad = new WRFDomainGrid(this, null, 1);

    // change current moad parameters
    this._mainGrid.parent_grid_ratio = 3;
    this._mainGrid.i_parent_start = WRFDomainGrid.minNestGridPoints + 1;
    this._mainGrid.j_parent_start = WRFDomainGrid.minNestGridPoints + 1;
    mod_e_we = (this._mainGrid.e_we - 1) % this._mainGrid.parent_grid_ratio;
    if (mod_e_we != 0) {
        this._mainGrid.e_we += this._mainGrid.parent_grid_ratio - mod_e_we;
    }
    mod_e_sn = (this._mainGrid.e_sn - 1) % this._mainGrid.parent_grid_ratio;
    if (mod_e_sn != 0) {
        this._mainGrid.e_sn += this._mainGrid.parent_grid_ratio - mod_e_sn;
    }

    // if e_we or e_sn was modified - move the domain center
    if ((mod_e_we != 0) || (mod_e_sn != 0)) {
        stand_lon_delta = this.stand_lon - this.ref_lon;
        truelat1_delta = this.truelat1 - this.ref_lat;
        truelat2_delta = this.truelat2 - this.ref_lat;

        center = this._mainGrid.projection.corners_ij_to_latlon((this._mainGrid.e_we - 1) / 2, (this._mainGrid.e_sn - 1) / 2);
        this.ref_lat = center[0];
        this.ref_lon = center[1];
        this.stand_lon = this.ref_lon + stand_lon_delta;
        this.truelat1 = this.ref_lat + truelat1_delta;
        this.truelat2 = this.ref_lat + truelat2_delta;
    }

    // set domain dx/dy
    this.dx = this.dx * this._mainGrid.parent_grid_ratio;
    this.dy = this.dy * this._mainGrid.parent_grid_ratio;

    // init new moad
    moad.parent_grid_ratio = 1;
    moad.i_parent_start = 1;
    moad.j_parent_start = 1;
    moad.e_we = 2 * WRFDomainGrid.minNestGridPoints + (this._mainGrid.e_we - 1) / this._mainGrid.parent_grid_ratio + 1;
    moad.e_sn = 2 * WRFDomainGrid.minNestGridPoints + (this._mainGrid.e_sn - 1) / this._mainGrid.parent_grid_ratio + 1;

    this._mainGrid.parent = moad;
    moad.nests.push(this._mainGrid);
    this._mainGrid = moad;

    function idAddOne(grid) {
        grid.id++;
        for (var i = 0; i < grid.nests.length; i++) {
            idAddOne(grid.nests[i]);
        }
    }
    idAddOne(moad.nests[0]);
    moad.addTo(this._map);
    this._orderGrids(true);

    this.update();
}

WRFDomain.prototype.removeMainGrid = /** @this {WRFDomainGrid} */ function () {
    if (this._mainGrid.nests.length > 1) {
        throw ("Cannot remove top most grid with multiple nests");
    }

    if (this._mainGrid.nests.length == 0) {
        return;
    }

    var stand_lon_delta,
        truelat1_delta,
        truelat2_delta,
        center;

    stand_lon_delta = this._mainGrid.domain.stand_lon - this._mainGrid.domain.ref_lon;
    truelat1_delta = this._mainGrid.domain.truelat1 - this._mainGrid.domain.ref_lat;
    truelat2_delta = this._mainGrid.domain.truelat2 - this._mainGrid.domain.ref_lat;
    center = this._mainGrid.nests[0].projection.corners_ij_to_latlon((this._mainGrid.nests[0].e_we - 1) / 2, (this._mainGrid.nests[0].e_sn - 1) / 2);

    this.ref_lat = center[0];
    this.ref_lon = center[1];
    this.stand_lon = this.ref_lon + stand_lon_delta;
    this.truelat1 = this.ref_lat + truelat1_delta;
    this.truelat2 = this.ref_lat + truelat2_delta;
    this.dx = this.dx / this._mainGrid.nests[0].parent_grid_ratio;
    this.dy = this.dy / this._mainGrid.nests[0].parent_grid_ratio;

    this._mainGrid.remove(true);
    this._mainGrid.nests[0].parent = null;
    this._mainGrid.nests[0].parent_grid_ratio = 1;
    this._mainGrid.nests[0].i_parent_start = 1;
    this._mainGrid.nests[0].j_parent_start = 1;
    this._mainGrid = this._mainGrid.nests[0];
    this._mainGrid.updateId(1);
    this._mainGrid.addTo(this._map);
}