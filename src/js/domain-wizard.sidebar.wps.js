import { SidebarWPSPanel } from "./domain-wizard.sidebar.wps.panel";
import { WRFDomainGrid } from "./leaflet/leaflet.wrf-grid";
import { WRFDomain } from "./leaflet/leaflet.wrf-domain";
import { wpsSaveDialog } from "./domain-wizard.dialog.save";
import { WPSNamelist } from "./utils/namelist.wps"
import { errorMessageBox } from "./domain-wizard.dialog.message-box";
import { geogridOutput } from "./utils/geogrid.output";

export class SidebarWPS {

    constructor(map, sidebar, options) {

        this.map = map;
        const self = this;

        var container, wpsNamelist, domain, wpsPanel, newDomainContext;

        var buttonNew, buttonSave, buttonOpen, buttonReset, inputFile;

        // defaul settings
        this.options = {
            sampleBaseUrl: 'samples',
            allowAnyFilename: true
        };

        if (options) {
            this.options = Object.assign({}, this.options, options);
        }

        container = $('#wps', sidebar.getContainer());
        wpsPanel = new SidebarWPSPanel($('#container-wps-form', container), this.options);

        buttonNew = $('button#button-wps-new', container);
        buttonSave = $('button#button-wps-save', container);
        buttonReset = $('button#reset-domain', container);
        buttonOpen = $('button#button-wps-open', container);
        inputFile = $('input#file-open', container);

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

        function zoomToDomain() {
            map.panTo(L.latLng(domain.ref_lat, domain.ref_lon));
            map.fitBounds(domain.grid.getBounds(), {
                paddingTopLeft: L.point(container.width() + container.offset().left, 0)
            });
        }

        buttonReset.on('click', function (e) {
            createDomainFromNamelist(false);
        });

        buttonOpen.on('click', function (e) {
            endNewDomain();
            inputFile.click();
        });

        buttonSave.on('click', (e) => {
            wpsSaveDialog(domain).show();
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

        function removeDomain() {
            if (domain) {
                domain.remove();
                domain = null;

                if (self._geogridCornerMarkerGroups.length > 0) {
                    self._geogridCornerMarkerGroups.forEach(group => {
                        group.remove();
                    });
                }
            }
        }

        function initNewDomain() {
            removeDomain();
            buttonNew.prop('disabled', true);
            map.on('mousedown', startNewDomain, this);
            wpsPanel.showNewDomain();
        }

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

            domain.ref_lat = center.lat;
            domain.ref_lon = center.lng;
            domain.truelat1 = domain.ref_lat;
            domain.truelat2 = domain.ref_lat;
            domain.stand_lon = domain.ref_lon;

            e_we = Math.round(map.distance(newDomainContext.startLatlng, [newDomainContext.startLatlng.lat, e.latlng.lng]) / domain.dx);
            e_sn = Math.round(map.distance(newDomainContext.startLatlng, [e.latlng.lat, newDomainContext.startLatlng.lng]) / domain.dy);

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
                    sidebar.open('wps');
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
    return new SidebarWPS(map, sidebar, options);
}