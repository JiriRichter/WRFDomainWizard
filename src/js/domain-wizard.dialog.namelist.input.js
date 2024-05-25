import { NamelistInputEditor } from "./domain-wizard.editor.namelist.input";

export class NamelistInputDialog {

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
                    }
                },
                options));

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

        // view commands
        this.footer.querySelector('#view-group-collapse-all').addEventListener('click', (e) => {
            this.editor.collapseGroups();
        });
        this.footer.querySelector('#view-group-expand-all').addEventListener('click', (e) => {
            this.editor.expandGroups();
        });

    }

    async openNamelistWpsAsync(namelistWps) {
        this._resetView();
        await this.editor.openNamelistWpsAsync(namelistWps);
        $(this.modal).modal('show');
        this._updateText();
    }

    async openNamelistInputAsync(data) {
        this._resetView();

        this.original.value = data;
        this.tabOriginal.style['display'] = null;

        var result = await this.editor.openNamelistInputAsync(data);
        $(this.modal).modal('show');
        this._updateText();
        if (result.hasErrors) {
            this._showErrors(result.errors);
        }
    }

    _resetView() {
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