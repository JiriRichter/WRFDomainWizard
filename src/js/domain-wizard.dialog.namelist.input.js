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
    }

    async openNamelistWpsAsync(namelistWps) {
        await this.namelistInpurEditor.openNamelistWpsAsync(namelistWps);
        $(this.modal).modal('show');
        this._updateRaw();
    }

    async openNamelistInputAsync(data) {
        await this.namelistInpurEditor.openNamelistInputAsync(data);
        $(this.modal).modal('show');
        this._updateRaw();
    }

    _updateRaw() {
        this.namelistInputRawTextArea.value = this.namelistInpurEditor.toRaw();
    }
}