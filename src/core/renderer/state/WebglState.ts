import {Device} from "../../device/Device";
export class WebglState{
    public static create(){
        var obj = new this();

        return obj;
    }

    public setClearColor(r:number,g:number,b:number,a:number){
        var gl = Device.getInstance().gl;

        gl.clearColor(r,g,b,a);

    }

    public init(){
        
    }
}