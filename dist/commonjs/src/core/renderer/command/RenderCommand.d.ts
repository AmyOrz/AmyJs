import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
import { Matrix4 } from "../../../Math/Matrix4";
import { EntityObject } from "../../Entity/EntityObject";
import { Material } from "../../../Component/Material/Material";
export declare class RenderCommand {
    static create(): RenderCommand;
    buffers: BufferContainer;
    mMatrix: Matrix4;
    vMatrix: Matrix4;
    pMatrix: Matrix4;
    targetObject: EntityObject;
    material: Material;
    private _drawMode;
    draw(): void;
}
