"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometryData = (function () {
    function GeometryData() {
        this.vertice = null;
        this.color = null;
        this.indice = null;
        this.normal = null;
        this.texCoord = null;
    }
    GeometryData.create = function () {
        var obj = new this();
        return obj;
    };
    return GeometryData;
}());
exports.GeometryData = GeometryData;
//# sourceMappingURL=GeometryData.js.map