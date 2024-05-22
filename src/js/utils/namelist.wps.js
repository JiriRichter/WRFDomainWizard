import { Namelist } from "./namelist";

export class WPSNamelist {
    constructor(obj) {

        var ns;

        // https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html#wps-namelist-variables

        this.share = {
            wrf_core: 'ARW', // A character string set to either ARW or NMM that tells the WPS which dynamical core the input data are being prepared for
            max_dom: 1, // An integer specifying the total number of domains (nests), including the parent domain, in the simulation
            start_year: null, // A list of MAX_DOM 4-digit integers specifying the starting UTC year of the simulation for each nest
            start_month: null, //A list of MAX_DOM 2-digit integers specifying the starting UTC month of the simulation for each nest
            start_day: null, // A list of MAX_DOM 2-digit integers specifying the starting UTC day of the simulation for each nest
            start_hour: null, // A list of MAX_DOM 2-digit integers specifying the starting UTC hour of the simulation for each nest
            end_year: null, //A list of MAX_DOM 4-digit integers specifying the ending UTC year of the simulation for each nest
            end_month: null, //A list of MAX_DOM 2-digit integers specifying the ending UTC month of the simulation for each nest
            end_day: null, //A list of MAX_DOM 2-digit integers specifying the ending UTC day of the simulation for each nest
            end_hour: null, //A list of MAX_DOM 2-digit integers specifying the ending UTC hour of the simulation for each nest
            start_date: null, //A list of MAX_DOM character strings of the form 'YYYY-MM-DD_HH:mm:ss' specifying the starting UTC date of the simulation for each nest. The start_date variable is an alternate to specifying start_year, start_month, start_day, and start_hour, and if both methods are used for specifying the starting time, the start_date variable will take precedence
            end_date: null, //A list of MAX_DOM character strings of the form 'YYYY-MM-DD_HH:mm:ss' specifying the ending UTC date of the simulation for each nest. The end_date variable is an alternate to specifying end_year, end_month, end_day, and end_hour, and if both methods are used for specifying the ending time, the end_date variable will take precedence
            interval_seconds: null, //The integer number of seconds between time-varying meteorological input files
            active_grid: true, //A list of MAX_DOM logical values specifying, for each grid, whether that grid should be processed by geogrid and metgrid
            io_form_geogrid: 2, //(NetCDF) The WRF I/O API format that the domain files created by the geogrid program will be written in. Possible options are: 1 for binary; 2 for NetCDF; 3 for GRIB1. When option 1 is given, domain files will have a suffix of .int; when option 2 is given, domain files will have a suffix of .nc; when option 3 is given, domain files will have a suffix of .gr1
            output_from_geogrid: null, //A character string giving the path, either relative or absolute, to the location where output files from geogrid should be written to and read from. Default is the current working directory
            debug_level: 0 //An integer value indicating the extent to which different types of messages should be sent to standard output. When debug_level is set to 0, only generally useful messages and warning messages will be written to standard output. When debug_level is greater than 100, informational messages that provide further runtime details are also written to standard output. Debugging messages and messages specifically intended for log files are never written to standard output, but are always written to the log files
        };

        this.geogrid = {
            parent_id: 1, //A list of MAX_DOM integers specifying, for each nest, the domain number of the nest's parent; for the coarsest domain, this variable should be set to 1
            parent_grid_ratio: null, //A list of MAX_DOM integers specifying, for each nest, the nesting ratio relative to the domain's parent
            i_parent_start: null, //A list of MAX_DOM integers specifying, for each nest, the x-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified            
            j_parent_start: null, //A list of MAX_DOM integers specifying, for each nest, the y-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified
            s_we: 1, //A list of MAX_DOM integers which should all be set to 1
            e_we: null, //A list of MAX_DOM integers specifying, for each nest, the nest's full west-east dimension. For nested domains, e_we must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_we = n*parent_grid_ratio+1 for some positive integer n)
            s_sn: 1, //A list of MAX_DOM integers which should all be set to 1
            e_sn: null, //A list of MAX_DOM integers specifying, for each nest, the nest's full south-north dimension. For nested domains, e_sn must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_sn = n*parent_grid_ratio+1 for some positive integer n)
            geog_data_res: 'default', //A list of MAX_DOM character strings specifying, for each nest, a corresponding resolution or list of resolutions separated by + symbols of source data to be used when interpolating static terrestrial data to the nest's grid. For each nest, this string should contain a resolution matching a string preceding a colon in a rel_path or abs_path specification (see the description of GEOGRID.TBL options) in the GEOGRID.TBL file for each field. If a resolution in the string does not match any such string in a rel_path or abs_path specification for a field in GEOGRID.TBL, a default resolution of data for that field, if one is specified, will be used. If multiple resolutions match, the first resolution to match a string in a rel_path or abs_path specification in the GEOGRID.TBL file will be used
            dx: null, //A real value specifying the grid distance in the x-direction where the map scale factor is 1. For ARW, the grid distance is in meters for the 'polar', 'lambert', and 'mercator' projection, and in degrees longitude for the 'lat-lon' projection; for NMM, the grid distance is in degrees longitude. Grid distances for nests are determined recursively based on values specified for parent_grid_ratio and parent_id
            dy: null, //A real value specifying the nominal grid distance in the y-direction where the map scale factor is 1. For ARW, the grid distance is in meters for the 'polar', 'lambert', and 'mercator' projection, and in degrees latitude for the 'lat-lon' projection; for NMM, the grid distance is in degrees latitude. Grid distances for nests are determined recursively based on values specified for parent_grid_ratio and parent_id
            map_proj: 'lambert', //A character string specifying the projection of the simulation domain. For ARW, accepted projections are 'lambert', 'polar', 'mercator', and 'lat-lon'; for NMM, a projection of 'rotated_ll' must be specified
            ref_lat: null, //A real value specifying the latitude part of a (latitude, longitude) location whose (i,j) location in the simulation domain is known. For ARW, ref_lat gives the latitude of the center-point of the coarse domain by default (i.e., when ref_x and ref_y are not specified). For NMM, ref_lat always gives the latitude to which the origin is rotated
            ref_lon: null, //A real value specifying the longitude part of a (latitude, longitude) location whose (i, j) location in the simulation domain is known. For ARW, ref_lon gives the longitude of the center-point of the coarse domain by default (i.e., when ref_x and ref_y are not specified). For NMM, ref_lon always gives the longitude to which the origin is rotated. For both ARW and NMM, west longitudes are negative, and the value of ref_lon should be in the range [-180, 180]
            ref_x: null, // default: (((E_WE-1.)+1.)/2.) = (E_WE/2.), A real value specifying the i part of an (i, j) location whose (latitude, longitude) location in the simulation domain is known. The (i, j) location is always given with respect to the mass-staggered grid, whose dimensions are one less than the dimensions of the unstaggered grid
            ref_y: null, // default: (((E_SN-1.)+1.)/2.) = (E_SN/2.), A real value specifying the j part of an (i, j) location whose (latitude, longitude) location in the simulation domain is known. The (i, j) location is always given with respect to the mass-staggered grid, whose dimensions are one less than the dimensions of the unstaggered grid
            truelat1: null, // A real value specifying, for ARW, the first true latitude for the Lambert conformal projection, or the only true latitude for the Mercator and polar stereographic projections. For NMM, truelat1 is ignored
            truelat2: null, // A real value specifying, for ARW, the second true latitude for the Lambert conformal conic projection. For all other projections, truelat2 is ignored
            stand_lon: null, // A real value specifying, for ARW, the longitude that is parallel with the y-axis in the Lambert conformal and polar stereographic projections. For the regular latitude-longitude projection, this value gives the rotation about the earth's geographic poles. For NMM, stand_lon is ignored
            pole_lat: 90, //For the latitude-longitude projection for ARW, the latitude of the North Pole with respect to the computational latitude-longitude grid in which -90.0 degrees latitude is at the bottom of a global domain, 90.0 degrees latitude is at the top, and 180.0 degrees longitude is at the center
            pole_lon: 0, //For the latitude-longitude projection for ARW, the longitude of the North Pole with respect to the computational lat/lon grid in which -90.0 degrees latitude is at the bottom of a global domain, 90.0 degrees latitude is at the top, and 180.0 degrees longitude is at the center
            geog_data_path: null, //A character string giving the path, either relative or absolute, to the directory where the geographical data directories may be found. This path is the one to which rel_path specifications in the GEOGRID.TBL file are given in relation to
            opt_geogrid_tbl_path: './geogrid/', //A character string giving the path, either relative or absolute, to the GEOGRID.TBL file. The path should not contain the actual file name, as GEOGRID.TBL is assumed, but should only give the path where this file is located        
        };

        this.ungrib = {
            out_format: 'WPS', //A character string set either to 'WPS', 'SI', or 'MM5'. If set to 'MM5', ungrib will write output in the format of the MM5 pregrid program; if set to 'SI', ungrib will write output in the format of grib_prep.exe; if set to 'WPS', ungrib will write data in the WPS intermediate format
            prefix: 'FILE', //A character string that will be used as the prefix for intermediate-format files created by ungrib; here, prefix refers to the string PREFIX in the filename PREFIX:YYYY-MM-DD_HH of an intermediate file. The prefix may contain path information, either relative or absolute, in which case the intermediate files will be written in the directory specified. This option may be useful to avoid renaming intermediate files if ungrib is to be run on multiple sources of GRIB data
            add_lvls: false, //A logical that determines whether ungrib will attemp to vertically interpolate to an additional set of vertical levels specified using the NEW_PLVL and INTERP_TYPE namelist options
            interp_type: 0, //An integer value specifying the method that ungrib will use when vertically interpolating to new levels. A value of 0 causes ungrib to interpolate linearly in pressure, and a value of 1 causes ungrib to interpolate linearly in log pressure
            new_plvl: null, //An array of real values that specify the additional vertical levels, given in Pa, to which the ungrib program will attempt to interpolate when ADD_LVLS is true. The set of new levels can be specified explicitly, or, if the levels are evenly spaced in pressure, exactly three values can be specified: the starting pressure, the ending pressure, and the pressure increment. When a starting pressure, ending pressure, and increment are specified, the pressure increment must be a negative number to signal to the ungrib program that this value is not a target pressure level, but rather, an increment to be used between the first and second values
            pmin: 100, //A real value specifying the minimum pressure level, in Pa, to be processed from GRIB data. This option applies only to isobaric data sets            
        };

        this.metgrid = {
            fg_name: null, //A list of character strings specifying the path and prefix of ungribbed data files. The path may be relative or absolute, and the prefix should contain all characters of the filenames up to, but not including, the colon preceding the date. When more than one fg_name is specified, and the same field is found in two or more input sources, the data in the last encountered source will take priority over all preceding sources for that field
            constants_name: null, //A list of character strings specifying the path and full filename of ungribbed data files which are time-invariant. The path may be relative or absolute, and the filename should be the complete filename; since the data are assumed to be time-invariant, no date will be appended to the specified filename
            io_form_metgrid: 2, //The WRF I/O API format that the output created by the metgrid program will be written in. Possible options are: 1 for binary; 2 for NetCDF; 3 for GRIB1. When option 1 is given, output files will have a suffix of .int; when option 2 is given, output files will have a suffix of .nc; when option 3 is given, output files will have a suffix of .gr1
            opt_output_from_metgrid_path: null, //Default current working directory (i.e., ./ ), A character string giving the path, either relative or absolute, to the location where output files from metgrid should be written to
            opt_metgrid_tbl_path: './metgrid', //A character string giving the path, either relative or absolute, to the METGRID.TBL file; the path should not contain the actual file name, as METGRID.TBL is assumed, but should only give the path where this file is located
            process_only_bdy: 0 //An integer specifying the number of boundary rows and columns to be processed by metgrid for time periods after the initial time; for the initial time, metgrid will always interpolate to every grid point. Setting this option to the intended value of spec_bdy_width in the WRF namelist.input will speed up processing in metgrid, but it should not be set if interpolated data are needed in the domain interior. If this option is set to zero, metgrid will horizontally interpolate meteorological data to every grid point in the model domains. This option is only available for ARW            
        };

        if (typeof obj === 'string') {
            ns = new Namelist(obj);
            
            if ('hgridspec' in ns) {
                // Format used prior WRF version 3
                this._createWRFSI(ns);
            } else {
                this._create(ns);
            }
        }
    }

