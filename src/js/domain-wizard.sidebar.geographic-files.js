import { errorMessageBox } from "./domain-wizard.dialog.message-box";
import { GeoJsonFileGroup } from "./leaflet/leaflet.layer.geojson-file-group";
import { GpxFileGroup } from "./leaflet/leaflet.layer.gpx-file-group";
import { KmlFileGroup } from "./leaflet/leaflet.layer.kml-file-group";
import { KmzFileGroup } from "./leaflet/leaflet.layer.kmz-file-group";
import { WptFileGroup } from "./leaflet/leaflet.layer.wpt-file-group";
import { getFileExtension } from "./utils/file";

export class SidebarGeographicFiles {

    constructor(map, container) {

        this.container = container;
        this.map = map;
        this.layers = [];

        const buttonAdd = container.querySelector('button#button-geographic-file-add');
        const buttonRemoveAll = container.querySelector('button#button-geographic-file-remove');
        const inputFile = container.querySelector('input#input-geographic-file');
        
        this.containerLayers = container.querySelector('#geographic-file-layers');

        buttonAdd.addEventListener('click', (e) => {
            inputFile.click();
        });
    
        buttonRemoveAll.addEventListener('click', (e) => {
            this.layers.forEach((layer) => {
                layer.remove();
            });
            this.layers = [];
            this.containerLayers.innerHTML = '';
        });
    
        inputFile.addEventListener('change', (e) => {
    
            if (!e.target.files || e.target.files.length == 0) {
                return;
            }

            const filename = e.target.files[0].name;
            const extension =  getFileExtension(filename);
    
            if (!extension.toLowerCase() in SidebarGeographicFiles.extensions)
            {
                errorMessageBox('File Open Error', 'Unsupported file extension');
                return;
            }
    
            const reader = new FileReader();
    
            reader.onerror = (e) => {
                errorMessageBox('File Open Error', 'Unable to read file!');
            }
    
            reader.onloadend = async (e) => {
                await this.addFile(filename, extension, reader.result);
            };

            reader.readAsArrayBuffer(e.target.files[0]);
            inputFile.value = null;
        });        
    }

    async addFile(filename, extension, data) {

        const id = this.layers.length;
        let layer = null;

        try {

            switch(extension) {
                case SidebarGeographicFiles.extensions.wpt.extension:
                    layer = new WptFileGroup();
                    break;

                case SidebarGeographicFiles.extensions.gpx.extension:
                    layer = new GpxFileGroup();
                    break;
                
                case SidebarGeographicFiles.extensions.json.extension:
                case SidebarGeographicFiles.extensions.geojson.extension:
                    layer = new GeoJsonFileGroup();
                    break;

                case SidebarGeographicFiles.extensions.kml.extension:
                    layer = new KmlFileGroup();
                    break;

                case SidebarGeographicFiles.extensions.kmz.extension:
                    layer = new KmzFileGroup();
                    break;

                default:
                    errorMessageBox('File Open Error', 'Unsupported file format');
                    return;
            }

            await layer.loadDataAsync(data);
            this.layers.push(layer);
            layer.addTo(this.map);
            this.map.fitBounds(layer.getBounds());
        }
        catch (e) {
            errorMessageBox('File Open Error', 'Unable to parse file ' + filename + ': ' + e);
            return;
        }

        let fileDiv = document.createElement("div");
        fileDiv.classList.add("custom-control");
        fileDiv.classList.add("custom-checkbox");
        
        let fileDivHtml = `<input type="checkbox" class="custom-control-input" id="file-group-${id}" data-filename="${filename}" data-id="${id}" checked>`;
        fileDivHtml = fileDivHtml + `<label class="custom-control-label" for="file-group-${id}">${filename}</label></div>`;

        fileDiv.innerHTML = fileDivHtml;

        this.containerLayers.appendChild(fileDiv);
        fileDiv.querySelector(`input#file-group-${id}`)
            .addEventListener('click', (e) => {

                const id = e.currentTarget.dataset.id;
                if (e.currentTarget.checked) {
                    this.layers[id].addTo(this.map);
                }
                else {
                    this.layers[id].remove();
                }
            });
    }    
}

SidebarGeographicFiles.extensions = {
    gpx: {
        extension: 'gpx'
    }, 
    wpt: {
        extension: 'wpt'
    }, 
    cup: {
        extension: 'cup'
    }, 
    json: {
        extension: 'json'
    }, 
    geojson: {
        extension: 'geojson'
    }, 
    kmz: {
        extension: 'kmz'
    }, 
    kml: {
        extension: 'kml'
    }
};