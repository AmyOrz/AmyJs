"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var TriangleGeometry_1 = require("./Component/Geometry/TriangleGeometry");
var WebglRender_1 = require("./core/renderer/render/WebglRender");
var RenderCommand_1 = require("./core/renderer/command/RenderCommand");
var Test = (function () {
    function Test() {
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        this._render = WebglRender_1.WebglRender.create();
        this._render.setClearColor(0, 0, 0, 1);
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        triangle.init();
        this._render.addCommand(RenderCommand_1.RenderCommand.create());
        this._render.render(triangle.getChild("verticeBuffer"));
    };
    Test.prototype._createTriangle = function () {
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map