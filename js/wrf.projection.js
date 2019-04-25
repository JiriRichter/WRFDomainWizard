/**
 * @constructor
 */
var WRFProjection = function (map_proj, ref_lat, ref_lon, truelat1, truelat2, stand_lon, dx, dy, e_we, e_sn) {

    if (map_proj == 'lambert') {
        // Lambert Conformal Conic used by WRF
        this.domain_proj = '+units=m +proj=lcc'
            + ' +lat_1=' + truelat1
            + ' +lat_2=' + truelat2
            + ' +lat_0=' + ref_lat
            + ' +lon_0=' + stand_lon
            + ' +a=' + WRFProjection.radius
            + ' +b=' + WRFProjection.radius
            + ' +towgs84=0,0,0 +no_defs=True';
    }
    else if (map_proj == 'mercator') {
        // Mercator
        this.domain_proj = '+units=m +proj=merc'
            + ' +lat_ts=' + truelat1
            + ' +lon_0=' + stand_lon
            + ' +a=' + WRFProjection.radius
            + ' +b=' + WRFProjection.radius
            + ' +towgs84=0,0,0 +no_defs=True';
    }
    /*
else if (map_proj == 'polar') {
    // Polar stereographic
    this.domain_proj = '+units=m +proj=stere'
        + ' +lat_0=' + ((truelat1 < 0) ? -90 : 90)
        + ' +lon_0=' + stand_lon
        + ' +lat_ts=' + truelat1
        + ' +a=' + WRFProjection.radius
        + ' +b=' + WRFProjection.radius;
        //+ ' +towgs84=0,0,0 +no_defs=True';
}
else if (map_proj == 'lat-lon') {
    // Regular latitude-longitude, or cylindrical equidistant
    this.domain_proj = '+units=m +proj=eqc'
        + ' +lon_0=' + stand_lon
        + ' +a=' + WRFProjection.radius
        + ' +b=' + WRFProjection.radius
        + ' +towgs84=0,0,0 +no_defs=True';
}
*/
    else {
        throw ("Unsupported projection " + map_proj);
    }

    // mass grid starts from center of SW grid cell - point 0, 0
    var mass_grid_size_i = (e_we - 2) * dx;
    var mass_grid_size_j = (e_sn - 2) * dy;

    // corners grid starts from SW corner - point 0, 0
    var corners_grid_size_i = (e_we - 1) * dx;
    var corners_grid_size_j = (e_sn - 1) * dy;

    var grid_center = proj4(WRFProjection.latlon_sphere, this.domain_proj, [ref_lon, ref_lat]);

    this.mass_offset_i = grid_center[0] - mass_grid_size_i * 0.5;
    this.mass_offset_j = grid_center[1] - mass_grid_size_j * 0.5;

    this.corners_offset_i = grid_center[0] - corners_grid_size_i * 0.5;
    this.corners_offset_j = grid_center[1] - corners_grid_size_j * 0.5;
    this.dx = dx;
    this.dy = dy;
}

WRFProjection.radius = 6370000;
// Spherical latlon used by WRF
WRFProjection.latlon_sphere = '+units=m +proj=longlat +a=' + WRFProjection.radius + ' +b=' + WRFProjection.radius + '  +towgs84=0,0,0 +no_defs=True';

//Convert mass grid coordinates to its nest grid coordinates
WRFProjection.prototype.to_child_mass_ij = /** @this {WRFProjection} */ function (i, j, grid) {
    var delta = (grid.parent_grid_ratio - 1) / 2;

    return [
        (i - grid.i_parent_start + 1.) * grid.parent_grid_ratio + delta,
        (j - grid.j_parent_start + 1.) * grid.parent_grid_ratio + delta
    ];
}

//Convert nest grid coordinates to its parent grid coordinates
WRFProjection.prototype.to_parent_mass_ij = /** @this {WRFProjection} */ function (i, j, i_parent_start, j_parent_start, parent_grid_ratio) {
    var delta = (parent_grid_ratio - 1) / 2;

    return [
        (i - delta) / parent_grid_ratio + i_parent_start - 1,
        (j - delta) / parent_grid_ratio + j_parent_start - 1
    ];
}

// Convert latitude and longitude into mass grid coordinates.
WRFProjection.prototype.latlon_to_mass_ij = /** @this {WRFProjection} */ function (lat, lon) {

    var ij = proj4(WRFProjection.latlon_sphere, this.domain_proj, [lon, lat]);
    ij[0] = (ij[0] - this.mass_offset_i) / this.dx;
    ij[1] = (ij[1] - this.mass_offset_j) / this.dy;

    return ij;
}

//Convert mass grid coordinates to latitude and longitude
WRFProjection.prototype.mass_ij_to_latlon = /** @this {WRFProjection} */ function (i, j) {
    var lonlat = proj4(
        this.domain_proj,
        WRFProjection.latlon_sphere,
        [
            i * this.dx + this.mass_offset_i,
            j * this.dy + this.mass_offset_j
        ]);

    return [lonlat[1], lonlat[0]];
}

//Converts grid corners coordinates to its child grid coordinates
WRFProjection.prototype.to_child_corners_ij = /** @this {WRFProjection} */ function (i, j, i_parent_start, j_parent_start, parent_grid_ratio) {
    return [
        (i - i_parent_start + 1) * parent_grid_ratio,
        (j - j_parent_start + 1) * parent_grid_ratio
    ];
}

//Converts grid corners coordinates to its parent grid coordinates
WRFProjection.prototype.to_parent_corners_ij = /** @this {WRFProjection} */ function (i, j, i_parent_start, j_parent_start, parent_grid_ratio) {
    return [
        i / parent_grid_ratio + i_parent_start - 1,
        j / parent_grid_ratio + j_parent_start - 1
    ];
}

//Convert latitude and longitude into grid corners coordinates
WRFProjection.prototype.latlon_to_corners_ij = /** @this {WRFProjection} */ function (lat, lon) {

    var ij = proj4(
        WRFProjection.latlon_sphere,
        this.domain_proj,
        [lon, lat]);

    ij[0] = (ij[0] - this.corners_offset_i) / this.dx;
    ij[1] = (ij[1] - this.corners_offset_j) / this.dy;

    return ij;
}

// Convert grid corners coordinates to latitude and longitude
// (0, 0) is the SW corner
// NE corner is(e_we - 1, e_sn - 1)
WRFProjection.prototype.corners_ij_to_latlon = /** @this {WRFProjection} */ function (i, j) {

    // transform coordinates to lat, lon
    var lonlat = proj4(
        this.domain_proj,
        WRFProjection.latlon_sphere,
        [
            i * this.dx + this.corners_offset_i,
            j * this.dy + this.corners_offset_j
        ]);

    return [lonlat[1], lonlat[0]];
}
