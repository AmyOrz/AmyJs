export abstract class ShaderLib {
    public VSource: string;
    public FSource: string;
    protected _attributes: string[] = [];
    protected _uniforms: string[] = [];

    public abstract init();
    public getAttributes() {
        return this._attributes;
    }
    public getUniforms() {
        return this._uniforms;
    };
}
