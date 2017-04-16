import { Program } from "../../Program/Program";
import { VariableLib } from "../VariableLib";
export abstract class Shader {

    public VSource: string;
    public FSource: string;

    public program: Program = Program.create();

    public init() {
        this.initProgram();
        this.sendShaderAttribute();
        this.program.use();
        this.sendShaderUniform();
    }

    protected sendAttributeBuffer(name: string, data: any) {
        this.program.sendAttributeBuffer(name, data);
    }
    protected sendUniformData(name: string, data: any) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    }

    protected abstract initProgram();
    protected abstract sendShaderAttribute();
    protected abstract sendShaderUniform();
}
