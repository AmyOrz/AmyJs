import { Shader } from "./Shader";
import { ModelShaderLib } from "../lib/ModelShaderLib";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Material } from "../../../Material/Material";
export declare class ModelShader extends Shader {
    static create(): ModelShader;
    initProgram(): void;
    createShaderLib(): ModelShaderLib;
    update(cmd: RenderCommand, material: Material): void;
}
