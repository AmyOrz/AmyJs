import { ShaderLib } from "./ShaderLib";
export class ModelShaderLib extends ShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public VSource: string =
    "attribute vec4 a_position;" +
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
    public FSource: string =
    "#ifdef GL_ES\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "varying vec4 v_color;" +
    "void main(){" +
    "   gl_FragColor = v_color;" +
    "}";

    init() {
        this._attributes.push("a_position");
        this._attributes.push("a_color");
        this._attributes.push("a_normal");

        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    }
}
