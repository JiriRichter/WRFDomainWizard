import { NamelistInputEditor } from "./domain-wizard.editor.namelist.input";

export class NamelistInputDialog {

    constructor(options) {
        this.modal = document.getElementById('namelist-input-dialog');
        this.header = this.modal.querySelector('div.modal-header');
        this.body = this.modal.querySelector('div.modal-body');
        this.footer = this.modal.querySelector('div.modal-footer');

        this.namelistInpurEditor = new NamelistInputEditor(
            this.body.querySelector('div#namelist-input-container'), 
            Object.assign(
                {
                    change: (e) => {
                        this._updateRaw();
                    }
                },
                options));

        this.namelistInputRawTextArea = this.body.querySelector('div#pane-namelist-input-raw textarea');

        this.footer.querySelector('#button-copy').addEventListener('click', (e) => {
            navigator.clipboard.writeText(this.namelistInpurEditor.toRaw());
        });

        this.footer.querySelector('#button-save').addEventListener('click', (e) => {
            const blob = new Blob([this.namelistInpurEditor.toRaw()], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "namelist.input", { autoBom: true });
        });

        this.tabErrors = document.getElementById('nav-item-namelist-input-errors');
    }

    async openNamelistWpsAsync(namelistWps) {
        this._resetView();
        await this.namelistInpurEditor.openNamelistWpsAsync(namelistWps);
        $(this.modal).modal('show');
        this._updateRaw();
    }

    async openNamelistInputAsync(data) {
        this._resetView();
        var result = await this.namelistInpurEditor.openNamelistInputAsync(data);
        $(this.modal).modal('show');
        this._updateRaw();
        if (result.hasErrors) {
            this._showErrors(result.errors);
        }
    }

    _resetView() {
        this.tabErrors.style['display'] = 'none';
        $('#tab-namelist-input-editor').tab('show');
    }

    _updateRaw() {
        this.namelistInputRawTextArea.value = this.namelistInpurEditor.toRaw();
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