import { Program } from "../../Program/Program";
import { VariableLib } from "../VariableLib";
import {RenderCommand} from "../../../../core/renderer/command/RenderCommand";
export abstract class Shader {

    public VSource: string;
    public FSource: string;

    public program: Program = Program.create();

    public init() {
        this.initProgram();
        this.sendShaderAttribute();
        this.program.use();
    }

    protected sendAttributeBuffer(name: string, data: any) {
        this.program.sendAttributeBuffer(name, data);
    }
    protected sendUniformData(name: string, data: any) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    }

    public abstract initProgram();
    public abstract sendShaderAttribute();
    public abstract sendShaderUniform(renderCommand:RenderCommand);
    // public abstract sendShaderUniform();
}
