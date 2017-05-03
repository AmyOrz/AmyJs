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
var TriangleShader_1 = require("../Render/Shader/shader/TriangleShader");
var PlaneGeometry = (function (_super) {
    __extends(PlaneGeometry, _super);
    function PlaneGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = 1;
        _this.height = 1;
        return _this;
    }
    PlaneGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    PlaneGeometry.prototype.getShader = function () {
        return TriangleShader_1.TriangleShader.create(this);
    };
    PlaneGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertice = null, texCoord = null, indice = null, color = null, normal = null;
        vertice = [
            0.0, up, 0,
            left, down, 0,
            right, down, 0
        ];
        indice = [
            0, 1, 2
        ];
        texCoord = [
            0.5, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];
        normal = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
        color = [
            1.0, 0.5, 0.4, 0.0, 0.7, 0.8, 0.0, 1.0, 0.5
        ];
        return {
            vertice: vertice,
            texCoord: texCoord,
            color: color,
            normal: normal,
            indice: indice
        };
    };
    return PlaneGeometry;
}(Geometry_1.Geometry));
exports.PlaneGeometry = PlaneGeometry;
//# sourceMappingURL=PlaneGeometry.js.map