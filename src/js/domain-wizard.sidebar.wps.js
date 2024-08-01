import { SidebarDomainsPanel } from "./domain-wizard.sidebar.wps.panel";
import { WRFDomainGrid } from "./leaflet/leaflet.wrf-grid";
import { WRFDomain } from "./leaflet/leaflet.wrf-domain";
import { WPSSaveDialog } from "./domain-wizard.dialog.save";
import { WPSNamelist } from "./utils/namelist.wps"
import { errorMessageBox } from "./domain-wizard.dialog.message-box";
import { geogridOutput } from "./utils/geogrid.output";
import { saveAs } from "file-saver";
import { NamelistInputDialog } from "./domain-wizard.dialog.namelist.input";

export class SidebarDomains {

    constructor(map, sidebar, options) {

        this.map = map;
        const self = this;

        var container, 
            wpsNamelist,
            domain,
            wpsPanel,
            newDomainContext;

        var buttonNew,
            buttonSave,
            buttonOpen,
            buttonReset,
            inputFile,
            captureImageDialog;

        // default settings
        this.options = {
            jsonBaseUrl: 'json',
            sampleBaseUrl: 'samples',
            allowAnyFilename: true,
            autoImageView: false
        };

        if (options) {
            this.options = Object.assign({}, this.options, options);
        }

        container = $('#domains', sidebar.getContainer());
        wpsPanel = new SidebarDomainsPanel($('#container-wps-form', container), this.options);

        buttonNew = $('button#button-wps-new', container);
        buttonSave = $('button#button-wps-save', container);
        buttonReset = $('button#reset-domain', container);
        buttonOpen = $('button#button-wps-open', container);
        const buttonSavePng = $('button#save-png', container);
        inputFile = $('input#file-open', container);
        
        captureImageDialog = $('#capture-image-dialog');

        // creates new WPS namelist object from existing data and
        // draws domains
        function createDomainFromNamelist(zoom) {
            removeDomain();
            domain = new WRFDomain(wpsNamelist);
            domain.addTo(map);

            wpsPanel.show(domain);
            domain.grid.select();

            if (zoom) {
                zoomToDomain();
            }
        }

        function getMapPadding() {
            const mapContainer = map.getContainer();
            return L.point(mapContainer.offsetWidth * 0.01, mapContainer.offsetHeight * 0.01);
        }

        function zoomToDomain() {

            const padding = getMapPadding();

            map.fitBounds(domain.grid.getBounds(), {
                paddingTopLeft: L.point(container.width() + container.offset().left, padding.x),
                paddingBottomRight: L.point(padding.x, padding.y)
            });
        }

        buttonReset.on('click', function (e) {
            createDomainFromNamelist(false);
        });

        buttonOpen.on('click', function (e) {
            endNewDomain();
            inputFile.click();
        });

        const wpsSaveDialog = new WPSSaveDialog();
        buttonSave.on('click', (e) => {
            wpsSaveDialog.show(domain);
        });

        inputFile.on('change', (e) => {
            var reader, filename;

            if (!e.target.files || e.target.files.length == 0) {
                return;
            }

            if (this.options.allowAnyFilename !== true && e.target.files[0].name != 'namelist.wps' && e.target.files[0].name != 'wrfsi.nl') {
                errorMessageBox('File Open Error', 'Only files with the name "namelist.wps" or "wrfsi.nl" can be opened!');
                return;
            }

            reader = new FileReader();
            filename = e.target.files[0].name;

            reader.onerror = function (e) {
                errorMessageBox('File Open Error', 'Unable to read file!');
            };

            reader.onload = function (e) {
                if (filename == 'wrfsi.nl') {
                    wpsNamelist = WPSNamelist.converFromWRFSIString(e.target.result);
                }
                else {
                    wpsNamelist = new WPSNamelist(e.target.result);
                }
                createDomainFromNamelist(true);
            };
            reader.readAsText(e.target.files[0]);
            inputFile.val(null);
        });

        buttonSavePng.on('click', (e) => {

            if (domain === null) {
                return;
            }

            captureImageDialog.modal('show');
            const div = map.getContainer();

            const mapCenter = map.getCenter();
            const mapZoom = map.getZoom();

            // hide map controls
            const mapControls = div.getElementsByClassName('leaflet-control');
            const visibleControls = [];
            for(let i = 0; i < mapControls.length; i++) {
                if (mapControls[i].hidden === false) {
                    visibleControls.push(mapControls[i]);
                    mapControls[i].hidden = true;
                }
            }

            if (this.options.autoImageView === true) {
                map.fitBounds(domain.grid.getBounds(), {
                    padding: getMapPadding()
                });
            }

            htmlToImage.toBlob(div)
                .then((blob) => {
                    saveAs(blob, "domains.png")
                })
                .catch(function (error) {
                    errorMessageBox('Create Image', 'Error creating an image');
                })
                .finally(() => {
                    visibleControls.forEach(x => x.hidden = false);
                    if (this.options.autoImageView === true) {
                        map.setView(mapCenter, mapZoom);
                    }
                    captureImageDialog.modal('hide');
                });
        });

        const buttonNamelistInput = container[0].querySelector('button#button-namelist-input');
        const dialogNamelistInput = new NamelistInputDialog({
            jsonBaseUrl: this.options.jsonBaseUrl
        });

        buttonNamelistInput.addEventListener('click', async() => {
            await dialogNamelistInput.openNamelistWpsAsync(domain.getWPSNamelist());
        });

        function removeDomain() {
            if (domain) {
                domain.remove();
                domain = null;
                newDomainContext = null;

                if (self._geogridCornerMarkerGroups.length > 0) {
                    self._geogridCornerMarkerGroups.forEach(group => {
                        group.remove();
                    });
                }
            }
        }

        // setup panel and map to start drawinf a new domain
        // called when user click New button
        function initNewDomain() {
            removeDomain();
            buttonNew.prop('disabled', true);
            map.on('mousedown', startNewDomain, this);
            wpsPanel.showNewDomain();
        }

        // called when user starts drag operation to draw a new domain
        function startNewDomain(e) {
            if (!wpsPanel.validateNewDomain()) {
                return;
            }
            map.dragging.disable();
            map.on('mousemove', drawNewDomain, this);
            map.on('mouseup', endNewDomain, this);
            map.on('mouseout', endNewDomain, this);
            newDomainContext = {
                startLatlng: e.latlng,
                startMarker: L.marker(e.latlng, {
                    icon: L.divIcon({ className: 'grid-corner-icon' })
                }).addTo(map),
                endMarker: L.marker(e.latlng, {
                    icon: L.divIcon({ className: 'grid-corner-icon' })
                }).addTo(map),
                drawPolygon: null,
                domainOnMap: false
            };
            domain = wpsPanel.createNewDomain();
        }

        function drawNewDomain(e) {
            var bounds = L.latLngBounds(newDomainContext.startLatlng, e.latlng), center, e_we, e_sn;

            if (newDomainContext.drawPolygon == null) {
                newDomainContext.drawPolygon = L.polygon(
                    [bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()],
                    {
                        stroke: true,
                        color: '#3388ff',
                        weight: 1,
                        opacity: 1.0,
                        dashArray: '3',
                        fill: false
                    }).addTo(map);
            }
            else {
                newDomainContext.drawPolygon.setLatLngs([bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()]);
            }

            newDomainContext.endMarker.setLatLng(e.latlng);
            center = bounds.getCenter();

            domain.setDefaultValues(center.lat, center.lng);
            
            e_we = Math.round(map.distance(newDomainContext.startLatlng, [newDomainContext.startLatlng.lat, e.latlng.lng]) / domain.dxInMeters);
            e_sn = Math.round(map.distance(newDomainContext.startLatlng, [e.latlng.lat, newDomainContext.startLatlng.lng]) / domain.dyInMeters);

            if (e_we < WRFDomainGrid.minGridSize || e_sn < WRFDomainGrid.minGridSize) {
                domain.remove();
                wpsPanel.hide();
                newDomainContext.domainOnMap = false;
            }
            else {
                domain.grid.e_we = e_we;
                domain.grid.e_sn = e_sn;
                if (newDomainContext.domainOnMap) {
                    domain.update();
                }
                else {
                    domain.addTo(map);
                    newDomainContext.domainOnMap = true;
                    wpsPanel.show();
                }
            }
        }

        function endNewDomain(e) {
            map.dragging.enable();
            map.off('mousedown', startNewDomain, this);
            map.off('mousemove', drawNewDomain, this);
            map.off('mouseup', endNewDomain, this);
            map.off('mouseout', endNewDomain, this);
            buttonNew.prop('disabled', false);

            if (!newDomainContext) {
                wpsPanel.hide();
                return;
            }

            if (newDomainContext.drawPolygon != null) {
                newDomainContext.drawPolygon.remove();
            }
            newDomainContext.startMarker.remove();
            newDomainContext.endMarker.remove();

            if (newDomainContext.domainOnMap) {
                wpsNamelist = domain.getWPSNamelist();
            }
            else {
                wpsNamelist = null;
                domain = null;
            }
        }

        buttonNew.on('click', function (e) {
            initNewDomain();
        });

        // a list of leaflet feature groups containing markers for sample geogrid outpput files
        this._geogridCornerMarkerGroups = [];

        if (location.hash) {
            var sample = location.hash.substring(1), wpsNamelistUrl = `${this.options.sampleBaseUrl}/${sample}/namelist.wps`;

            $.get(
                wpsNamelistUrl, 
                (data) => {
                    wpsNamelist = new WPSNamelist(data);
                    sidebar.open('domains');
                    createDomainFromNamelist(true);
                    this._addGeogridCorners(sample);
                }, 'text')
                .fail(() => {
                    errorMessageBox("File Load Error", "Unable to load " + wpsNamelistUrl);
                });
        }
    }

