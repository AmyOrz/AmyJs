"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AjaxUtil = (function () {
    function AjaxUtil() {
    }
    AjaxUtil.ajax = function (config) {
        var url = config.url;
        var success = config.success;
        var error = config.error;
        var data = config.data;
        var type = config.data == void 0 ? "GET" : config.data;
        var xhr = this._createAjax(error);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (success !== null) {
                    success(xhr.responseText);
                }
            }
            else {
                if (this.error !== void 0) {
                    this.error("出错了");
                }
            }
        };
        xhr.open(type, url, true);
        xhr.send(null);
    };
    AjaxUtil._createAjax = function (error) {
        var xhr = null;
        try {
            xhr = new ActiveXObject("microsoft.xmlhttp");
        }
        catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e2) {
                error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                return null;
            }
        }
        return xhr;
    };
    return AjaxUtil;
}());
exports.AjaxUtil = AjaxUtil;
//# sourceMappingURL=AjaxUtil.js.map