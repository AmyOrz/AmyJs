import { RenderCommand } from "../command/RenderCommand";
import { Render } from "./Render";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export declare class WebglRender extends Render {
    static create(): WebglRender;
    private _commandQueue;
    init(): void;
    render(buffer: ArrayBuffer): void;
    addCommand(renderCmd: RenderCommand): void;
}
