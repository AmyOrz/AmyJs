export declare abstract class ShaderLib {
    VSource: string;
    FSource: string;
    protected _attributes: string[];
    protected _uniforms: string[];
    abstract init(): any;
    getAttributes(): string[];
    getUniforms(): string[];
}