    _create(ns) {

        if ('share' in ns) {
            Object.assign(this.share, ns['share']);
            Namelist.convertToArray(this.geogrid, 'start_year');
            Namelist.convertToArray(this.geogrid, 'start_month');
            Namelist.convertToArray(this.geogrid, 'start_day');
            Namelist.convertToArray(this.geogrid, 'start_hour');
            Namelist.convertToArray(this.geogrid, 'end_year');
            Namelist.convertToArray(this.geogrid, 'end_month');
            Namelist.convertToArray(this.geogrid, 'end_day');
            Namelist.convertToArray(this.geogrid, 'end_hour');
            Namelist.convertToArray(this.geogrid, 'start_date');
            Namelist.convertToArray(this.geogrid, 'end_date');
            Namelist.convertToArray(this.geogrid, 'active_grid');
        }

        if ('geogrid' in ns) {
            Object.assign(this.geogrid, ns['geogrid']);
            Namelist.convertToArray(this.geogrid, 'parent_id');
            Namelist.convertToArray(this.geogrid, 'parent_grid_ratio');
            Namelist.convertToArray(this.geogrid, 'i_parent_start');
            Namelist.convertToArray(this.geogrid, 'J_parent_start');
            Namelist.convertToArray(this.geogrid, 's_we');
            Namelist.convertToArray(this.geogrid, 'e_we');
            Namelist.convertToArray(this.geogrid, 's_sn');
            Namelist.convertToArray(this.geogrid, 'e_sn');
            Namelist.convertToArray(this.geogrid, 'geog_data_res');
        }

        if ('ungrib' in ns) {
            Object.assign(this.ungrib, ns['ungrib']);
        }

        if ('metgrid' in ns) {
            Object.assign(this.metgrid, ns['metgrid']);
        }
    }

