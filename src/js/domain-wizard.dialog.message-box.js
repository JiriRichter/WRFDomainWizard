class MessageBoxDialog {
    constructor() {
        this.container = document.querySelector('div.modal#message-box-dialog');
        this.dialogBody = this.container.querySelector('div.modal-body');
        this.dialogTitle = this.container.querySelector('div.modal-header h5.modal-title');
        this.titleIcon = this.dialogTitle.querySelector('i');
        this.titleSpan = this.dialogTitle.querySelector('span');
   }

   static types = {
    error: 0,
    info: 1,
    warning: 2
   }

    open() {
        $(this.container).modal();
        return this;
    }

    close() {
        $(this.container).modal('hide');
        return this;
    }

    empty() {
        this.titleSpan.innerHTML = '';
        this.titleIcon.classList.remove('fa-exclamation-circle');
        this.titleIcon.classList.remove('fa-info-circle');
        this.titleIcon.classList.remove('fa-exclamation-triangle');

        this.dialogBody.innerHTML = '';
        return this;
    }

    title(title, icon) {
        if (icon === MessageBoxDialog.types.error) {
            this.titleIcon.classList.add('fa-exclamation-circle');
        }
        if (icon === MessageBoxDialog.types.info) {
            this.titleIcon.classList.add('fa-info-circle');
        }
        if (icon === MessageBoxDialog.types.warning) {
            this.titleIcon.classList.add('fa-exclamation-triangle');
        }

        this.titleSpan.innerText = title;
        return this;
    }

    html(html) {
        this.dialogBody.innerHTML = html;
        return this;
    }

    text(message) {
        this.dialogBody.innerText = message;
        return this;
    }
}

const messageBoxDialog = new MessageBoxDialog()

function getTemplate(name) {
    return document
        .getElementById('message-box-dialog-templates')
        .querySelector(`div[template="${name}"]`);
}

export function errorMessageBox(title, message) {
    messageBoxDialog
            .empty()
            .title(title,  MessageBoxDialog.types.error)
            .text(message)
            .open();
}

export function enableGlobalErrorHandler() {
    window.onerror = (event, source, lineno, colno, error) => {

        if (!event || !source || !error) {
            return;
        }

        if (!error.stack) {
            return;
        }

        if (source.toLowerCase().includes("/lib/")) {
            return;
        }

        const template = getTemplate('global-error');

        messageBoxDialog
            .empty()
            .title('Unexpected Error',  MessageBoxDialog.types.error)
            .html(template.innerHTML);

        let errorDetails = '';
        errorDetails = errorDetails + `Error: ${event}\n`;
        errorDetails = errorDetails + `Timestamp: ${new Date().toISOString()}\n`;
        errorDetails = errorDetails + `Source: ${source}\n`;
        errorDetails = errorDetails + `Line: ${lineno}\n`;
        errorDetails = errorDetails + `Stack:\n`;
        errorDetails = errorDetails + `${error.stack}`;

        messageBoxDialog.dialogBody.querySelector('textarea').value = errorDetails;

        const title = 'Error: ' + event + ' @ ' + source + ":" + lineno;
        messageBoxDialog.dialogBody.querySelector('a#create-github-issue').href = `https://github.com/JiriRichter/WRFDomainWizard/issues/new?labels=bug&title=${encodeURI(title)}&body=${encodeURI(errorDetails)}`;

        messageBoxDialog.open();
    };
}

