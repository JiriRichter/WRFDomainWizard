import { GeographicLines } from "./leaflet/leaflet.layer.geographic-lines";
import { AutoGraticule } from "./leaflet/leaflet.layer.graticule";

export var SidebarSettings = L.Class.extend({

    _map: null,
    _container: null,
    _localStorageKey: '_wrf_domain_wizard_settings',

    _defaultOptions: {
        jsonBaseUrl: 'json'
    },

    _settings: {
        showGraticule: {
            id: 'showGraticule',
            value: false,
            dataType: 'boolean'
        },
        showGeographicLines : {
            id: 'showGeographicLines',
            value: true,
            dataType: 'boolean'
        }
    },

    _options: null,

    _controls: {},
    _graticule: null,
    _geographicLines: null,

    initialize: function (map, sidebar, options) {

        this._options = Object.assign({}, this._defaultOptions, options);

        this._map = map;
        this._container = sidebar.getContainer().querySelector('#settings');

        this._graticule = new AutoGraticule({
            verticalLabelOffset: 480
        });

        this._geographicLines = new GeographicLines({});

        for (const key in this._settings) {

            const setting = this._settings[key];

            const value = localStorage.getItem(this._localStorageKey + `_${setting.id}`);
            if (value) {
                switch(setting.dataType) {
                    case 'boolean':
                        setting.value = value === 'true';
                        break;
                    case 'int':
                        setting.value = parseInt(value);
                        break;
                    case 'float':
                        setting.value = parseFloat(value);
                        break;
                    default:
                        setting.value = value;
                        break;
                }
            }

            this._controls[key] = this._container.querySelector(`#${setting.id}`);
        }

        const self = this;
        this._settings['showGraticule'].value = false;

        this._controls['showGraticule'].addEventListener('click', (e) => {
            self.showGraticule(e.currentTarget.checked);
        });
        this.showGraticule(this._settings['showGraticule'].value);

        this._controls['showGeographicLines'].addEventListener('click', (e) => {
            self.showGeographicLines(e.currentTarget.checked);
        });
        this.showGeographicLines(this._settings['showGeographicLines'].value);


        for (const key in this._controls) {

            const input = this._controls[key];

            if (input.tagName !== "INPUT") {
                continue;
            }

            const value = this._settings[key].value;

            switch(input.type) {
                case 'checkbox':
                    input.checked = value === true;
                    break;
                default:
                    input.value = value;
                    break;
            }
        }        
    },

    showGraticule: function(show) {
        localStorage.setItem(this._localStorageKey + `_showGraticule`, show);
        if (show === true) {
            this._graticule.addTo(this._map);
        } else {
            this._graticule.remove();
        }
    },

    showGeographicLines: function(show) {
        localStorage.setItem(this._localStorageKey + `_showGeographicLines`, show);
        if (show === true) {
            this._geographicLines.addTo(this._map);
        } else {
            this._geographicLines.remove();
        }
    }
});

export function sidebarSettings(map, sidebar, options) {
    return new SidebarSettings(map, sidebar, options);
}