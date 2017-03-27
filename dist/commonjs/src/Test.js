"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var Device_1 = require("./device/Device");
var Matrix4_1 = require("./Math/Matrix4");
var Program_1 = require("./Renderer/Program/Program");
var TriangleGeometry_1 = require("./Geometry/TriangleGeometry");
var Test = (function () {
    function Test() {
        this._gl = null;
        this._program = null;
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        this._gl = Device_1.Device.getInstance().gl;
        this._program = Program_1.Program.create();
        this._program.use();
        this._gl.clearColor(0, 0, 0, 1);
        var modelMatrix = new Matrix4_1.Matrix4();
        var viewMatrix = new Matrix4_1.Matrix4();
        var projMatrix = new Matrix4_1.Matrix4();
        var mvpMatrix = new Matrix4_1.Matrix4();
        modelMatrix.setRotate(30, 1, 1, 0);
        viewMatrix.lookAt(0, 0, -8, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, 1, 1, 100);
        mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
        this._program.sendMatrix4("u_MvpMatrix", mvpMatrix);
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        triangle.init();
        var verticeBuffer = triangle.getChild("verticeBuffer");
        var colorBuffer = triangle.getChild("colorBuffer");
        console.log(verticeBuffer);
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