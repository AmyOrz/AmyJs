"use strict";
function isObjectEmpty(obj) {
    for (var item in obj) {
        if (Object.hasOwnProperty(item)) {
            return false;
        }
    }
    return true;
}
exports.isObjectEmpty = isObjectEmpty;
