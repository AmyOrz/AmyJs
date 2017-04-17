import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export class RenderCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _drawMode: EDrawMode = EDrawMode.TRIANGLES;

    public draw(verticeBuffer: ArrayBuffer) {

        var startOffset: number = 0,
            gl = Device.getInstance().gl;

        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    }
}
