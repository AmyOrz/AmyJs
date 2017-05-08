import { RenderCommand } from "../../core/renderer/command/RenderCommand";
import { Program } from "../Render/Program/Program";
export declare abstract class Material {
    readonly program: Program;
    private _shader;
    initWhenCreate(): void;
    init(): void;
    update(cmd: RenderCommand): void;
    protected abstract getShader(): any;
}
