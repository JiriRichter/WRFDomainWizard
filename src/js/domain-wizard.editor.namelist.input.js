import { htmlEncode } from "./utils/html";
import { Namelist } from "./utils/namelist";
import { distanceToMeters } from "./utils/math";

export class NamelistInputEditor {

    static entries = {
        maxDom: "max_dom",
        single: "1",
        maxEta: "max_eta"
    }

    static _localStorageKey = '_wrf_domain_wizard_namelist_input'

    constructor(container, options) {

        // defaul settings
        this.options = {
            jsonBaseUrl: 'json',
            change: null
        };

        if (options) {
            this.options = Object.assign(this.options, options);
        }
        
        this.container = container;
        
        this.variables = null;
        this.readOnly = {};

        this.namelist = null;
        let value = localStorage.getItem(`${NamelistInputEditor._localStorageKey}_collapse`);
        if (value) {
            this.collapse = JSON.parse(value);
        }
        else {
            this.collapse = {};
        }
    }

    get max_dom() {
        return this.namelist.domains?.max_dom ?? 1;
    }

    async openNamelistWpsAsync(namelistWps) {
        this.namelist = this.namelist ?? {}

        this._setReadOnlyNamelistValue('domains', 'max_dom', namelistWps.share.max_dom);
        this._setReadOnlyNamelistValue('domains', 'e_we', namelistWps.geogrid.e_we);
        this._setReadOnlyNamelistValue('domains', 'e_sn', namelistWps.geogrid.e_sn);
        this._setReadOnlyNamelistValue('domains', 'dx', distanceToMeters(namelistWps.share.map_proj, namelistWps.geogrid.dx));
        this._setReadOnlyNamelistValue('domains', 'dy', distanceToMeters(namelistWps.share.map_proj, namelistWps.geogrid.dy));
        this._setReadOnlyNamelistValue('domains', 'parent_id', namelistWps.geogrid.parent_id);
        this._setReadOnlyNamelistValue('domains', 'i_parent_start', namelistWps.geogrid.i_parent_start);
        this._setReadOnlyNamelistValue('domains', 'j_parent_start', namelistWps.geogrid.j_parent_start);
        this._setReadOnlyNamelistValue('domains', 'parent_grid_ratio', namelistWps.geogrid.parent_grid_ratio);

        await this._initAsync();
    }

    _setReadOnly

    async openNamelistInputAsync(namelist) {
        this.namelist = namelist;
        await this._initAsync();
    }

    toRaw() {
        let raw = '';

        for(const [groupName, groupVariables] of Object.entries(this.variables)) {

            const variableNames = [];
            for(const name of Object.keys(groupVariables)) {
                if (this._isNamelistValueSet(groupName, name) === true) {
                    variableNames.push(name);
                }
            }

            if (variableNames.length === 0) {
                continue;
            }

            const values = variableNames.map((name) => this.namelist[groupName][name]);

            const groupContent = Namelist.formatSection(
                groupName,
                variableNames,
                values);

            raw = raw + groupContent;
        };

        return raw;
    }

    _isNamelistValueSet(group, variable) {
        return this.namelist[group] !== undefined
            && this.namelist[group][variable] !== undefined
            && this.namelist[group][variable] !== null;
    }

    _setNamelistValue(group, variable, value) {
        this.namelist[group] = this.namelist[group] ?? {};
        this.namelist[group][variable] = value;
    }

    _setReadOnlyNamelistValue(group, variable, value) {
        this._setNamelistValue(group, variable, value);
        this.readOnly[group] = this.readOnly[group] ?? {};
        this.readOnly[group][variable] = true;
    }

    _isReadOnly(group, variable) {
        return this.readOnly[group] !== undefined
            && this.readOnly[group][variable] === true;
    }

    _empty() {
        while(this.container.firstChild && this.container.removeChild(this.container.firstChild));
    }

