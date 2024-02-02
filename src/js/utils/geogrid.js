import { WrfProjection } from "./wrf.projection";
import { EarthRadius, WrfProjections } from './constants';
import { degreesToMeters } from "./math";

export class Geogrid {

    constructor(id, wps, parent) {

        this._wps = Object.assign({
            map_proj: null,
            ref_lat: null,
            ref_lon: null,
            truelat1: null, 
            truelat2: null,
            stand_lon: null,
            dx: null,
            dy: null,
            s_we: 1,
            s_sn: 1,
            e_we: null,
            e_sn: null,
            parent_grid_ratio: null,
            i_parent_start: null,
            j_parent_start: null
        },
        wps);

        if (parent) {
            this.parent = parent;
            if (this._wps.parent_grid_ratio === null) {
                throw new Error('parent_grid_ratio must be specified for nested grids');
            }
            if (this._wps.i_parent_start === null) {
                throw new Error('i_parent_start must be specified for nested grids');
            }
            if (this._wps.j_parent_start === null) {
                throw new Error('j_parent_start must be specified for nested grids');
            }
        }
        else {
            this.parent = null;
        }

        if (typeof(id) === 'Number') {
            this.id = `d${id.toString().padStart('0', 2)}`;
        }
        else {
            this.id = id.toString();
        }
        this._initialize();
    }

    get wps() { return this._wps; }

    get projection() { return this._projection; }

    get corners() { return this._corners; }

    get parent_grid_ratio() { return this._wps.parent_grid_ratio; }
    get i_parent_start() { return this._wps.i_parent_start; }
    get j_parent_start() { return this._wps.j_parent_start; }
    get e_we() { return this._wps.e_we; }
    get e_sn() { return this._wps.e_sn; }

    get polygonPath() {

        if (!this._polygonPath){
            this._polygonPath = this._initPolygonPath();
        }

         return this._polygonPath; 
    }

