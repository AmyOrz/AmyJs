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
var Component_1 = require("../core/Component");
var GeometryData_1 = require("./Data/GeometryData");
var BufferContainer_1 = require("./BufferContainer/BufferContainer");
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bufferContainer = null;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "geometryData", {
        get: function () {
            return this._bufferContainer.geometryData;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.init = function () {
        var computeData = this.computeData();
        this._bufferContainer = BufferContainer_1.BufferContainer.create();
        this._bufferContainer.geometryData = this.createGeometryData(computeData);
        this._bufferContainer.init();
    };
    Geometry.prototype.getChild = function (name) {
        return this._bufferContainer.getChild(name);
    };
    Geometry.prototype.createGeometryData = function (computeData) {
        var vertice = computeData.vertice, color = computeData.color;
        var geometryData = GeometryData_1.GeometryData.create();
        geometryData.vertice = vertice;
        geometryData.color = color;
        return geometryData;
    };
    return Geometry;
}(Component_1.Component));
exports.Geometry = Geometry;
//# sourceMappingURL=Geometry.js.map