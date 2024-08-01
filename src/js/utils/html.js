export function htmlEncode(text) {
    if (!text) {
        return '';
    }
    return text.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');
}