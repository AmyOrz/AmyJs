import { Device } from "../../device/Device";
import { EDrawMode } from "./EDrawMode";
import { ArrayBuffer } from "../../../Component/Render/Buffer/ArrayBuffer";
import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
import { Matrix4 } from "../../../Math/Matrix4";
import { EntityObject } from "../../Entity/EntityObject";
import { EBufferDataType } from "../../../Component/Geometry/BufferContainer/EBufferDataType";
import { Material } from "../../../Component/Material/Material";
import { ElementBuffer } from "../../../Component/Render/Buffer/ElementBuffer";

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

    private _drawMode: EDrawMode = EDrawMode.TRIANGLES;

    public draw() {
        var startOffset: number = 0,
            gl = Device.getInstance().gl;

        this.material.update(this);

        var elementBuffer: ElementBuffer = this.buffers.getChild(EBufferDataType.INDICE);
        var verticeBuffer: ArrayBuffer = this.buffers.getChild(EBufferDataType.VERTICE);

        if (elementBuffer != void 0)
            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
        else
            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);

    }
}
