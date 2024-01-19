export class WPSSaveDialog {
    constructor(domain) {

        if (WPSSaveDialog.dialog === undefined) {
            WPSSaveDialog.dialog = new WPSSaveDialog.Dialog();
        }

        this.show = function () {
            WPSSaveDialog.dialog.show(domain);
        };

        return this;
    }
    static Dialog() {
        var container, dialogBody, dialogFooter, wpsContent, buttonCopy, buttonDownload;

        container = $('div.modal#wps-save-dialog');
        dialogBody = $('div.modal-body', container);
        dialogFooter = $('div.modal-footer', container);
        wpsContent = $('textarea', dialogBody);
        buttonCopy = $('button#button-copy', dialogFooter);
        buttonDownload = $('button#button-download', dialogFooter);

        buttonCopy.click(function (e) {
            wpsContent.select();
            document.execCommand("Copy");
        });

        buttonDownload.click(function (e) {
            var blob = new Blob([wpsContent.val()], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "namelist.wps", true);
        });

        this.show = function (domain) {
            wpsContent.text(domain.getWPSNamelist().toString());
            container.modal();
        };
    }
}

export function wpsSaveDialog(domain) {
    return new WPSSaveDialog(domain);
}

