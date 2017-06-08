"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("wonder-frp/dist/commonjs/stream/MapStream");
require("wonder-frp/dist/commonjs/stream/MergeAllStream");
var ObjLoader_1 = require("./ObjLoader");
var MaterialLoader_1 = require("./MaterialLoader");
var rsvp_js_1 = require("rsvp/dist/rsvp.js");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var AjaxUtil_1 = require("./AjaxUtil");
var Operator_2 = require("wonder-frp/dist/commonjs/global/Operator");
var Loader = (function () {
    function Loader() {
        this._objLoader = ObjLoader_1.ObjLoader.create();
        this._materialLoader = MaterialLoader_1.MaterialLoader.create();
    }
    Loader.of = function () {
        var obj = new this();
        return obj;
    };
    Loader.prototype.convert = function (filePath) {
        var _this = this;
        var result = {};
        var objStream = this._getStream(filePath);
        var fileName = this._getName(filePath);
        return objStream.flatMap(function (fileContent) {
            _this._objLoader.convert(result, fileContent, fileName);
            if (_this._objLoader.mtlFilePath) {
                var materialStream = _this._getStream("./build/" + _this._objLoader.mtlFilePath);
                return materialStream.map(function (fileContent) {
                    result.materials = _this._materialLoader.convert(result, fileContent);
                    return result;
                });
            }
            return Operator_2.just(result);
        });
    };
    Loader.prototype._getStream = function (filePath) {
        return Operator_1.fromPromise(new rsvp_js_1.Promise(function (resolve, reject) {
            AjaxUtil_1.AjaxUtil.ajax({
                url: filePath,
                success: function (val) { return resolve(val); },
                error: function (val) { return reject(val); }
            });
        }));
    };
    Loader.prototype._getName = function (filePath) {
        var reg = /[^\/]\w+/g;
        var result = filePath.match(reg);
        return result[result.length - 2];
    };
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map