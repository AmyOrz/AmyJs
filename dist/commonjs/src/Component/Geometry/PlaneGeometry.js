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
var PlaneGeometry = (function (_super) {
    __extends(PlaneGeometry, _super);
    function PlaneGeometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaneGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    PlaneGeometry.prototype.computeData = function () {
        var vertices = [], texCoords = [], normals = [], color = [], indices = [];
        indices = [0, 1, 2, 0, 2, 3];
        texCoords = [1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        vertices = [
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0
        ];
        return {
            vertice: vertices,
            texCoord: texCoords,
            indice: indices
        };
    };
    return PlaneGeometry;
}(Geometry_1.Geometry));
exports.PlaneGeometry = PlaneGeometry;
//# sourceMappingURL=PlaneGeometry.js.map