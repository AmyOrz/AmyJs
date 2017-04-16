"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var RenderCommand = (function () {
    function RenderCommand() {
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    RenderCommand.prototype.draw = function () {
        this._getGl().drawArrays();
    };
    RenderCommand.prototype._getGl = function () {
        return Device_1.Device.getInstance().gl;
    };
    return RenderCommand;
}());
exports.RenderCommand = RenderCommand;
//# sourceMappingURL=RenderCommand.js.map