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
var Geometry_1 = require("./Geometry");
var TriangleGeometry = (function (_super) {
    __extends(TriangleGeometry, _super);
    function TriangleGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 1;
        _this.height = 1;
        return _this;
    }
    TriangleGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    TriangleGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertices = null, texCoords = null, indices = null, color = null, normals = null;
        vertices = [
            0.0, up, 0,
            left, down, 0,
            right, down, 0
        ];
        indices = [
            0, 1, 2
        ];
        texCoords = [
            0.5, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
        color = [
            1.0, 0.5, 0.4, 0.0, 0.7, 0.8, 0.0, 1.0, 0.5
        ];
        return {
            vertice: vertices,
            color: color
        };
    };
    return TriangleGeometry;
}(Geometry_1.Geometry));
exports.TriangleGeometry = TriangleGeometry;
//# sourceMappingURL=TriangleGeometry.js.map