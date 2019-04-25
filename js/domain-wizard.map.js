'use strict';

/**
 * Leaflet map helper object
 * @constructor
 */
var DomainWizardMap = function (options) {

    var self = this,
        defaults,
        settings,
        map,
        persistentLayersControl,
        sidebar,
        sidebarWPS,
        sidebarElevationData;

    // default options
    defaults = /** @dict */ {
        div: null
    }

    // current settings
    settings = /** @dict */ $.extend({}, defaults, options);

    if (!settings['div'] && !settings['div'].length && settings['div'] != 1) {
        throw "invalid div option";
    }

    // create a list of base layer tile providers
    persistentLayersControl = L.control.persistentLayers(
        {
            "Esri World Topo": L.tileLayer.provider('Esri.WorldTopoMap'),
            "Esri DeLorme": L.tileLayer.provider('Esri.DeLorme'),
            "Esri World Street": L.tileLayer.provider('Esri.WorldStreetMap'),
            "Esri NatGeo": L.tileLayer.provider('Esri.NatGeoWorldMap'),
            "Esri World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
            "USGS": L.tileLayer.provider('Esri.USGS'),
            "Open Topo Map": L.tileLayer.provider('OpenTopoMap'),
            "Open Street Map": L.tileLayer.provider('OpenStreetMap'),
            "Wikimedia": L.tileLayer.provider('Wikimedia')
        },
        null,
        {
            position: 'topright'
        });

    // initialize map object
    this.map = L.map(
        settings['div'][0],
        {
            layers: [persistentLayersControl.getCurrentLayer()],
            center: [0, 0],
            zoomControl: false,
            zoom: Math.max(persistentLayersControl.getCurrentLayer().options.minZoom, 3)
        }
    );

    // add layers control to map
    persistentLayersControl.addTo(this.map);

    // create sidebar control
    sidebar = L.control.sidebar('sidebar').addTo(map);
    $('div.sidebar').show();

    // initialize sidebar pane controls
    sidebarWPS = WRFDomainWizard.sidebar.wps(this.map, sidebar);
    sidebarWPS = WRFDomainWizard.sidebar.settings(this.map, sidebar);

    sidebarElevationData = WRFDomainWizard.sidebar.elevationData(this.map, sidebar);
    sidebarElevationData.addElevationDataOverlay('SRTM-CSI 90m (5x5,TIFF)', L.srtmCSI('TIFF', 5));
    sidebarElevationData.addElevationDataOverlay('SRTM-CSI 90m (30x30,TIFF)', L.srtmCSI('TIFF', 30));
    sidebarElevationData.addElevationDataOverlay('SRTM NASA v3, 1 arc second (~30m)', L.srtmNASAV3(1));
    sidebarElevationData.addElevationDataOverlay('SRTM NASA v3, 3 arc second (~90m)', L.srtmNASAV3(3));
    sidebarElevationData.addElevationDataOverlay('ALOS World 3D - 30m (AW3D30)', L.alos());

    //add zoom control
    L.control.zoom({
        position: 'topright'
    }).addTo(this.map);

    L.control.scale({
        maxWidth: 240, metric: true, imperial: true, position: 'bottomright'
    }).addTo(this.map);

    L.control.mouseCoordinates({
        position: 'bottomright'
    }).addTo(this.map);

    L.DomUtil.addClass(this.map._container, 'cursor-crosshair');
}
