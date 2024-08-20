export function getFileExtension(filename) {
    return filename.toLowerCase().substring(filename.lastIndexOf('.') + 1, filename.length) || '';
}