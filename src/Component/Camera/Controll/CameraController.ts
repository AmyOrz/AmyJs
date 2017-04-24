import { Camera } from "../Camera";
import { Matrix4 } from "../../../Math/Matrix4";
import { Component } from "../../../core/Component";
import { GameObject } from "../../../core/Entity/GameObject";

export class CameraController extends Component {
    public static create(camera: Camera) {
        var obj = new this();
        obj.camera = camera;

        return obj;
    }

    get pMatrix() {
        return this.camera.pMatrix;
    }
    set pMatrix(pMatrix: Matrix4) {
        this.camera.pMatrix = pMatrix;
    }

    get vMatrix() {
        return this.camera.vMatrix;
    }

    public camera: Camera = null;

    public init() {
        this.camera.entityObject = <GameObject>this.entityObject;
        this.camera.init();
    }

}
