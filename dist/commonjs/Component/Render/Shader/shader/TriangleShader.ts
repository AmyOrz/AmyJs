import { Shader } from "./Shader";
import { Geometry } from "../../../Geometry/Geometry";
import { Matrix4 } from "../../../../Math/Matrix4";
import { Device } from "../../../../core/device/Device";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { EBufferDataType } from "../../../Geometry/BufferContainer/EBufferDataType";

export class TriangleShader extends Shader {
    public static create(geometry: Geometry) {
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

        var verticeBuffer = this.geometry.bufferContainer.getChild(EBufferDataType.VERTICE);
        var colorBuffer = this.geometry.bufferContainer.getChild(EBufferDataType.COLOR);

        this.sendAttributeBuffer("a_Position", verticeBuffer);
        this.sendAttributeBuffer("a_Color", colorBuffer);

        this.program.sendAllBufferData();
    }

    public sendShaderUniform(renderCmd: RenderCommand) {
        this.program.use();

        this.sendUniformData("u_mMatrix", renderCmd.mMatrix);
        this.sendUniformData("u_vMatrix", renderCmd.vMatrix);
        this.sendUniformData("u_pMatrix", renderCmd.pMatrix);
    }
}
