import { Shader } from "./Shader";
import { Geometry } from "../../../Geometry/Geometry";
export declare class TriangleShader extends Shader {
    static create(): TriangleShader;
    private geometry;
    VSource: string;
    FSource: string;
    initProgram(geometry: Geometry): void;
    sendShaderVariables(): void;
}
