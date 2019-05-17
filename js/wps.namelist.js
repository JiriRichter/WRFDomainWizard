// depends on google.maps.geometry
/**
 * @constructor
 */
var WPSNamelist = function (obj) {

    var ns;

    this.share = {};

    this.share.wrf_core = 'ARW';
    this.share.interval_seconds = 10800;
    this.share.io_form_geogrid = 2;
    this.share.debug_level = 0;

    this.geogrid = {};
    this.geogrid.geog_data_path = '/home/wrf/geog';
    this.geogrid.opt_geogrid_tbl_path = '/home/wrf/RUN.TABLES';

    this.ungrib = {};
    this.ungrib.out_format = 'WPS';
    this.ungrib.prefix = 'UNGRIB';

    this.metgrid = {};
    this.metgrid.fg_name = 'UNGRIB';
    this.metgrid.io_form_metgrid = 2;
    this.metgrid.opt_metgrid_tbl_path = '/home/wrf/RUN.TABLES'

    if (typeof obj === 'string') {
        ns = new Namelist(obj);

        this.share.wrf_core = ns['share']['wrf_core'];
        this.share.max_dom = ns['share']['max_dom'];
        this.share.start_date = ns['share']['start_date'];
        this.share.end_date = ns['share']['end_date'];
        this.share.interval_seconds = ns['share']['interval_seconds'];
        if (this.share.io_form_geogrid) {
            this.share.io_form_geogrid = ns['share']['io_form_geogrid'];
        }
        if (this.share.debug_level) {
            this.share.debug_level = ns['share']['debug_level'];
        }

        /*
        1. PARENT_ID :  A list of MAX_DOM integers specifying, for each nest, the domain number of the nest’s parent; for the coarsest domain, this variable should be set to 1. Default value is 1.
        2. PARENT_GRID_RATIO : A list of MAX_DOM integers specifying, for each nest, the nesting ratio relative to the domain’s parent. No default value.
        3. I_PARENT_START : A list of MAX_DOM integers specifying, for each nest, the x-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified. No default value.
        4. J_PARENT_START : A list of MAX_DOM integers specifying, for each nest, the y-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified. No default value.
        5. S_WE : A list of MAX_DOM integers which should all be set to 1. Default value is 1.
        6. E_WE : A list of MAX_DOM integers specifying, for each nest, the nest’s full west-east dimension. For nested domains, e_we must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_we = n*parent_grid_ratio+1 for some positive integer n). No default value.
        7. S_SN : A list of MAX_DOM integers which should all be set to 1. Default value is 1.
        8. E_SN : A list of MAX_DOM integers specifying, for each nest, the nest’s full south-north dimension. For nested domains, e_sn must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_sn = n*parent_grid_ratio+1 for some positive integer n). No default value.
        9. GEOG_DATA_RES : A list of MAX_DOM character strings specifying, for each nest, a corresponding resolution or list of resolutions separated by + symbols of source data to be used when interpolating static terrestrial data to the nest’s grid. For each nest, this string should contain a resolution matching a string preceding a colon in a rel_path or abs_path specification (see the description of GEOGRID.TBL options) in the GEOGRID.TBL file for each field. If a resolution in the string does not match any such string in a rel_path or abs_path specification for a field in GEOGRID.TBL, a default resolution of data for that field, if one is specified, will be used. If multiple resolutions match, the first resolution to match a string in a rel_path or abs_path specification in the GEOGRID.TBL file will be used. Default value is 'default'.
          */

        this.geogrid.parent_id = [].concat(ns['geogrid']['parent_id']);
        this.geogrid.parent_grid_ratio = [].concat(ns['geogrid']['parent_grid_ratio']);
        this.geogrid.i_parent_start = [].concat(ns['geogrid']['i_parent_start']);
        this.geogrid.j_parent_start = [].concat(ns['geogrid']['j_parent_start']);
        this.geogrid.e_we = [].concat(ns['geogrid']['e_we']);
        this.geogrid.e_sn = [].concat(ns['geogrid']['e_sn']);
        this.geogrid.geog_data_res = [].concat(ns['geogrid']['geog_data_res']);


        this.geogrid.dx = ns['geogrid']['dx'];
        this.geogrid.dy = ns['geogrid']['dy'];
        this.geogrid.map_proj = ns['geogrid']['map_proj'];
        this.geogrid.ref_lat = ns['geogrid']['ref_lat'];
        this.geogrid.ref_lon = ns['geogrid']['ref_lon'];
        this.geogrid.truelat1 = ns['geogrid']['truelat1'];
        this.geogrid.truelat2 = ns['geogrid']['truelat2'];
        this.geogrid.stand_lon = ns['geogrid']['stand_lon'];
        if (ns['geogrid']['geog_data_path']) {
            this.geogrid.geog_data_path = ns['geogrid']['geog_data_path'];
        }
        if (ns['geogrid']['opt_geogrid_tbl_path']) {
            this.geogrid.opt_geogrid_tbl_path = ns['geogrid']['opt_geogrid_tbl_path'];
        }

        this.ungrib.out_format = ns['ungrib']['out_format'];
        this.ungrib.prefix = ns['ungrib']['prefix'];

        this.metgrid.fg_name = ns['metgrid']['fg_name'];
        this.metgrid.io_form_metgrid = ns['metgrid']['io_form_metgrid'];
        if (ns['metgrid']['opt_metgrid_tbl_path']) {
            this.metgrid.opt_metgrid_tbl_path = ns['metgrid']['opt_metgrid_tbl_path'];
        }
    }
}

