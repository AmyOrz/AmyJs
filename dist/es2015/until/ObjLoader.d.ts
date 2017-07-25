/// <reference types="wonder-commonlib" />
import "wonder-frp/dist/es2015/stream/MapStream";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
export declare class ObjLoader {
    static create(): ObjLoader;
    private regexp;
    objects: Collection<ObjectModel>;
    mtlFilePath: string;
    materialName: string;
    name: string;
    private _vertices;
    private _normals;
    private _texCoords;
    private _currentObject;
    convert(result: any, fileContent: any, fileName: any): any;
    private _buildPrimitiveArr();
    private _convertObject(fileContent);
    private convertUsemtl(line);
    private _getObjectNameWithMultMaterialOfSingleObj(materialName);
    private _convertFace(lines);
    private _getTriangles(face, triangles);
}
export declare class ObjectModel {
    static create(): ObjectModel;
    vertices: number[];
    normals: number[];
    texCoords: number[];
    verticeIndices: number[];
    normalIndices: number[];
    texCoordIndices: number[];
    materialName: string;
    name: string;
    indicesCount: number;
}
