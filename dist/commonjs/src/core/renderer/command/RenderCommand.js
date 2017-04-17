"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var EDrawMode_1 = require("./EDrawMode");
var RenderCommand = (function () {
    function RenderCommand() {
        this._drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    RenderCommand.prototype.draw = function (verticeBuffer) {
        var startOffset = 0, gl = Device_1.Device.getInstance().gl;
        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());
exports.RenderCommand = RenderCommand;
//# sourceMappingURL=RenderCommand.js.map