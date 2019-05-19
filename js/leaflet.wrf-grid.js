/**
 * @constructor
 */
var WRFDomainGrid = L.Polygon.extend({

    statics: {
        // min grid points a nest domain should be
        // from parent edge
        minNestGridPoints: 5,
        // minimum grid size
        minGridSize: 10,
        // default parent grid ratio
        defaultGridRatio: 3,
        // minimum pixel per grid to show grid lines
        minPixelsPerGrid: 7,
        IAxisOpt: Object.freeze({ I_PARENT_START: 0, E_WE: 1 }),
        JAxisOpt: Object.freeze({ J_PARENT_START: 0, E_SN: 1 }),
    },

    options: {
        showTooltip: true,
        showGridLines: false,
        editable: true,
        opacity: 0.8,
        weight: 2,
        color: '#FF0000',
        fillColor: '#FF0000',
        fillOpacity: 0.2,
    },

    // domain object containing grid
    domain: null,
    // parent grid object
    parent: null,
    // grid id
    id: null,

    // grid parameters
    parent_grid_ratio:  1,
    i_parent_start:  1,
    j_parent_start:  1,
    e_we:  0,
    e_sn:  0,
    geog_data_res: 'default',

    // grid lines
    _gridLinesLayer: null,
    _iGridLines:  null,
    _jGridLines:  null,
    _enableGridLines: true,

    _createGridLinesPane: function () {
        if (!this._map) {
            return null;
        }

        var pane = this._map.getPane('gridLinesPane');
        if (!pane) {
            pane = this._map.createPane('gridLinesPane');
        }

        return L.layerGroup(null, { 'pane': 'gridLinesPane' });
    },

    // corner markers
    _cornerMarkers: null,
    _corners: null,

    // grid state
    _isSelected: false,

    nests: null,

    _projection: null,

    _getProjection: function () {
        if (this.parent == null) {
            return new WRFProjection(
                this.domain.map_proj,
                this.domain.ref_lat,
                this.domain.ref_lon,
                this.domain.truelat1,
                this.domain.truelat2,
                this.domain.stand_lon,
                this.domain.dx,
                this.domain.dy,
                this.e_we,
                this.e_sn
            );
        }
        // create projection object adapted to the nest grid
        else {
            var projection,
                dx, dy,
                e_we, e_sn,
                i_parent_start,
                j_parent_start,
                parent_grid_ratio,
                grid;

            i_offset = 0;
            j_offset = 0;
            parent_grid_ratio = 1;
            grid = this;

            while (grid.parent != null) {
                parent_grid_ratio *= grid.parent_grid_ratio;
                i_offset += (grid.i_parent_start - 1) * parent_grid_ratio;
                j_offset += (grid.j_parent_start - 1) * parent_grid_ratio;
                grid = grid.parent;
            }

            // create new projection for grid
            dx = this.domain.dx / parent_grid_ratio;
            dy = this.domain.dy / parent_grid_ratio;
            e_we = (this.domain.grid.e_we - 1) * parent_grid_ratio + 1;
            e_sn = (this.domain.grid.e_sn - 1) * parent_grid_ratio + 1;

            projection = new WRFProjection(
                this.domain.map_proj,
                this.domain.ref_lat,
                this.domain.ref_lon,
                this.domain.truelat1,
                this.domain.truelat2,
                this.domain.stand_lon,
                dx,
                dy,
                e_we,
                e_sn);

            projection.corners_offset_i += i_offset * dx;
            projection.corners_offset_j += j_offset * dy;

            return projection;
        }
    },

    // function return grid polygon path
    _getPolygonPath: function () {
        var i, j,
            path = [],
            step = 5;

        path.push(this._corners.sw);
        for (i = step; i < (this.e_we - 1 - step); i += step) {
            path.push(this._projection.corners_ij_to_latlon(i, 0));
        }
        path.push(this._corners.se);
        for (j = step; j < (this.e_sn - 1 - step); j += step) {
            path.push(this._projection.corners_ij_to_latlon(this.e_we - 1, j));
        }
        path.push(this._corners.ne);
        for (i = this.e_we - 1 - step; i > step; i -= step) {
            path.push(this._projection.corners_ij_to_latlon(i, this.e_sn - 1));
        }
        path.push(this._corners.nw);
        for (j = this.e_sn - 1 - step; j > step; j -= step) {
            path.push(this._projection.corners_ij_to_latlon(0, j));
        }
        path.push(this._corners.sw);
        return path;
    },

    _getCorners: function () {
        return {
            sw: L.latLng(this._projection.corners_ij_to_latlon(0, 0)),
            se: L.latLng(this._projection.corners_ij_to_latlon(this.e_we - 1, 0)),
            ne: L.latLng(this._projection.corners_ij_to_latlon(this.e_we - 1, this.e_sn - 1)),
            nw: L.latLng(this._projection.corners_ij_to_latlon(0, this.e_sn - 1))
        };
    },

    // on map zoomeend handler
    _onMapViewChanged: function () {
        // if grid is selected update grid lines when map moves or zoom changes
        if (this._isSelected) {
            this._updateGridLines();
        }
    },

    // function updates polygon tooltip content
    // used as polygon mousemove handler
    _getTooltipContent: function (latlng) {
        var content = '<table><thead><tr><th>' + this.name + '</th><th></th></tr></thead>',
            tooltip,
            element;
        content += '<tbody>';
        var ij = this._projection.latlon_to_corners_ij(latlng.lat, latlng.lng);
        content += '<tr><td>i,j</td><td>' + Math.ceil(ij[0]) + ', ' + Math.ceil(ij[1]) + '</td></tr>';
        content += '<tr><td>lat,lon</td><td>' + latlng.lat.toFixed(2) + ', ' + latlng.lng.toFixed(2) + '</td></tr>';
        content += '</tbody>';
        content += '</table>';

        return content;
    },

    _updateTooltip: function (e) {
        tooltip = this.getTooltip();
        if (tooltip) {
            element = tooltip.getElement();
            if (element) {
                element.innerHTML = this._getTooltipContent(e.latlng);
            }
        }
    },

    // polygon on click handler
    // selects this grid
    _onPolygonClick: function (e) {
        if (e.originalEvent.ctrlKey) {
            this.unselect();
        }
        else {
            this.select();
        }
    },

    _bindTooltip: function (e) {
        if (this.options.showTooltip) {
            this.on('mousemove', this._updateTooltip, this);

            L.Polygon.prototype.bindTooltip.call(
                this,
                ((e && e.latlng) ? this._getTooltipContent(e.latlng) : ''),
                {
                    'sticky': true,
                    'className': 'tooltip-grid'
                });
        }
    },

    bindTooltip: function (e) {
        this._bindTooltip(e);
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].bindTooltip(e);
        }
    },

    _unbindTooltip: function () {
        L.Polygon.prototype.unbindTooltip.call(this);
        this.off('mousemove', this._updateTooltip, this);
    },

    unbindTooltip: function () {
        if (this.getTooltip()) {
            this._unbindTooltip();
        }
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].unbindTooltip();
        }
    },

    // resize context object
    _resizeContext: null,

    // end resizing
    _resizeEnd: function (e) {
        this.domain.grid.bindTooltip();
        this._map.dragging.enable();
        this._map.off('mousemove', this._resize, this);
        this._map.off('mouseup', this._resizeEnd, this);
        this._map.off('mouseout', this._resizeEnd, this);

        if (this._resizeContext.resizeStarted) {
            this.showGridLines();
            if (this.parent) {
                this.parent.hideGridLines();
            }
        }
        this._resizeContext = null;
    },

    _resizeStart: function (e, iAxisOpt, jAxisOpt) {
        var min_i_parent_start,
            min_j_parent_start,
            min_i_delta_end,
            min_j_delta_end,
            i;

        // set up event handlers
        this._map.once('mouseup', this._resizeEnd, this);
        this._map.once('mouseout', this._resizeEnd, this);
        // prevent map dragging
        this._map.dragging.disable();
        // prevent tooltips
        this.domain.grid.unbindTooltip();

        // find the smallest gap between the edge of this grid and all nests
        for (i = 0; i < this.nests.length; i++) {
            if (i == 0) {
                min_i_parent_start = this.nests[i].i_parent_start;
                min_j_parent_start = this.nests[i].j_parent_start;
                min_i_delta_end = this.nests[i].i_delta_end;
                min_j_delta_end = this.nests[i].j_delta_end;
            }
            else {
                min_i_parent_start = Math.min(min_i_parent_start, this.nests[i].i_parent_start);
                min_j_parent_start = Math.min(min_j_parent_start, this.nests[i].j_parent_start);
                min_i_delta_end = Math.min(min_i_delta_end, this.nests[i].i_delta_end);
                min_j_delta_end = Math.min(min_j_delta_end, this.nests[i].j_delta_end);
            }
        }

        this._resizeContext = {
            resizeStarted: false,
            // stand_lon, truelat1, truelat2 delta which must be preserved
            stand_lon_delta: this.domain.stand_lon - this.domain.ref_lon,
            truelat1_delta: this.domain.truelat1 - this.domain.ref_lat,
            truelat2_delta: this.domain.truelat2 - this.domain.ref_lat,

            // calculate min allowed absolute value for e_we, e_sn
            min_e_we: (min_i_delta_end) ? (this.e_we - min_i_delta_end + WRFDomainGrid.minNestGridPoints) : WRFDomainGrid.minGridSize,
            mine_sn: (min_j_delta_end) ? (this.e_sn - min_j_delta_end + WRFDomainGrid.minNestGridPoints) : WRFDomainGrid.minGridSize,
            // calculate max allowed absolute value for e_we, e_sn
            max_e_we: (this.parent) ? (this.i_delta_end - WRFDomainGrid.minNestGridPoints) * this.parent_grid_ratio + this.e_we : 0,
            maxe_sn: (this.parent) ? (this.j_delta_end - WRFDomainGrid.minNestGridPoints) * this.parent_grid_ratio + this.e_sn : 0,

            // calculate min allowed absolute value for i_parent_start, j_parent_start
            min_i_parent_start: (this.parent) ? (WRFDomainGrid.minNestGridPoints - this.i_parent_start + 1) : 0,
            min_j_parent_start: (this.parent) ? (WRFDomainGrid.minNestGridPoints - this.j_parent_start + 1) : 0,
            // calculate max allowed absolute value for i_parent_start, j_parent_start
            max_i_parent_start: (min_i_parent_start) ?
                Math.floor((min_i_parent_start - WRFDomainGrid.minNestGridPoints - 1) / this.parent_grid_ratio) :
                ((this.parent) ? Math.floor((this.e_we - WRFDomainGrid.minGridSize) / this.parent_grid_ratio) : this.e_we - WRFDomainGrid.minGridSize),
            max_j_parent_start: (min_j_parent_start) ?
                Math.floor((min_j_parent_start - WRFDomainGrid.minNestGridPoints - 1) / this.parent_grid_ratio) :
                ((this.parent) ? Math.floor((this.e_sn - WRFDomainGrid.minGridSize) / this.parent_grid_ratio) : this.e_sn - WRFDomainGrid.minGridSize),

            // holds modulo delta i and j when resizing a nest
            mod_delta_i: 0,
            mod_delta_j: 0,

            // indicates which value is being modified along i and j axis
            iAxisOpt: iAxisOpt,
            jAxisOpt: jAxisOpt,

            // start point coordinates
            startLatlng: e.latlng
        };
    },

    // resize event handler
    _resize: function (e) {
        if (!this._resizeContext.resizeStarted) {
            this._resizeContext.resizeStarted = true;
            this._enableGridLines = false;
            if (this._iGridLines) {
                // remove all grid lines since the geometry changes when resizing
                this._removeGridLines();
            }
            if (this.parent) {
                // show parent's grid lines 
                this.parent.showGridLines();
            }
            return;
        }


        // get absolute change in ij coordinates
        var ij = this._projection.latlon_to_corners_ij(e.latlng.lat, e.latlng.lng);
        var delta_i = nearestIntToZero(ij[0]);
        var delta_j = nearestIntToZero(ij[1]);

        // when resizing e_we or e_sn (moving end point along i or j axis) the delta must be recalculated
        if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
            delta_i -= this.e_we - 1;
        }
        if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
            delta_j -= this.e_sn - 1;
        }

        if (this.parent) {

            if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
                delta_i += this._resizeContext.mod_delta_i;
                this._resizeContext.mod_delta_i = delta_i % this.parent_grid_ratio;
                var i_parent_start_delta = (delta_i - this._resizeContext.mod_delta_i) / this.parent_grid_ratio;

                if (i_parent_start_delta > this._resizeContext.max_i_parent_start) {
                    i_parent_start_delta = this._resizeContext.max_i_parent_start;
                    this._resizeContext.max_i_parent_start = 0;
                }
                else {
                    this._resizeContext.max_i_parent_start -= i_parent_start_delta;
                }

                if (i_parent_start_delta < this._resizeContext.min_i_parent_start) {
                    this._resizeContext.max_i_parent_start += (i_parent_start_delta - this._resizeContext.min_i_parent_start);
                    i_parent_start_delta = this._resizeContext.min_i_parent_start;
                    this._resizeContext.min_i_parent_start = 0;
                }
                else {
                    this._resizeContext.min_i_parent_start -= i_parent_start_delta;
                }
                this.e_we -= (i_parent_start_delta * this.parent_grid_ratio);
                this.i_parent_start += i_parent_start_delta;
                for (var i = 0; i < this.nests.length; i++) {
                    this.nests[i].i_parent_start -= i_parent_start_delta * this.parent_grid_ratio;
                }
            }
            else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
                var e_we = Math.max(this.e_we + delta_i, this._resizeContext.min_e_we);
                e_we = Math.min(e_we, this._resizeContext.max_e_we);
                this.e_we = e_we - ((e_we - 1) % this.parent_grid_ratio);
            }

            if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
                delta_j += this._resizeContext.mod_delta_j;
                this._resizeContext.mod_delta_j = delta_j % this.parent_grid_ratio;
                var j_parent_start_delta = (delta_j - this._resizeContext.mod_delta_j) / this.parent_grid_ratio;
                if (j_parent_start_delta > this._resizeContext.max_j_parent_start) {
                    j_parent_start_delta = this._resizeContext.max_j_parent_start;
                    this._resizeContext.max_j_parent_start = 0;
                }
                else {
                    this._resizeContext.max_j_parent_start -= j_parent_start_delta;
                }
                if (j_parent_start_delta < this._resizeContext.min_j_parent_start) {
                    this._resizeContext.max_j_parent_start += (j_parent_start_delta - this._resizeContext.min_j_parent_start);
                    j_parent_start_delta = this._resizeContext.min_j_parent_start;
                    this._resizeContext.min_j_parent_start = 0;
                }
                else {
                    this._resizeContext.min_j_parent_start -= j_parent_start_delta;
                }
                this.e_sn -= (j_parent_start_delta * this.parent_grid_ratio);
                this.j_parent_start += j_parent_start_delta;
                for (var i = 0; i < this.nests.length; i++) {
                    this.nests[i].j_parent_start -= j_parent_start_delta * this.parent_grid_ratio;
                }
            }
            else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
                var e_sn = Math.max(this.e_sn + delta_j, this._resizeContext.mine_sn);
                e_sn = Math.min(e_sn, this._resizeContext.maxe_sn);
                //bug
                this.e_sn = e_sn - ((e_sn - 1) % this.parent_grid_ratio);
            }
            this.update();
        }
        else {
            var center,
                center_i,
                center_j,
                e_we,
                e_sn;

            if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
                if (delta_i > this._resizeContext.max_i_parent_start) {
                    delta_i = this._resizeContext.max_i_parent_start;
                    this._resizeContext.max_i_parent_start = 0;
                }
                else {
                    this._resizeContext.max_i_parent_start -= delta_i;
                }
                center_i = (this.e_we - 1 + delta_i) / 2;
            }
            else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
                e_we = Math.max(this.e_we + delta_i, this._resizeContext.min_e_we);
                center_i = (e_we - 1) / 2;
            }

            if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
                if (delta_j > this._resizeContext.max_j_parent_start) {
                    delta_j = this._resizeContext.max_j_parent_start;
                    this._resizeContext.max_j_parent_start = 0;
                }
                else {
                    this._resizeContext.max_j_parent_start -= delta_j;
                }
                center_j = (this.e_sn - 1 + delta_j) / 2;
            }
            else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
                e_sn = Math.max(this.e_sn + delta_j, this._resizeContext.mine_sn);
                center_j = (e_sn - 1) / 2;
            }

            center = this._projection.corners_ij_to_latlon(center_i, center_j);
            this.domain.ref_lat = center[0];
            this.domain.ref_lon = center[1];
            //this.domain.stand_lon = this.domain.ref_lon + this._resizeContext.stand_lon_delta;
            //this.domain.truelat1 = this.domain.ref_lat + this._resizeContext.truelat1_delta;
            //this.domain.truelat2 = this.domain.ref_lat + this._resizeContext.truelat2_delta;

            if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
                this.e_we -= delta_i;
                for (var i = 0; i < this.nests.length; i++) {
                    this.nests[i].i_parent_start -= delta_i;
                }
            }
            else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
                this.e_we = e_we;
            }

            if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
                this.e_sn -= delta_j;
                for (var i = 0; i < this.nests.length; i++) {
                    this.nests[i].j_parent_start -= delta_j;
                }
            }
            else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
                this.e_sn = e_sn;
            }
            this.domain.update();
        }
    },

    _log: function (header) {
        if (header) {
            console.log(header);
        }
        console.log('  ref_lat: ' + this.domain.ref_lat);
        console.log('  ref_lon: ' + this.domain.ref_lon);
        console.log('  stand_lon: ' + this.domain.stand_lon);
        console.log('  truelat1: ' + this.domain.truelat1);
        console.log('  truelat2: ' + this.domain.truelat2);
        console.log('  i_parent_start: ' + this.i_parent_start);
        console.log('  j_parent_start: ' + this.j_parent_start);
        console.log('  e_we: ' + this.e_we);
        console.log('  e_sn: ' + this.e_sn);
    },

    _dragContext: null,

    _dragEnd: function (e) {
        this.domain.grid.bindTooltip(e);
        this._map.dragging.enable();
        this._map.off('mousemove', this._drag, this);
        this._map.off('mouseup', this._dragEnd, this);
        this._map.off('mouseout', this._dragEnd, this);
        this._enableGridLines = true;
        if (this._dragContext.dragStarted) {
            this._drawGridLines();
            if (this.parent) {
                this.parent.hideGridLines();
            }
        }
        this._dragContext = null;
    },

    _dragStart: function (e) {

        this._map.once('mouseup', this._dragEnd, this);
        this._map.once('mouseout', this._dragEnd, this);
        this._map.dragging.disable();
        this.domain.grid.unbindTooltip();

        // save start location
        this._dragContext = {
            dragStarted: false,
            stand_lon_delta: this.domain.stand_lon - this.domain.ref_lon,
            truelat1_delta: this.domain.truelat1 - this.domain.ref_lat,
            truelat2_delta: this.domain.truelat2 - this.domain.ref_lat,
            startLatLng: e.latlng,
            startIJ: this._projection.latlon_to_corners_ij(e.latlng.lat, e.latlng.lng),
            delta_i: 0,
            delta_j: 0,
            max_delta_i: this.i_delta_end - WRFDomainGrid.minNestGridPoints,
            max_delta_j: this.j_delta_end - WRFDomainGrid.minNestGridPoints,
            min_delta_i: WRFDomainGrid.minNestGridPoints - this.i_parent_start + 1,
            min_delta_j: WRFDomainGrid.minNestGridPoints - this.j_parent_start + 1,
            i_parent_start: this.i_parent_start,
            j_parent_start: this.j_parent_start
        };

        this._map.on('mousemove', this._drag, this);
    },

    _drag: function (e) {

        if (!this._dragContext.dragStarted) {
            this._dragContext.dragStarted = true;
            this._enableGridLines = false;
            if (this._iGridLines) {
                this._removeGridLines();
            }
            if (this.parent) {
                this.parent.showGridLines();
            }
        }

        if (this.parent == null) {
            // for 1st domain only move ref point
            this.domain.ref_lat = e.latlng.lat - this._dragContext.startLatLng.lat + this.domain.ref_lat;
            this.domain.ref_lon = e.latlng.lng - this._dragContext.startLatLng.lng + this.domain.ref_lon;
            this.domain.stand_lon = this.domain.ref_lon + this._dragContext.stand_lon_delta;
            this.domain.truelat1 = this.domain.ref_lat + this._dragContext.truelat1_delta;
            this.domain.truelat2 = this.domain.ref_lat + this._dragContext.truelat2_delta;
            this._dragContext.startLatLng = e.latlng;
            this.domain.update();
        }
        else {
            var ij = this._projection.latlon_to_corners_ij(e.latlng.lat, e.latlng.lng);
            this._dragContext.delta_i += (ij[0] - this._dragContext.startIJ[0]) / this.parent_grid_ratio;
            this._dragContext.delta_j += (ij[1] - this._dragContext.startIJ[1]) / this.parent_grid_ratio;

            var parent_delta_i = Math.min(nearestIntToZero(this._dragContext.delta_i), this._dragContext.max_delta_i);
            parent_delta_i = Math.max(parent_delta_i, this._dragContext.min_delta_i);

            var parent_delta_j = Math.min(nearestIntToZero(this._dragContext.delta_j), this._dragContext.max_delta_j);
            parent_delta_j = Math.max(parent_delta_j, this._dragContext.min_delta_j);

            this.i_parent_start = this._dragContext.i_parent_start + parent_delta_i;
            this.j_parent_start = this._dragContext.j_parent_start + parent_delta_j;
            this.update();
            this._dragContext.startIJ = this._projection.latlon_to_corners_ij(e.latlng.lat, e.latlng.lng);
        }
    },

    // implements layer onAdd function
    onAdd: function (map) {

        this._gridLinesLayer = this._createGridLinesPane();
        L.Polygon.prototype.onAdd.call(this, map);
        this._projection = this._getProjection();
        this._corners = this._getCorners();
        this.setLatLngs(this._getPolygonPath());

        // create grid corner markers
        // visible only when grid is selected
        if (this.options.editable) {
            this._cornerMarkers = {
                sw: L.marker(this._corners.sw, {
                    icon: L.divIcon({ className: 'grid-corner-icon cursor-nesw-resize' }),
                }),
                se: L.marker(this._corners.se, {
                    icon: L.divIcon({ className: 'grid-corner-icon cursor-nwse-resize' })
                }),
                ne: L.marker(this._corners.ne, {
                    icon: L.divIcon({ className: 'grid-corner-icon cursor-nesw-resize' }),
                }),
                nw: L.marker(this._corners.nw, {
                    icon: L.divIcon({ className: 'grid-corner-icon cursor-nwse-resize' }),
                })
            }

            this._cornerMarkers.sw.on('mousedown', function (e) {
                this._resizeStart(e, WRFDomainGrid.IAxisOpt.I_PARENT_START, WRFDomainGrid.JAxisOpt.J_PARENT_START);
                this._map.on('mousemove', this._resize, this);
            }, this);

            this._cornerMarkers.se.on('mousedown', function (e) {
                this._resizeStart(e, WRFDomainGrid.IAxisOpt.E_WE, WRFDomainGrid.JAxisOpt.J_PARENT_START);
                this._map.on('mousemove', this._resize, this);
            }, this);

            this._cornerMarkers.ne.on('mousedown', function (e) {
                this._resizeStart(e, WRFDomainGrid.IAxisOpt.E_WE, WRFDomainGrid.JAxisOpt.E_SN);
                this._map.on('mousemove', this._resize, this);
            }, this);

            this._cornerMarkers.nw.on('mousedown', function (e) {
                this._resizeStart(e, WRFDomainGrid.IAxisOpt.I_PARENT_START, WRFDomainGrid.JAxisOpt.E_SN);
                this._map.on('mousemove', this._resize, this);
            }, this);
        }

        this._map.on('zoomend moveend', this._onMapViewChanged, this);
        this._bindTooltip();

        if (this.options.editable) {
            this.on('click', this._onPolygonClick, this);
        }

        // add nests
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].addTo(map);
        }
    },

    getBounds: function () {
        if (!this._corners || !this._projection) {
            this._projection = this._getProjection();
            this._corners = this._getCorners();
            this.setLatLngs(this._getPolygonPath());
        }
        return L.Polygon.prototype.getBounds.call(this);
    },

    // implements layer onRemove function
    onRemove: function (map) {

        this._map.off('viewreset', this._onMapViewChanged, this);

        if (this.options.showTooltip) {
            this._unbindTooltip();
        }

        if (this.options.editable) {
            this.off('click', this._onPolygonClick, this);
        }

        if (this._isSelected) {
            this.unselect();
        }

        // add nests
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].remove();
        }

        L.Polygon.prototype.onRemove.call(this, map);

        this.fire('wps:remove');
    },

    // initializes grid object
    initialize: function (domain, parent, id, wpsNamelist, options) {

        // initialize layer options
        L.Util.setOptions(this, options);

        this.domain = domain;
        this.parent = parent;
        this.id = id;
        this.nests = [];

        // initialize grid parameters
        this.e_we = WRFDomainGrid.minGridSize;
        this.e_sn = WRFDomainGrid.minGridSize;

        if (wpsNamelist) {
            this.parent_grid_ratio = wpsNamelist.geogrid.parent_grid_ratio[id - 1];
            this.i_parent_start = wpsNamelist.geogrid.i_parent_start[id - 1];
            this.j_parent_start = wpsNamelist.geogrid.j_parent_start[id - 1];
            this.e_we = wpsNamelist.geogrid.e_we[id - 1];
            this.e_sn = wpsNamelist.geogrid.e_sn[id - 1];
            this.geog_data_res = wpsNamelist.geogrid.geog_data_res[id - 1];

            if (((this.e_we - 1) % this.parent_grid_ratio) != 0) {
                throw ("invalid e_we value");
            }
            if (((this.e_sn - 1) % this.parent_grid_ratio) != 0) {
                throw ("invalid e_sn value");
            }

            for (var i = id; i < wpsNamelist.geogrid.parent_id.length; i++) {
                if (id === wpsNamelist.geogrid.parent_id[i]) {
                    this.nests.push(new WRFDomainGrid(domain, this, (i + 1), wpsNamelist, options));
                }
            }
        }

        L.Polygon.prototype.initialize.call(this, []);
    },

    update: function () {
        this._projection = this._getProjection();
        this._corners = this._getCorners();
        this.setLatLngs(this._getPolygonPath());
        if (this.options.editable) {
            this._cornerMarkers.sw.setLatLng(this._corners.sw);
            this._cornerMarkers.se.setLatLng(this._corners.se);
            this._cornerMarkers.ne.setLatLng(this._corners.ne);
            this._cornerMarkers.nw.setLatLng(this._corners.nw);
        }

        if (this._iGridLines) {
            this._removeGridLines();
        }
        if (this._isSelected) {
            this._drawGridLines();
        }

        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].update();
        }
        this.fire('wps:change');
    },

    addToNamelist: function (wpsNamelist) {
        wpsNamelist.geogrid.parent_id.push((this.parent) ? this.parent.id : 1);
        wpsNamelist.geogrid.parent_grid_ratio.push(this.parent_grid_ratio);
        wpsNamelist.geogrid.i_parent_start.push(this.i_parent_start);
        wpsNamelist.geogrid.j_parent_start.push(this.j_parent_start);
        wpsNamelist.geogrid.e_we.push(this.e_we);
        wpsNamelist.geogrid.e_sn.push(this.e_sn);
        wpsNamelist.geogrid.geog_data_res.push(this.geog_data_res);

        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].addToNamelist(wpsNamelist);
        }
    },

    unselectAll: function () {
        if (this._isSelected) {
            this.unselect();
            return;
        }
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].unselectAll();
        }
    },

    unselect: function () {
        if (this._isSelected && this.options.editable) {
            this._cornerMarkers.sw.remove();
            this._cornerMarkers.se.remove();
            this._cornerMarkers.ne.remove();
            this._cornerMarkers.nw.remove();
            this._isSelected = false;
            this.off('mousedown', this._dragStart, this);
        }

        this.hideGridLines();

        this.fire('wps:unselect');
    },

    select: function () {
        if (!this.options.editable || this._isSelected) {
            return;
        }

        this.domain.grid.unselectAll();

        this._isSelected = true;
        this._cornerMarkers.sw.addTo(this._map);
        this._cornerMarkers.se.addTo(this._map);
        this._cornerMarkers.ne.addTo(this._map);
        this._cornerMarkers.nw.addTo(this._map);

        this.on('mousedown', this._dragStart, this);

        this.showGridLines();
        this.fire('wps:select');
        this.domain.setSelectedGrid(this);
    },

    updateId: function (id) {
        if (this.id != id) {
            this.id = id;
            this.fire('wps:id-change');
        }
        for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].updateId(this.id + 1);
        }
    },

    removeNest: function (nest) {
        nest.remove();

        var index = this.nests.indexOf(nest);

        if (index == -1) {
            throw ("Cannot remove a nest which is not a nest of this grid");
        }

        this.nests.splice(index, 1);
        this.domain.grid.updateId(1);
        this.fire('wps:removenest');
    },

    createNest: function () {

        var nest = new WRFDomainGrid(this.domain, this, this.domain.max_dom + 1, null, this.options);

        try {
            nest.parent_grid_ratio = WRFDomainGrid.defaultGridRatio;
            nest.i_parent_start = 1 + WRFDomainGrid.minNestGridPoints;
            nest.j_parent_start = 1 + WRFDomainGrid.minNestGridPoints;
            nest.e_we = Math.floor((nest.parent.e_we - WRFDomainGrid.minNestGridPoints - nest.i_parent_start) * nest.parent_grid_ratio + 1);
            nest.e_sn = Math.floor((nest.parent.e_sn - WRFDomainGrid.minNestGridPoints - nest.j_parent_start) * nest.parent_grid_ratio + 1);
        }
        catch (error) {
            throw ("Unable to add a nest grid (" + error + ")");
        }

        this.nests.push(nest);
        this.fire('wps:addnest');
        if (this._map) {
            nest.addTo(this._map);
        }
        return nest;
    },

    findGrid: function (id) {
        var grid,
            i;

        if (this.id == id) {
            return this;
        }
        else if (this.nests && this.nests.length > 0) {
            for (i = 0; i < this.nests.length; i++) {
                grid = this.nests[i].findGrid(id);
                if (grid) {
                    return grid;
                }
            }
        }
        return grid;
    }
})

