import {Buffer} from "./Buffer";
import {EBufferType} from "./EBufferType";
import {EBufferUseage} from "./EBufferUseage";
import {Device} from "../../device/Device";

export class ArrayBuffer extends Buffer{
    public static create(data:any,size:number,type:EBufferType = EBufferType.FLOAT,useage:EBufferUseage = EBufferUseage.STATIC_DRAW){
        var obj = new this(data,size,type,useage);

        return obj;
    }

    constructor(public data:any,public size:number,public type:EBufferType,public useage:EBufferUseage){
        var gl = Device.getInstance().gl;

        this.buffer = gl.createBuffer();
        if(!this.buffer){
            console.log("the buffer create error");
            return null;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER,this.data,this.useage);

        return this.buffer;
    }
}
