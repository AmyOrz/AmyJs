import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUseage } from "./EBufferUseage";
export declare class ArrayBuffer extends Buffer {
    static create(data: number[], size: number, type?: EBufferType, usage?: EBufferUseage): ArrayBuffer;
    size: number;
    data: Float32Array;
    type: EBufferType;
    usage: EBufferUseage;
    count: number;
    initWhenCreate(data: number[], size: number, type?: EBufferType, usage?: EBufferUseage): any;
    private _saveData(data, size, type, usage);
}
