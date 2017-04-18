import { RenderCommand } from "../command/RenderCommand";
import { WebglState } from "../state/WebglState";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export declare abstract class Render {
    webglState: WebglState;
    private _wegbglState;
    setClearColor(r: number, g: number, b: number, a: number): void;
    abstract render(buffer: ArrayBuffer): any;
    abstract addCommand(renderCmd: RenderCommand): any;
    abstract init(): any;
}
