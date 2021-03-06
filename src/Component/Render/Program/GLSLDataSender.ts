import { Program } from "./Program";
import { ArrayBuffer } from "../Buffer/ArrayBuffer";
import { Matrix4 } from "../../../Math/Matrix4";
import { Device } from "../../../core/device/Device";

export class GLSLDataSender {
    public static create(program: Program) {
        var obj = new this(program);

        return obj;
    }

    constructor(private _program: Program) { }

    private _getUniformLocationCache: Object = {};
    private _toSendBufferArr: ArrayBuffer[] = [];

    public addBufferToSendList(pos: number, buffer: ArrayBuffer) {
        this._toSendBufferArr[pos] = buffer;
    }

    public sendAllBufferData() {
        for (let pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
            this.sendBuffer(pos, this._toSendBufferArr[pos]);
        }
    }

    public sendBuffer(pos: number, buffer: ArrayBuffer) {
        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
        this._getGl().vertexAttribPointer(pos, buffer.size, this._getGl()[buffer.type], false, 0, 0);
        this._getGl().enableVertexAttribArray(pos);
    }

    public sendFloat1(name: string, data: any) {
        let uniform = this.getUniformLocation(name);

        this._getGl().uniform1f(uniform, data);
    }

    public sendFloat2(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform2f(uniform, data[0], data[1]);
    }

    public sendFloat3(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform3f(uniform, data[0], data[1], data[2]);
    }

    public sendFloat4(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform4f(uniform, data[0], data[1], data[2], data[3]);
    }

    public sendVector2(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform2f(uniform, data.x, data.y);
    }

    public sendVector3(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform3f(uniform, data.x, data.y, data.z);
    }

    public sendVector4(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform4f(uniform, data.x, data.y, data.z, data.w);
    }

    public sendNum1(name: string, data: number) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniform1i(uniform, data);
    }

    public sendMatrix4(name: string, data: Matrix4) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniformMatrix4fv(uniform, false, data.elements);
    }

    public sendMatrix4Array(name: string, data: any) {

        let uniform = this.getUniformLocation(name);

        this._getGl().uniformMatrix4fv(uniform, false, data);
    }

    public getUniformLocation(name: string) {
        if (this._getUniformLocationCache[name] != void 0) {
            return this._getUniformLocationCache[name];
        }

        let uniform = this._getGl().getUniformLocation(this._program.glProgram, name);
        if (uniform == void 0) {
            throw new TypeError("the uniform is not find");
        }
        this._getUniformLocationCache[name] = uniform;
        return uniform;

    }

    private _getGl() {
        return Device.getInstance().gl;
    }
}
