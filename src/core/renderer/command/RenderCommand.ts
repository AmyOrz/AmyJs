import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { ArrayBuffer } from "../../../Component/Render/Buffer/ArrayBuffer";
import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
import {Matrix4} from "../../../Math/Matrix4";
import {Shader} from "../../../Component/Render/Shader/shader/Shader";
import {EntityObject} from "../../Entity/EntityObject";
export class RenderCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    get MvpMatrix(){
        return this.pMatrix.multiply(this.vMatrix).multiply(this.mMatrix);
    }

    public buffers: BufferContainer = null;
    public mMatrix:Matrix4 = null;
    public vMatrix:Matrix4 = null;
    public pMatrix:Matrix4 = null;

    public targetObject:EntityObject = null;
    // public material = null;
    public shader:Shader = null;

    private _drawMode: EDrawMode = EDrawMode.TRIANGLES;

    public draw() {
        var startOffset: number = 0,
            gl = Device.getInstance().gl;

        this.shader.sendShaderUniform(this);

        var verticeBuffer: ArrayBuffer = this.buffers.getChild("verticeBuffer");
        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    }
}
