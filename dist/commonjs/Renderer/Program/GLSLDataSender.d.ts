import { Program } from "./Program";
import { Matrix4 } from "../../Math/Matrix4";
import { ArrayBuffer } from "../Buffer/ArrayBuffer";
export declare class GLSLDataSender {
    private _program;
    static create(program: Program): GLSLDataSender;
    constructor(_program: Program);
    private _getUniformLocationCache;
    private _toSendBufferArr;
    addBufferToSendList(name: string, buffer: ArrayBuffer): void;
    sendAllBufferData(): void;
    sendBuffer(pos: number, buffer: ArrayBuffer): void;
    sendFloat1(name: string, data: any): void;
    sendFloat2(name: string, data: any): void;
    sendFloat3(name: string, data: any): void;
    sendFloat4(name: string, data: any): void;
    sendVector2(name: string, data: any): void;
    sendVector3(name: string, data: any): void;
    sendVector4(name: string, data: any): void;
    sendNum1(name: string, data: number): void;
    sendMatrix4(name: string, data: Matrix4): void;
    sendMatrix4Array(name: string, data: any): void;
    getUniformLocation(name: string): any;
    private _getGl();
}
