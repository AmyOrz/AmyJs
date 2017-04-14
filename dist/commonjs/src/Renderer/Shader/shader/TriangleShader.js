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
var TriangleShader = (function (_super) {
    __extends(TriangleShader, _super);
    function TriangleShader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "uniform mat4 u_m;" +
            "uniform mat4 u_v;" +
            "uniform mat4 u_p;" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_Position = u_p * u_v * u_m * a_Position;" +
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
    TriangleShader.create = function () {
        var obj = new this();
        return obj;
    };
    TriangleShader.prototype.initProgram = function (geometry) {
        this.program.initProgramWithShader(this);
        this.geometry = geometry;
    };
    TriangleShader.prototype.sendShaderVariables = function () {
        var verticeBuffer = this.geometry.getChild("verticeBuffer");
        var colorBuffer = this.geometry.getChild("colorBuffer");
        this.sendAttributeBuffer("a_Position", verticeBuffer);
        this.sendAttributeBuffer("a_Color", colorBuffer);
        this.program.sendAllBufferData();
    };
    return TriangleShader;
}(Shader_1.Shader));
exports.TriangleShader = TriangleShader;
//# sourceMappingURL=TriangleShader.js.map