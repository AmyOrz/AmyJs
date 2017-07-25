import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { EBufferDataType } from "../../../Component/Geometry/BufferContainer/EBufferDataType";
var RenderCommand = (function () {
    function RenderCommand() {
        this.buffers = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.targetObject = null;
        this.material = null;
        this._drawMode = EDrawMode.TRIANGLES;
    }
    RenderCommand.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(RenderCommand.prototype, "color", {
        get: function () {
            return this.material.color.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderCommand.prototype, "opacity", {
        get: function () {
            return this.material.opacity;
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.draw = function () {
        var startOffset = 0, gl = Device.getInstance().gl;
        this.material.update(this);
        var elementBuffer = this.buffers.getChild(EBufferDataType.INDICE);
        var verticeBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
        if (elementBuffer != void 0)
            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
        else
            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    };
    return RenderCommand;
}());
export { RenderCommand };
//# sourceMappingURL=RenderCommand.js.map