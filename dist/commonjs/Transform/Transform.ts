import { Component } from "../core/Component";
import { Matrix4 } from "../Math/Matrix4";

export class Transform extends Component {
    public static create() {
        var obj = new this();

        return obj;
    }

    public mMatrix: Matrix4 = new Matrix4();

    public rotate(angle: number, x: number, y: number, z: number) {
        this.mMatrix.rotate(angle, x, y, z);
    }
    public scale(x: number, y: number, z: number) {
        this.mMatrix.scale(x, y, z);
    }
    public translate(x: number, y: number, z: number) {
        this.mMatrix.translate(x, y, z);
    }

}