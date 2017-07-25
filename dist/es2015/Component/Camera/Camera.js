import { Matrix4 } from "../../Math/Matrix4";
import { Vector } from "../../Math/Vector";
var Camera = (function () {
    function Camera() {
        this._pMatrix = new Matrix4();
        this._vMatrix = new Matrix4();
        this.view = new Vector();
        this.entityObject = null;
    }
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "pMatrix", {
        get: function () {
            return this._pMatrix;
        },
        set: function (pMatrix) {
            this._pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "vMatrix", {
        get: function () {
            return this._vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.translate = function (x, y, z) {
        this.view.x = x;
        this.view.y = y;
        this.view.z = z;
    };
    Camera.prototype.init = function () {
        this.updateProjectionMatrix();
    };
    return Camera;
}());
export { Camera };
//# sourceMappingURL=Camera.js.map