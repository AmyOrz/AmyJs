import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export declare class RenderCommand {
    static create(): RenderCommand;
    private _drawMode;
    draw(verticeBuffer: ArrayBuffer): void;
}
