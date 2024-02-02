import proj4 from 'proj4';
import { EarthRadius, WrfProjections } from './constants';

// PROJ4 strings based on https://github.com/NCAR/wrf-python/blob/develop/src/wrf/projection.py
export class WrfProjection {

    static earth_radius = 6370000;

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

        // Lambert Conformal Conic
        if (this._params.map_proj === WrfProjections.lambert) {

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
        }

        // Mercator
        else if (this._params.map_proj === WrfProjections.mercator) {

            this._proj4 = '+units=m'
                + ' +proj=merc'
                + ' +lat_ts=' + this._params.truelat1
                + ' +lon_0=' + this._params.stand_lon
                + ' +a=' + EarthRadius
                + ' +b=' + EarthRadius
                + ' +towgs84=0,0,0'
                + ' +no_defs=True'
                + ' +nadgrids=null';
        }

        // Polar stereographic
        else if (this._params.map_proj === WrfProjections.polar) {

            const hemi = (this._params.truelat1 < 0) ? -90 : 90;
            const lat_ts = this._params.truelat1;

            this._proj4 = '+units=m'
                + ' +proj=stere'
                + ' +lat_0=' + hemi
                + ' +lon_0=' + this._params.stand_lon
                + ' +lat_ts=' + lat_ts
                + ' +a=' + EarthRadius
                + ' +b=' + EarthRadius;
        }

        // Regular latitude-longitude, or cylindrical equidistant
        else if (this._params.map_proj === WrfProjections.latlon) {

            this._proj4 = '+units=m'
                + ' +proj=eqc'
                + ' +lon_0=' + this._params.stand_lon
                + ' +a=' + EarthRadius
                + ' +b=' + EarthRadius
                + ' +nadgrids=null'
                + ' +towgs84=0,0,0'
                + ' +no_defs=True';
        }

        // Rotated latitude-longitude, or cylindrical equidistant
        // else if (this._params.map_proj === WrfProjections.rotated_ll) {
        //     

        //     // Need to determine hemisphere, typically pole_lon is 0 for southern
        //     // hemisphere, 180 for northern hemisphere.
        //     let north = true;
        //     if (this._wps.pole_lon !== null) {
        //         if (this._wps.pole_lon == 0){
        //             north = false;
        //         }
        //         else if (this._wps.pole_lon != 180) {
        //             if (this._wps.ref_lat < 0.0) {
        //                 north = false;
        //             }
        //         }
        //     }
        //     else {
        //         if (this._wps.ref_lat < 0.0) {
        //             north = false;
        //         }
        //     }
    
        //     const bm_cart_pole_lat = ;
        //     const cart_pole_lon = ;

        //     this._proj4 = '+proj=ob_tran'
        //         + ' +o_proj=latlon'
        //         + ' +a=' + EarthRadius
        //         + ' +b=' + EarthRadius
        //         + ' +to_meter=' // + math.radians(1)
        //         + ' +o_lon_p=' + 180.0 - this._wps.pole_lon
        //         + ' +o_lat_p=' + 180.0 - bm_cart_pole_lat
        //         + ' +lon_0=' + 180.0 + cart_pole_lon;
        // }
        else {
            throw ("Unsupported projection " + this._wps.map_proj);
        }
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