import { htmlEncode } from "./utils/html";
import { Namelist } from "./utils/namelist";
import { distanceToMeters } from "./utils/math";

export class NamelistInputEditor {

    static entries = {
        maxDom: "max_dom",
        single: "1",
        maxEta: "max_eta"
    }

    static variableTypes = {
        integer: "integer",
        logical: "logical",
        real: "real",
        character: "character",
        selection: "selection"
    }

    static _localStorageKey = '_wrf_domain_wizard_namelist_input'

    constructor(container, options) {

        // defaul settings
        this.options = {
            jsonBaseUrl: 'json',
            change: null,
            floatDigits: 3
        };

        if (options) {
            this.options = Object.assign(this.options, options);
        }

        // editor container element
        this.container = container;
        
        // variable definitions
        this.variables = null;

        // read-only variable flags
        this.readOnly = {};

        // namelist object
        this.namelist = null;
        
        // initialize variable group collapse state
        let value = localStorage.getItem(`${NamelistInputEditor._localStorageKey}_collapse`);
        if (value) {
            this.collapse = JSON.parse(value);
        }
        else {
            this.collapse = {};
        }
    }

    // current max_dom value
    get max_dom() {
        return this.namelist.domains?.max_dom ?? 1;
    }

    // initializes editor from namelist.wps object
    async openNamelistWpsAsync(namelistWps) {

        // empty elements
        this._empty();

        this.namelist = this.namelist ?? {}

        this._setReadOnlyNamelistValue('domains', 'max_dom', namelistWps.share.max_dom);
        this._setReadOnlyNamelistValue('domains', 'e_we', namelistWps.geogrid.e_we);
        this._setReadOnlyNamelistValue('domains', 'e_sn', namelistWps.geogrid.e_sn);
        this._setReadOnlyNamelistValue('domains', 'dx', distanceToMeters(namelistWps.geogrid.map_proj, namelistWps.geogrid.dx));
        this._setReadOnlyNamelistValue('domains', 'dy', distanceToMeters(namelistWps.geogrid.map_proj, namelistWps.geogrid.dy));
        const grid_id = [];
        for(let i = 1; i <= namelistWps.share.max_dom; i++) {
            grid_id.push(i);
        }
        this._setReadOnlyNamelistValue('domains', 'grid_id', grid_id);
        this._setReadOnlyNamelistValue('domains', 'parent_id', namelistWps.geogrid.parent_id);
        this._setReadOnlyNamelistValue('domains', 'i_parent_start', namelistWps.geogrid.i_parent_start);
        this._setReadOnlyNamelistValue('domains', 'j_parent_start', namelistWps.geogrid.j_parent_start);
        this._setReadOnlyNamelistValue('domains', 'parent_grid_ratio', namelistWps.geogrid.parent_grid_ratio);

        // initialize variable definitions
        await this._initVariablesAsync();

        // empty elements
        this._empty();

        // initialize editor fields
        this._initEditorFields();
    }

