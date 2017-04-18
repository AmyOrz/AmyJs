import { RenderCommand } from "../command/RenderCommand";
import { WebglState } from "../state/WebglState";
export declare abstract class Render {
    webglState: WebglState;
    private _wegbglState;
    setClearColor(r: number, g: number, b: number, a: number): void;
    abstract render(): any;
    abstract addCommand(renderCmd: RenderCommand): any;
    abstract init(): any;
}
