import { NamelistInputEditor } from "./namelist.input/namelist.input.editor";
import { getLocalTimeZone, appendTimeZoneSelectOptions } from "./utils/time";

export class NamelistInputDialog {

    static _localStorageKey = '_wrf_domain_wizard_namelist_input_dialog';

    constructor(options) {
        this.modal = document.getElementById('namelist-input-dialog');
        this.header = this.modal.querySelector('div.modal-header');
        this.body = this.modal.querySelector('div.modal-body');
        this.footer = this.modal.querySelector('div.modal-footer');

        this.editor = new NamelistInputEditor(
            this.body.querySelector('div#namelist-input-container'), 
            Object.assign(
                {
                    change: (e) => {
                        this._updateText();
                    },
                    timeZone: null,
                    onInitialize: (e) => {
                        const goToGroup = this.header.querySelector('select#go-to-group');
                        const goToVariable = this.header.querySelector('select#go-to-variable');
                        const groups = [];
                        const variables = [];

                        for(const groupName of Object.keys(e.variables)) {
                            groups.push(groupName);
                            for(const variableName of Object.keys(e.variables[groupName])) {
                                variables.push(variableName);
                            }
                        }

                        groups.sort();
                        variables.sort();

                        for(const groupName of groups) {
                            let option = document.createElement('option');
                            option.value = groupName;
                            option.innerText = groupName;
                            goToGroup.append(option);
                        }

                        for(const variableName of variables) {
                            let option = document.createElement('option');
                            option.value = variableName;
                            option.innerText = variableName;
                            goToVariable.append(option);
                        }

                        $(goToGroup).on('changed.bs.select', (e) => {
                            this.editor.goToGroup(goToGroup.value);
                            goToVariable.value = null;
                            $(goToVariable).selectpicker('refresh');
                        });
                        $(goToGroup).selectpicker();

                        $(goToVariable).on('changed.bs.select', (e) => {
                            this.editor.goToVariable(goToVariable.value);
                            goToGroup.value = null;
                            $(goToGroup).selectpicker('refresh');
                        });
                        $(goToVariable).selectpicker();
                    }
                },
                options));

        this.header.querySelector('button#go-to-top').addEventListener('click', (e) => {
            this.editor.clearHighlight()
            this._scrollToTop();
        });
        
        this.text = this.body.querySelector('div#pane-namelist-input-text textarea');
        this.original = this.body.querySelector('div#pane-namelist-input-original textarea');

        this.footer.querySelector('#button-copy').addEventListener('click', (e) => {
            navigator.clipboard.writeText(this.editor.toText());
        });

        this.footer.querySelector('#button-save').addEventListener('click', (e) => {
            const blob = new Blob([this.editor.toText()], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "namelist.input", { autoBom: true });
        });

        this.tabErrors = document.getElementById('tab-namelist-input-errors').parentNode;
        this.tabOriginal = document.getElementById('tab-namelist-input-original').parentNode;

        let value = localStorage.getItem(`${NamelistInputDialog._localStorageKey}_view`);
        if (value) {
            this.view = JSON.parse(value);
        }
        else {
            this.view = {
                collapseGroups: false,
                hideUnsetGroups: true,
                hideUnsetVariables: true,
            };
        }

        // group view actions
        this.viewActions = {
            collapseGroups: this.header.querySelector('#view-group-collapse-all'),
            expandGroups: this.header.querySelector('#view-group-expand-all'),
            showUnsetGroups: this.header.querySelector('#view-group-show-unset'),
            hideUnsetGroups: this.header.querySelector('#view-group-hide-unset'),
            showUnsetVariables: this.header.querySelector('#view-variables-show-unset'),
            hideUnsetVariables: this.header.querySelector('#view-variables-hide-unset'),
        }

        this.viewActions.collapseGroups.addEventListener('click', (e) => {
            this.view.collapseGroups = true;
            this.editor.collapseGroups();
            this._updateViewMenu();
        });
        this.viewActions.expandGroups.addEventListener('click', (e) => {
            this.view.collapseGroups = false;
            this.editor.expandGroups();
            this._updateViewMenu();
        });

        this.viewActions.showUnsetGroups.addEventListener('click', (e) => {
            this.view.hideUnsetGroups = false;
            this.editor.showUnsetGroups();
            this._updateViewMenu();
        });
        this.viewActions.hideUnsetGroups.addEventListener('click', (e) => {
            this.view.hideUnsetGroups = true;
            this.editor.hideUnsetGroups();
            this._updateViewMenu();
        });

        // variable view actions
        this.viewActions.showUnsetVariables.addEventListener('click', (e) => {
            this.view.hideUnsetVariables = false;
            this.editor.showUnsetVariables();
            this._updateViewMenu();
        });
        this.viewActions.hideUnsetGroups.addEventListener('click', (e) => {
            this.view.hideUnsetVariables = true;
            this.editor.hideUnsetVariables();
            this._updateViewMenu();
        });

        this._updateViewMenu();

        this.header.querySelector('#view-all').addEventListener('click', (e) => {
            this.viewActions.expandGroups.click();
            this.viewActions.showUnsetGroups.click();
            this.viewActions.showUnsetVariables.click();
        });

        this.header.querySelector('#view-min').addEventListener('click', (e) => {
            this.viewActions.collapseGroups.click();
            this.viewActions.hideUnsetGroups.click();
            this.viewActions.hideUnsetVariables.click();
        });

        this.header.querySelector('#view-compact').addEventListener('click', (e) => {
            this.viewActions.expandGroups.click();
            this.viewActions.hideUnsetGroups.click();
            this.viewActions.hideUnsetVariables.click();
        });

        // timezone select
        const timeZoneSelect = this.header.querySelector('select#select-timezone');
        appendTimeZoneSelectOptions(timeZoneSelect, getLocalTimeZone());
        $(timeZoneSelect).on('changed.bs.select', (e) => {
            this.editor.timeZone = timeZoneSelect.value;
        })
    }

