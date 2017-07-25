import { Program } from "../../Program/Program";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Component } from "../../../../core/Component";
import { Material } from "../../../Material/Material";
import { ShaderLib } from "../lib/ShaderLib";
export declare abstract class Shader extends Component {
    readonly VSource: string;
    readonly FSource: string;
    program: Program;
    protected _shaderLib: ShaderLib;
    init(): void;
    protected sendAttributeBuffer(name: string, data: any): void;
    protected sendUniformData(name: string, data: any): void;
    abstract initProgram(): any;
    abstract createShaderLib(): any;
    abstract update(cmd: RenderCommand, material: Material): any;
}