Object.defineProperties(WRFDomainGrid.prototype, {
    'projection': {
        get() {
            return this._projection;
        }
    },
    'name': {
        get() {
            return 'd' + this.id.toString().padStart(2, '0');
        }
    },
    'selected': {
        get() {
            return this._isSelected;
        }
    },
    'iPixels': {
        get() {
            if (this.parent) {
                return this.parent.iPixels / this.parent_grid_ratio;
            }
            else {
                return Math.round(this.domain.dxPixelsMul * Math.pow(2, this._map.getZoom()));
            }
        }
    },
    'i_delta_end': {
        get() {
            return (this.parent) ? this.parent.e_we - (this.e_we - 1) / this.parent_grid_ratio - this.i_parent_start : 0;
        }
    },
    'j_delta_end': {
        get() {
            return (this.parent) ? this.parent.e_sn - (this.e_sn - 1) / this.parent_grid_ratio - this.j_parent_start : 0;
        }
    },
    'depth': {
        get() {
            var depth = 0,
                parent = this.parent;
            while (parent) {
                parent = parent.parent;
            }
            return depth;
        }
    },
    'count': {
        get() {
            var count = 1;
            for (var i = 0; i < this.nests.length; i++) {
                count += this.nests[i].count;
            }
            return count;
        }
    },
    'corners': {
        get() {
            return this._corners;
        }
    }
});

