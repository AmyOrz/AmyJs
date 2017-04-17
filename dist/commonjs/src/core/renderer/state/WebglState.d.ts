export declare class WebglState {
    static create(): WebglState;
    setClearColor(r: number, g: number, b: number, a: number): void;
    init(): void;
    private _depthTest();
    private _clear();
}
