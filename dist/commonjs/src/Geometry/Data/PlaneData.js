"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlaneData = (function () {
    function PlaneData() {
    }
    return PlaneData;
}());
PlaneData.vertices = new Float32Array([
    1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0
]);
PlaneData.texCoords = new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);
PlaneData.color = new Float32Array([
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
]);
PlaneData.indices = new Uint8Array([0, 1, 2, 0, 2, 3]);
exports.PlaneData = PlaneData;
//# sourceMappingURL=PlaneData.js.map