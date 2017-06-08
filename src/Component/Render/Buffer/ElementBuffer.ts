import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUseage } from "./EBufferUseage";
import { Device } from "../../../core/device/Device";
export class ElementBuffer extends Buffer {
    public static create(data: number[], type: EBufferType = EBufferType.UNSIGNED_BYTE, useage: EBufferUseage = EBufferUseage.STATIC_DRAW) {
        var obj = new this();
        var result = obj.initWhenCreate(data, type, useage);
        if(result == void 0)return null;

        return obj;
    }

    public type: EBufferType = null;
    public count: number = null;
    public usage: EBufferUseage = null;
    public data: Uint8Array | Uint16Array = null;

    public initWhenCreate(data: number[], type: EBufferType, useage: EBufferUseage) {
        if (data == void 0) return null;
        var gl: WebGLRenderingContext = Device.getInstance().gl;
        var typeData = new Uint8Array(data);

        var buffer = gl.createBuffer();
        if (!buffer) console.log("element Buffer create buffer error");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeData, gl[useage]);

        this._saveData(typeData, type, useage);
        this.buffer = buffer;
    }

    private _saveData(data: any, type: EBufferType, useage: EBufferUseage) {
        this.data = data;
        this.type = type;
        this.usage = useage;
        this.count = data.length;
    }
}
