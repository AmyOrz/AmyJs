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
var Component_1 = require("../../core/Component");
var Matrix4_1 = require("../../Math/Matrix4");
var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mMatrix = new Matrix4_1.Matrix4();
        return _this;
    }
    Transform.create = function () {
        var obj = new this();
        return obj;
    };
    Transform.prototype.rotate = function (angle, x, y, z) {
        this.mMatrix.rotate(angle, x, y, z);
    };
    Transform.prototype.scale = function (x, y, z) {
        this.mMatrix.scale(x, y, z);
    };
    Transform.prototype.translate = function (x, y, z) {
        this.mMatrix.translate(x, y, z);
    };
    return Transform;
}(Component_1.Component));
exports.Transform = Transform;
//# sourceMappingURL=Transform.js.map