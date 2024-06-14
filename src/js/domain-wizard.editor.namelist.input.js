import { htmlEncode } from "./utils/html";
import { Namelist } from "./utils/namelist";
import { distanceToMeters } from "./utils/math";
import { NamelistDateTimePicker } from './domain-wizard.control.namelist-datetime-picker';

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
        selection: "selection",
        datetime: "datetime"
    }

    static _localStorageKey = '_wrf_domain_wizard_namelist_input_editor'

    static _dateTimePickers = {
        'time_control': {
            'start_year': {
                variables: {
                    year: 'start_year',
                    month: 'start_month',
                    day: 'start_day',
                    hour: 'start_hour',
                    minute: 'start_minute',
                    second: 'start_second'
                },
                description: 'start time',
                title: 'start time'
            },
            'end_year': {
                variables: {
                    year: 'end_year',
                    month: 'end_month',
                    day: 'end_day',
                    hour: 'end_hour',
                    minute: 'end_minute',
                    second: 'end_second'
                },
                description: 'end time',
                title: 'end time'
            }
        }
    }

    // variable to skip during editor field rendering
    static _ignoreVariables = [
        'julyr',
        'julday',
        'gmt'
    ];

    constructor(container, options) {

        // default settings
        this.options = {
            jsonBaseUrl: 'json',
            change: null,
            floatDigits: 3,
            timeZone: null,
            onInitialize: null
        };

        if (options) {
            this.options = Object.assign(this.options, options);
        }

        // editor container element
        this.container = container;
        
        // variable definitions
        this.variables = null;

        // variable to skip during editor field rendering
        this._ignoreVariables = null;

        this._variableSubstitutes = {};

        // read-only variable flags
        this.readOnly = {};

        // variable group user guide links
        this.userGuideLinks = {};

        // namelist object
        this.namelist = null;
        
        // initialize editor view state
        let value = localStorage.getItem(`${NamelistInputEditor._localStorageKey}_view`);
        if (value) {
            this.view = JSON.parse(value);
        }
        else {
            this.view = {
                groups: {}
            };
        }

        this._dateTimePickers = {};
    }

    // current max_dom value
    get max_dom() {
        return this.namelist.domains?.max_dom ?? 1;
    }

    get timeZone() {
        return this.options.timeZone;
    }

    set timeZone(tz) {
        this.options.timeZone = tz;
        for (const groupDateTimePickers of Object.values(this._dateTimePickers)) {
            for (const dateTimePickers of Object.values(groupDateTimePickers)) {
                dateTimePickers.forEach((dateTimePicker) => { dateTimePicker.displayTimeZone = tz; });
            }
        }
    }

    // initializes editor from namelist.wps object
    async openNamelistWpsAsync(namelistWps, options) {

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
        this._initEditorFields(options);
    }

    // open namelist object
    async openNamelistInputAsync(data, options) {

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
        this._initEditorFields(options);

        return {
            errors: (errors.length > 0 ? errors : null),
            hasErrors: errors.length > 0
        };
    }

    // return raw text representation of namelist data
    toText() {
        let text = '';

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

            text = text + groupContent;
        };

        return text;
    }

    goToTop() {
        this.clearHighlight();
        this.container.scrollIntoView();
    }

    goToGroup(name) {
        this.clearHighlight();
        var groupDiv = this.container.querySelector(`div.namelist-input-group[data-group="${name}"]`);
        if (!groupDiv) {
            return;
        }

        this._expandGroup(groupDiv);
        groupDiv.scrollIntoView();
    }

    _expandGroup(groupDiv) {
        this._toggleGroupHideUnset(groupDiv, false);
        this._toggleGroupCollapse(
            groupDiv.querySelector('div.namelist-input-variables'),
            NamelistInputEditor.collpaseCommands.show);
        this._toggleGroupVariableHideUnset(groupDiv, false);
    }

    clearHighlight() {
        this.container.querySelectorAll('div.namelist-input-variable.namelist-input-variable-highlight').forEach((div) => {
            div.classList.remove('namelist-input-variable-highlight');
        });
    }

    goToVariable(variableName) {
        this.clearHighlight();

        if (variableName in this._variableSubstitutes) {
            variableName = this._variableSubstitutes[variableName];
        }
        
        var variableDiv = this.container.querySelector(`div.namelist-input-variable[data-variable="${variableName}"]`);
        if (!variableDiv) {
            return;
        }

        variableDiv.classList.add('namelist-input-variable-highlight');

        var collapsibleDiv = variableDiv.closest('div.namelist-input-variables.collapse');
        var groupDiv = variableDiv.closest('div.namelist-input-group');

        $(collapsibleDiv).one('shown.bs.collapse', (e) => {
            variableDiv.scrollIntoView();
        });

        this._expandGroup(groupDiv);
    }

    static collpaseCommands = {
        hide: 'hide',
        show: 'show'
    }

    collapseGroups() {
        this._toggleAllGroupsCollapse(NamelistInputEditor.collpaseCommands.hide);
    }

    expandGroups(command) {
        this._toggleAllGroupsCollapse(NamelistInputEditor.collpaseCommands.show);
    }

    hideUnsetVariables() {
        this._toggleVariableHideUnset(true);
    }

    showUnsetVariables() {
        this._toggleVariableHideUnset(false);
    }

    hideUnsetGroups() {
        this._toggleAllGroupsHideUnset(true);
    }

    showUnsetGroups() {
        this._toggleAllGroupsHideUnset(false);
    }

    _toggleGroupCollapse(variablesDiv, command) {
        $(variablesDiv).collapse(command);
        const groupHeader = variablesDiv.previousSibling;
        const icon = groupHeader.querySelector('button[data-toggle="collapse"] i');
        switch (command) {
            case NamelistInputEditor.collpaseCommands.hide:
                icon.classList.remove(NamelistInputEditor.iconClass.open);
                icon.classList.add(NamelistInputEditor.iconClass.collapsed);
                break;

            case NamelistInputEditor.collpaseCommands.show:
                icon.classList.remove(NamelistInputEditor.iconClass.collapsed);
                icon.classList.add(NamelistInputEditor.iconClass.open);
                break;
        }
    }

    _toggleAllGroupsCollapse(command) {
        this.container.querySelectorAll('div.namelist-input-variables.collapse')
            .forEach((element) => {
                this._toggleGroupCollapse(element, command);
            });

        for(let group in this.view.groups) {
            this.view.groups[group].collapse = command === NamelistInputEditor.collpaseCommands.hide;
        }

        this._storeView();
    }

    _toggleGroupHideUnset(groupDiv, hideUnset) {
        if (hideUnset === true) {
            groupDiv.classList.add('namelist-input-hide-unset');
        }
        else {
            groupDiv.classList.remove('namelist-input-hide-unset');
        }
    }

    _toggleAllGroupsHideUnset(hideUnset) {
        this.container.querySelectorAll('div.namelist-input-group')
            .forEach((groupDiv) => {
                this._toggleGroupHideUnset(groupDiv, hideUnset);
            });

        this.view.hideUnsetGroups = hideUnset;
    
        this._storeView();
    }

    _toggleGroupVariableHideUnset(groupDiv, hideUnset) {
        const variables = groupDiv.querySelector('.namelist-input-variables');

        if (hideUnset === true) {
            variables.classList.add('namelist-input-hide-unset');
        }
        else {
            variables.classList.remove('namelist-input-hide-unset');
        }

        const header =  groupDiv.querySelector('.namelist-input-group-header');
        const hideUnsetSwitch = header.querySelector('input[name="switch-hide-unset"]');
        hideUnsetSwitch.checked = hideUnset;
    }

    _toggleVariableHideUnset(hideUnset) {
        this.container.querySelectorAll('div.namelist-input-group')
            .forEach((groupDiv) => {
                this._toggleGroupVariableHideUnset(groupDiv, hideUnset);
            });

        for(let group in this.view.groups) {
            this.view.groups[group].hideUnsetVariables = hideUnset;
        }

        this._storeView();
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
        this._dateTimePickers = {};
        while(this.container.firstChild && this.container.removeChild(this.container.firstChild));
    }

    // construct variable definition object
    async _initVariablesAsync() {

        if (this.variables !== null) {
            return;
        }

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

                if (selectValues[group] && selectValues[group][variable] && selectValues[group][variable].values) {
                    this.variables[group][variable].type = NamelistInputEditor.variableTypes.selection;
                    this.variables[group][variable]['values'] = selectValues[group][variable].values;
                }

                if (group in NamelistInputEditor._dateTimePickers && variable in NamelistInputEditor._dateTimePickers[group]) {
                    this.variables[group][variable].type = NamelistInputEditor.variableTypes.datetime;
                }
            }
        }

        // set default values for variables with missing or invalid default value in auto-generated JSON data

        // time_step default value not set in registry
        this._setDefaultValue("domains", "time_step", 60);

        for(let groupName in userGuide) {
            this.userGuideLinks[groupName] = `https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/namelist_variables.html#${groupName.replace("_", "-")}`;
        }

        // construct ignore variable lookup hash table
        this._ignoreVariables = {};
        for(let variableName of NamelistInputEditor._ignoreVariables) {
            if (!(variableName in this._ignoreVariables)) {
                this._ignoreVariables[variableName] = null;
            }
        }

        this._variableSubstitutes = {};
        for (const groupDateTimePickers of Object.values(NamelistInputEditor._dateTimePickers)) {
            for (const [dateTimePickerVariableName, dateTimePicker] of Object.entries(groupDateTimePickers)) {
                for(let variableName of Object.values(dateTimePicker.variables)) {
                    if (typeof(variableName) === 'string' && !(variableName in this._ignoreVariables) && variableName !== dateTimePickerVariableName) {
                        this._ignoreVariables[variableName] = null;
                        this._variableSubstitutes[variableName] = dateTimePickerVariableName;
                    }
                }
            }
        }

        if (typeof(this.options.onInitialize) === 'function') {
            this.options.onInitialize.call(this, {
                sender: this,
                variables: this.variables
            })
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
    _initEditorFields(options) {

        let editorOptions = {};

        if (options) {
            editorOptions = Object.assign(editorOptions, options);
        }

        if (typeof(editorOptions.hideUnsetGroups) === 'boolean') {
            this.view.hideUnsetGroups = editorOptions.hideUnsetGroups;
        }
        else {
            this.view.hideUnsetGroups = this.view.hideUnsetGroups ?? true;
        }

        for(const [groupName, groupVariables] of Object.entries(this.variables)) {
            if (Object.keys(groupVariables).length === 0) {
                continue;
            }
            this._initVariableGroup(groupName, groupVariables, editorOptions);
        };

        $(this.container).find('*[title]').tooltip();
        this._storeView();
        this._updateGroupView();
    }

    // collapse icons
    static iconClass = {
        collapsed: 'fa-chevron-right',
        open: 'fa-chevron-down'
    }

    // create group variables 
    _initVariableGroup(groupName, groupVariables, editorOptions) {

        const groupDiv = this._append(this.container, 'div');
        groupDiv.classList.add('namelist-input-group');
        if (this.view.hideUnsetGroups === true) {
            groupDiv.classList.add('namelist-input-hide-unset');
        }
        groupDiv.dataset['group'] = groupName;

        // initialize group view
        this.view.groups = this.view.groups ?? {};
        this.view.groups[groupName] = this.view.groups[groupName] ?? {};

        if (typeof(editorOptions.collapseGroups) === 'boolean') {
            this.view.groups[groupName].collapse = editorOptions.collapseGroups;
        }
        else {
            this.view.groups[groupName].collapse = this.view.groups[groupName].collapse ?? false;
        }

        if (typeof(editorOptions.hideUnsetVariables) === 'boolean') {
            this.view.groups[groupName].hideUnsetVariables = editorOptions.hideUnsetVariables;
        }
        else {
            this.view.groups[groupName].hideUnsetVariables = this.view.groups[groupName].hideUnsetVariables ?? true;
        }

        const iconClass = this.view.groups[groupName].collapse === true ? NamelistInputEditor.iconClass.collapsed : NamelistInputEditor.iconClass.open;

        const headerDiv = this._append(groupDiv, 'div');
        headerDiv.classList.add('namelist-input-group-header');

        let headerDivHtml = '';

        // collapse toggle
        headerDivHtml = headerDivHtml + `<button class="btn btn-sm" type="button" data-toggle="collapse" data-target="#${groupName}" aria-expanded="false" aria-controls="${groupName}"><i class="fas ${iconClass}"></i></button>`;

        // group title
        headerDivHtml = headerDivHtml + `<h5>${htmlEncode(groupName)}</h5>`;

        // number of set variables
        headerDivHtml = headerDivHtml + '<span class="badge badge-pill namelist-input-set-variable-count" style="display: none;" title="Number of variables set in this group"></span>';

        // users guide link
        if (groupName in this.userGuideLinks) {
            headerDivHtml = headerDivHtml + `<a href="${htmlEncode(this.userGuideLinks[groupName])}" target="_blank" class="namelist-input-variables-user-guide-link ml-3" title="Open WRF User's Guide page for this group in a new tab"><i class="fas fa-info-circle"></i></a>`;
        }

        // hide unset switch
        headerDivHtml = headerDivHtml + '<div class="namelist-input-group-header-switch">';
        headerDivHtml = headerDivHtml + '<label class="switch ml-2">';
        headerDivHtml = headerDivHtml + `<input type="checkbox" name="switch-hide-unset" id="switch-hide-unset-${htmlEncode(groupName)}"`;
        if (this.view.groups[groupName].hideUnsetVariables === true) {
            headerDivHtml = headerDivHtml + ' checked';
        }
        headerDivHtml = headerDivHtml + '><span class="slider round"></span>';
        headerDivHtml = headerDivHtml + '</label>';
        headerDivHtml = headerDivHtml + '<span>Hide Unset</span>';
        headerDivHtml = headerDivHtml + '</div>';

        headerDiv.innerHTML = headerDivHtml;

        headerDiv.querySelector('button[data-toggle="collapse"]').addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            const groupName = e.currentTarget.dataset['target'].replace('#', '');
            if (icon.classList.contains(NamelistInputEditor.iconClass.open)) {
                icon.classList.remove(NamelistInputEditor.iconClass.open);
                icon.classList.add(NamelistInputEditor.iconClass.collapsed);
                this.view.groups[groupName].collapse = true;
            } else {
                icon.classList.remove(NamelistInputEditor.iconClass.collapsed);
                icon.classList.add(NamelistInputEditor.iconClass.open);
                this.view.groups[groupName].collapse = false;
            }
            this._storeView();
        });

        headerDiv.querySelector(`input#switch-hide-unset-${groupName}`).addEventListener('change', (e) => {
            const group = e.currentTarget.closest('.namelist-input-group');
            const groupName = group.dataset['group'];
            const variables = group.querySelector('div.namelist-input-variables');
            this.view.groups[groupName].hideUnsetVariables = e.currentTarget.checked;
            if (e.currentTarget.checked === true) {
                variables.classList.add('namelist-input-hide-unset');
            }
            else {
                variables.classList.remove('namelist-input-hide-unset');
            }
            this._storeView();
        });

        this.namelist[groupName] = this.namelist[groupName] ?? {};

        this._appendGroupVariableFields(groupDiv, groupName, groupVariables);
    }

    _updateGroupView() {
        this.container.querySelectorAll('div.namelist-input-group').forEach((group) => {
            const count = group.querySelectorAll('div.namelist-input-variable:not(.namelist-input-variable-unset)').length;
            const badge = group.querySelector('div.namelist-input-group-header span.namelist-input-set-variable-count');

            if (count > 0) {
                badge.innerText = count;
                badge.style.display = null;
                group.classList.remove('namelist-input-group-unset');
            }
            else {
                badge.innerText = '0';
                badge.style.display = 'none';
                group.classList.add('namelist-input-group-unset');
            }
        });
    }

    // capture variable group collapse state
    _storeView() {
        localStorage.setItem(`${NamelistInputEditor._localStorageKey}_view`, JSON.stringify(this.view));
    }

    // create and append group variables
    _appendGroupVariableFields(groupDiv, groupName, groupVariables) {
        const variablesDiv = this._append(groupDiv, 'div');
        variablesDiv.classList.add('namelist-input-variables');
        variablesDiv.classList.add('collapse');

        if (this.view.groups[groupName].collapse === false) {
            variablesDiv.classList.add('show');
        }
        if (this.view.groups[groupName].hideUnsetVariables) {
            variablesDiv.classList.add('namelist-input-hide-unset');
        }

        variablesDiv.id = groupName;

        for(const [variableName, variable] of Object.entries(groupVariables)) {
            this._appendVariableField(variablesDiv, groupName, variableName, variable);
        }
    }

    // create and append variable input fields
    _appendVariableField(variablesDiv, groupName, variableName, variable) {

        if (variableName in this._ignoreVariables) {
            console.debug(`Skipping ignored variable ${variableName}`);
            return;
        }

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

        let html = ''; 
        
        //<div class="input-group input-group-sm">';
        //html += '<div class="input-group-prepend">';

        // erase button HTML
        html += '<button class="btn btn-sm btn-outline-secondary btn-namelist-input-erase" type="button"'
        if (readOnly === true) {
            variableDiv.classList.add('namelist-input-variable-readonly');
            html += ' disabled';
        }
        html += '><i class="fas fa-eraser"></i></button>'

        // variable name HTML
        html += '<div class="namelist-input-variable-name">';
        switch (variable.type) {
            case NamelistInputEditor.variableTypes.datetime: 
                if (NamelistInputEditor._dateTimePickers[groupName][variableName].title) {
                    html += htmlEncode(NamelistInputEditor._dateTimePickers[groupName][variableName].title);
                }
                break;
            
            default:
                html += htmlEncode(variableName);
                break;
        }       
        html += '</div>'; 

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
        switch (variable.type) {
            case NamelistInputEditor.variableTypes.datetime: 
                if (NamelistInputEditor._dateTimePickers[groupName][variableName].description) {
                    html += '<div class="namelist-input-variable-description">';
                    html += htmlEncode(NamelistInputEditor._dateTimePickers[groupName][variableName].description);
                    html += ` (${(Object.values(NamelistInputEditor._dateTimePickers[groupName][variableName].variables).join(', '))})`;
                    html += '</div>';
                }
                break;
            
            default:
                if (variable.description) {
                    html += '<div class="namelist-input-variable-description">';
                    html += htmlEncode(variable.description);
                    html += '</div>';
                }
                break;
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
                switch(this.variables[groupName][variableName].type) {

                    case NamelistInputEditor.variableTypes.datetime:        
                        for(var key in NamelistInputEditor._dateTimePickers[groupName][variableName].variables) {
                            this.namelist[groupName][NamelistInputEditor._dateTimePickers[groupName][variableName].variables[key]] = null;
                        }
                        this._dateTimePickers[groupName][variableName].forEach((dateTimePicker, index) => {
                            dateTimePicker.valueUtc = this._getNamelistDateTimeValueUtc(
                                groupName,
                                NamelistInputEditor._dateTimePickers[groupName][variableName].variables,
                                index);
                        });
                        break;

                    default:
                        this.namelist[groupName][variableName] = null;
                        this._setVariableFieldValue(groupName, variableName);
                        break;
                }
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

            case NamelistInputEditor.variableTypes.datetime:
                variableDiv.querySelectorAll('div.namelist-input-datetime-picker').forEach((div, index) => {

                    const dateTimePicker = new NamelistDateTimePicker(
                        div,
                        {
                            onChange: (e) => {

                                const variableDiv = e.sender.widget.closest('div.namelist-input-variable');
                                const variableName = variableDiv.dataset['variable'];
                                const groupName = variableDiv.closest('div.namelist-input-group').dataset['group'];
                                variableDiv.classList.remove('namelist-input-variable-unset');

                                switch(this.variables[groupName][variableName].entries) {
                                    case NamelistInputEditor.entries.single:
                                        {
                                            const valueUtc = this._dateTimePickers[groupName][variableName][0].valueUtc;
                                            for(var key in NamelistInputEditor._dateTimePickers[groupName][variableName].variables) {
                                                this._setNamelistValue(groupName, NamelistInputEditor._dateTimePickers[groupName][variableName].variables[key], valueUtc[key]);
                                            }
                                        }
                                        break;
                                    case NamelistInputEditor.entries.maxDom:
                                        {
                                        const valuesUtc = this._dateTimePickers[groupName][variableName].map(x => x.valueUtc);
                                        for(var key in NamelistInputEditor._dateTimePickers[groupName][variableName].variables) {
                                            this._setNamelistValue(
                                                groupName, 
                                                NamelistInputEditor._dateTimePickers[groupName][variableName].variables[key], 
                                                valuesUtc.map(x => x[key])
                                            );
                                        }
                                    }
                                        break;
                                    }

                                this._fireChange(groupName, variableName);
                            },
                            displayTimeZone: this.options.timeZone,
                            valueUtc: this._getNamelistDateTimeValueUtc(
                                groupName,
                                NamelistInputEditor._dateTimePickers[groupName][variableName].variables,
                                index)
                        });

                    this._dateTimePickers[groupName] = this._dateTimePickers[groupName] ?? {};
                    this._dateTimePickers[groupName][variableName] = this._dateTimePickers[groupName][variableName] ?? [];
                    this._dateTimePickers[groupName][variableName].push(dateTimePicker);
                });

                break;
        }
    }

    _getNamelistDateTimeValueUtc(groupName, dateTimeVariables, index) {
        return {
            year: this._getNamelistVariableValue(groupName, dateTimeVariables.year, this.variables[groupName][dateTimeVariables.year], index),
            month: this._getNamelistVariableValue(groupName, dateTimeVariables.month, this.variables[groupName][dateTimeVariables.month], index),
            day: this._getNamelistVariableValue(groupName, dateTimeVariables.day, this.variables[groupName][dateTimeVariables.day], index),
            hour: this._getNamelistVariableValue(groupName, dateTimeVariables.hour, this.variables[groupName][dateTimeVariables.hour], index),
            minute: this._getNamelistVariableValue(groupName, dateTimeVariables.minute, this.variables[groupName][dateTimeVariables.minute], index),
            second: (dateTimeVariables.second ? 
                this._getNamelistVariableValue(groupName, dateTimeVariables.second, this.variables[groupName][dateTimeVariables.second], index) :
                null)
        };
    }

    _getNamelistVariableValue(groupName, variableName, variable, index) {
        if (this._isNamelistValueSet(groupName, variableName) === true) {

            switch (variable.entries) {
                case NamelistInputEditor.entries.maxDom:
                    return this.namelist[groupName][variableName][index];

                case NamelistInputEditor.entries.single:
                    return this.namelist[groupName][variableName];
            }
        }
        return variable.defaultValue;
    }

    // set variable input fields value from current namelist object
    _setVariableFieldValue(groupName, variableName) {

        const variable = this.variables[groupName][variableName];
        const isSet = this._isNamelistValueSet(groupName, variableName);

        switch (variable.entries) {
            case NamelistInputEditor.entries.maxDom:
    
                for(let i = 0; i < this.max_dom; i++) {
                    this._setInputFieldValue(
                        groupName,
                        variableName, 
                        variable, 
                        (isSet ? this.namelist[groupName][variableName][i] : variable.defaultValue),
                        i);
                }
                break;

            case NamelistInputEditor.entries.single:
                this._setInputFieldValue(
                    groupName,
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
    _setInputFieldValue(groupName, variableName, variable, value, index) {

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

            case NamelistInputEditor.variableTypes.datetime:
                const dateTimePicker = this._dateTimePickers[groupName][variableName][index ?? 0];
                dateTimePicker.valueUtc = this._getNamelistDateTimeValueUtc(
                    groupName,
                    NamelistInputEditor._dateTimePickers[groupName][variableName].variables,
                    index
                );
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

        this._updateGroupView();
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

        let html = '<div class="namelist-input-variable-value">';

        const fieldId = htmlEncode(this._getInputFieldId(variableName, index));
        const fieldName = htmlEncode(variableName);

        switch(variable.type) {
            case NamelistInputEditor.variableTypes.selection:
                html = html + `<select class="form-control form-control-sm" id="${fieldId}" name="${fieldName}"${(readOnly ? " readonly": "")} required>`;
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
                html = html + '<div class="namelist-input-variable-check">'
                html = html + '<div class="form-check">'
                html = html + `<input class="form-check-input" type="checkbox" id="${fieldId}" name="${fieldName}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                if (value === true) {
                    html = html + ' checked';
                }
                html = html + '/>';
                html = html + '</div>';
                html = html + '</div>';
                break;

            case NamelistInputEditor.variableTypes.integer:
                html = html + `<input type="number" class="form-control form-control-sm" id="${fieldId}" name="${fieldName}"`;
                html = html + ` value="${parseInt(value)}"`;
                if (readOnly === true) {
                    html = html + ' readonly';
                }
                html = html + ' step="1" required/>';
                break;
        
            case NamelistInputEditor.variableTypes.real:
                html = html + `<input type="number" class="form-control form-control-sm" id="${fieldId}" name="${fieldName}"`;
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

            case NamelistInputEditor.variableTypes.datetime:
                html += `<div class="input-group input-group-sm namelist-input-datetime-picker">`;
                html += `<input type="text" class="form-control" id="${fieldId}"`;
                //html += ' required';
                html += '>';
                html += '<div class="input-group-addon input-group-append">';
                html += '<div class="input-group-text">';
                html += '<i class="far fa-calendar-alt"></i>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                break;

            default:
                throw new Error(`Unknown variable data type ${variable.type}`);
        }

        return html + '</div>';
    }

    // creates and appends a new child HTML element to parent element
    _append(parent, tagName) {
        const element = document.createElement(tagName);
        parent.append(element);
        return element;
    }
}
