import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUseage } from "./EBufferUseage";
import { Device } from "../../device/Device";

export class ArrayBuffer extends Buffer {
    public static create(data: number[], size: number, type: EBufferType = EBufferType.FLOAT, usage: EBufferUseage = EBufferUseage.STATIC_DRAW) {
        var obj = new this();

        obj.initWhenCreate(data,size,type,usage);
        return obj;
    }

    public size:number = null;
    public data:Float32Array = null;
    public type:EBufferType = null;
    public usage:EBufferUseage = null;

    public initWhenCreate(data: number[], size: number, type: EBufferType = EBufferType.FLOAT, usage: EBufferUseage = EBufferUseage.STATIC_DRAW){

        let gl = Device.getInstance().gl;
        let typeData = new Float32Array(data);

        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("the buffer create error");
            return null;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typeData, gl[usage]);

        this._saveData(typeData,size,type,usage);
        return this.buffer;
    }

    private _saveData(data:Float32Array,size:number,type:EBufferType,usage:EBufferUseage){
        this.data = data;
        this.size = size;
        this.type = type;
        this.usage = usage;
    }

}
