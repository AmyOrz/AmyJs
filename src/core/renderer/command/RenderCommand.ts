import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
export class RenderCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    public buffers: BufferContainer = null;

    private _drawMode: EDrawMode = EDrawMode.TRIANGLES;

    public draw() {
        var startOffset: number = 0,
            gl = Device.getInstance().gl;

        var verticeBuffer: ArrayBuffer = this.buffers.getChild("verticeBuffer");
        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    }
}
