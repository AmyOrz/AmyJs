import { Program } from "../../Program/Program";
export declare abstract class Shader {
    VSource: string;
    FSource: string;
    program: Program;
    init(): void;
    protected sendAttributeBuffer(name: string, data: any): void;
    protected sendUniformData(name: string, data: any): void;
    protected abstract initProgram(): any;
    protected abstract sendShaderAttribute(): any;
    protected abstract sendShaderUniform(): any;
}
