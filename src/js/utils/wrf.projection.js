import proj4 from 'proj4';
import { EarthRadius, WrfProjections } from './constants';

// PROJ4 strings based on https://github.com/NCAR/wrf-python/blob/develop/src/wrf/projection.py
export class WrfProjection {

    // Spherical latlon used by WRF
    // see https://fabienmaussion.info/2018/01/06/wrf-projection/
    static _wrf_proj = '+units=m +proj=longlat +a=' + EarthRadius + ' +b=' + EarthRadius + '  +towgs84=0,0,0 +no_defs=True';

    constructor(params) {

        this._params = Object.assign({
            map_proj: null,
            ref_lat: null,
            ref_lon: null,
            truelat1: null, 
            truelat2: null,
            stand_lon: null,
            dx: null,
            dy: null,
            e_we: null,
            e_sn: null
        },
        params);

        switch (this._params.map_proj) {

            // Lambert Conformal Conic
            case WrfProjections.lambert:
                this._proj4 = '+units=m'
                    + ' +proj=lcc'
                    + ' +lat_1=' + this._params.truelat1
                    + ' +lat_2=' + this._params.truelat2
                    + ' +lat_0=' + this._params.ref_lat
                    + ' +lon_0=' + this._params.stand_lon
                    + ' +a=' + EarthRadius
                    + ' +b=' + EarthRadius
                    + ' +towgs84=0,0,0'
                    + ' +no_defs=True';
                break;

            // Mercator
            case WrfProjections.mercator:
                this._proj4 = '+units=m'
                    + ' +proj=merc'
                    + ' +lat_ts=' + this._params.truelat1
                    + ' +lon_0=' + this._getValue(this._params.stand_lon, 0)
                    + ' +a=' + EarthRadius
                    + ' +b=' + EarthRadius
                    + ' +towgs84=0,0,0'
                    + ' +no_defs=True'
                    + ' +nadgrids=null';
                break;

            // Polar stereographic
            case WrfProjections.polar: {

                const hemi = (this._params.truelat1 < 0) ? -90 : 90;
                const lat_ts = this._params.truelat1;

                this._proj4 = '+units=m'
                    + ' +proj=stere'
                    + ' +lat_0=' + hemi
                    + ' +lon_0=' + this._params.stand_lon
                    + ' +lat_ts=' + lat_ts
                    + ' +a=' + EarthRadius
                    + ' +b=' + EarthRadius;

                break;
            }

            // Regular latitude-longitude, or cylindrical equidistant
            case WrfProjections.latlon: {

                this._proj4 = '+units=m'
                    + ' +proj=eqc'
                    + ' +lon_0=' + this._params.stand_lon
                    + ' +a=' + EarthRadius
                    + ' +b=' + EarthRadius
                    + ' +nadgrids=null'
                    + ' +towgs84=0,0,0'
                    + ' +no_defs=True';

                break;
            }

            default:
                throw ("Unsupported projection " + this._wps.map_proj);
        }
    }

    _getValue(value, defaultValue) {
        if (isNaN(value) || value === null || value === undefined) {
            return defaultValue;
        }
        return value;
    }

    latlon_to_ij(lat, lon) {

        if (isNaN(lat) || isNaN(lon)) {
            throw new Error('Invalid lat-lon coordinates');
        }

        return proj4(
            WrfProjection._wrf_proj,
            this._proj4,
            [lon, lat]);
    }

    ij_to_latlon(i, j) {

        if (isNaN(i) || isNaN(j)) {
            throw new Error('Invalid IJ coordinates');
        }

        var lonlat = proj4(
            this._proj4,
            WrfProjection._wrf_proj,
            [ i, j ]);

        return [lonlat[1], lonlat[0]];
    }    
}