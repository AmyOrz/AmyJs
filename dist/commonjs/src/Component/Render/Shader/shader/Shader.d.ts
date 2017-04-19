import { Program } from "../../Program/Program";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
export declare abstract class Shader {
    VSource: string;
    FSource: string;
    program: Program;
    init(): void;
    protected sendAttributeBuffer(name: string, data: any): void;
    protected sendUniformData(name: string, data: any): void;
    abstract initProgram(): any;
    abstract sendShaderAttribute(): any;
    abstract sendShaderUniform(renderCommand: RenderCommand): any;
}
