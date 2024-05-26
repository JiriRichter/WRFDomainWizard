class MessageBoxDialog {
    constructor() {
        this.container = document.querySelector('div.modal#message-box-dialog');
        this.dialogBody = this.container.querySelector('div.modal-body');
        this.dialogTitle = this.container.querySelector('div.modal-header h5.modal-title');
        this.titleIcon = this.dialogTitle.querySelector('i');
        this.title = this.dialogTitle.querySelector('span');
   }

   static types = {
    error: 0,
    info: 1,
    warning: 2
   }

   show(title, message, type) {
        this.empty();
        this.setTitle(title, type);
        this.dialogBody.innerText = message;
        $(this.container).modal();
    }

    empty() {
        this.title.innerHTML = '';
        this.titleIcon.classList.remove('fa-exclamation-circle');
        this.titleIcon.classList.remove('fa-info-circle');
        this.titleIcon.classList.remove('fa-exclamation-triangle');

        this.dialogBody.innerHTML = '';
    }

    setTitle(title, type) {
        if (type === MessageBoxDialog.types.error) {
            this.titleIcon.classList.add('fa-exclamation-circle');
        }
        if (type === MessageBoxDialog.types.info) {
            this.titleIcon.classList.add('fa-info-circle');
        }
        if (type === MessageBoxDialog.types.warning) {
            this.titleIcon.classList.add('fa-exclamation-triangle');
        }

        this.title.innerText = title;
    }


}

const messageBoxDialog = new MessageBoxDialog()

export function errorMessageBox(title, message) {
    messageBoxDialog.show(title, message, MessageBoxDialog.types.error);
}

export function enableGlobalErrorHandler() {
    window.onerror = (event, source, lineno, colno, error) => {
        messageBoxDialog.show('Error', source, MessageBoxDialog.types.error);
    };
}