// function returns the bounds in IJ coordinates of grid lines which are in view
WRFDomainGrid.prototype._getGridLinesBounds = /** @this {WRFDomainGrid} */ function () {
    var bounds = this._map.getBounds();
    var boundsSW = bounds.getSouthWest();
    var boundsNE = bounds.getNorthEast();
    var ijSW = this._projection.latlon_to_corners_ij(boundsSW.lat, boundsSW.lng);
    var ijNE = this._projection.latlon_to_corners_ij(boundsNE.lat, boundsNE.lng);
    var ijSE = this._projection.latlon_to_corners_ij(boundsSW.lat, boundsNE.lng);
    var ijNW = this._projection.latlon_to_corners_ij(boundsNE.lat, boundsSW.lng);

    return {
        iLinesStart: Math.max(0, Math.min(Math.floor(ijSW[0]), Math.floor(ijNW[0]), this.e_we - 1)),
        jLinesStart: Math.max(0, Math.min(Math.floor(ijSW[1]), Math.floor(ijSE[1]), this.e_sn - 1)),

        iLinesEnd: Math.min((this.e_we - 1), Math.max(Math.ceil(ijNE[0]), Math.ceil(ijSE[0]), 0)),
        jLinesEnd: Math.min((this.e_sn - 1), Math.max(Math.ceil(ijNE[1]), Math.ceil(ijNW[1]), 0))
    };
}