    // open namelist object
    async openNamelistInputAsync(data) {

        const errors = [];

        // empty elements
        this._empty();

        // initialize variable definitions
        await this._initVariablesAsync();

        const namelist = new Namelist(data);

        if (namelist.domains === undefined) {
            result.errors.push("domains variable group not found in namelist");
            return;
        }

        if (namelist.domains.max_dom === undefined) {
            result.errors.push("variable 'max_dom' not found in namelist");
            return;
        }

        const max_dom = parseInt(namelist.domains.max_dom);
        if (isNaN(max_dom)) {
            errors.push("variable 'max_dom' is not a valid integer");
            return;
        }

        for(const groupName of Object.keys(namelist)) {

            const group = this.variables[groupName];

            if (group === undefined) {
                errors.push(`Unknown variable group ${groupName}`);
                continue;
            }

            for(const variableName of Object.keys(namelist[groupName])) {

                const variable = group[variableName];

                if (variable === undefined) {
                    errors.push(`Unknown variable ${variableName} in group ${groupName}`);
                    continue;
                }

                switch(variable.entries) {
                    case NamelistInputEditor.entries.maxDom:
                        Namelist.convertToArray(namelist[groupName], variableName);
                        while (namelist[groupName][variableName].length < max_dom) {
                            namelist[groupName][variableName].push(namelist[groupName][variableName][0]);
                        }
                        break;
    
                    case NamelistInputEditor.entries.maxEta:
                        Namelist.convertToArray(namelist[groupName], variableName);
                        break;

                    case NamelistInputEditor.entries.single:
                        if (Array.isArray(namelist[groupName][variableName])) {
                            namelist[groupName][variableName] = namelist[groupName][variableName][0];
                        }
                        break;
                }
            }
        }

        this.namelist = namelist;

        for(let error of errors) {
            console.warn(error);
        }

        // initialize editor fields
        this._initEditorFields();

        return {
            errors: (errors.length > 0 ? errors : null),
            hasErrors: errors.length > 0
        };
    }

    // return RAW text representation of namelist data
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

    // check whether variable namelist object value is set
    _isNamelistValueSet(group, variable) {
        return this.namelist[group] !== undefined
            && this.namelist[group][variable] !== undefined
            && this.namelist[group][variable] !== null;
    }

    
    // set variable namelist object value
    _setNamelistValue(group, variable, value) {
        this.namelist[group] = this.namelist[group] ?? {};
        this.namelist[group][variable] = value;
    }

    // set namelist object value and flag variable as read-only
    _setReadOnlyNamelistValue(group, variable, value) {
        this._setNamelistValue(group, variable, value);
        this.readOnly[group] = this.readOnly[group] ?? {};
        this.readOnly[group][variable] = true;
    }

    // returns true when when a variable is flagged as read-only
    _isReadOnly(groupName, variableName) {
        return this.readOnly[groupName] !== undefined
            && this.readOnly[groupName][variableName] === true;
    }

    // clear editor
    _empty() {
        while(this.container.firstChild && this.container.removeChild(this.container.firstChild));
    }

