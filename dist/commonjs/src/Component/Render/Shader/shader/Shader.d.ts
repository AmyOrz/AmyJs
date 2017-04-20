import { Program } from "../../Program/Program";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Component } from "../../../../core/Component";
export declare abstract class Shader extends Component {
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
