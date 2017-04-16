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
var Shader_1 = require("./Shader");
var Matrix4_1 = require("../../../../Math/Matrix4");
var Device_1 = require("../../../../core/device/Device");
var TriangleShader = (function (_super) {
    __extends(TriangleShader, _super);
    function TriangleShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "uniform mat4 u_mMatrix;" +
            "uniform mat4 u_vMatrix;" +
            "uniform mat4 u_pMatrix;" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_Position;" +
            "   v_Color = a_Color;" +
            "}";
        _this.FSource = "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_FragColor = v_Color;" +
            "}";
        return _this;
    }
    TriangleShader.create = function (geometry) {
        var obj = new this();
        obj.geometry = geometry;
        return obj;
    };
    TriangleShader.prototype.initProgram = function () {
        this.program.initProgramWithShader(this);
    };
    TriangleShader.prototype.sendShaderAttribute = function () {
        var verticeBuffer = this.geometry.getChild("verticeBuffer");
        var colorBuffer = this.geometry.getChild("colorBuffer");
        this.sendAttributeBuffer("a_Position", verticeBuffer);
        this.sendAttributeBuffer("a_Color", colorBuffer);
        this.program.sendAllBufferData();
    };
    TriangleShader.prototype.sendShaderUniform = function () {
        var modelMatrix = new Matrix4_1.Matrix4();
        var viewMatrix = new Matrix4_1.Matrix4();
        var projMatrix = new Matrix4_1.Matrix4();
        modelMatrix.setRotate(30, 0, 0, 1);
        viewMatrix.lookAt(0, 0, 3, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, Device_1.Device.getInstance().canvas.width / Device_1.Device.getInstance().canvas.height, 1, 100);
        this.sendUniformData("u_mMatrix", modelMatrix);
        this.sendUniformData("u_vMatrix", viewMatrix);
        this.sendUniformData("u_pMatrix", projMatrix);
    };
    return TriangleShader;
}(Shader_1.Shader));
exports.TriangleShader = TriangleShader;
//# sourceMappingURL=TriangleShader.js.map