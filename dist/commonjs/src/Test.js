"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var Device_1 = require("./device/Device");
var Matrix4_1 = require("./Math/Matrix4");
var TriangleGeometry_1 = require("./Geometry/TriangleGeometry");
var Test = (function () {
    function Test() {
        this._gl = null;
        this._program = null;
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        this._gl = Device_1.Device.getInstance().gl;
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        triangle.init();
        this._program = triangle.program;
        this._program.use();
        this._gl.clearColor(0, 0, 0, 1);
        var modelMatrix = new Matrix4_1.Matrix4();
        var viewMatrix = new Matrix4_1.Matrix4();
        var projMatrix = new Matrix4_1.Matrix4();
        modelMatrix.setRotate(0, 0, 0, 1);
        viewMatrix.lookAt(0, 0, 3, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, Device_1.Device.getInstance().canvas.width / Device_1.Device.getInstance().canvas.height, 1, 100);
        this._program.sendMatrix4("u_m", modelMatrix);
        this._program.sendMatrix4("u_v", viewMatrix);
        this._program.sendMatrix4("u_p", projMatrix);
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