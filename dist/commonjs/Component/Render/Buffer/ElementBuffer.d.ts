import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUseage } from "./EBufferUseage";
export declare class ElementBuffer extends Buffer {
    static create(data: number[], type?: EBufferType, useage?: EBufferUseage): ElementBuffer;
    type: EBufferType;
    count: number;
    usage: EBufferUseage;
    data: Uint8Array | Uint16Array;
    initWhenCreate(data: number[], type: EBufferType, useage: EBufferUseage): any;
    private _saveData(data, type, useage);
}
