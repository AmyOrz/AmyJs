import { EBufferDataType } from "./EBufferDataType";
import { GeometryData } from "../Data/GeometryData";
import { Buffer } from "../../Render/Buffer/Buffer";
export declare class BufferContainer {
    static create(): BufferContainer;
    constructor();
    geometryData: GeometryData;
    private _bufferList;
    init(): void;
    addChild(bufferName: any, buffer: Buffer): void;
    hasChild(bufferName: any): boolean;
    getChildren(): {
        [s: string]: Buffer;
    };
    getChild(type: EBufferDataType): any;
    private _getVerticeBuffer(type);
    private _getColorBuffer(type);
    private _getNormalBuffer(type);
    private _getIndiceBuffer(type);
    private _getTexCoordBuffer(type);
    private _bufferCache(type, buffer);
}
