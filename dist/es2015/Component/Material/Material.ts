import { Shader } from "../Render/Shader/shader/Shader";
import { RenderCommand } from "../../core/renderer/command/RenderCommand";
import { Program } from "../Render/Program/Program";
import { Color } from "../../Math/Color";
export abstract class Material {
    get program(): Program {
        return this._shader.program;
    }

    private _color: Color = Color.create("#ffffff");
    get color() {
        return this._color;
    }
    set color(color: Color) {
        if (this._color !== color) {
            this._color = color;
        }
    }

    public opacity = 1.0;
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
