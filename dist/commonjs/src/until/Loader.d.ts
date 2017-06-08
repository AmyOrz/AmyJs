import "wonder-frp/dist/commonjs/stream/MapStream";
import "wonder-frp/dist/commonjs/stream/MergeAllStream";
export declare class Loader {
    static of(): Loader;
    private _objLoader;
    private _materialLoader;
    convert(filePath: string): any;
    private _getStream(filePath);
    private _getName(filePath);
}