// function creates a grid line and add it to grid lines layer
WRFDomainGrid.prototype._createGridLinePolyline = /** @this {WRFDomainGrid} */ function (path) {
    var polyline = L.polyline(path, {
        'pane': 'gridLinesPane',
        'color': 'grey',
        'weight': 1,
        'opacity': 0.5,
    });
    this._gridLinesLayer.addLayer(polyline);
    return polyline;
}

WRFDomainGrid.prototype._updateGridLines = /** @this {WRFDomainGrid} */ function () {
    // check if any grid lines currently exist
    if (this._iGridLines) {
        // check if lines should be visible at current zoom level
        if (this.iPixels < WRFDomainGrid.minPixelsPerGrid) {
            // hide grid line layer
            this._gridLinesLayer.remove();
        }
        else {
            var i,
                j,
                gridLinesBounds,
                path,
                latLng,
                iGridLines,
                jGridLines,
                iPaths,
                jPaths;

            // add layer if not on map
            if (!this._map.hasLayer(this._gridLinesLayer)) {
                this._gridLinesLayer.addTo(this._map);
            }

            // get current grid line bounds
            gridLinesBounds = this._getGridLinesBounds();

            // if bounds do not overlap with existing line redraw all lines
            if ((gridLinesBounds.iLinesEnd < this._gridLinesBounds.iLinesStart) ||
                (gridLinesBounds.iLinesStart > this._gridLinesBounds.iLinesEnd) ||
                (gridLinesBounds.jLinesEnd < this._gridLinesBounds.jLinesStart) ||
                (gridLinesBounds.jLinesStart > this._gridLinesBounds.jLinesEnd)) {
                this._removeGridLines();
                this._drawGridLines(gridLinesBounds);
            }

            // check if this bounds are bigger then previously drawn
            if (gridLinesBounds.iLinesStart < this._gridLinesBounds.iLinesStart) {
                // add iLines, extend jLines
                iGridLines = [];
                jPaths = new Array(this._gridLinesBounds.jLinesEnd - this._gridLinesBounds.jLinesStart + 1);

                for (i = gridLinesBounds.iLinesStart; i < this._gridLinesBounds.iLinesStart; i++) {
                    path = [];

                    for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
                        latLng = this._projection.corners_ij_to_latlon(i, j);
                        path.push(latLng);

                        if (i == gridLinesBounds.iLinesStart) {
                            jPaths[j - this._gridLinesBounds.jLinesStart] = new Array();
                        }

                        jPaths[j - this._gridLinesBounds.jLinesStart].push(latLng);

                        if (i == (this._gridLinesBounds.iLinesStart - 1)) {
                            this._jGridLines[j - this._gridLinesBounds.jLinesStart].setLatLngs(
                                jPaths[j - this._gridLinesBounds.jLinesStart].concat(this._jGridLines[j - this._gridLinesBounds.jLinesStart].getLatLngs())
                            );
                        }
                    }
                    iGridLines.push(this._createGridLinePolyline(path));
                }
                this._iGridLines = iGridLines.concat(this._iGridLines);
                this._gridLinesBounds.iLinesStart = gridLinesBounds.iLinesStart;
            }

            if (gridLinesBounds.jLinesStart < this._gridLinesBounds.jLinesStart) {
                // add jLines, extend iLines
                jGridLines = [];
                iPaths = new Array(this._gridLinesBounds.iLinesEnd - this._gridLinesBounds.iLinesStart + 1);

                for (j = gridLinesBounds.jLinesStart; j < this._gridLinesBounds.jLinesStart; j++) {
                    path = [];
                    for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
                        latLng = this._projection.corners_ij_to_latlon(i, j);
                        path.push(latLng);
                        if (j == gridLinesBounds.jLinesStart) {
                            iPaths[i - this._gridLinesBounds.iLinesStart] = new Array();
                        }
                        iPaths[i - this._gridLinesBounds.iLinesStart].push(latLng);
                        if (j == (this._gridLinesBounds.jLinesStart - 1)) {
                            this._iGridLines[i - this._gridLinesBounds.iLinesStart].setLatLngs(
                                iPaths[i - this._gridLinesBounds.iLinesStart].concat(this._iGridLines[i - this._gridLinesBounds.iLinesStart].getLatLngs())
                            );
                        }
                    }
                    jGridLines.push(this._createGridLinePolyline(path));
                }
                this._jGridLines = jGridLines.concat(this._jGridLines);

                this._gridLinesBounds.jLinesStart = gridLinesBounds.jLinesStart;
            }

            if (gridLinesBounds.iLinesEnd > this._gridLinesBounds.iLinesEnd) {
                // add iLines, extend jLines
                for (i = this._gridLinesBounds.iLinesEnd + 1; i <= gridLinesBounds.iLinesEnd; i++) {
                    path = [];
                    for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
                        latLng = this._projection.corners_ij_to_latlon(i, j);
                        path.push(latLng);
                        this._jGridLines[j - this._gridLinesBounds.jLinesStart].addLatLng(latLng);
                    }
                    this._iGridLines.push(this._createGridLinePolyline(path));
                }
                this._gridLinesBounds.iLinesEnd = gridLinesBounds.iLinesEnd;
            }

            if (gridLinesBounds.jLinesEnd > this._gridLinesBounds.jLinesEnd) {
                // add jLines, extend iLines
                for (j = this._gridLinesBounds.jLinesEnd + 1; j <= gridLinesBounds.jLinesEnd; j++) {
                    path = [];
                    for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
                        latLng = this._projection.corners_ij_to_latlon(i, j);
                        path.push(latLng);
                        this._iGridLines[i - this._gridLinesBounds.iLinesStart].addLatLng(latLng);
                    }
                    this._jGridLines.push(this._createGridLinePolyline(path));
                }
                this._gridLinesBounds.jLinesEnd = gridLinesBounds.jLinesEnd;
            }
        }
    }
    else {
        this._drawGridLines();
    }
}

