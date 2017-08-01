"use strict";
var path = require("path");
module.exports = (function () {
    function FileUtils() {
    }
    FileUtils.isImage = function (url) {
        switch (path.extname(url)) {
            case ".jpg":
            case ".jpeg":
            case ".png":
            case ".dds":
            case ".gif":
            case ".bmp":
                return true;
            default:
                return false;
        }
    };
    return FileUtils;
}());
