import { RenderCommand } from "../command/RenderCommand";
import { Render } from "./Render";
export declare class WebglRender extends Render {
    static create(): WebglRender;
    private _commandQueue;
    init(): void;
    render(): void;
    addCommand(renderCmd: RenderCommand): void;
}