WRFDomainGrid.prototype._drawGridLines = function (gridLinesBounds) {

    if ((this.iPixels >= WRFDomainGrid.minPixelsPerGrid) && this._enableGridLines) {
        var i, j, path, latLng, jGridLinePaths;

        this._gridLinesBounds = gridLinesBounds || this._getGridLinesBounds();

        this._iGridLines = [];
        this._jGridLines = [];

        // create array for j paths
        jGridLinePaths = new Array(this._gridLinesBounds.jLinesEnd - this._gridLinesBounds.jLinesStart + 1);

        for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
            // init path for i line
            path = [];

            for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
                latLng = this._projection.corners_ij_to_latlon(i, j);
                path.push(latLng);

                if (i == this._gridLinesBounds.iLinesStart) {
                    // init path for j line
                    jGridLinePaths[j - this._gridLinesBounds.jLinesStart] = new Array(this._gridLinesBounds.iLinesEnd - this._gridLinesBounds.iLinesStart + 1);
                }

                jGridLinePaths[j - this._gridLinesBounds.jLinesStart][i - this._gridLinesBounds.iLinesStart] = latLng;

                if (i == this._gridLinesBounds.iLinesEnd) {
                    // create j polyline
                    this._jGridLines.push(this._createGridLinePolyline(jGridLinePaths[j - this._gridLinesBounds.jLinesStart]));
                }
            }

            // create i polyline
            this._iGridLines.push(this._createGridLinePolyline(path));
        }

        // add layer if not on map
        if (!this._map.hasLayer(this._gridLinesLayer)) {
            this._gridLinesLayer.addTo(this._map);
        }
    }
}

WRFDomainGrid.prototype._removeGridLines = function () {
    this._gridLinesLayer.clearLayers();
    this._iGridLines = null;
    this._jGridLines = null;
    this._gridLinesLayer.remove();
}

WRFDomainGrid.prototype.hideGridLines = function () {
    this._gridLinesLayer.remove();
    this._enableGridLines = false;
}

WRFDomainGrid.prototype.showGridLines = function () {
    this._enableGridLines = true;
    this._updateGridLines();
}