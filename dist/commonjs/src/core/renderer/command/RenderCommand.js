"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var EDrawMode_1 = require("./EDrawMode");
var RenderCommand = (function () {
    function RenderCommand() {
        this.buffers = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.targetObject = null;
        this.shader = null;
        this._drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(RenderCommand.prototype, "MvpMatrix", {
        get: function () {
            return this.pMatrix.multiply(this.vMatrix).multiply(this.mMatrix);
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.draw = function () {
        var startOffset = 0, gl = Device_1.Device.getInstance().gl;
        this.shader.sendShaderUniform(this);
        var verticeBuffer = this.buffers.getChild("verticeBuffer");
        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());
exports.RenderCommand = RenderCommand;
//# sourceMappingURL=RenderCommand.js.map