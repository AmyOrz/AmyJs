/// <reference types="wonder-commonlib" />
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class MaterialLoader {
    static create(): MaterialLoader;
    materials: Collection<MaterialModel>;
    private _currentMaterial;
    convert(result: any, fileContent: any): any;
    private _addData(valueData, key, data);
    private _convertMaterial(fileContent);
    private _setColor(colorType, colorStrArr);
    private _parseKey(line, pos);
    private _parseValue(line, pos);
}
export declare class MaterialModel {
    static create(): MaterialModel;
    name: string;
    diffuseColor: Array<number>;
    specularColor: Array<number>;
    emissionColor: Array<number>;
    opacity: number;
    shininess: number;
    diffuseMapUrl: string;
    specularMapUrl: string;
    emissionMapUrl: string;
    bumpMapUrl: string;
}
