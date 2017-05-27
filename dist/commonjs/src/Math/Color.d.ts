export declare class Color {
    static create(colorVal: string): Color;
    private _r;
    r: number;
    private _g;
    g: number;
    private _b;
    b: number;
    private _a;
    a: number;
    initWhenCreate(colorVal: string): void;
    toArray(): number[];
    private _setColor(colorVal);
    private _getColorValue(color, index, num?);
    private _setHex(hex);
}
