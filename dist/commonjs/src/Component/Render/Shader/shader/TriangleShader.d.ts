import { Shader } from "./Shader";
import { Geometry } from "../../../Geometry/Geometry";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
export declare class TriangleShader extends Shader {
    static create(geometry: Geometry): TriangleShader;
    private geometry;
    VSource: string;
    FSource: string;
    initProgram(): void;
    sendShaderAttribute(): void;
    sendShaderUniform(renderCmd: RenderCommand): void;
}
