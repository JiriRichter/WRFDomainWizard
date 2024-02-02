import { errorMessageBox } from "./domain-wizard.dialog.message-box";

export var SidebarWaypoints = function (map, sidebar) {

    var container,
        buttonAdd,
        buttonRemoveAll,
        inputFile,
        containerLayers,
        layers = {},
        layerCount = 0;

    container = $('#waypoints', sidebar.getContainer());
    buttonAdd = $('button#button-waypoints-add', container);
    buttonRemoveAll = $('button#button-waypoints-remove', container);
    inputFile = $('input#file-waypoints', container);
    containerLayers = $('#waypoints-layers', container);

    function addWaypoints(filename, data) {
        var id = 'waypoints-layer-' + layerCount,
            checkboxHtml;

        if (layers[filename] !== undefined) {
            errorMessageBox('File Open Error', 'File name ' + filename + ' already loaded');
            return;
        }

        try {
            layers[filename] = L.waypoints(
                L.Waypoints.parse(data)
            ).addTo(map);
            map.fitBounds(layers[filename].getBounds());
        }
        catch (e) {
            errorMessageBox('File Open Error', 'Unable to parse file ' + filename + ': ' + e);
            return;
        }

        layerCount++;

        checkboxHtml = '<div class="custom-control custom-checkbox">' +
            '<input type="checkbox" class="custom-control-input" id="' + id + '" data-filename="' + filename + '" checked>' +
            '<label class="custom-control-label" for="' + id + '">' + filename + '</label>' +
            '</div>';

        containerLayers.append($(checkboxHtml));

        $('input#' + id, containerLayers).on('click', { layer: layers[filename], map: map }, function (e) {
            if (this.checked) {
                e.data.layer.addTo(e.data.map)
            }
            else {
                e.data.layer.remove();
            }
        });
    }

    buttonAdd.on('click', function (e) {
        inputFile.click();
    });

    buttonRemoveAll.on('click', function (e) {
        object.keys(layers).forEach(function (filename) {
            layers[filename].remove();
        });
        layers = {};
        containerLayers.empty();
    });

    inputFile.on('change', function (e) {
        var reader, filename;

        if (!e.target.files || e.target.files.length == 0) {
            return;
        }

        if (!e.target.files[0].name.endsWith('.wpt') &&
            !e.target.files[0].name.endsWith('.cup') &&
            !e.target.files[0].name.endsWith('.gpx')) {
                errorMessageBox('File Open Error', 'Only files with extensions .wpt, .cup and .gpx are allowed!');
            return;
        }

        reader = new FileReader();
        filename = e.target.files[0].name;

        reader.onerror = function (e) {
            errorMessageBox('File Open Error', 'Unable to read file!');
        }

        reader.onload = function (e) {
            addWaypoints(filename, e.target.result);
        };
        reader.readAsText(e.target.files[0]);
        inputFile.val(null);
    });

}

export function sidebarWaypoints(map, sidebar) {
    return new SidebarWaypoints(map, sidebar);
}