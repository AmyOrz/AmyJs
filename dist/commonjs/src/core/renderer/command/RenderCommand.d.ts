import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
import { Matrix4 } from "../../../Math/Matrix4";
import { Shader } from "../../../Component/Render/Shader/shader/Shader";
import { EntityObject } from "../../Entity/EntityObject";
export declare class RenderCommand {
    static create(): RenderCommand;
    readonly MvpMatrix: any;
    buffers: BufferContainer;
    mMatrix: Matrix4;
    vMatrix: Matrix4;
    pMatrix: Matrix4;
    targetObject: EntityObject;
    shader: Shader;
    private _drawMode;
    draw(): void;
}
