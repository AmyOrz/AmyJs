"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var Device_1 = require("./device/Device");
var TriangleGeometry_1 = require("./Geometry/TriangleGeometry");
var Test = (function () {
    function Test() {
        this._gl = null;
        this._program = null;
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        this._gl = Device_1.Device.getInstance().gl;
        this._gl.clearColor(0, 0, 0, 1);
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        triangle.init();
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
    };
    Test.prototype._createTriangle = function () {
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map