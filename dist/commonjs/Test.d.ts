export declare class Test {
    private vs;
    private fs;
    private _gl;
    private _program;
    testCanvas(): void;
    initShader(vs: string, fs: string): WebGLProgram;
    private _loadShader(type, value);
    private _createTriangle();
}