    _createWRFSI(ns) {
        this.share.wrf_core = 'ARW';
        this.share.max_dom = ns['hgridspec']['num_domains'];
        var now = new Date();
        var tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.share.start_date = [];
        this.share.end_date = [];
        for (var i = 0; i < this.share.max_dom; i++) {
            //2014-02-22_03: 00: 00
            this.share.start_date.push(now.getFullYear().toString() + '-' + now.getMonth().toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '_03:00:00');
            this.share.end_date.push(tomorrow.getFullYear().toString() + '-' + tomorrow.getMonth().toString().padStart(2, '0') + '-' + tomorrow.getDate().toString().padStart(2, '0') + '_03:00:00');
        }

        this.geogrid.parent_id = [];
        this.geogrid.parent_grid_ratio = [];
        this.geogrid.i_parent_start = [];
        this.geogrid.j_parent_start = [];
        this.geogrid.e_we = [];
        this.geogrid.e_sn = [];
        this.geogrid.geog_data_res = [];

        for (var i = 0; i < this.share.max_dom; i++) {
            this.geogrid.parent_id.push(ns['hgridspec']['parent_id'][i]);
            this.geogrid.parent_grid_ratio.push(ns['hgridspec']['ratio_to_parent'][i]);
            this.geogrid.i_parent_start.push(ns['hgridspec']['domain_origin_lli'][i]);
            this.geogrid.j_parent_start.push(ns['hgridspec']['domain_origin_llj'][i]);

            var e_we = (ns['hgridspec']['domain_origin_uri'][i] - ns['hgridspec']['domain_origin_lli'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;
            var e_sn = (ns['hgridspec']['domain_origin_urj'][i] - ns['hgridspec']['domain_origin_llj'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;

            this.geogrid.e_we.push(e_we);
            this.geogrid.e_sn.push(e_sn);

            this.geogrid.geog_data_res.push('default');
        }

        this.geogrid.dx = ns['hgridspec']['moad_delta_x'];
        this.geogrid.dy = ns['hgridspec']['moad_delta_y'];
        this.geogrid.map_proj = ns['hgridspec']['map_proj_name'];
        this.geogrid.ref_lat = ns['hgridspec']['moad_known_lat'];
        this.geogrid.ref_lon = ns['hgridspec']['moad_known_lon'];
        if (Array.isArray(ns['hgridspec']['moad_stand_lats'])) {
            this.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'][0];
            this.geogrid.truelat2 = ns['hgridspec']['moad_stand_lats'][1];
        }
        else {
            this.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'];
            this.geogrid.truelat2 = 0;
        }
        if (Array.isArray(ns['hgridspec']['moad_stand_lons'])) {
            this.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'][0];
        }
        else {
            this.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'];
        }
        this.geogrid.geog_data_path = '/home/wrf/geog';


        this.share.interval_seconds = 10800;
        this.share.io_form_geogrid = 2;

        this.ungrib.out_format = 'WPS';
        this.ungrib.prefix = 'UNGRIB';

        this.metgrid.fg_name = 'UNGRIB';
        this.metgrid.io_form_metgrid = 2;
        this.metgrid.opt_metgrid_tbl_path = '/home/wrf';
    }

    static _formarDate(d) {
        return (d.getFullYear().toString() + '-' + d.getMonth().toString().padStart(2, '0') + '-' + d.getDay().toString().padStart(2, '0'));
    }    

    _setDefaults() {
        // set default values
        if (!this.share.start_date || !this.share.end_date) {
            var now = new Date();
            var start_date = WPSNamelist._formarDate(now) + '_03:00:00';
            var end_date = WPSNamelist._formarDate(now) + '_18:00:00';
            this.share.start_date = [];
            this.share.end_date = [];
            while (this.share.start_date.length < this.share.max_dom) {
                this.share.start_date.push(start_date);
                this.share.end_date.push(end_date);
            }
        }

        if (this.share.interval_seconds === null) {
            // 6 hours
            this.share.interval_seconds = 6 * 60 * 60;
        }

        if (this.share.debug_level === null) {
            this.share.debug_level = 0;
        }

        if (this.geogrid.geog_data_path === null) {
            this.geogrid.geog_data_path = 'geog';
        }

        if (this.geogrid.opt_geogrid_tbl_path === null) {
            this.geogrid.opt_geogrid_tbl_path = 'geogrid';
        }

        if (this.metgrid.fg_name === null) {
            this.metgrid.fg_name = 'FILE';
        }
    }

    toString() {

        this._setDefaults();

        let content = '';

        content += Namelist.formatSection(
            'share',
            ['wrf_core', 'max_dom', 'start_date', 'end_date', 'interval_seconds', 'io_form_geogrid', 'debug_level'],
            [this.share.wrf_core, this.share.max_dom, this.share.start_date, this.share.end_date, this.share.interval_seconds, this.share.io_form_geogrid, this.share.debug_level]);

        content += Namelist.formatSection(
            'geogrid',
            [
                'parent_id',
                'parent_grid_ratio',
                'i_parent_start',
                'j_parent_start',
                'e_we',
                'e_sn',
                'geog_data_res',
                'dx',
                'dy',
                'map_proj',
                'ref_lat',
                'ref_lon',
                'truelat1',
                'truelat2',
                'pole_lat',
                'pole_lon',
                'stand_lon',
                'geog_data_path',
                'opt_geogrid_tbl_path'
            ],
            [
                this.geogrid.parent_id,
                this.geogrid.parent_grid_ratio,
                this.geogrid.i_parent_start,
                this.geogrid.j_parent_start,
                this.geogrid.e_we,
                this.geogrid.e_sn,
                this.geogrid.geog_data_res,
                this.geogrid.dx,
                this.geogrid.dy,
                this.geogrid.map_proj,
                this.geogrid.ref_lat,
                this.geogrid.ref_lon,
                this.geogrid.truelat1,
                this.geogrid.truelat2,
                this.geogrid.pole_lat,
                this.geogrid.pole_lon,
                this.geogrid.stand_lon,
                this.geogrid.geog_data_path,
                this.geogrid.opt_geogrid_tbl_path
            ]);
        content += Namelist.formatSection(
            'ungrib',
            ['out_format', 'prefix'],
            [this.ungrib.out_format, this.ungrib.prefix]);
        content += Namelist.formatSection(
            'metgrid',
            ['fg_name', 'io_form_metgrid', 'opt_metgrid_tbl_path'],
            [this.metgrid.fg_name, this.metgrid.io_form_metgrid, this.metgrid.opt_metgrid_tbl_path]);
        return content;
    }
}

export function wpsNamelist(obj) {
    return new WPSNamelist(obj);
}