WPSNamelist.converFromWRFSIString = function (data) {
    var ns = new Namelist(data);
    var wpsNamelist = new WPSNamelist();

    wpsNamelist.share.wrf_core = 'AWR';
    wpsNamelist.share.max_dom = ns['hgridspec']['num_domains'];
    var now = new Date();
    var tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    wpsNamelist.share.start_date = [];
    wpsNamelist.share.end_date = [];
    for (var i = 0; i < wpsNamelist.share.max_dom; i++) {
        //2014-02-22_03: 00: 00
        wpsNamelist.share.start_date.push(now.getFullYear().toString() + '-' + now.getMonth().toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '_03:00:00')
        wpsNamelist.share.end_date.push(tomorrow.getFullYear().toString() + '-' + tomorrow.getMonth().toString().padStart(2, '0') + '-' + tomorrow.getDate().toString().padStart(2, '0') + '_03:00:00')
    }

    wpsNamelist.geogrid.parent_id = [];
    wpsNamelist.geogrid.parent_grid_ratio = [];
    wpsNamelist.geogrid.i_parent_start = [];
    wpsNamelist.geogrid.j_parent_start = [];
    wpsNamelist.geogrid.e_we = [];
    wpsNamelist.geogrid.e_sn = [];
    wpsNamelist.geogrid.geog_data_res = [];

    for (var i = 0; i < wpsNamelist.share.max_dom; i++) {
        wpsNamelist.geogrid.parent_id.push(ns['hgridspec']['parent_id'][i]);
        wpsNamelist.geogrid.parent_grid_ratio.push(ns['hgridspec']['ratio_to_parent'][i]);
        wpsNamelist.geogrid.i_parent_start.push(ns['hgridspec']['domain_origin_lli'][i]);
        wpsNamelist.geogrid.j_parent_start.push(ns['hgridspec']['domain_origin_llj'][i]);

        var e_we = (ns['hgridspec']['domain_origin_uri'][i] - ns['hgridspec']['domain_origin_lli'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;
        var e_sn = (ns['hgridspec']['domain_origin_urj'][i] - ns['hgridspec']['domain_origin_llj'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;

        wpsNamelist.geogrid.e_we.push(e_we);
        wpsNamelist.geogrid.e_sn.push(e_sn) ;

        wpsNamelist.geogrid.geog_data_res.push('default');
    }

    wpsNamelist.geogrid.dx = ns['hgridspec']['moad_delta_x'];
    wpsNamelist.geogrid.dy = ns['hgridspec']['moad_delta_y'];
    wpsNamelist.geogrid.map_proj = ns['hgridspec']['map_proj_name'];
    wpsNamelist.geogrid.ref_lat = ns['hgridspec']['moad_known_lat'];
    wpsNamelist.geogrid.ref_lon = ns['hgridspec']['moad_known_lon'];
    if (Array.isArray(ns['hgridspec']['moad_stand_lats'])) {
        wpsNamelist.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'][0];
        wpsNamelist.geogrid.truelat2 = ns['hgridspec']['moad_stand_lats'][1];
    }
    else {
        wpsNamelist.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'];
        wpsNamelist.geogrid.truelat2 = 0;
    }
    if (Array.isArray(ns['hgridspec']['moad_stand_lons'])) {
        wpsNamelist.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'][0];
    }
    else {
        wpsNamelist.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'];
    }
    wpsNamelist.geogrid.geog_data_path = '/home/wrf/geog';


    wpsNamelist.share.interval_seconds = 10800;
    wpsNamelist.share.io_form_geogrid = 2;

    wpsNamelist.ungrib.out_format = 'WPS';
    wpsNamelist.ungrib.prefix = 'UNGRIB';

    wpsNamelist.metgrid.fg_name = 'UNGRIB';
    wpsNamelist.metgrid.io_form_metgrid = 2;
    wpsNamelist.metgrid.opt_metgrid_tbl_path = '/home/wrf';

    return wpsNamelist;
}

WPSNamelist.prototype.createFromString = function (data) {

}

WPSNamelist.prototype.toString = function () {

    if (!Number.isInteger) {
        Number.isInteger = function isInteger(nVal) {
            return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
        };
    }

    function valueToString(val) {
        if (Array.isArray(val)) {
            var strVal = valueToString(val[0]);
            for (var i = 1; i < val.length; i++) {
                strVal += ', ' + valueToString(val[i]);
            }
            return strVal;
        }
        else if (typeof val == "string") {
            return "'" + val + "'";
        }
        else if (typeof val == "boolean") {
            return (val) ? '.true.' : '.false.';
        }
        else if (!Number.isInteger(val)) {
            return val.toFixed(3);
        }
        return val.toString();
    }

    function wpsSectionToString(section, properties, values) {
        var content = '&' + section + '\n';

        for (var i = 0; i < properties.length; i++) {
            content += ' ' + properties[i].padEnd(20) + ' = ' + valueToString(values[i]) + '\n';
        }

        return content + '/\n\n';
    };

    function getDateString(d) {
        return (d.getFullYear().toString() + '-' + d.getMonth().toString().padStart(2, '0') + '-' + d.getDay().toString().padStart(2, '0'));
    }

    var content = '';

    if (!this.share.start_date || !this.share.end_date) {
        var now = new Date();
        var start_date = getDateString(now) + '_03:00:00';
        var end_date = getDateString(now) + '_18:00:00';
        this.share.start_date = [];
        this.share.end_date = [];
        while (this.share.start_date.length < this.share.max_dom) {
            this.share.start_date.push(start_date);
            this.share.end_date.push(end_date);
        }
    }

    content += wpsSectionToString(
        'share',
        ['wrf_core', 'max_dom', 'start_date', 'end_date', 'interval_seconds', 'io_form_geogrid', 'debug_level'],
        [this.share.wrf_core, this.share.max_dom, this.share.start_date, this.share.end_date, this.share.interval_seconds, this.share.io_form_geogrid, this.share.debug_level]);

    content += wpsSectionToString(
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
            this.geogrid.stand_lon,
            this.geogrid.geog_data_path,
            this.geogrid.opt_geogrid_tbl_path
        ]);
    content += wpsSectionToString(
        'ungrib',
        ['out_format', 'prefix'],
        [this.ungrib.out_format, this.ungrib.prefix]);
    content += wpsSectionToString(
        'metgrid',
        ['fg_name', 'io_form_metgrid', 'opt_metgrid_tbl_path'],
        [this.metgrid.fg_name, this.metgrid.io_form_metgrid, this.metgrid.opt_metgrid_tbl_path]);
    return content;
}