    _scrollToTop() {
        this.body.scrollTop = 0;
    }

    _storeView() {
        localStorage.setItem(`${NamelistInputDialog._localStorageKey}_view`, JSON.stringify(this.view));
    }

    _updateViewMenu() {
        if (this.view.collapseGroups === true) {
            this.viewActions.collapseGroups.classList.add('dropdown-selected');
            this.viewActions.expandGroups.classList.remove('dropdown-selected');
        }
        else {
            this.viewActions.collapseGroups.classList.remove('dropdown-selected');
            this.viewActions.expandGroups.classList.add('dropdown-selected');
        }

        if (this.view.hideUnsetGroups === true) {
            this.viewActions.hideUnsetGroups.classList.add('dropdown-selected');
            this.viewActions.showUnsetGroups.classList.remove('dropdown-selected');
        }
        else {
            this.viewActions.hideUnsetGroups.classList.remove('dropdown-selected');
            this.viewActions.showUnsetGroups.classList.add('dropdown-selected');
        }

        if (this.view.hideUnsetVariables === true) {
            this.viewActions.hideUnsetVariables.classList.add('dropdown-selected');
            this.viewActions.showUnsetVariables.classList.remove('dropdown-selected');
        }
        else {
            this.viewActions.hideUnsetVariables.classList.remove('dropdown-selected');
            this.viewActions.showUnsetVariables.classList.add('dropdown-selected');
        }

        this._storeView();
    }

    _openDialog() {
        $(this.modal).modal('show');
        this._scrollToTop();
    }

    async openNamelistWpsAsync(namelistWps) {
        this._resetTabs();

        await this.editor.openNamelistWpsAsync(namelistWps);
        this._updateText();
        this._openDialog();
    }

    async openNamelistInputAsync(data) {
        this._resetTabs();

        this.original.value = data;
        this.tabOriginal.style['display'] = null;

        var result = await this.editor.openNamelistInputAsync(data, this.view);
        this._openDialog();
        this._updateText();
        if (result.hasErrors) {
            this._showErrors(result.errors);
        }
    }

    _resetTabs() {
        this.tabErrors.style['display'] = 'none';
        this.tabOriginal.style['display'] = 'none';
        $('#tab-namelist-input-editor').tab('show');
    }

    _updateText() {
        this.text.value = this.editor.toText();
    }

    _showErrors(errors) {
        this.tabErrors.style['display'] = null;
        this.tabErrors.querySelector('button').innerHTML = `<span class="mr-1">Errors</span><span class="badge rounded-pill bg-danger text-white">${errors.length}</span>`;

        const list = document.getElementById('pane-namelist-input-errors').querySelector('ul');
        list.innerHTML = '';

        errors.forEach((error) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `<i class="fas fa-exclamation-circle text-danger"></i><span class="ml-1">${error}</span>`;
            list.append(li);
        });
    }
}