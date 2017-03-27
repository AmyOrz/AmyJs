"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shader = (function () {
    function Shader() {
        this.VSource = "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "uniform mat4 u_MvpMatrix;" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_Position = u_MvpMatrix * a_Position;" +
            "   v_Color = a_Color;" +
            "}";
        this.FSource = "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_FragColor = v_Color;" +
            "}";
    }
    Shader.create = function () {
        var obj = new this();
        return obj;
    };
    return Shader;
}());
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map