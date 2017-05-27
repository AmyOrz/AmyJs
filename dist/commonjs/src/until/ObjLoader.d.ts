/// <reference types="wonder-frp" />
import "wonder-frp/dist/commonjs/stream/MapStream";
import { FromPromiseStream } from "wonder-frp/dist/commonjs/stream/FromPromiseStream";
export declare class ObjLoader {
    static create(path: string): ObjLoader;
    private _path;
    private regexp;
    constructor(path: string);
    load(path?: string): FromPromiseStream;
    parse(): void;
    private _createParserState();
}
