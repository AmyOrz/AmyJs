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
import { ShaderLib } from "./ShaderLib";
var ModelShaderLib = (function (_super) {
    __extends(ModelShaderLib, _super);
    function ModelShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.VSource = "attribute vec4 a_position;" +
            "attribute vec4 a_color;" +
            "attribute vec4 a_normal;" +
            "uniform mat4 u_mMatrix;" +
            "uniform mat4 u_vMatrix;" +
            "uniform mat4 u_pMatrix;" +
            "varying vec4 v_color;" +
            "void main(){" +
            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
            '   vec3 lightDirection = vec3(1.35, 0.35, -3.87);' +
            '   vec3 normal = normalize(vec3(a_normal));\n' +
            '   float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
            '   v_color = vec4(a_color.rgb * nDotL, a_color.a);\n' +
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
        this._attributes.push("a_normal");
        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    };
    return ModelShaderLib;
}(ShaderLib));
export { ModelShaderLib };
//# sourceMappingURL=ModelShaderLib.js.map