    async _initAsync() {

        this._empty();

        if (this.variables === null) {
            this.variables = {};

            const selectValues = await this._loadJsonAsync('namelist.input.select.values.json');
            const userGuide = await this._loadJsonAsync('namelist.input.users.guide.json');
            const registry = await this._loadJsonAsync('namelist.input.registry.json');

            for(let group in registry) {

                this.variables[group] = {};

                for (let variable in registry[group]) {

                    let description = null;
                    const hasUserGuideEntry = userGuide[group] && userGuide[group][variable];

                    if (hasUserGuideEntry && userGuide[group][variable].description){
                        description = userGuide[group][variable].description
                    }
                    else if (variable['comments'] && variable['comments'].length > 0) {
                        description = variable['comments'].join("; ");
                    }

                    let defaultValue = registry[group][variable].defaultValue;

                    let entries = null;
                    switch(registry[group][variable].entries) {

                        // translate entries
                        case "max_domains":
                            entries = NamelistInputEditor.entries.maxDom;
                            break;

                        // common entries
                        case NamelistInputEditor.entries.single:
                        case NamelistInputEditor.entries.maxEta:
                        case NamelistInputEditor.entries.maxDom:
                            entries = registry[group][variable].entries;
                            break;

                        default:
                            console.warn(`Unknown variable ${variable} number entries value ${registry[group][variable].entries}`);
                            continue;
                    }

                    if (hasUserGuideEntry && userGuide[group][variable].entries !== entries) {

                        switch(variable) {
                            // https://github.com/wrf-model/WRF/blob/master/test/em_real/namelist.input
                            case "dx":
                            case "dy":
                                entries = NamelistInputEditor.entries.single;
                                break;

                            // https://github.com/wrf-model/WRF/blob/master/run/README.namelist
                            case "eta_levels":
                                entries = NamelistInputEditor.entries.maxEta;
                                break;

                            // https://github.com/wrf-model/WRF/blob/master/doc/README.NSSLmp
                            case "nssl_alphah":
                            case "nssl_alphahl":
                            case "nssl_cnoh":
                            case "nssl_cnohl":
                            case "nssl_cnor":
                            case "nssl_cnos":
                            case "nssl_rho_qh":
                            case "nssl_rho_qs":
                                entries = NamelistInputEditor.entries.single
                                break;

                            case "topo_wind":
                            case "gph":
                                entries = NamelistInputEditor.entries.maxDom
                                break;

                            case "max_obs":
                                entries = NamelistInputEditor.entries.single
                                break;
                                    
                            default:
                                console.warn(`Variable ${variable} number of entries differ between registry ${entries} and users guide ${userGuide[group][variable].entries}`);
                        }
                    }

                    this.variables[group][variable] = {
                        type: registry[group][variable].type,
                        defaultValue: defaultValue,
                        description: description,
                        entries: entries
                    };

                    if (selectValues[variable] && selectValues[variable].values) {
                        this.variables[group][variable]['values'] = selectValues[variable].values;
                    }
                }
            }
        }

        this._setDefaultsValues();
        this._initEditorFields();
    }

    async _loadJsonAsync(filename) {
        const jsonUrl = `${this.options.jsonBaseUrl}/${filename}`;
        var response = await fetch(jsonUrl);
        return await response.json();
    }

    _setDefaultsValues() {
        this._setDefaultValue("domains", "time_step", 60);
    }

    _setDefaultValue(group, variable, defaultValue) {
        this.variables[group][variable].defaultValue = defaultValue;
    }

    _initEditorFields() {

        for(const [groupName, groupVariables] of Object.entries(this.variables)) {
            if (Object.keys(groupVariables).length === 0) {
                continue;
            }
            this._initGroupVariables(groupName, groupVariables);
        };

        $(this.container).find('span').tooltip();
        this._storeCollapseState();
    }

    static iconClass = {
        collapsed: 'fa-chevron-right',
        open: 'fa-chevron-down'
    }

