"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var EDrawMode_1 = require("./EDrawMode");
var EBufferDataType_1 = require("../../../Component/Geometry/BufferContainer/EBufferDataType");
var RenderCommand = (function () {
    function RenderCommand() {
        this.buffers = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.targetObject = null;
        this.material = null;
        this._drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    RenderCommand.prototype.draw = function () {
        var startOffset = 0, gl = Device_1.Device.getInstance().gl;
        this.material.update(this);
        var elementBuffer = this.buffers.getChild(EBufferDataType_1.EBufferDataType.INDICE);
        var verticeBuffer = this.buffers.getChild(EBufferDataType_1.EBufferDataType.VERTICE);
        if (elementBuffer != void 0)
            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
        else
            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());
exports.RenderCommand = RenderCommand;
//# sourceMappingURL=RenderCommand.js.map