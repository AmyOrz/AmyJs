import { RenderCommand } from "../command/RenderCommand";
import { Renderer } from "./Renderer";
export declare class WebglRenderer extends Renderer {
    static create(): WebglRenderer;
    private _commandQueue;
    init(): void;
    render(): void;
    addCommand(renderCmd: RenderCommand): void;
    hasCommand(): boolean;
}