    _initGroupVariables(groupName, groupVariables) {

        const groupDiv = this._append(this.container, 'div');
        groupDiv.classList.add('namelist-input-group');
        groupDiv.dataset['group'] = groupName;

        if (this.collapse[groupName] === undefined) {
            this.collapse[groupName] = true;
        }

        const iconClass = this.collapse[groupName] === true ? NamelistInputEditor.iconClass.collapsed : NamelistInputEditor.iconClass.open;

        const headerDiv = this._append(groupDiv, 'div');
        headerDiv.classList.add('namelist-input-group-header');
        let headerDivHtml = '';
        headerDivHtml = headerDivHtml + `<button class="btn btn-sm" type="button" data-toggle="collapse" data-target="#${groupName}" aria-expanded="false" aria-controls="${groupName}"><i class="fas ${iconClass}"></i></button>`;
        headerDivHtml = headerDivHtml + `<h5>${htmlEncode(groupName)}</h5>`;
        headerDivHtml = headerDivHtml + `<a href="https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/namelist_variables.html#${htmlEncode(groupName.replace("_", "-"))}" target="_blank" class="ml-3 text-muted"><i class="fas fa-external-link-alt"></i></a>`;
        headerDivHtml = headerDivHtml + '</h5>';
        headerDiv.innerHTML = headerDivHtml;

        headerDiv.querySelector('button[data-toggle="collapse"]').addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            const groupName = e.currentTarget.dataset['target'].replace('#', '');
            if (icon.classList.contains(NamelistInputEditor.iconClass.open)) {
                icon.classList.remove(NamelistInputEditor.iconClass.open);
                icon.classList.add(NamelistInputEditor.iconClass.collapsed);
                this.collapse[groupName] = true;
            } else {
                icon.classList.remove(NamelistInputEditor.iconClass.collapsed);
                icon.classList.add(NamelistInputEditor.iconClass.open);
                this.collapse[groupName] = false;
            }
            this._storeCollapseState();
        });

        this.namelist[groupName] = this.namelist[groupName] ?? {};

        this._appendGroupVariableFields(groupDiv, groupName, groupVariables);
    }

    _storeCollapseState() {
        localStorage.setItem(`${NamelistInputEditor._localStorageKey}_collapse`, JSON.stringify(this.collapse));
    }

    _appendGroupVariableFields(groupDiv, groupName, groupVariables) {
        const variablesDiv = this._append(groupDiv, 'div');
        variablesDiv.classList.add('namelist-input-variables');
        variablesDiv.classList.add('collapse');
        if (this.collapse[groupName] === false) {
            variablesDiv.classList.add('show');
        }
        variablesDiv.id = groupName;

        for(const [variableName, variable] of Object.entries(groupVariables)) {
            this._appendVariableField(variablesDiv, groupName, variableName, variable);
        }
    }

    _appendVariableField(variablesDiv, groupName, variableName, variable) {

        console.debug(`Creating variable ${variableName} input`);

        const variableDiv = this._append(variablesDiv, 'div');
        variableDiv.classList.add('namelist-input-variable');
        variableDiv.dataset['default'] = variable.defaultValue;
        variableDiv.dataset['variable'] = variableName;

        const isSet = this._isNamelistValueSet(groupName, variableName);
        const readOnly = this._isReadOnly(groupName, variableName);
        const namelistGroup = this.namelist[groupName];

        if (isSet === false) {
            variableDiv.classList.add('namelist-input-variable-unset');
        }

        let html = '<div class="input-group input-group-sm">';

        html += '<div class="namelist-input-variable-mark">';
        if (readOnly === true) {
            variableDiv.classList.add('namelist-input-variable-readonly');
            html += '<i class="fas fa-pencil-alt" title="read-only"></i>';
        }
        else {
            html += '<i class="fas fa-pencil-alt"></i>';
        }
        html += '</div>';

        html += '<div class="input-group-prepend">';
        html += '<span class="input-group-text" id="inputGroup-sizing-sm">';
        html += htmlEncode(variableName);
        html += '</span></div>';

        switch (variable.entries) {
            case NamelistInputEditor.entries.maxDom:
    
                for(let i = 0; i < this.max_dom; i++) {
                    html += this._getInputFieldHtml(
                        variableName, 
                        variable, 
                        (isSet ? namelistGroup[variableName][i] : variable.defaultValue), 
                        readOnly,
                        i);
                }
                break;

            case NamelistInputEditor.entries.single:
                html += this._getInputFieldHtml(
                    variableName, 
                    variable, 
                    (isSet ? namelistGroup[variableName] : variable.defaultValue),
                    readOnly,
                    null);
                break;

            case NamelistInputEditor.entries.maxEta:
                break;
        }        

        if (variable.description) {
            html += '<div class="namelist-input-variable-description">';
            html += htmlEncode(variable.description);
            html += '</div>';
        }

        html += '</div>';

        variableDiv.innerHTML = html;

        switch(variable.type) {
            case 'logical':
                variableDiv.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                    checkbox.addEventListener('change', (e) => {
                        const variable = e.currentTarget.name;
                        const variableDiv = document.querySelector(`div.namelist-input-variable[data-variable="${variable}"]`);
                        const group = variableDiv.closest('div.namelist-input-group').dataset['group'];
                        variableDiv.classList.remove('namelist-input-variable-unset');

                        switch(this.variables[group][variable].entries) {
                            case NamelistInputEditor.entries.single:
                                this._setNamelistValue(group, variable, e.currentTarget.checked);
                                break;
                            case NamelistInputEditor.entries.maxDom:
                                this._setNamelistValue(
                                    group,
                                    variable,
                                    this._listVariableInputFields(group, variable).map(input => input.checked));
                                break;
                            }

                        this._fireChange(group, variable);
                        
                    });
                });
                break;

            case 'integer':
            case 'real':
                
                break;

            case 'character':
                
                break;
        }
    }

    _fireChange(group, variable) {
        if (typeof(this.options.change) === 'function') {
            this.options.change.call(this, {
                group: group,
                variable: variable
            });
        }
    }

    _listVariableInputFields(group, variable) {
        const inputFields = [];
        document.querySelectorAll(`div.namelist-input-group[data-group="${group}"] div.namelist-input-variable[data-variable="${variable}"] input[name=${variable}]`).forEach((input) => {
            inputFields.push(input);
        });
        
        return inputFields;
    }

    static _parseValue(val) {
        if (val === null) {
            return null;
        }
        return Namelist.parseValue(val);
    }

    _getInputFieldHtml(name, variable, value, readOnly, index) {

        if (value === undefined || value === null){
            throw new Error(`Variable ${name} value is not defined`);
        }

        let html = '';

        let fieldId = htmlEncode(name);
        let fieldName = htmlEncode(name);

        if (index !== null) {
            fieldId = fieldId + `_${index}`;
        }

        // select
        if (variable['values'] !== undefined) {

            html = html + `<select class="form-control" id="${fieldId}" name="${fieldName}"${(readOnly ? " readonly": "")}>`;
            for (const [key, value] of Object.entries(variable['values'])) {
                html = html + `<option value="${key}"`;
                if (value !== null && key.toString() === value.toString()) {
                    html = html + ' selected';
                }
                html = html + `>${key}: ${value}</option>`;
            }
            html = html + '<select/>';
            return html;    
        }

        switch(variable.type) {
            case 'logical':
                html = html + '<div class="input-group-prepend input-group-checkbox"><div class="input-group-text">'
                html = html + `<input class="" type="checkbox" id="${fieldId}" name="${fieldName}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                if (value === true) {
                    html = html + ' checked';
                }
                html = html + '/>';
                html = html + '</div></div>';
                break;

            case 'integer':
            case 'real':
                html = html + `<input type="number" class="form-control" id="${fieldId}" name="${fieldName}"`;
                html = html + ` value="${value}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + '/>';
                break;

            case 'character':
                html = html + `<input type="text" class="form-control form-control-sm" id="${fieldId}" name="${fieldName}"`;
                if (value !== null) {
                    html = html + ` value="${htmlEncode(value)}"`;
                }
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + '/>';
                break;
            default:
                throw new Error(`Unknown variable data type ${variable.type}`);
        }

        return html;
    }

    _append(parent, tagName) {
        const element = document.createElement(tagName);
        parent.append(element);
        return element;
    }
}