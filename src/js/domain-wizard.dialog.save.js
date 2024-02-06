export class WPSSaveDialog {
    constructor() {

        this._container = $('div.modal#wps-save-dialog');

        const dialogBody = $('div.modal-body', this._container);
        const dialogFooter = $('div.modal-footer', this._container);
        const buttonCopy = $('button#button-copy', dialogFooter);
        const buttonDownload = $('button#button-download', dialogFooter);

        this._wpsContent = $('textarea', dialogBody);

        buttonCopy.on('click', (e) => {
            navigator.clipboard.writeText(this._wpsContent.text());
        });

        buttonDownload.on('click', (e) => {
            const blob = new Blob([this._wpsContent.val()], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "namelist.wps", { autoBom: true });
        });
    }

    show(domain) {
        this._wpsContent.text(domain.getWPSNamelist().toString());
        this._container.modal();
    };
}