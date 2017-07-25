import { Camera } from "../Camera";
import { Matrix4 } from "../../../Math/Matrix4";
import { Component } from "../../../core/Component";
export declare class CameraController extends Component {
    static create(camera: Camera): CameraController;
    pMatrix: Matrix4;
    readonly vMatrix: Matrix4;
    camera: Camera;
    init(): void;
}
