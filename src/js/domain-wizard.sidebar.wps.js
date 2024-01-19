import { SidebarWPSPanel } from "./domain-wizard.sidebar.wps.panel";
import { WRFDomainGrid } from "./leaflet/leaflet.wrf-grid";
import { WRFDomain } from "./leaflet/leaflet.wrf-domain";
import { wpsSaveDialog } from "./domain-wizard.dialog.save";

export var SidebarWPS = function (map, sidebar) {

    var container,
        wpsNamelist,
        domain,
        wpsPanel,
        dialogSave,
        newDomainContext;

    var buttonNew,
        buttonSave,
        buttonOpen,
        buttonReset,
        inputFile;

    container = $('#wps', sidebar.getContainer());
    wpsPanel = new SidebarWPSPanel($('#container-wps-form', container));

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

    buttonReset.click(function () {
        createDomainFromNamelist(false);
    });

    buttonOpen.click(function (e) {
        endNewDomain();
        inputFile.click();
    });

    buttonSave.click(function (e) {
        wpsSaveDialog(domain).show();
    });

    inputFile.on('change', function (e) {
        var reader, filename;

        if (!e.target.files || e.target.files.length == 0) {
            return;
        }

        if (e.target.files[0].name != 'namelist.wps' && e.target.files[0].name != 'wrfsi.nl') {
            MessageBoxDialog.error('File Open Error', 'Only files with the name "namelist.wps" or "wrfsi.nl" can be opened!');
            return;
        }

        reader = new FileReader();
        filename = e.target.files[0].name;

        reader.onerror = function (e) {
            MessageBoxDialog.error('File Open Error', 'Unable to read file!');
        }

        reader.onload = function (e) {
            if (filename == 'wrfsi.nl') {
                wpsNamelist = WPSNamelist.converFromWRFSIString(e.target.result);
            }
            else {
                wpsNamelist = new WPSNamelist(e.target.result);
            }
            createDomainFromNamelist(true);
        };
        reader.readAsText(event.target.files[0]);
        inputFile.val(null);
    });

    function removeDomain() {
        if (domain) {
            domain.remove();
            domain = null;
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
        var bounds = L.latLngBounds(newDomainContext.startLatlng, e.latlng),
            center,
            e_we,
            e_sn;

        if (newDomainContext.drawPolygon == null) {
            newDomainContext.drawPolygon = L.polygon(
                [bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest() ],
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

    buttonNew.click(function (e) {
        initNewDomain();
    });

    if (location.hash) {
        var region = location.hash.substr(1),
            wpsNamelistUrl = 'wps/' + region + '/namelist.wps';

        $.get(wpsNamelistUrl, function (data) {
            //try {
            wpsNamelist = new WPSNamelist(data);
            sidebar.open('wps');
            createDomainFromNamelist(true);
            //}
            //catch (error) {
            //    MessageBoxDialog.error("Error", "Unable to load file " + wpsNamelistUrl + ". " + error.toString());
            //}
        }, 'text').fail(function () {
            MessageBoxDialog.error("File Load Error", "Unable to load " + wpsNamelistUrl);
        });
    }
}

export function sidebarWPS(map, sidebar) {
    return new SidebarWPS(map, sidebar);
}