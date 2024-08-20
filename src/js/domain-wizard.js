import { sidebarElevationData } from './domain-wizard.sidebar.elevation-data';
import { sidebarSettings } from './domain-wizard.sidebar.settings';
import { SidebarGeographicFiles } from './domain-wizard.sidebar.geographic-files';
import { sidebarWPS } from './domain-wizard.sidebar.wps';
import { persistentLayers } from './leaflet/leaflet.control.persistent-layers'
import { elevationDataALOS } from './leaflet/leaflet.elevation-data.alos';
import { elevationDataSRTMCSI } from './leaflet/leaflet.elevation-data.srtm-csi';
import { elevationDataSRTMNASAV3 } from './leaflet/leaflet.elevation-data.srtm-nasa-v3';
import { mouseCoordinates } from './leaflet/leaflet.control.mouse-coordinates';

/**
 * @constructor
 */
export class DomainWizard {

    constructor(options) {

        // default options
        const defaults = {
            div: null,
            jsonBaseUrl: 'json'
        }

        // current settings
        const settings = Object.assign({}, defaults, options);

        if (!settings['div'] || !settings['div'].length || settings['div'].length != 1) {
            throw "invalid div option";
        }

        const tileLayerOptions = {
            noWrap: true,
            bounds: L.latLngBounds([-90, -180], [90, 180])
        };

        // create a list of base layer tile providers
        const persistentLayersControl = persistentLayers(
            {
                "Esri World Topo": L.tileLayer.provider('Esri.WorldTopoMap', tileLayerOptions),
                "Esri World Street": L.tileLayer.provider('Esri.WorldStreetMap', tileLayerOptions),
                "Esri NatGeo": L.tileLayer.provider('Esri.NatGeoWorldMap', tileLayerOptions),
                "Esri World Imagery": L.tileLayer.provider('Esri.WorldImagery', tileLayerOptions),
                "Open Topo Map": L.tileLayer.provider('OpenTopoMap', tileLayerOptions),
                "Open Street Map": L.tileLayer.provider('OpenStreetMap', tileLayerOptions)
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
            closeButton: false,
            container: 'sidebar',
            position: 'left',
            open: true
        }).addTo(map);
        
        const sidebarTabs = $('ul[role="tablist"] li', sidebar.getContainer());

        // activate tooltips on tab icons
        sidebarTabs.tooltip();

        sidebar.on('content', (e) => {
            // close tooltips manually because when a tab panel is opened 
            // any displayed tooltip remains opened
            sidebarTabs.tooltip('hide');
        })

        // initialize sidebar pane controls
        sidebar['domains'] = sidebarWPS(map, sidebar, {
            jsonBaseUrl: settings.jsonBaseUrl,
            sampleBaseUrl: settings.sampleBaseUrl
        });

        sidebar['settings'] = sidebarSettings(
            map,
            sidebar,
            {
                jsonBaseUrl: settings.jsonBaseUrl
            });

        sidebar['geographic-files'] = new SidebarGeographicFiles(map, sidebar.getContainer().querySelector('#geographic-files'));

        sidebar['elevation'] = sidebarElevationData(map, sidebar);
        sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (5x5,TIFF)', elevationDataSRTMCSI(`${settings.jsonBaseUrl}/srtm/csi/srtm30_5x5.json`, 'TIFF', 5));
        sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (30x30,TIFF)', elevationDataSRTMCSI(`${settings.jsonBaseUrl}/srtm/csi/srtm30_30x30.json`, 'TIFF', 30));
        sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 1 arc second (~30m)', elevationDataSRTMNASAV3(`${settings.jsonBaseUrl}/srtm/nasa/SRTMGL1.003.json`, 1));
        sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 3 arc second (~90m)', elevationDataSRTMNASAV3(`${settings.jsonBaseUrl}/srtm/nasa/SRTMGL3.003.json`, 3));
        sidebar['elevation'].addElevationDataOverlay('ALOS World 3D - 30m (AW3D30)', elevationDataALOS(`${settings.jsonBaseUrl}/srtm/alos/AW3D30.json`));

        // open default tab
        sidebar.open('domains');

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
