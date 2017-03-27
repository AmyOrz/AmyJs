import { Device } from "../../device/Device";
import { Shader } from "../Shader/shader/Shader";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { EVariableType } from "./EVariableType";
import { GLSLDataSender } from "./GLSLDataSender";
import { ArrayBuffer } from "../Buffer/ArrayBuffer";

export class Program {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();
        return obj;
    }

    public glProgram: any = null;
    private _attributeList: Hash<number> = new Hash<number>();
    private _glslSend: GLSLDataSender = GLSLDataSender.create(this);

    public initWhenCreate() {
        this.initProgramWithShader(Shader.create());
    }

    public use() {
        this._getGl().useProgram(this.glProgram);
    }

    public getAttribLocation(name: string): number {
        var pos = this._attributeList.getChild(name);
        if (pos !== void 0) return pos;

        var attribute = this._getGl().getAttribLocation(this.glProgram, name);

        this._attributeList.addChild(name, attribute);

        return attribute;
    }

    public getUniformLocation(name: string) {
        return this._glslSend.getUniformLocation(name);
    }

    public sendAttributeBuffer(name: string, buffer: ArrayBuffer) {
        var pos = this.getAttribLocation(name);

        if (pos == -1) return;

        this._glslSend.addBufferToSendList(pos, buffer);
    }

    public sendAllBufferData() {
        this._glslSend.sendAllBufferData();
    }

    public sendUniformData(name: string, type: EVariableType, data: any) {
        if (data === null) {
            return;
        }

        switch (type) {
            case EVariableType.FLOAT_1:
                this._glslSend.sendFloat1(name, data);
                break;
            case EVariableType.FLOAT_2:
                this._glslSend.sendFloat2(name, data);
                break;
            case EVariableType.FLOAT_3:
                this._glslSend.sendFloat3(name, data);
                break;
            case EVariableType.FLOAT_4:
                this._glslSend.sendFloat4(name, data);
                break;
            case EVariableType.VECTOR_2:
                this._glslSend.sendVector2(name, data);
                break;
            case EVariableType.VECTOR_3:
                this._glslSend.sendVector3(name, data);
                break;
            case EVariableType.VECTOR_4:
                this._glslSend.sendVector4(name, data);
                break;
            case EVariableType.FLOAT_MAT4:
                this._glslSend.sendMatrix4(name, data);
                break;
            case EVariableType.NUMBER_1:
            case EVariableType.SAMPLER_CUBE:
            case EVariableType.SAMPLER_2D:
                this._glslSend.sendNum1(name, data);
                break;
            case EVariableType.FLOAT_MAT4_ARRAY:
                this._glslSend.sendMatrix4Array(name, data);
                break;
            default:
                console.log("the type is not find");
                break;
        }
    }

    public sendFloat1(name: string, data: any) {
        this._glslSend.sendFloat1(name, data);
    }

    public sendFloat2(name: string, data: any) {
        this._glslSend.sendFloat2(name, data);
    }

    public sendFloat3(name: string, data: any) {
        this._glslSend.sendFloat3(name, data);
    }

    public sendFloat4(name: string, data: any) {
        this._glslSend.sendFloat4(name, data);
    }

    public sendVector2(name: string, data: any) {
        this._glslSend.sendVector2(name, data);
    }

    public sendVector3(name: string, data: any) {
        this._glslSend.sendVector3(name, data);
    }

    public sendVector4(name: string, data: any) {
        this._glslSend.sendVector4(name, data);
    }

    public sendNum1(name: string, data: any) {
        this._glslSend.sendNum1(name, data);
    }

    public sendMatrix4(name: string, data: any) {
        this._glslSend.sendMatrix4(name, data);
    }

    public sendMatrix4Array(name: string, data: Float32Array) {
        this._glslSend.sendMatrix4Array(name, data);
    }


    public initProgramWithShader(shader: Shader): WebGLProgram {
        var gl = Device.getInstance().gl;
        let program: WebGLProgram = gl.createProgram();

        let vshader: WebGLShader = this._loadShader(gl, gl.VERTEX_SHADER, shader.VSource);
        let fshader: WebGLShader = this._loadShader(gl, gl.FRAGMENT_SHADER, shader.FSource);
        if (!vshader || !fshader) {
            return;
        }
        //连接着色器
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            let err = gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            gl.deleteProgram(program);
            gl.deleteShader(vshader);
            gl.deleteShader(vshader);
            return;
        }
        if (!program) console.log("program error");
        this.glProgram = program;
    }
    private _loadShader(gl: WebGLRenderingContext, type: number, value: string): WebGLShader {
        let shader: WebGLShader = gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        gl.shaderSource(shader, value);   //着色器赋值
        gl.compileShader(shader);        //编译着色器

        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            let error = gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            gl.deleteShader(shader);
            return;
        }
        return shader;
    }
    private _getGl() {
        return Device.getInstance().gl;
    }
}
