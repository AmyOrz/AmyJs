import { ShaderLib } from "./ShaderLib";
export declare class ModelShaderLib extends ShaderLib {
    static create(): ModelShaderLib;
    VSource: string;
    FSource: string;
    init(): void;
}
