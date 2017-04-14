import { Shader } from "./Shader";
import { Geometry } from "../../../Geometry/Geometry";
export class TriangleShader extends Shader {
    public static create() {
        var obj = new this();

        return obj;
    }

    private geometry: Geometry;

    public VSource: string =
    "attribute vec4 a_Position;" +
    "attribute vec4 a_Color;" +
    "uniform mat4 u_m;" +
    "uniform mat4 u_v;" +
    "uniform mat4 u_p;" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_Position = u_p * u_v * u_m * a_Position;" +
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

    public initProgram(geometry: Geometry) {
        this.program.initProgramWithShader(this);

        this.geometry = geometry;
    }

    public sendShaderVariables() {
        var verticeBuffer = this.geometry.getChild("verticeBuffer");
        var colorBuffer = this.geometry.getChild("colorBuffer");

        this.sendAttributeBuffer("a_Position", verticeBuffer);
        this.sendAttributeBuffer("a_Color", colorBuffer);

        this.program.sendAllBufferData();
        // this.sendUniformBData("u_m")
    }
}
