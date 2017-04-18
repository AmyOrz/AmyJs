import { BufferContainer } from "../../../Component/Geometry/BufferContainer/BufferContainer";
export declare class RenderCommand {
    static create(): RenderCommand;
    buffers: BufferContainer;
    private _drawMode;
    draw(): void;
}
