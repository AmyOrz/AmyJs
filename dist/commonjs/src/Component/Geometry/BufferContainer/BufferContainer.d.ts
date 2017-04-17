import { GeometryData } from "../Data/GeometryData";
import { ArrayBuffer } from "../../Renderer/Buffer/ArrayBuffer";
export declare class BufferContainer {
    static create(): BufferContainer;
    constructor();
    geometryData: GeometryData;
    private _bufferList;
    init(): void;
    addChild(bufferName: string, buffer: ArrayBuffer): void;
    getChild(bufferName: string): ArrayBuffer;
    hasChild(bufferName: string): boolean;
    getChildren(): {
        [s: string]: ArrayBuffer;
    };
    private _getBufferByType(type);
    private _getVerticeBuffer();
    private _getColorBuffer();
    private _getNormalBuffer();
    private _getIndiceBuffer();
    private _getTexCoordBuffer();
}
