import { sidebarElevationData } from './domain-wizard.sidebar.elevation-data';
import { sidebarSettings } from './domain-wizard.sidebar.settings';
import { sidebarWaypoints } from './domain-wizard.sidebar.waypoints';
import { sidebarWPS } from './domain-wizard.sidebar.wps';
import { persistentLayers } from './leaflet/leaflet.control.persistent-layers'
import { elevationDataALOS } from './leaflet/leaflet.elevation-data.alos';
import { elevationDataSRTMCSI } from './leaflet/leaflet.elevation-data.srtm-csi';
import { elevationDataSRTMNASAV3 } from './leaflet/leaflet.elevation-data.srtm-nasa-v3';
import { mouseCoordinates } from './leaflet/leaflet.control.mouse-coordinates';

/**
 * Leaflet map helper object
 * @constructor
 */
export class DomainWizard {

    constructor(options) {

        // default options
        const defaults = /** @dict */ {
            div: null
        }

        // current settings
        const settings = /** @dict */ $.extend({}, defaults, options);

        if (!settings['div'] || !settings['div'].length || settings['div'].length != 1) {
            throw "invalid div option";
        }

        // create a list of base layer tile providers
        const persistentLayersControl = persistentLayers(
            {
                "Esri World Topo": L.tileLayer.provider('Esri.WorldTopoMap'),
                "Esri World Street": L.tileLayer.provider('Esri.WorldStreetMap'),
                "Esri NatGeo": L.tileLayer.provider('Esri.NatGeoWorldMap'),
                "Esri World Imagery": L.tileLayer.provider('Esri.WorldImagery'),
                "Open Topo Map": L.tileLayer.provider('OpenTopoMap'),
                "Open Street Map": L.tileLayer.provider('OpenStreetMap')
            },
            null,
            {
                position: 'topright'
            });

        // initialize map object
        const map = L.map(
            settings['div'][0],
            {
                layers: [persistentLayersControl.getCurrentLayer()],
                center: [0, 0],
                zoomControl: false,
                zoom: Math.max(persistentLayersControl.getCurrentLayer().options.minZoom, 3)
            }
        );

        // add layers control to map
        persistentLayersControl.addTo(map);

        // create sidebar control
        const sidebar = L.control.sidebar({
            autopan: false,
            closeButton: true,
            container: 'sidebar',
            position: 'left',
        }).addTo(map);
        
        $('div.sidebar').show();

        // initialize sidebar pane controls
        sidebar['wps'] = sidebarWPS(map, sidebar);
        sidebar['settings'] = sidebarSettings(map, sidebar);
        sidebar['waypoints'] = sidebarWaypoints(map, sidebar);

        sidebar['elevation'] = sidebarElevationData(map, sidebar);
        sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (5x5,TIFF)', elevationDataSRTMCSI('TIFF', 5));
        sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (30x30,TIFF)', elevationDataSRTMCSI('TIFF', 30));
        sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 1 arc second (~30m)', elevationDataSRTMNASAV3(1));
        sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 3 arc second (~90m)', elevationDataSRTMNASAV3(3));
        sidebar['elevation'].addElevationDataOverlay('ALOS World 3D - 30m (AW3D30)', elevationDataALOS());

        //add zoom control
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        L.control.scale({
            maxWidth: 240, metric: true, imperial: true, position: 'bottomright'
        }).addTo(map);

        mouseCoordinates({
            position: 'bottomright'
        }).addTo(map);

        L.DomUtil.addClass(map._container, 'cursor-crosshair');
    }
}