    _addGeogridCorners(sample) {
        this._addGeogridGridCorners(sample, 1);
    }

    _addGeogridGridCorners(sample, grid) {
        const url = `${this.options.sampleBaseUrl}/${sample}/geo_em.d${grid.toString().padStart(2, '0')}.nc.json`;

        let jsonFound = false;

        fetch(url)
            .then(response => {
                if (response.ok === true) {
                    return response.json();
                }
                throw new Error(`Geogrid JSON file ${url} not found`);
            })
            .then(json => {
                jsonFound = true;
                const group = L.featureGroup([
                    this._createGeogridCornerMarker(json, 'sw'),
                    this._createGeogridCornerMarker(json, 'nw'),
                    this._createGeogridCornerMarker(json, 'ne'),
                    this._createGeogridCornerMarker(json, 'se')
                ]);
                group.addTo(this.map);
                this._geogridCornerMarkerGroups.push(group);
            })
            .then(() => {
                this._addGeogridGridCorners(sample, grid + 1);
            })
            .catch((error) => {
                if (jsonFound === true) {
                    console.error(error);
                }
                else {
                    console.debug(error)
                }
            });

        return jsonFound;
    }

    _createGeogridCornerMarker(json, location) {
        return L.marker(L.latLng(
            json.corner_lats[geogridOutput.cornerIndex.unstaggered[location]],
            json.corner_lons[geogridOutput.cornerIndex.unstaggered[location]]
        ),
        {
            icon: L.divIcon({ 
                className: 'geogrid-corner-icon',
                iconSize: 8
            }),
            zIndexOffset: 100
        });
    }
}

export function sidebarWPS(map, sidebar, options) {
    return new SidebarDomains(map, sidebar, options);
}