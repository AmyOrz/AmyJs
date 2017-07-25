import { Shader } from "./Shader";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Material } from "../../../Material/Material";
import { BasicShaderLib } from "../lib/BasicShaderLib";
export declare class BasicShader extends Shader {
    static create(): BasicShader;
    initProgram(): void;
    createShaderLib(): BasicShaderLib;
    update(cmd: RenderCommand, material: Material): void;
}
