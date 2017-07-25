import { ShaderLib } from "./ShaderLib";
export class BasicShaderLib extends ShaderLib {
    public static create() {
        var obj = new this();

        return obj;
    }

    public VSource: string =
    "attribute vec4 a_position;" +
    "uniform mat4 u_mMatrix;" +
    "uniform mat4 u_vMatrix;" +
    "uniform mat4 u_pMatrix;" +
    "void main(){" +
    "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
    "}";
    public FSource: string =
    "#ifdef GL_ES\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "uniform vec3 u_color;" +
    "uniform float u_a;" +
    "void main(){" +
    "   gl_FragColor = vec4(u_color,u_a);" +
    "}";


    public init() {
        this._attributes.push("a_position");

        this._uniforms.push("u_color");
        this._uniforms.push("u_a");
        this._uniforms.push("u_mMatrix");
        this._uniforms.push("u_vMatrix");
        this._uniforms.push("u_pMatrix");
    }

}
