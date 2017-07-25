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
var Component_1 = require("../../../core/Component");
var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
    }
    CameraController.create = function (camera) {
        var obj = new this();
        obj.camera = camera;
        return obj;
    };
    Object.defineProperty(CameraController.prototype, "pMatrix", {
        get: function () {
            return this.camera.pMatrix;
        },
        set: function (pMatrix) {
            this.camera.pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "vMatrix", {
        get: function () {
            return this.camera.vMatrix;
        },
        enumerable: true,
        configurable: true
    });
    CameraController.prototype.init = function () {
        this.camera.entityObject = this.entityObject;
        this.camera.init();
    };
    return CameraController;
}(Component_1.Component));
exports.CameraController = CameraController;
//# sourceMappingURL=CameraController.js.map