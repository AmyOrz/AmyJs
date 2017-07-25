export class Util {

    public static isArray(target: any): boolean {
        return {}.toString.call(target).slice(8, -1).toLowerCase() == "array";
    }

    public static ajax(config) {
        var url = config.url;
        var success = config.success;
        var error = config.error;
        var data = config.data;
        var type = config.data == void 0 ? "GET" : config.data;


        var xhr = this._createAjax(error)

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (success !== null) {//普通文本
                    success(xhr.responseText);
                }
            } else {
                if (this.error !== void 0) {
                    this.error("出错了");
                }
            }
        };

        xhr.open(type, url, true);
        xhr.send(null);
    }

    private static _createAjax(error) {
        var xhr = null;
        try {//IE系列浏览器
            xhr = new ActiveXObject("microsoft.xmlhttp");
        } catch (e1) {
            try {//非IE浏览器
                xhr = new XMLHttpRequest();
            } catch (e2) {
                error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                return null;
            }
        }
        return xhr;
    }
}
