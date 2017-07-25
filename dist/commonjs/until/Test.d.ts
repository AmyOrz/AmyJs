export declare type fileObject = {
    obj: string;
    material: string;
};
export declare class Test {
    loadByFile(files: any): void;
    loadByPath(fileObj?: fileObject): void;
    testCanvas(models: any): void;
    private createTriangle();
    private createPlane(model);
    private createCamera();
}
