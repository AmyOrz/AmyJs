import { Buffer } from "../../Renderer/Buffer/Buffer";
import { GeometryData } from "../Data/GeometryData";
export declare class BufferContainer {
    static create(): BufferContainer;
    constructor();
    geometryData: GeometryData;
    private _bufferList;
    init(): void;
    addChild(bufferName: string, buffer: Buffer): void;
    getChild(bufferName: string): Buffer;
    hasChild(bufferName: string): boolean;
    getChildren(): {
        [s: string]: Buffer;
    };
    private _getBufferByType(type);
    private _getVerticeBuffer();
    private _getColorBuffer();
    private _getNormalBuffer();
    private _getIndiceBuffer();
    private _getTexCoordBuffer();
}
