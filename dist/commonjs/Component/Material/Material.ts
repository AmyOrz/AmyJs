import { Shader } from "../Render/Shader/shader/Shader";
import { RenderCommand } from "../../core/renderer/command/RenderCommand";
import { Program } from "../Render/Program/Program";
export abstract class Material {
    get program(): Program {
        return this._shader.program;
    }

    private _shader: Shader = null;

    initWhenCreate() {
        this._shader = this.getShader();
    }

    init() {
        this._shader.init();
    }

    public update(cmd: RenderCommand) {
        this._shader.update(cmd, this);
    }
    protected abstract getShader();

}
