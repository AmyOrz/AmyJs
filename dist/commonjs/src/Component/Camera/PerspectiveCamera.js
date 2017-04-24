"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Camera_1 = require("./Camera");
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerspectiveCamera.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        this.pMatrix.perspective(this._fovy, this._aspect, this.near, this.far);
        this.vMatrix.lookAt(this.view.x, this.view.y, this.view.z, 0, 0, 0, 0, 1, 0);
    };
    return PerspectiveCamera;
}(Camera_1.Camera));
exports.PerspectiveCamera = PerspectiveCamera;
//# sourceMappingURL=PerspectiveCamera.js.map