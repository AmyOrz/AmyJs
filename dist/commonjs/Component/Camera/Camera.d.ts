import { Matrix4 } from "../../Math/Matrix4";
import { GameObject } from "../../core/Entity/GameObject";
import { Vector } from "../../Math/Vector";
export declare abstract class Camera {
    private _near;
    near: number;
    private _far;
    far: number;
    private _pMatrix;
    pMatrix: Matrix4;
    private _vMatrix;
    readonly vMatrix: Matrix4;
    view: Vector;
    translate(x: number, y: number, z: any): void;
    entityObject: GameObject;
    init(): void;
    abstract updateProjectionMatrix(): any;
}
