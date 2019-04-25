'use strict';

/**
 * @constructor
 */
var MessageBoxDialog = function() {

    var container, dialogBody, dialogTitle;

    container = $('div.modal#message-box-dialog');
    dialogBody = $('div.modal-body', container);
    dialogTitle = $('div.modal-header h5.modal-title', container);

    this.show = function (title, message, type) {
        dialogTitle.empty();
        if (type === 'error') {
            dialogTitle.html('<i class="fas fa-exclamation-circle text-danger"></i>');
        }
        if (type === 'info') {
            dialogTitle.html('<i class="fas fa-info-circle text-info"></i>');
        }
        if (type === 'warning') {
            dialogTitle.html('<i class="fas fa-exclamation-triangle text-warning"></i>');
        }
        
        dialogTitle.append(title);

        dialogBody.text(message);
        container.modal();
    }

    return this;
}

MessageBoxDialog.error = function(title, message) {
    var dialog = new MessageBoxDialog();
    dialog.show(title, message, 'error');
}