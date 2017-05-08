import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { ArrayBuffer } from "../../../Component/Render/Buffer/ArrayBuffer";
import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
import { Matrix4 } from "../../../Math/Matrix4";
import { Shader } from "../../../Component/Render/Shader/shader/Shader";
import { EntityObject } from "../../Entity/EntityObject";
import { EBufferDataType } from "../../../Component/Geometry/BufferContainer/EBufferDataType";
import { Material } from "../../../Component/Material/Material";

export class RenderCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    public buffers: BufferContainer = null;
    public mMatrix: Matrix4 = null;
    public vMatrix: Matrix4 = null;
    public pMatrix: Matrix4 = null;

    public targetObject: EntityObject = null;
    public material: Material = null;
    // public shader: Shader = null;


    private _drawMode: EDrawMode = EDrawMode.TRIANGLE_FAN;

    public draw() {
        var startOffset: number = 0,
            gl = Device.getInstance().gl;

        this.material.update(this);

        var verticeBuffer: ArrayBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
        gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
    }
}
