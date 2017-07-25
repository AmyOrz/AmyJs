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
var ModelGeometry = (function (_super) {
    __extends(ModelGeometry, _super);
    function ModelGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.indices = null;
        _this.vertices = null;
        _this.normals = null;
        _this.texCoords = null;
        _this.colors = null;
        return _this;
    }
    ModelGeometry.create = function () {
        var obj = new this();
        return obj;
    };
    ModelGeometry.prototype.computeData = function () {
        return {
            vertice: this.vertices,
            normal: this.normals,
            texCoord: this.texCoords,
            indice: this.indices,
            color: this.colors,
        };
    };
    return ModelGeometry;
}(Geometry_1.Geometry));
exports.ModelGeometry = ModelGeometry;
//# sourceMappingURL=ModelGeometry.js.map