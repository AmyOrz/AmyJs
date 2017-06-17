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
var ShaderLib_1 = require("./ShaderLib");
var ModelShaderLib = (function (_super) {
    __extends(ModelShaderLib, _super);
    function ModelShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_position;" +
            "attribute vec4 a_color;" +
            "uniform mat4 u_mMatrix;" +
            "uniform mat4 u_vMatrix;" +
            "uniform mat4 u_pMatrix;" +
            "varying vec4 v_color;" +
            "void main(){" +
            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
            "   v_color = a_color;" +
            "}";
        _this.FSource = "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec4 v_color;" +
            "void main(){" +
            "   gl_FragColor = v_color;" +
            "}";
        return _this;
    }
    ModelShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    ModelShaderLib.prototype.init = function () {
        this._attributes.push("a_position");
        this._attributes.push("a_color");
        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    };
    return ModelShaderLib;
}(ShaderLib_1.ShaderLib));
exports.ModelShaderLib = ModelShaderLib;
//# sourceMappingURL=ModelShaderLib.js.map