    _initialize() {

        this._proj_ref_lat = this._wps.ref_lat;
        this._proj_ref_lon = this._wps.ref_lon;
        this._proj_truelat1 = this._wps.truelat1;
        this._proj_truelat2 = this._wps.truelat2;
        this._proj_stand_lon = this._wps.stand_lon;
        this._proj_dx = this._wps.dx;
        this._proj_dy = this._wps.dy;
        this._proj_e_we = this._wps.e_we;
        this._proj_e_sn = this._wps.e_sn;

        // i,j start on a grid with nets's DX,DY
        let i_moad_start = 0, j_moad_start = 0;        
        let nest = this.parent !== null;

        console.debug(`Initializing grid ${this.id}`);
        console.debug(' WPS:');
        if (this._wps.map_proj === WrfProjections.latlon) {
            console.debug(`  dx: ${this._wps.dx} deg`);
            console.debug(`  dy: ${this._wps.dy} deg`);
        }
        else {
            console.debug(`  dx: ${this._proj_dx}m`);
            console.debug(`  dy: ${this._proj_dy}m`);
        }
        console.debug(`  e_sn: ${this._wps.e_sn}`);
        console.debug(`  e_we: ${this._wps.e_we}`);

        // conver DX,DY from degrees to meters
        if (this._wps.map_proj === WrfProjections.latlon) {

            // If no dx,dy specified, assume global grid
            if (isNaN(this._wps.dx) && isNaN(this._wps.dy)) {

                const dlondeg = 360 / (this._wps.e_we - this._wps.s_we);
                const dlatdeg = 180 / (this._wps.e_sn - this._wps.s_sn);

                this._proj_ref_lon = this._wps.stand_lon + dlondeg / 2;
                this._proj_ref_lat = -90. + dlatdeg / 2;

                this._proj_dx = EarthRadius * Math.PI * 2.0 / (this._wps.e_we - this._wps.s_we)
                this._proj_dy = EarthRadius * Math.PI       / (this._wps.e_sn - this._wps.s_sn)
            }
            else {

                this._proj_dx = degreesToMeters(this._wps.dx);
                this._proj_dy = degreesToMeters(this._wps.dy);

                if (this._wps.ref_lat === null && this._wps.ref_lon === null) {
                    throw new Error('For lat-lon projection, if dx/dy are specified, a regional domain is assumed, and a ref_lat,ref_lon must also be specified');
                }
            }            

            console.debug(`  dx: ${this._proj_dx}m`);
            console.debug(`  dy: ${this._proj_dy}m`);
        }        

        if (nest) {

            console.debug(' Nest:');
            console.debug(`  parent_grid_ratio: ${this.parent_grid_ratio}`);
            console.debug(`  i_parent_start: ${this.i_parent_start}`);
            console.debug(`  j_parent_start: ${this.j_parent_start}`);

            let 
                // grid ratio to MOAD grid
                moad_grid_ratio = 1,

                // temp grid holder
                grid = this;

            // grid point to MOAD after existing the while loop
            while (grid.parent != null) {
                moad_grid_ratio *= grid.parent_grid_ratio;
                i_moad_start += (grid.i_parent_start - 1) * moad_grid_ratio;
                j_moad_start += (grid.j_parent_start - 1) * moad_grid_ratio;
                grid = grid.parent;
            }

            console.debug(`  moad_grid_ratio: ${moad_grid_ratio}`);
            console.debug(`  i_moad_start: ${i_moad_start}`);
            console.debug(`  j_moad_start: ${j_moad_start}`);

            // set projection to cover whole MOAD grid
            this._proj_dx = this._proj_dx / moad_grid_ratio;
            this._proj_dy = this._proj_dy / moad_grid_ratio;
            this._proj_e_we = (grid.e_we - 1) * moad_grid_ratio + 1;
            this._proj_e_sn = (grid.e_sn - 1) * moad_grid_ratio + 1;

            console.debug(`  dx: ${this._proj_dx}m`);
            console.debug(`  dy: ${this._proj_dy}m`);
            console.debug(`  e_sn: ${this._proj_e_sn}`);
            console.debug(`  e_we: ${this._proj_e_we}`);
        }

        this._projection = new WrfProjection(
            {
                map_proj: this._wps.map_proj,
                ref_lat: this._proj_ref_lat,
                ref_lon: this._proj_ref_lon,
                truelat1: this._proj_truelat1,
                truelat2: this._proj_truelat2,
                stand_lon: this._proj_stand_lon,
                dx: this._proj_dx,
                dy: this._proj_dy,
                e_we: this._proj_e_we,
                e_sn: this._proj_e_sn
            });        

        // mass grid starts from center of SW grid cell - point 0, 0
        const mass_grid_size_i = (this._proj_e_we - 2) * this._proj_dx;
        const mass_grid_size_j = (this._proj_e_sn - 2) * this._proj_dy;

        // corners grid starts from SW corner - point 0, 0
        const unstaggered_grid_size_i = (this._proj_e_we - 1) * this._proj_dx;
        const unstaggered_grid_size_j = (this._proj_e_sn - 1) * this._proj_dy;

        console.debug(`  unstaggered_grid_size_i: ${unstaggered_grid_size_i}m`);
        console.debug(`  unstaggered_grid_size_j: ${unstaggered_grid_size_j}m`);

        var grid_center_ij = this._projection.latlon_to_ij(this._proj_ref_lat, this._proj_ref_lon);
        console.debug(`  grid_center_ij: [${grid_center_ij[0]}, ${grid_center_ij[1]}]`);

        this._mass_offset_i = grid_center_ij[0] - mass_grid_size_i * 0.5;
        this._mass_offset_j = grid_center_ij[1] - mass_grid_size_j * 0.5;

        this._unstaggered_offset_i = grid_center_ij[0] - unstaggered_grid_size_i * 0.5 + i_moad_start * this._proj_dx;
        this._unstaggered_offset_j = grid_center_ij[1] - unstaggered_grid_size_j * 0.5 + j_moad_start * this._proj_dy;        

        console.debug(`  unstaggered_offset_i: ${this._unstaggered_offset_i}m`);
        console.debug(`  unstaggered_offset_j: ${this._unstaggered_offset_j}m`);

        this._corners = {
            sw: this.unstaggered_ij_to_latlon(0, 0),
            se: this.unstaggered_ij_to_latlon(this._wps.e_we - 1, 0),
            ne: this.unstaggered_ij_to_latlon(this._wps.e_we - 1, this._wps.e_sn - 1),
            nw: this.unstaggered_ij_to_latlon(0, this._wps.e_sn - 1)
        };  
    }

    // function return grid polygon path
    _initPolygonPath() {
        var i, j,
            path = [],
            step = 5;

        path.push(this._corners.sw);
        for (i = step; i < (this._wps.e_we - 1 - step); i += step) {
            path.push(this.unstaggered_ij_to_latlon(i, 0));
        }
        path.push(this._corners.se);
        for (j = step; j < (this._wps.e_sn - 1 - step); j += step) {
            path.push(this.unstaggered_ij_to_latlon(this._wps.e_we - 1, j));
        }
        path.push(this._corners.ne);
        for (i = this._wps.e_we - 1 - step; i > step; i -= step) {
            path.push(this.unstaggered_ij_to_latlon(i, this._wps.e_sn - 1));
        }
        path.push(this._corners.nw);
        for (j = this._wps.e_sn - 1 - step; j > step; j -= step) {
            path.push(this.unstaggered_ij_to_latlon(0, j));
        }
        path.push(this._corners.sw);
        return path;
    }

    //Convert latitude and longitude into grid corners coordinates
    latlon_to_unstaggered_ij(lat, lon) {

        var ij = this._projection.latlon_to_ij(lat, lon);

        ij[0] = (ij[0] - this._unstaggered_offset_i) / this._proj_dx;
        ij[1] = (ij[1] - this._unstaggered_offset_j) / this._proj_dy;

        return ij;
    }

    // Convert grid corners coordinates to latitude and longitude
    // (0, 0) is the SW corner
    // NE corner is(e_we - 1, e_sn - 1)
    unstaggered_ij_to_latlon(i, j) {

        // transform coordinates to lat, lon
        return this._projection.ij_to_latlon(
            i * this._proj_dx + this._unstaggered_offset_i,
            j * this._proj_dy + this._unstaggered_offset_j);

    }
}