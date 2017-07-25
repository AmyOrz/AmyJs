import { Program } from "../../Program/Program";
import { VariableLib } from "../VariableLib";
import { RenderCommand } from "../../../../core/renderer/command/RenderCommand";
import { Component } from "../../../../core/Component";
import { Material } from "../../../Material/Material";
import { ShaderLib } from "../lib/ShaderLib";
export abstract class Shader extends Component {

    get VSource() {
        return this._shaderLib.VSource;
    }

    get FSource() {
        return this._shaderLib.FSource;
    }

    public program: Program = Program.create();

    protected _shaderLib: ShaderLib = this.createShaderLib();

    public init() {
        this.initProgram();
        this._shaderLib.init();
    }

    protected sendAttributeBuffer(name: string, data: any) {
        this.program.sendAttributeBuffer(name, data);
    }
    protected sendUniformData(name: string, data: any) {
        this.program.sendUniformData(name, VariableLib[name].type, data);
    }

    public abstract initProgram();
    public abstract createShaderLib();
    public abstract update(cmd: RenderCommand, material: Material);
}
