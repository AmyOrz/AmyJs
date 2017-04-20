import { Program } from "../../Program/Program";
import { VariableLib } from "../VariableLib";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Component } from "../../../../core/Component";
export abstract class Shader extends Component {

    public VSource: string;
    public FSource: string;

    public program: Program = Program.create();

    public init() {
        this.initProgram();
        this.sendShaderAttribute();
    }

    protected sendAttributeBuffer(name: string, data: any) {
        this.program.sendAttributeBuffer(name, data);
    }
    protected sendUniformData(name: string, data: any) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    }

    public abstract initProgram();
    public abstract sendShaderAttribute();
    public abstract sendShaderUniform(renderCommand: RenderCommand);
    // public abstract sendShaderUniform();
}
