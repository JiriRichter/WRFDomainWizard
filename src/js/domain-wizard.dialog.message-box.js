class MessageBoxDialog {
    constructor() {
        this.container = $('div.modal#message-box-dialog');
        this.dialogBody = $('div.modal-body', this.container);
        this.dialogTitle = $('div.modal-header h5.modal-title', this.container);
   }

   static types = {
    error: 0,
    info: 1,
    warning: 2
   }

   show(title, message, type) {
        this.dialogTitle.empty();
        if (type === MessageBoxDialog.types.error) {
            this.dialogTitle.html('<i class="fas fa-exclamation-circle text-danger"></i>');
        }
        if (type === MessageBoxDialog.types.info) {
            this.dialogTitle.html('<i class="fas fa-info-circle text-info"></i>');
        }
        if (type === MessageBoxDialog.types.warning) {
            this.dialogTitle.html('<i class="fas fa-exclamation-triangle text-warning"></i>');
        }

        this.dialogTitle.append(title);

        this.dialogBody.text(message);
        this.container.modal();
    }
}

const messageBoxDialog = new MessageBoxDialog()

export function errorMessageBox(title, message) {
    messageBoxDialog.show(title, message, MessageBoxDialog.types.error);
}

