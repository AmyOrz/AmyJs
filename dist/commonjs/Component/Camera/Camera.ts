import { Matrix4 } from "../../Math/Matrix4";
import { GameObject } from "../../core/Entity/GameObject";
import { Vector } from "../../Math/Vector";
export abstract class Camera {

    private _near: number;
    get near() {
        return this._near;
    }
    set near(near: number) {
        this._near = near;
    }

    private _far: number;
    get far() {
        return this._far;
    }
    set far(far: number) {
        this._far = far;
    }

    private _pMatrix: Matrix4 = new Matrix4();
    get pMatrix() {
        return this._pMatrix;
    }
    set pMatrix(pMatrix: Matrix4) {
        this._pMatrix = pMatrix;
    }

    private _vMatrix: Matrix4 = new Matrix4();
    get vMatrix() {
        return this._vMatrix;
    }

    public view: Vector = new Vector();
    public transform(x: number, y: number, z) {
        this.view.x = x;
        this.view.y = y;
        this.view.z = z;
    }

    public entityObject: GameObject = null;

    public init() {
        this.updateProjectionMatrix();
    }

    abstract updateProjectionMatrix();

}
