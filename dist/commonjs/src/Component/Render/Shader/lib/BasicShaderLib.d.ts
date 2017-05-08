import { ShaderLib } from "./ShaderLib";
export declare class BasicShaderLib extends ShaderLib {
    static create(): BasicShaderLib;
    VSource: string;
    FSource: string;
    init(): void;
}
