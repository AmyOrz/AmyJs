import { Shader } from "../Shader/shader/Shader";
import { EVariableType } from "./EVariableType";
import { ArrayBuffer } from "../Buffer/ArrayBuffer";
export declare class Program {
    static create(): Program;
    glProgram: any;
    private _attributeList;
    private _glslSend;
    use(): void;
    getAttribLocation(name: string): number;
    getUniformLocation(name: string): any;
    sendAttributeBuffer(name: string, buffer: ArrayBuffer): void;
    sendAllBufferData(): void;
    sendUniformData(name: string, type: EVariableType, data: any): void;
    sendFloat1(name: string, data: any): void;
    sendFloat2(name: string, data: any): void;
    sendFloat3(name: string, data: any): void;
    sendFloat4(name: string, data: any): void;
    sendVector2(name: string, data: any): void;
    sendVector3(name: string, data: any): void;
    sendVector4(name: string, data: any): void;
    sendNum1(name: string, data: any): void;
    sendMatrix4(name: string, data: any): void;
    sendMatrix4Array(name: string, data: Float32Array): void;
    initProgramWithShader(shader: Shader): WebGLProgram;
    private _loadShader(gl, type, value);
    private _getGl();
}
