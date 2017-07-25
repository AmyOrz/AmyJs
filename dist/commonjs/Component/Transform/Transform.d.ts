import { Component } from "../../core/Component";
import { Matrix4 } from "../../Math/Matrix4";
export declare class Transform extends Component {
    static create(): Transform;
    mMatrix: Matrix4;
    rotate(angle: number, x: number, y: number, z: number): void;
    scale(x: number, y: number, z: number): void;
    translate(x: number, y: number, z: number): void;
}
