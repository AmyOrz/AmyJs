export declare class Loader {
    static of(): Loader;
    private _objLoader;
    private _materialLoader;
    readFileToStream(files: any): any;
    convertByFile(fileObject: any): any;
    convertByPath(filePath: string): any;
    private _getModelGeometryByResult(res);
    private _getStream(filePath);
    private _getName(filePath);
}
