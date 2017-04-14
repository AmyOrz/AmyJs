import { Shader } from "./Shader";
import { Geometry } from "../../../Geometry/Geometry";
import {Matrix4} from "../../../Math/Matrix4";
import {Device} from "../../../device/Device";
export class TriangleShader extends Shader {
    public static create(geometry:Geometry) {
        var obj = new this();

        obj.geometry = geometry;
        return obj;
    }

    private geometry: Geometry;

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

    public initProgram() {
        this.program.initProgramWithShader(this);
    }

    public sendShaderAttribute() {
        var verticeBuffer = this.geometry.getChild("verticeBuffer");
        var colorBuffer = this.geometry.getChild("colorBuffer");

        this.sendAttributeBuffer("a_Position", verticeBuffer);
        this.sendAttributeBuffer("a_Color", colorBuffer);

        this.program.sendAllBufferData();
    }

    public sendShaderUniform(){
        var modelMatrix = new Matrix4();
        var viewMatrix = new Matrix4();
        var projMatrix = new Matrix4();

        modelMatrix.setRotate(30, 0, 0, 1);
        viewMatrix.lookAt(0, 0, 3, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, Device.getInstance().canvas.width / Device.getInstance().canvas.height, 1, 100);

        this.sendUniformData("u_mMatrix", modelMatrix);
        this.sendUniformData("u_vMatrix", viewMatrix);
        this.sendUniformData("u_pMatrix", projMatrix);
        // this.sendShaderUniform("u_m",transform.mMatrix);
        // this.sendShaderUniform("u_v",transform.mMatrix);
        // this.sendShaderUniform("u_p",transform.mMatrix);
    }
}
