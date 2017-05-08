import { ShaderLib } from "./ShaderLib";
export class BasicShaderLib extends ShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public VSource: string =
    "attribute vec4 a_Position;" +
    "attribute vec4 a_Color;" +
    "uniform mat4 u_mMatrix;" +
    "uniform mat4 u_vMatrix;" +
    "uniform mat4 u_pMatrix;" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_Position;" +
    "   v_Color = a_Color;" +
    "}";
    public FSource: string =
    "#ifdef GL_ES\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_FragColor = v_Color;" +
    "}";

    public init() {
        this._attributes.push("a_Position");
        this._attributes.push("a_Color");

        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    }

}