    // construct variable definition object
    async _initVariablesAsync() {

        if (this.variables === null) {
            this.variables = {};

            // load variable JSON files
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

                        // correct variable entries for known cases where user guide and WRF registry differ
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
                        this.variables[group][variable].type = NamelistInputEditor.variableTypes.selection;
                        this.variables[group][variable]['values'] = selectValues[variable].values;
                    }
                }
            }

            // set default values for variables with missing or invalid default value in auto-generated JSON data

            // time_step default value not set in registry
            this._setDefaultValue("domains", "time_step", 60);
        }
    }

    // load a JSON config file
    async _loadJsonAsync(filename) {
        const jsonUrl = `${this.options.jsonBaseUrl}/${filename}`;
        var response = await fetch(jsonUrl);
        return await response.json();
    }

    // set variable definition default value
    _setDefaultValue(group, variable, defaultValue) {
        this.variables[group][variable].defaultValue = defaultValue;
    }

    // create editor HTML
    _initEditorFields() {

        for(const [groupName, groupVariables] of Object.entries(this.variables)) {
            if (Object.keys(groupVariables).length === 0) {
                continue;
            }
            this._initGroupVariables(groupName, groupVariables);
        };

        $(this.container).find('*[title]').tooltip();
        this._storeCollapseState();
    }

    // collapse icons
    static iconClass = {
        collapsed: 'fa-chevron-right',
        open: 'fa-chevron-down'
    }

    // create group variables 
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

    // capture variable group collapse state
    _storeCollapseState() {
        localStorage.setItem(`${NamelistInputEditor._localStorageKey}_collapse`, JSON.stringify(this.collapse));
    }

    // create and append group variables
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

    // create and append variable input fields
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

        html += '<div class="input-group-prepend">';

        // erase button HTML
        html += '<button class="btn btn-outline-secondary btn-namelist-input-erase" type="button"'
        if (readOnly === true) {
            variableDiv.classList.add('namelist-input-variable-readonly');
            html += ' disabled';
        }
        html += '><i class="fas fa-eraser"></i></button>'

        // variable name HTML
        html += '<span class="input-group-text" id="inputGroup-sizing-sm">';
        html += htmlEncode(variableName);
        html += '</span></div>';

        // variable input field(s) HTML
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

        // variable description HTML
        if (variable.description) {
            html += '<div class="namelist-input-variable-description">';
            html += htmlEncode(variable.description);
            html += '</div>';
        }

        html += '</div>';

        variableDiv.innerHTML = html;

        if (readOnly === true) {
            return;
        }

        // configure erase button click event handler
        variableDiv.querySelector('button.btn-namelist-input-erase')
            .addEventListener('click', (e) => {
                const variableDiv = e.currentTarget.closest('div.namelist-input-variable');
                const groupName = variableDiv.closest('div.namelist-input-group').dataset['group'];
                const variableName = variableDiv.dataset['variable'];
                variableDiv.classList.add('namelist-input-variable-unset');
                this.namelist[groupName][variableName] = null;
                this._setVariableFieldValue(groupName, variableName);
                this._fireChange(groupName, variableName);
            });

        // configure variable input fields event listeners
        switch(variable.type) {
            case NamelistInputEditor.variableTypes.selection:
                this._addVariableFieldListeners(
                    variableDiv,
                    'select',
                    variableName,
                    'change',
                    (select) => parseInt(select.value));
                break;
            case NamelistInputEditor.variableTypes.logical:
                this._addVariableFieldListeners(
                    variableDiv,
                    'input',
                    variableName,
                    'change',
                    (input) => input.checked);
                break;

            case NamelistInputEditor.variableTypes.integer:
                this._addVariableFieldListeners(
                    variableDiv,
                    'input',
                    variableName,
                    'change',
                    (input) => parseInt(input.value));
                break;

            case NamelistInputEditor.variableTypes.real:
                this._addVariableFieldListeners(
                    variableDiv,
                    'input',
                    variableName,
                    'change',
                    (input) => parseFloat(input.value));
                break;

            case NamelistInputEditor.variableTypes.character:
                this._addVariableFieldListeners(
                    variableDiv,
                    'input',
                    variableName,
                    'change',
                    (input) => input.value);
                break;
        }
    }

    // set variable input fields value from current namelist object
    _setVariableFieldValue(groupName, variableName) {

        const variable = this.variables[groupName][variableName];
        const isSet = this._isNamelistValueSet(groupName, variableName);

        switch (variable.entries) {
            case NamelistInputEditor.entries.maxDom:
    
                for(let i = 0; i < this.max_dom; i++) {
                    this._setInputFieldValue(
                        variableName, 
                        variable, 
                        (isSet ? this.namelist[groupName][variableName][i] : variable.defaultValue),
                        i);
                }
                break;

            case NamelistInputEditor.entries.single:
                this._setInputFieldValue(
                    variableName, 
                    variable, 
                    (isSet ? this.namelist[groupName][variableName] : variable.defaultValue),
                    null);
                break;

            case NamelistInputEditor.entries.maxEta:
                break;
        }    
    }

    // set variable input fields value
    _setInputFieldValue(variableName, variable, value, index) {

        const fieldId = this._getInputFieldId(variableName, index);

        switch(variable.type) {
            case NamelistInputEditor.variableTypes.selection:
                document.querySelector(`select#${fieldId}`).value = value;
                break;

            case NamelistInputEditor.variableTypes.logical:
                document.querySelector(`input#${fieldId}`).checked = value;
                break;

            case NamelistInputEditor.variableTypes.integer:
            case NamelistInputEditor.variableTypes.real:
            case NamelistInputEditor.variableTypes.character:
                document.querySelector(`input#${fieldId}`).value = value;
                break;
        }
    }

    // configure event listeners for variable input fields
    _addVariableFieldListeners(variableDiv, fieldTag, variableName, eventType, getFieldValue) {
        variableDiv.querySelectorAll(`${fieldTag}[name="${variableName}"]`).forEach((field) => {
            field.addEventListener(eventType, (e) => {
                const variableName = e.currentTarget.name;
                const variableDiv = document.querySelector(`div.namelist-input-variable[data-variable="${variableName}"]`);
                const groupName = variableDiv.closest('div.namelist-input-group').dataset['group'];
                variableDiv.classList.remove('namelist-input-variable-unset');

                switch(this.variables[groupName][variableName].entries) {
                    case NamelistInputEditor.entries.single:
                        this._setNamelistValue(groupName, variableName, getFieldValue.call(this, e.currentTarget));
                        break;
                    case NamelistInputEditor.entries.maxDom:
                        this._setNamelistValue(
                            groupName,
                            variableName,
                            this._listVariableFields(groupName, variableName, fieldTag).map(input => getFieldValue.call(this, input)));
                        break;
                    }

                this._fireChange(groupName, variableName);
            });
        });        
    }

    // fire change event
    _fireChange(groupName, variableName) {
        if (typeof(this.options.change) === 'function') {
            this.options.change.call(this, {
                group: groupName,
                variable: variableName
            });
        }
    }

    // select variable input fields and return them as an array
    _listVariableFields(groupName, variableName, fieldTag) {
        const inputFields = [];
        document.querySelectorAll(`div.namelist-input-group[data-group="${groupName}"] div.namelist-input-variable[data-variable="${variableName}"] ${fieldTag}[name=${variableName}]`).forEach((input) => {
            inputFields.push(input);
        });
        
        return inputFields;
    }

    // get variable input field ID
    _getInputFieldId(variableName, index) {

        if (index !== null) {
            return `${variableName}_${index}`;
        }

        return variableName;
    }

    // generate variable input field HTML
    _getInputFieldHtml(variableName, variable, value, readOnly, index) {

        if (value === undefined || value === null){
            throw new Error(`Variable ${variableName} value is not defined`);
        }

        let html = '';

        const fieldId = htmlEncode(this._getInputFieldId(variableName, index));
        const fieldName = htmlEncode(variableName);

        switch(variable.type) {
            case NamelistInputEditor.variableTypes.selection:
                html = html + `<select class="form-control" id="${fieldId}" name="${fieldName}"${(readOnly ? " readonly": "")} required>`;
                for (const [key, value] of Object.entries(variable['values'])) {
                    html = html + `<option value="${key}"`;
                    if (value !== null && key.toString() === value.toString()) {
                        html = html + ' selected';
                    }
                    html = html + `>${key}: ${value}</option>`;
                }
                html = html + '<select/>';
                break;
    
            case NamelistInputEditor.variableTypes.logical:
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

            case NamelistInputEditor.variableTypes.integer:
                html = html + `<input type="number" class="form-control" id="${fieldId}" name="${fieldName}"`;
                html = html + ` value="${parseInt(value)}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + ' step="1" required/>';
                break;
        
            case NamelistInputEditor.variableTypes.real:
                html = html + `<input type="number" class="form-control" id="${fieldId}" name="${fieldName}"`;
                html = html + ` value="${value.toFixed(this.options.floatDigits)}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + ' step="0.001" required/>';
                break;

            case NamelistInputEditor.variableTypes.character:
                html = html + `<input type="text" class="form-control form-control-sm" id="${fieldId}" name="${fieldName}"`;
                if (value !== null) {
                    html = html + ` value="${htmlEncode(value)}"`;
                }
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + ' required />';
                break;
            default:
                throw new Error(`Unknown variable data type ${variable.type}`);
        }

        return html;
    }

    // creates and appends a new child HTML element to parent element
    _append(parent, tagName) {
        const element = document.createElement(tagName);
        parent.append(element);
        return element;
    }
}